import React, { useEffect } from 'react';

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Text,
  Image,
  Link,
  Avatar,
  Badge,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { BsSuitHeart, BsCart4 } from "react-icons/bs";
// import { QUERY_CATEGORIES } from '../../utils/queries';
// import { useStoreContext } from '../../utils/GlobalState';
// import { useQuery } from '@apollo/client';


import Nav from "../Nav";
import CategoryMenu from "../CategoryMenu"
const Links = ["TV", "Home Appliances", "Laptop"];
// import {
//   UPDATE_CATEGORIES,
//   // UPDATE_CURRENT_CATEGORY,
// } from '../../utils/actions';
export default function WithAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [state, dispatch] = useStoreContext();
  // const { categories } = state;
  // const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
 
  // useEffect(() => {
  //   if (categoryData) {
  //     dispatch({
  //       type: UPDATE_CATEGORIES,
  //       categories: categoryData.categories,
  //     });
  //     console.log(categoryData,"category data")
  //     // categoryData.categories.forEach((category) => {
  //     //   // idbPromise('categories', 'put', category);
  //     // });
  //   } else if (!loading) {
  //     // idbPromise('categories', 'get').then((categories) => {
  //     console.log(categories,"categories not loading")

  //       dispatch({
  //         type: UPDATE_CATEGORIES,
  //         categories: categories,
  //       });
  //     // });
  //   }
  // }, [categoryData, loading, dispatch]);
  // console.log(categoryData,categories)

  return (
    <>
      <Box
        bg={useColorModeValue("back.700", "back.900")}
        px={{ base: "30", md: "10" }}
        size={"md"}
      >
        <Flex h={"auto"} alignItems={"center"} justifyContent={"flex-start"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ lg: "none" }}
            onClick={isOpen ? onClose : onOpen}
            mr={10}
          />
          <HStack spacing={12} alignItems={"center"}>
            <Box>
              <Link to={"/login"}>
                {" "}
                <Image
                  href="/portfolio"
                  src={"../../src/assets/images/logo.jpg"}
                />
              </Link>
            </Box>

            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", lg: "flex" }}
            >
              <InputGroup
                borderRadius={5}
                size="md"
                w={{ base: "500px" }}
                my={3}
              >
                <InputLeftElement
                  pointerEvents="none"
                  // children={<Search2Icon color="gray.600" />}
                />
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
                  >
                    <SearchIcon />
                  </Button>
                </InputRightAddon>
              </InputGroup>
            </HStack>
            <CategoryMenu/>
          
            <HStack spacing={12} display={{ base: "none", lg: "flex" }}>
              <HStack spacing={12} display={{ base: "none", lg: "flex" }}>
                <Button variant="ghost">
                  <Box
                    display={"inline-block"}
                    verticalAlign={"middle"}
                    align="center"
                  >
                    <BsSuitHeart /> <Text fontSize={"1xl"}>Wishlist</Text>
                  </Box>
                </Button>
                <Button
                  variant="ghost"
                  display={"inline-block"}
                  verticalAlign={"middle"}
                >
                  <Box
                    display={"inline-block"}
                    verticalAlign={"middle"}
                    align="center"
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
              </HStack>
              <HStack spacing={12} display={{ base: "none", lg: "flex" }}>
                <Nav />

                <Button
                  variant="ghost"
                  cursor={"pointer"}
                  minW={0}
                  display={"inline-block"}
                  verticalAlign={"middle"}
                >
                  <Avatar size={"xs"} />

                  <Text ml={2}> Profile</Text>
                </Button>
              </HStack>
            </HStack>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ lg: "none" }}>
            <Stack
              as={"nav"}
              spacing={4}
              align="center"
              justify={{ base: "center", md: "space-between" }}
            >
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
                  >
                    <SearchIcon />
                  </Button>
                </InputRightAddon>
              </InputGroup>
              <Flex alignItems={"center"}>
                <Menu>
                  {({ isOpen }) => (
                    <>
                      <MenuButton
                        isActive={isOpen}
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                      >
                        {isOpen ? "Products" : "Products"}
                      </MenuButton>
                      <MenuList bg={"back.900"}>
                        {Links.map((link, i) => (
                          <MenuItem
                            as="a"
                            key={i}
                            px={2}
                            py={1}
                            rounded={"md"}
                            bg={"back.900"}
                            _hover={{
                              textDecoration: "none",
                            }}
                            href={"#"}
                            onClick={() => alert("Kagebunshin")}
                          >
                            {link}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </>
                  )}
                </Menu>
              </Flex>

             
                <Button
                  variant="ghost"
                  display={"inline-block"}
                  verticalAlign={"middle"}
                >
                  <Box
                    display={"inline-block"}
                    verticalAlign={"middle"}
                    align="center"
                  >
                    <BsSuitHeart /> <Text fontSize={"1xl"}>Wishlist</Text>
                  </Box>
                </Button>
                <Button
                  variant="ghost"
                  display={"inline-block"}
                  verticalAlign={"middle"}
                >
                  <Box
                    display={"inline-block"}
                    verticalAlign={"middle"}
                    align="center"
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

                <Button
                  variant="ghost"
                  cursor={"pointer"}
                  minW={0}
                  display={"inline-block"}
                  verticalAlign={"middle"}
                >
                  <Avatar size={"xs"} />

                  <Text ml={2}> Profile</Text>
                </Button>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
