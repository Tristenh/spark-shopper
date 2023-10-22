import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,  
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
  Badge,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { BsSuitHeart, BsCart4 } from "react-icons/bs";

import Nav from "../Nav";
import CategoryMenu from "../CategoryMenu";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        bg={useColorModeValue("back.700", "back.900")}
        px={{ base: "30", md: "20" }}
        size={"md"}
      >
        <Flex h={"auto"} alignItems={"center"} justifyContent={"flex-start"} w={"100%"}>
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
                <Image href="/" src={"../../src/assets/images/logo.jpg"} />
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
                my={5}
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
            <HStack spacing={12} display={{ base: "none", lg: "flex" }}>
              <CategoryMenu />
            </HStack>

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
              <CategoryMenu />
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

              
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
