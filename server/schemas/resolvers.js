const { User, Product, Category, Order, Comment,SubCategory } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    subcategories:async(parent, { category})=>{
      return await SubCategory.find(category);
    },
    products: async (parent, { subcategory, name }) => {
      try {
        const params = {};

        if (subcategory) {
          params.subcategory = subcategory;
        }

        if (name) {
          params.name = {
            $regex: name,
          };
        }

        return await Product.find(params).populate("subcategory");
      } catch (error) {
        console.log(error);
      }
    },
    product: async (parent, { _id }) => {
      try {
        return await Product.findById(_id).populate("subcategory");
      } catch (error) {
        console.log("product not found", error);
      }
    },
    user: async (parent, args, context) => {
      if (context.user) {
        try {
          const user = await User.findById(context.user._id).populate({
            path: "orders.products",
            populate: "category",
          });

          user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

          return user;
        } catch (error) {
          console.log("user not found", error);
        }
      }

      throw AuthenticationError;
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        try {
          const user = await User.findById(context.user._id).populate({
            path: "orders.products",
            populate: "category",
          });

          return user.orders.id(_id);
        } catch (error) {
          console.log("No orders found", error);
        }
      }

      throw AuthenticationError;
    },
    checkout: async (parent, args, context) => {
      try {
        const url = new URL(context.headers.referer).origin;
        const order = new Order({ products: args.products });
        const line_items = [];

        const { products } = await order.populate("products");

        for (let i = 0; i < products.length; i++) {
          const product = await stripe.products.create({
            name: products[i].name,
            description: products[i].description,
            images: [`${url}/images/${products[i].image}`],
          });

          const price = await stripe.prices.create({
            product: product.id,
            unit_amount: products[i].price * 100,
            currency: "usd",
          });

          line_items.push({
            price: price.id,
            quantity: 1,
          });
        }

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items,
          mode: "payment",
          success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${url}/`,
        });

        return { session: session.id };
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    addCategory: async (parent, { name }, context) => {
      if (context.user?.isAdmin) {
        try {
            return Category.create({name });
        } catch (error) {
            console.log("unable to add category",error);
        }
      }
    },
    addSubCategory: async (parent, { name,category }, context) => {
        if (context.user?.isAdmin) {
          try {
              return SubCategory.create({name,category });
          } catch (error) {
            console.log("unable to add sub category",error);
              
          }
        }
      },
      addProduct: async (parent, { productDetails }, context) => {
        if (context.user?.isAdmin) {
          try {
              return SubCategory.create({productDetails });
          } catch (error) {
            console.log("unable to add sub category",error);
              
          }
        }
      },
      addComment: async (parent, {productId, rating, commentDesc,userId }) => {
        return Product.findOneAndUpdate(
          { _id: productId },
          {
            $addToSet: { comments: { rating,commentDesc,userId } },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      },
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);

        return { token, user };
      } catch (error) {
        console.log(error);
      }
    },
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        try {
          const order = new Order({ products });

          await User.findByIdAndUpdate(context.user._id, {
            $push: { orders: order },
          });

          return order;
        } catch (error) {
          comsole.log("unable to add order", error);
        }
      }

      throw AuthenticationError;
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        try {
          return await User.findByIdAndUpdate(context.user._id, args, {
            new: true,
          });
        } catch (error) {
          console.log("unable to update user", error);
        }
      }

      throw AuthenticationError;
    },
    updateCategory: async (parent, {_id,name}, context) => {
        if (context.user?.isAdmin) {
          try {
            return await Product.findByIdAndUpdate(_id, name, {
              new: true,
            });
          } catch (error) {
            console.log("unable to update category", error);
          }
        }
  
        throw AuthenticationError;
      },
      updateSubCategory: async (parent, {_id,name,category}, context) => {
        if (context.user?.isAdmin) {
          try {
            return await Product.findByIdAndUpdate(_id, {name,category}, {
              new: true,
            });
          } catch (error) {
            console.log("unable to update subcategory", error);
          }
        }
  
        throw AuthenticationError;
      },
    updateProduct: async (parent, { _id, quantity }) => {
      try {
        const decrement = Math.abs(quantity) * -1;

        return await Product.findByIdAndUpdate(
          _id,
          { $inc: { quantity: decrement } },
          { new: true }
        );
      } catch (error) {
        console.log("unable to update product", error);
      }
    },
    
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw AuthenticationError;
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw AuthenticationError;
        }

        const token = signToken(user);

        return { token, user };
      } catch (error) {
        console.log("log error", err);
      }
    },
  },
};

module.exports = resolvers;
