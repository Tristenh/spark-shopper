import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  {
    user {
      username
      email
      isAdmin
      orders {
        _id
        purchaseDate
        totalPrice
        products {
          _id
          name
          description
          image
          price
          quantity
          subcategory {
            name
          }
          comments {
            _id
            rating
            commentDesc
            dateCreated
          }
        }
      }
      wishList {
        products {
          _id
          name
          description
          image
          price
          quantity
          subcategory {
            name
          }
        }
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_SUBCATEGORIES = gql`
  {
    subcategories {
      _id
      name
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      image
      price
      quantity
      subcategory {
        _id
      }
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      image
      price
      quantity
      subcategory {
        name
      }
      comments {
        _id
        rating
        commentDesc
        dateCreated
      }
    }
  }
`;

export const QUERY_ORDER = gql`
  query getCheckout($products: [ID]!) {
    order(products: $products) {
      session
    }
  }
`;
