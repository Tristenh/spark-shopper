//type definitions for `Category`,`SubCategory`, `Product`, `Order`,`Comment` and `User` above the `Auth` type
const typeDefs = `
 
type Category{
  _id:ID
  name:String
}
type SubCategory{
  _id:ID
  name:String
  category:Category
}
type Product{
  _id:ID
  name:String
  description:String
  image:String
  price:Float
  quantity:Int
  subcategory:SubCategory
  comments:Comment
}

type Order{
  _id:ID
  purchaseDate:String
  products:[Product]
  totalPrice:Float
}

type Comment{
    _id:ID
    rating:Int
    commentDesc:String
    dateCreated:String
    users:User
}

type User{
  _id:ID
  username:String
  password:String
  email:String
  isAdmin:Boolean
  orders:[Order]
  wishList:[Product]
}

type Checkout {
    session: ID
}

type Auth {
  token: ID
  user: User
}
input ProductInput {
    name: String!
    description: String!
    image: String 
    price:Float!     
    quantity:Int!
    subcategory:ID  
  }
type Query {
    categories: [Category]
    subcategories(category: ID!): [SubCategory]
    products(subcategory: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
}

type Mutation {
    addCategory(name:String!):Category
    addSubCategory(name:String!,category:ID!):SubCategory
    addProduct(productDetails:ProductInput):Product
    addComment(rating:Int!,commentDesc:String):Product
    addUser(username: String!,email: String!,password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(username: String,email: String,password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
