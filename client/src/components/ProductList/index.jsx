import { useEffect } from "react";
//importing CHAKRA UI components
import {
  Grid,
  Spinner,
  Heading,
  Flex,
  VStack,
  Divider,
  Center,
} from "@chakra-ui/react";

import { useQuery } from "@apollo/client";

//Importing the required component for linking between pages
import ProductItem from "../ProductItem";

//importing actions,queries, GlobalState and helpers
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS, UPDATE_WISHLIST } from "../../utils/actions";
import { QUERY_PRODUCTS, QUERY_USER } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";

function ProductList() {
  let title = "";
  const [state, dispatch] = useStoreContext();
  const { currentSubCategory } = state;

  //Call the useQuery QUERY_PRODUCTS to get all the products
  const { loading: productLoading, data: productData } =
    useQuery(QUERY_PRODUCTS);
  //Call the useQuery QUERY_USER to get the wishlist of current user
  const { loading: userWishListLoading, data: userWishListData } = useQuery(
    QUERY_USER,
    { fetchPolicy: "network-only" }
  );

  useEffect(() => {
    //clears the wishlist in indexedDB
    idbPromise("wishList", "clear");
  }, []);
  useEffect(() => {
    if (userWishListData) {
      const wishListProducts = userWishListData.user.wishList;
      //dispatches the action UPDATE_WISHLIST to update the state with the users wishlist
      dispatch({
        type: UPDATE_WISHLIST,
        wishList: wishListProducts,
      });
      //updates the indexedDB with the users's wishlist
      userWishListData.user.wishList.forEach((wishListProducts) => {
        idbPromise("wishList", "put", wishListProducts);
      });
    }
  }, [userWishListLoading, userWishListData, dispatch]);
  useEffect(() => {
    //checks whether the products are not rendering from search results
    if (!state.search) {
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
        //gets the products from indexedDB and updates the state products
        idbPromise("products", "get").then((products) => {
          dispatch({
            type: UPDATE_PRODUCTS,
            products: products,
          });
        });
      }
    }
  }, [productData, productLoading, state.search, dispatch]);

  function filterProducts() {
    //return searched products based on search bar text
    if (state.search) {
      return state.searchedProducts;
    }
    //return all products
    if (!currentSubCategory) {
      return state.products;
    }

    //returns  products based on subcategory
    return state.products.filter(
      (product) => product.subcategory._id === currentSubCategory
    );
  }
  if (state.search) {
    title = "Search Results";
  } else if (state.subCategoryName != "") {
    title = state.subCategoryName;
  } else {
    title = " New Arrivals";
  }

  return (
    <Flex justify={"center"} mt={50}>
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
          <VStack>
            <Heading
              bgGradient="linear(to-r, orange.300, yellow.400)"
              bgClip="text"
            >
              {title}
            </Heading>
            <Divider
              borderColor="#51636C"
              mt={{ base: 12, md: 5 }}
              mb={{ base: 1, md: 5 }}
              width={"full"}
            />
            {filterProducts().length ? (
              <Grid
                templateRows={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                }}
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                }}
              >
                {/*Iterate through each product and renders the component ProductItem by passing values */}
                {filterProducts().map((product) => (
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
              <Center>
                <Heading fontSize={20}>No Results found</Heading>
              </Center>
            )}
          </VStack>
        </>
      ) : (
        <h3>No products loaded yet!</h3>
      )}
    </Flex>
  );
}

export default ProductList;
