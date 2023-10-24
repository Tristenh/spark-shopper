import { useEffect } from "react";
//importing CHAKRA UI components
import { Grid, Box, Spinner, Heading } from "@chakra-ui/react";

import { useQuery } from "@apollo/client";

//Importing the required component for linking between pages
import ProductItem from "../ProductItem";

//importing actions,queries, GlobalState and helpers
import { useStoreContext } from "../../utils/GlobalState";
import {
  UPDATE_PRODUCTS,
  ADD_MULTIPLE_TO_WISHLIST,
  UPDATE_WISHLIST,
} from "../../utils/actions";
import { QUERY_PRODUCTS, QUERY_USER } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";

function ProductList() {
  const [state, dispatch] = useStoreContext();
  const { currentSubCategory } = state;
  //Call the useQuery QUERY_PRODUCTS to get all the products
  const { loading: productLoading, data: productData } =
    useQuery(QUERY_PRODUCTS);
  const { loading: userWishListLoading, data: userWishListData } =
    useQuery(QUERY_USER);
  useEffect(() => {
    console.log("loading wishlist");

    console.log(userWishListData);
    if (userWishListData) {
      console.log("data from database");
      console.log(userWishListData);
      const wishListProducts = userWishListData.user.wishList;
      //dispatches the action UPDATE_WISHLIST to update the state with new products
      // dispatch({
      //   type: UPDATE_WISHLIST,
      //   wishList: wishListProducts,
      // });
      //update indexedDB with new products
      userWishListData.user.wishList.forEach((product) => {
        idbPromise("wishList", "put", product);
      });
    } else if (!userWishListLoading) {
      idbPromise("wishList", "get").then((wishListProducts) => {
        // dispatch({
        //   type: UPDATE_WISHLIST,
        //   wishList: wishListProducts,
        // });
      });
    }
  }, [userWishListLoading, userWishListData]);
  useEffect(() => {
    if (productData) {
      //dispatches the action UPDATE_PRODUCTS to update the state with new products
      dispatch({
        type: UPDATE_PRODUCTS,
        products: productData.products,
      });
      //update indexedDB with new products
      productData.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!productLoading) {
      idbPromise("products", "get").then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
    // if (userWishListData) {
    //   console.log("data from database");
    //   console.log(userWishListData);
    //   const wishListProducts = userWishListData.user.wishList;
    //   //dispatches the action UPDATE_WISHLIST to update the state with new products
    //   dispatch({
    //     type: UPDATE_WISHLIST,
    //     wishList: wishListProducts,
    //   });
    //   //update indexedDB with new products
    //   userWishListData.user.wishList.forEach((product) => {
    //     idbPromise("wishList", "put", product);
    //   });
    // } else if (!userWishListLoading) {
    //   idbPromise("wishList", "get").then((wishListProducts) => {
    //     dispatch({
    //       type: UPDATE_WISHLIST,
    //       wishList: wishListProducts,
    //     });
    //   });
    // }
    async function getWishList() {
      const wishList = await idbPromise("wishList", "get");
      dispatch({ type: ADD_MULTIPLE_TO_WISHLIST, wishList: [...wishList] });
      console.log("Indexed Db Data");
      console.log(wishList);
    }

    if (!state.wishList.length) {
      getWishList();
    }
  }, [
    state.wishList.length,
    userWishListData,
    productData,
    userWishListLoading,
    productLoading,
    dispatch,
  ]);
  // console.log("wishlist length");
  // console.log(state.wishList.length);
  console.log("wishlist state inside product list");
  console.log(state.wishList);
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
      {productLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="#94948C"
          size="xl"
        />
      ) : null}
      {state.products.length ? (
        <>
          <Heading>New Arrivals</Heading>
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
        </>
      ) : (
        <h3>No products loaded yet!</h3>
      )}
    </Box>
  );
}

export default ProductList;
