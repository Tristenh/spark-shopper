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
  Link,
  Badge,
} from "@chakra-ui/react";

//import icons
import { HamburgerIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { BsSuitHeart, BsCart4 } from "react-icons/bs";

//import files
import Nav from "../Nav";
import CategoryMenu from "../CategoryMenu";

54;
import { useStoreContext } from "../../utils/GlobalState";
import { TOGGLE_CART } from "../../utils/actions";

export default function Header() {
  //check menu open or close
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, dispatch] = useStoreContext();
  //toggles the cart
  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }
  return (
    <>
      <Box
        bg={"back.900"}
        px={{ base: "30", md: "20", xl: "20", "2xl": "40" }}
        size={"md"}
      >
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
              <Box >
                <Link to={"/"}>
                  {" "}
                  <Image href="/" src={"./images/logo.jpg"} />
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
                  w={{ base: "300px", "2xl": "500px" }}
                  my={5}
                >
                  <InputLeftElement pointerEvents="none" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    border="2px solid #949494"
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
              </HStack>
            </HStack>
          </Flex>
          <Flex ml={"4"} w={{base:"none", xl: "20%" }} display={{base:"none",xl:"flex"}}>
            <Text fontSize={"2xl"} color={"orange"}>
              Welcome to spark shopper!
            </Text>
          </Flex>
          <Flex w={{ xl: "40%" }} justifyContent={"center"}>
            <HStack spacing={12} display={{ base: "none", xl: "flex" }}>
              {/* category menu component */}
              <CategoryMenu />
            </HStack>

            <HStack spacing={12} display={{ base: "none", xl: "flex" }}>
              <HStack spacing={12} display={{ base: "none", xl: "flex" }}>
                {/* wishlist button */}
                <Button variant="ghost" _hover={{ bg: "gray.400" }}>
                  <Box
                    display={"inline-block"}
                    verticalAlign={"middle"}
                    align="center"
                    color={"white"}
                    _hover={{ color: "black" }}
                  >
                    <BsSuitHeart /> <Text fontSize={"1.25rem"}>Wishlist</Text>
                  </Box>
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
                      >
                        4
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
                >
                  <BsCart4 />
                  <Text fontSize={"1xl"}>
                    Cart{" "}
                    <Badge
                      boxSize="1.25em"
                      bgGradient="linear(to-r, orange.300, yellow.400)"
                    >
                      4
                    </Badge>
                  </Text>
                </Box>
              </Button>
              <Nav />
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
