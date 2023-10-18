//type definitions for `Category`, `Product`, `Order` and `User` above the `Auth` type
const typeDefs = `
 
type Category{
  _id:ID!
  name:String!
}

type Product{
  _id:ID!
  name:String!
  description:String
  image:String
  price:Float
  quantity:Int
  category:Category
  comments:Comment
}

type Order{
  _id:ID!
  purchaseDate:String!
  products:[OrderedProducts]
  totalPrice:Float
}

type OrderedProducts{
    product:Product
    quantity:Int
}

type Comment{
    _id:ID!
    rating:Int
    commentDesc:String
    dateCreated:String
    users:User
}

type User{
  _id:ID!
  username:String
  password:String
  email:String
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

type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
}

type Mutation {
    addCategory(name:String!):Category
    addProduct(name:String!,description:String!,image:String,price:Float!,quantity:Int!,category:ID!):Product
    addComment(rating:Int,commentDesc:String):Product
    addUser(username: String!,email: String!,password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(username: String,email: String,password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
