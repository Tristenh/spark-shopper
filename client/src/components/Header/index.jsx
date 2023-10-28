// import components from chakra
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Text,
  Image,
  Badge,
  useToast,
  textDecoration,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//import icons
import { HamburgerIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { BsSuitHeart, BsCart4 } from "react-icons/bs";

//import files
import Nav from "../Nav";
import CategoryMenu from "../CategoryMenu";
import Auth from "../../utils/auth";

import { useStoreContext } from "../../utils/GlobalState";
import {
  TOGGLE_CART,
  SEARCH,
  CLEAR_SEARCH,
  UPDATE_SEARCHED_PRODUCTS,
  CLEAR_CURRENT_SUBCATEGORY,
  CURRENT_SUBCATEGORY_NAME,
} from "../../utils/actions";

import { QUERY_SEARCH } from "../../utils/queries";
import { useLazyQuery } from "@apollo/client";
import { idbPromise } from "../../utils/helpers";
export default function Header() {
  //check menu open or close
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, dispatch] = useStoreContext();
  //useState for searchTitle
  const [searchTitle, setSearchTitle] = useState("");
  const arr = [];
  let totalQuantity = 0;
  const toast = useToast();
  const position = ["top"];
  useEffect(() => {}, [searchTitle]);
  //toggles the cart
  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }
  // return total value of purchase quantity inside cart
  function addPurchaseQuantity(quantity) {
    arr.push(quantity);
    return arr.reduce((acc, val) => {
      return acc + val;
    }, 0);
  }

  const handleSearchInput = (e) => {
    const value = e.target.value;
    // set value of search bar text
    setSearchTitle(value);
  };

  const [Search, { loading }] = useLazyQuery(QUERY_SEARCH);
  //click event of search button
  const handleSearchBarClick = async () => {
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
          setSearchTitle("");
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
    }
  };
  //clears the state search and current subcategory while clicking on logo to go back to home
  const handleLogoClick = async () => {
    dispatch({
      type: CLEAR_SEARCH,
    });
    dispatch({ type: CLEAR_CURRENT_SUBCATEGORY });
    dispatch({ type: CURRENT_SUBCATEGORY_NAME, currentSubCategoryName: "" });
  };
  return (
    <>
      <Box bg={"back.900"} px={{ base: "30", md: "20", xl: "20" }} size={"md"}>
        {/* icon button to show menu on small screen */}
        <Flex
          h={"auto"}
          alignItems={"center"}
          justifyContent={{ base: "flex-start", lg: "center" }}
        >
          <IconButton
            _hover={{ bg: "gray.400" }}
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ xl: "none" }}
            onClick={isOpen ? onClose : onOpen}
            mr={10}
          />
          <Flex w={{ xl: "40%" }}>
            <HStack spacing={12} alignItems={"center"}>
              {/* logo */}
              <Box onClick={handleLogoClick}>
                <Link to={"/"}>
                  {" "}
                  <Image src={"/images/logo.jpg"} />
                </Link>
              </Box>

              <HStack
                as={"nav"}
                spacing={6}
                display={{ base: "none", xl: "flex" }}
              >
                {/* search bar */}
                <InputGroup
                  borderRadius={5}
                  size={"md"}
                  w={{ base: "300px", "2xl": "400px" }}
                  my={5}
                >
                  <InputLeftElement pointerEvents="none" />
                  <Input
                    value={searchTitle}
                    type="text"
                    placeholder="Search..."
                    border="2px solid #949494"
                    onChange={handleSearchInput}
                    color={"white"}
                  />
                  <InputRightAddon p={0} border="none">
                    <Link to={"/search"}>
                      <Button
                        size="md"
                        borderLeftRadius={0}
                        borderRightRadius={5}
                        border="2px solid #949494"
                        bgGradient="linear(to-r, orange.300, yellow.400)"
                        _hover={{ bg: "gray.500" }}
                        onClick={handleSearchBarClick}
                      >
                        <SearchIcon />
                      </Button>
                    </Link>
                  </InputRightAddon>
                </InputGroup>
              </HStack>
            </HStack>
          </Flex>
          <Flex
            ml={"4"}
            w={{ base: "none", xl: "10%" }}
            display={{ base: "none", xl: "flex" }}
          >
            <Text fontSize={"2xl"} color={"orange"} className="blink">
              Welcome !
            </Text>
          </Flex>
          <Flex w={{ xl: "50%" }} justifyContent={"center"}>
            <HStack spacing={12} display={{ base: "none", xl: "flex" }}>
              {/* category menu component */}
              <CategoryMenu />
            </HStack>

            <HStack spacing={12} display={{ base: "none", xl: "flex" }}>
              <HStack spacing={12} display={{ base: "none", xl: "flex" }}>
                {/* wishlist button */}
                {/* if not logged in then toasts message on screen */}
                <Button variant="ghost" _hover={{ bg: "gray.400" }}>
                  {Auth.loggedIn() ? (
                    <Box
                      display={"inline-block"}
                      verticalAlign={"middle"}
                      align="center"
                      color={"white"}
                      _hover={{ color: "black" }}
                    >
                      <BsSuitHeart />
                      <Link to="/profile">
                        {" "}
                        <Text fontSize={"1.25rem"}>Wishlist</Text>
                      </Link>
                    </Box>
                  ) : (
                    <Box
                      display={"inline-block"}
                      verticalAlign={"middle"}
                      align="center"
                      color={"white"}
                      _hover={{ color: "black" }}
                      // to display message
                      onClick={() =>
                        toast({
                          title: "Create an Account",
                          description: "You need to login to access wishlist",
                          status: "warning",
                          duration: 9000,
                          position: position,
                          isClosable: true,
                        })
                      }
                    >
                      <BsSuitHeart /> <Text fontSize={"1.25rem"}>Wishlist</Text>
                    </Box>
                  )}
                </Button>
                {/* cart button */}
                <Button
                  variant="ghost"
                  display={"inline-block"}
                  verticalAlign={"middle"}
                  _hover={{ bg: "gray.400" }}
                  onClick={toggleCart}
                >
                  <Box
                    display={"inline-block"}
                    verticalAlign={"middle"}
                    align="center"
                    color={"white"}
                    _hover={{ color: "black" }}
                  >
                    <BsCart4 />
                    <Text fontSize={"1.25rem"}>
                      Cart{" "}
                      <Badge
                        boxSize="1.25em"
                        bgGradient="linear(to-r, orange.300, yellow.400)"
                        p={0}
                        fontSize={".7rem"}
                      >
                        {" "}
                        {state.cart.map((item) => {
                          totalQuantity = addPurchaseQuantity(
                            item.purchaseQuantity
                          );
                        })}
                        {totalQuantity}
                      </Badge>
                    </Text>
                  </Box>
                </Button>
              </HStack>
              <HStack spacing={12} display={{ base: "none", xl: "flex" }}>
                <Nav />
              </HStack>
            </HStack>
          </Flex>
        </Flex>
        {/* when icon button is open then display all nav links  */}
        {isOpen ? (
          <Box pb={4} display={{ xl: "none" }}>
            <Stack
              as={"nav"}
              spacing={4}
              align="center"
              justify={{ base: "center", md: "space-between" }}
            >
              {/* search bar */}
              <InputGroup borderRadius={5} size="md">
                <InputLeftElement
                  pointerEvents="none"
                  // children={<Search2Icon color="gray.600" />}
                />
                <Input
                  type="text"
                  placeholder="Search..."
                  border="1px solid #949494"
                />
                <InputRightAddon p={0} border="none">
                  <Button
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
              {/* category menu */}
              <CategoryMenu />
              {/* wishlist button */}
              <Button
                variant="ghost"
                display={"inline-block"}
                verticalAlign={"middle"}
                _hover={{ bg: "gray.400" }}
              >
                <Box
                  display={"inline-block"}
                  verticalAlign={"middle"}
                  align="center"
                  color={"white"}
                  _hover={{ color: "black" }}
                >
                  <BsSuitHeart /> <Text fontSize={"1xl"}>Wishlist</Text>
                </Box>
              </Button>
              {/* cart button */}
              <Button
                variant="ghost"
                display={"inline-block"}
                verticalAlign={"middle"}
                _hover={{ bg: "gray.400" }}
              >
                <Box
                  display={"inline-block"}
                  verticalAlign={"middle"}
                  align="center"
                  color={"white"}
                  _hover={{ color: "black" }}
                  onClick={toggleCart}
                >
                  <BsCart4 />
                  <Text fontSize={"1xl"}>
                    Cart{" "}
                    <Badge
                      boxSize="1.25em"
                      bgGradient="linear(to-r, orange.300, yellow.400)"
                    >
                      {totalQuantity}
                    </Badge>
                  </Text>
                </Box>
              </Button>
              <Nav inside={true} />
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
