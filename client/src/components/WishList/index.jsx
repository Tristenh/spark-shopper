import { useEffect } from "react";
//importing CHAKRA UI components
import { Grid, Spinner, Heading, Flex, VStack } from "@chakra-ui/react";

import { useQuery } from "@apollo/client";

//Importing the required component for linking between pages
import ProductItem from "../ProductItem";

//importing actions,queries, GlobalState and helpers
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_WISHLIST } from "../../utils/actions";
import { QUERY_USER } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";

function WishList() {
  const [state, dispatch] = useStoreContext();

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

  return (
    <Flex>
      {userWishListLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="#94948C"
          size="xl"
        />
      ) : null}
      {state.wishList.length ? (
        <>
          <VStack>
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
              {state.wishList.map((product) => (
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
          </VStack>
        </>
      ) : (
        <Heading>No Products !</Heading>
      )}
    </Flex>
  );
}

export default WishList;
