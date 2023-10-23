import { useEffect } from "react";
//importing CHAKRA UI components
import { Grid, Box, Spinner } from "@chakra-ui/react";

import { useQuery } from "@apollo/client";

//Importing the required component for linking between pages
import ProductItem from "../ProductItem";

//importing actions,queries, GlobalState and helpers
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS, ADD_MULTIPLE_TO_WISHLIST } from "../../utils/actions";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";

function ProductList() {
  const [state, dispatch] = useStoreContext();
  const { currentSubCategory } = state;
  //Call the useQuery QUERY_PRODUCTS to get all the products
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  useEffect(() => {
    if (data) {
      //dispatches the action UPDATE_PRODUCTS to update the state with new products
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      //update indexedDB with new products
      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      idbPromise("products", "get").then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
    async function getWishList() {
      const wishList = await idbPromise("wishList", "get");
      dispatch({ type: ADD_MULTIPLE_TO_WISHLIST, products: [...wishList] });
      console.log(wishList);
    }

    if (!state.wishList.length) {
      getWishList();
    }
  }, [state.wishList.length, data, loading, dispatch]);

  //return all products
  function filterProducts() {
    if (!currentSubCategory) {
      return state.products;
    }
    //returns  products based on subcategory
    return state.products.filter(
      (product) => product.subcategory._id === currentSubCategory
    );
  }
  return (
    <Box p={{ base: 10, md: 20, lg: "150px" }}>
      {loading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="#94948C"
          size="xl"
        />
      ) : null}
      {state.products.length ? (
        <Grid
          templateRows={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(2, 1fr)",
          }}
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
        >
          {/*Iterate through each product and renders the component ProductItem by passing values */}
          {filterProducts().map((product, index) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </Grid>
      ) : (
        <h3>No products loaded yet!</h3>
      )}
    </Box>
  );
}

export default ProductList;
