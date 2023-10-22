const { User, Product, Category, Order, Comment,SubCategory } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    // get all categories
    categories: async () => {
      return await Category.find();
    },
    // get subcategory of selected category
    subcategories: async(parent, {category})=>{
      return await SubCategory.find({category});
    },
    // get all products of given subcategory
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
        // params can be name or subcategory id
        return await Product.find(params).populate("subcategory");
      } catch (error) {
        console.log(error);
      }
    },
    // get one product of particular id
    product: async (parent, { _id }) => {
      try {
        return await Product.findById(_id).populate("subcategory");
      } catch (error) {
        console.log("product not found", error);
      }
    },
    // get user by id
    user: async (parent, args, context) => {
      if (context.user) {
        try {
          const user = await User.findById(context.user._id).populate({
            path: "orders.products",
            populate: "category",
          });
          //sorting as per latest purchase to oldest purchase date
          user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

          return user;
        } catch (error) {
          console.log("user not found", error);
        }
      }

      throw AuthenticationError;
    },
    //
    // order: async (parent, { _id }, context) => {
    //   if (context.user) {
    //     try {
    //       const user = await User.findById(context.user._id).populate({
    //         path: "orders.products",
    //         populate: "category",
    //       });

    //       return user.orders.id(_id);
    //     } catch (error) {
    //       console.log("No orders found", error);
    //     }
    //   }

    //   throw AuthenticationError;
    // },
    
    checkout: async (parent, args, context) => {
      try {

        const url = new URL(context.headers.referer).origin;
        // create new order
        const order = new Order({ products: args.products });
        const line_items = [];
        //populate products of order
        const { products } = await order.populate("products");
        //order information
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
        
        //create and return checkout session
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
    // add category by passing name
    addCategory: async (parent, { name }, context) => {
      if (context.user?.isAdmin) {
        try {
            return Category.create({name });
        } catch (error) {
            console.log("unable to add category",error);
        }
      }
    },
    //create sub category by passing name and category id
    addSubCategory: async (parent, { name,category }, context) => {
        if (context.user?.isAdmin) {
          try {
              return SubCategory.create({name,category });
          } catch (error) {
            console.log("unable to add sub category",error);
              
          }
        }
      },
      //add products by passing all product details
      addProduct: async (parent, { productDetails }, context) => {
        if (context.user?.isAdmin) {
          try {
              return SubCategory.create({productDetails });
          } catch (error) {
            console.log("unable to add sub category",error);
              
          }
        }
      },
      //add comment in product 
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
      //signup
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.log(error);
      }
    },
    //add order in orders array and update  user
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
    // update user details
    // updateUser: async (parent, args, context) => {
    //   if (context.user) {
    //     try {
    //       return await User.findByIdAndUpdate(context.user._id, args, {
    //         new: true,
    //       });
    //     } catch (error) {
    //       console.log("unable to update user", error);
    //     }
    //   }

    //   throw AuthenticationError;
    // },
    //update category by passing id and name
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
    //update subcategory by passing id, name and category id
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
      //update quantity in product
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
    // login
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw AuthenticationError;
        }
        // check password
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
