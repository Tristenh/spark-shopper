// import components from chakra
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
} from "@chakra-ui/react";
//import queries, helpers , global state , actions and useLazyQuery
import { QUERY_SEARCH } from "../../utils/queries";
import { useLazyQuery } from "@apollo/client";
import { idbPromise } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { SEARCH, UPDATE_SEARCHED_PRODUCTS } from "../../utils/actions";
import { useState } from "react";
import { useStoreContext } from "../../utils/GlobalState";
//import icons
import { SearchIcon } from "@chakra-ui/icons";
function SearchBar() {
  //useState for searchTitle
  const [searchTitle, setSearchTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [state, dispatch] = useStoreContext();

  const handleSearchInput = (e) => {
    const value = e.target.value;
    // set value of search bar text
    if (value === "camera") {
      setSearchTitle("cameras");
      return;
    }
    if (value === "mobiles") {
      setSearchTitle("mobile");
      return;
    }
    if (value === "tv") {
      setSearchTitle("tvs");
      return;
    }
    setSearchTitle(value);
  };
  const navigate = useNavigate();
  const [Search, { loading }] = useLazyQuery(QUERY_SEARCH);
  
  //click event of search button
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (searchTitle) {
        Search({
          variables: { name: searchTitle },
        }).then((products) => {
          if (products) {
            //dispatches the action UPDATE_SEARCHED_PRODUCTS to update the state searchedProducts with the searched Products
            dispatch({
              type: UPDATE_SEARCHED_PRODUCTS,
              products: products.data.search,
            });
            //update indexedDB with new products
            products.data.search.forEach((product) => {
              idbPromise("products", "put", product);
            });
            //dispatches the action SEARCH to set the state for search as true
            dispatch({
              type: SEARCH,
            });
            //sets the title and error message empty after search
            setSearchTitle("");
            setErrorMessage("");
          } else if (!loading) {
            //gets the products from indexedDB and updates the state searchedProducts
            idbPromise("products", "get").then((products) => {
              dispatch({
                type: UPDATE_SEARCHED_PRODUCTS,
                products: products,
              });
            });
          }
        });
        //navigate to search page on successful search
        navigate("/search");
      } else {
        {
          setErrorMessage("Please enter a product or brand  ");
        }
      }
    } catch (error) {
      setErrorMessage("Incorrect email or password ");
    }
  };
  return (
    <form
      onSubmit={(e) => {
        handleFormSubmit(e);
      }}
    >
      <InputGroup
        borderRadius={5}
        size={"md"}
        w={{ base: "300px", "2xl": "400px" }}
        my={5}
      >
        <InputLeftElement pointerEvents="none" />
        {/*If the title ie empty then show the error message in placeholder */}
        {errorMessage ? (
          <Input
            value={searchTitle}
            type="text"
            placeholder={errorMessage}
            border="2px solid #949494"
            onChange={handleSearchInput}
            color={"white"}
            _hover={{
              borderColor: "#C8C3C3",
            }}
            _focusVisible={{
              borderColor: "#C8C3C3",
            }}
          />
        ) : (
          <Input
            value={searchTitle}
            type="text"
            placeholder="Search..."
            border="2px solid #949494"
            onChange={handleSearchInput}
            color={"white"}
            _hover={{
              borderColor: "#C8C3C3",
            }}
            _focusVisible={{
              borderColor: "#C8C3C3",
            }}
          />
        )}
        <InputRightAddon p={0} border="none">
          <Button
            type="submit"
            size="md"
            borderLeftRadius={0}
            borderRightRadius={5}
            border="2px solid #949494"
            bgGradient="linear(to-r, orange.300, yellow.400)"
            _hover={{ bg: "gray.500" }}
          >
            <SearchIcon />
          </Button>
        </InputRightAddon>
      </InputGroup>
    </form>
  );
}
export default SearchBar;
