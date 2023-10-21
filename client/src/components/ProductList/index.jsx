import { useEffect } from "react";
//importing CHAKRA UI components
import { Grid, Box } from "@chakra-ui/react";

import { useQuery } from "@apollo/client";
//Importing the required component for linking between pages

import ProductItem from "../ProductItem";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";

import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
function ProductList() {
  const [state, dispatch] = useStoreContext();
  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);
  useEffect(() => {
    if (data) {
      console.log(data);
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      console.log(data);
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
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  // When the component mounts to the VDOM, run this callback to retrieve the information about all projects
  // useEffect(() => {
  //   const products = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "f", "g", "h"];
  //   setProducts(products);
  // }, []);

  // Iterate over each  product to display its details
  return (
    <Box p={{ base: 10, md: 20, lg: "150px" }}>
      <Grid
        templateRows={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
      >
        {filterProducts().map((product, index) => (
          // individual grid item with card inside
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
    </Box>
  );
}

export default ProductList;
