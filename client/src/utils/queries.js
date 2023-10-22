import { gql } from "@apollo/client";

export const QUERY_PRODUCTS = gql`
  query getProducts($subcategory: ID) {
    products(subcategory: $subcategory) {
      _id
      name
      description
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
export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;
