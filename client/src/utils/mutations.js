import { gql } from "@apollo/client";

// Mutation to add a new category
export const ADD_CATEGORY = gql`
  mutation addCategory($name: String!) {
    addCategory(name: $name) {
      _id
    }
  }
`;

// Mutation to add a new subcategory
export const ADD_SUBCATEGORY = gql`
  mutation addSubCategory($name: String!, $category: [ID]) {
    addSubCategory(name: $name, category: $category) {
      _id
    }
  }
`;

// Mutation to add a new product
export const ADD_PRODUCT = gql`
  mutation addProduct($productDetails: ProductInput!) {
    addProduct(productDetails: $productDetails) {
      _id
    }
  }
`;

// Mutation to add a new comment
export const ADD_COMMENT = gql`
  mutation addComment($productId: ID!, $rating: Int!, $commentDesc: String) {
    addComment(
      productId: $productId
      rating: $rating
      commentDesc: $commentDesc
    ) {   
      comments {
        _id
        rating
        commentDesc        
        dateCreated
        userName        
      }  
      _id
      name
      description
      features
      image
      quantity
      price
      subcategory {
        _id
        
        
      }
      
    }
  }
`;

// Mutation to add a new user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        email
        isAdmin
        username
      }
    }
  }
`;

// Mutation to add a new order
export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        features
        image
        price
        quantity
        subcategory {
          _id
          name
          category {
            _id
            name
          }
        }
      }
      totalPrice
    }
  }
`;

// Mutation to update a category
export const UPDATE_CATEGORY = gql`
  mutation updateCategory($name: String!) {
    updateCategory(name: $name) {
      _id
    }
  }
`;

// Mutation to update a subcategory
export const UPDATE_SUBCATEGORY = gql`
  mutation updateSubCategory($name: String!) {
    updateSubCategory(name: $name) {
      _id
    }
  }
`;

// Mutation to update a user
export const UPDATE_USER = gql`
  mutation updateUser(
    $username: String!
    $email: String!
    $password: String!
    $isAdmin: Boolean
  ) {
    updateUser(
      username: $username
      email: $email
      password: $password
      isAdmin: $isAdmin
    ) {
      token
      user {
        _id
      }
    }
  }
`;

// Mutation to update a product
export const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: [ID]!, $quantity: Int!) {
    updateProduct(id: $id, quantity: $quantity) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

// Mutation for user login
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;
// Mutation to add to  wishlist
export const ADD_WISHLIST = gql`
  mutation AddWishList($products: [ID]!) {
    addWishList(products: $products) {
      username
      wishList {
        name
        _id
      }
    }
  }
`;
// mutation to remove comment
export const REMOVE_COMMENT = gql`
  mutation removeComment($productId: ID!, $commentId: ID!) {
    removeComment(productId: $productId, commentId: $commentId) {
    _id
    comments {
      _id
      commentDesc
      dateCreated
      rating
      userName
    }
    description
    features
    image
    name
    price
    quantity
    subcategory {
      _id
      name
    }
  }
  }
`;

