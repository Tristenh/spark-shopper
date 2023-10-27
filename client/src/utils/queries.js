import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query getUser {
    user {
      username
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
  query getSubCategories($category: ID!) {
    subcategories(category: $category) {
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
      features
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
  query getProducts($subcategory: ID) {
    products(subcategory: $subcategory) {
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

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;
