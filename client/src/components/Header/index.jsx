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
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

//import icons
import { HamburgerIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { BsSuitHeart, BsCart4 } from "react-icons/bs";

//import files
import Nav from "../Nav";
import CategoryMenu from "../CategoryMenu";
import Auth from "../../utils/auth";
import SearchBar from "../SearchBar";
import { useStoreContext } from "../../utils/GlobalState";
import {
  TOGGLE_CART,
  CLEAR_SEARCH,
  CLEAR_CURRENT_SUBCATEGORY,
  CURRENT_SUBCATEGORY_NAME,
} from "../../utils/actions";

export default function Header() {
  //check menu open or close
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, dispatch] = useStoreContext();

  const arr = [];
  let totalQuantity = 0;
  const toast = useToast();
  const position = ["top"];

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

  //clears the state search , current subcategory id and name while clicking on logo to go back to home
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
          <Flex w={{ xl: "40%" }} justifyContent={"center"}>
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
                <SearchBar />
              </HStack>
            </HStack>
          </Flex>
          <Flex
            ml={"4"}
            w={{ base: "none", xl: "10%" }}
            display={{ base: "none", xl: "flex" }}
          >
            <Text
              fontSize={"2xl"}
              className="blink"
              bgGradient="linear(to-r, orange.300, yellow.400)"
              bgClip="text"
            ></Text>
          </Flex>
          <Flex w={{ xl: "50%" }} justifyContent={"center"} px={0}>
            <HStack spacing={8} display={{ base: "none", xl: "flex" }} mr={8}>
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
                        bgGradient="linear(to-r, orange.300, yellow.400)"
                       
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
                  <Text fontSize={"1.25rem"}>
                    Cart{" "}
                    <Badge
                    
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
