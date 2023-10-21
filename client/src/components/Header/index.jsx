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
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { BsSuitHeart, BsCart4 } from "react-icons/bs";
import Nav from "../Nav";

const Links = ["TV", "Home Appliances", "Laptop"];

export default function WithAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        bg={useColorModeValue("back.700", "back.900")}
        px={{ base: "30", md: "20" }}
      >
        <Flex h={"auto"} alignItems={"center"} justifyContent={"flex-start"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ lg: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={12} alignItems={"center"}>
            <Box ml={20}>
              <img src={"../../src/assets/images/logo.jpg"} />
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", lg: "flex" }}
            >
              <InputGroup borderRadius={5} size="lg" w={{ base: "600px" }}>
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
                    size="lg"
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
            <HStack spacing={12} display={{ base: "none", lg: "flex" }}>
              <Flex alignItems={"center"}>
                <Menu>
                  {({ isOpen }) => (
                    <>
                      <MenuButton
                        isActive={isOpen}
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                      >
                        {isOpen ? "Close" : "Categories"}
                      </MenuButton>
                      <MenuList>
                        {Links.map((link, i) => (
                          <MenuItem
                            as="a"
                            key={i}
                            px={2}
                            py={1}
                            rounded={"md"}
                            _hover={{
                              textDecoration: "none",
                            }}
                            href={"#"}
                          >
                            {link}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </>
                  )}
                </Menu>
              </Flex>
            </HStack>
            <HStack spacing={12} display={{ base: "none", lg: "flex" }}>
              <Nav />
              <HStack spacing={12} display={{ base: "none", lg: "flex" }}>
                <Button variant="ghost">
                  <BsSuitHeart />{" "}
                  <Text fontSize={"1xl"} ml={2}>
                    Wishlist
                  </Text>
                </Button>
                <Button variant="ghost">
                  <BsCart4 />{" "}
                  <Text fontSize={"1xl"} ml={2}>
                    Cart
                  </Text>
                </Button>
              </HStack>
            </HStack>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
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
                <InputRightAddon p={0} border="none" mr={20}>
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
                        {isOpen ? "Close" : "Categories"}
                      </MenuButton>
                      <MenuList>
                        {Links.map((link, i) => (
                          <MenuItem
                            as="a"
                            key={i}
                            px={2}
                            py={1}
                            rounded={"md"}
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

              <Nav />
              <Flex alignItems={"center"}>
              <Button variant="ghost">
                  <BsSuitHeart />{" "}
                  <Text fontSize={"1xl"} ml={2}>
                    Wishlist
                  </Text>
                </Button>
                <Button variant="ghost">
                  <BsCart4 />{" "}
                  <Text fontSize={"1xl"} ml={2}>
                    Cart
                  </Text>
                </Button>
              </Flex>
             
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
