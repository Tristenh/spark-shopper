import { useState, useEffect } from "react";
//importing CHAKRA UI components
import {
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  Box,
  Text,
  Button,
  Image,
  chakra,
  Center,
  Tooltip,
  IconButton,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { FaRegHeart } from "react-icons/fa";

import { useQuery } from "@apollo/client";
//Importing the required component for linking between pages
import pic from "../assets/drone.webp";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  // When the component mounts to the VDOM, run this callback to retrieve the information about all projects
  useEffect(() => {
    const products = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "f",
      "g",
      "h",
    ];
    setProducts(products);
  }, []);

  // Iterate over each  product to display its details
  return (
    <>
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
          {products.map((product, index) => (
            // individual grid item with card inside
            <GridItem
              key={index}
              p={{ base: 0, md: 1 }}
              pb={{ base: 1, md: 1 }}
            >
              <Card p={{ base: 0, md: 5 }} h={700}>
                <CardHeader>
                  <Link href={product.github}>
                    <Tooltip
                      label="Add to Wish list"
                      bg="white"
                      placement={"top"}
                      color={"gray.800"}
                      fontSize={"1.2em"}
                    >
                      <chakra.a href={"#"} display={"flex"}>
                        <IconButton
                          isRound={true}
                          variant="solid"
                          colorScheme="gray"
                          aria-label="Done"
                          fontSize="20px"
                          icon={<FaRegHeart />}
                          _hover={{
                            color: "red.600",
                            fontSize: { base: "20px", md: "24px" },
                          }}
                        />
                      </chakra.a>
                    </Tooltip>
                  </Link>
                </CardHeader>
                <CardBody>
                  <Center py={12}>
                    <Box
                      role={"group"}
                      p={6}
                      maxW={"330px"}
                      w={"full"}
                      bg={"white"}
                      boxShadow={"2xl"}
                      rounded={"lg"}
                      pos={"relative"}
                      zIndex={1}
                      h={500}
                    >
                      <Link href={product.href}>
                        <Box
                          rounded={"lg"}
                          mt={-20}
                          pos={"relative"}
                          height={"230px"}
                          _after={{
                            transition: "all .3s ease",
                            content: '""',
                            w: "full",
                            h: "full",
                            pos: "absolute",
                            top: 5,
                            left: 0,
                            backgroundImage: `url(${pic})`,
                            filter: "blur(15px)",
                            zIndex: -1,
                          }}
                          _groupHover={{
                            _after: {
                              filter: "blur(20px)",
                            },
                          }}
                        >
                          <Image
                            rounded={"lg"}
                            // height={230}
                            // width={282}
                            objectFit={"cover"}
                            src={`/images/${product.image}`}
                            alt="#"
                          />
                        </Box>
                        <Stack pt={10} align={"center"}>
                          <Text
                            fontSize={"md"}
                            pb={"10px"}
                            align={"center"}
                            fontWeight={700}
                          >
                            {product.name}
                          </Text>
                          <VStack pos={"absolute"} zIndex={-1} mt={"100px"}>
                            <Box
                              p={2}
                              bgGradient="linear(to-r, gray.300, orange.100, orange.100)"
                              align={"center"}
                              borderTopLeftRadius={40}
                              borderBottomRightRadius={40}
                              width="150px"
                              fontWeight={700}
                              mb={-2}
                              mt={4}
                            >
                              {`$${product.price}`}
                            </Box>
                            <Button
                              mt={10}
                              p={2}
                              colorScheme="black"
                              type="submit"
                              bgGradient={["linear(to-b, blue.700, gray.800)"]}
                              borderRadius="full"
                              // boxShadow={
                              //   "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                              // }
                              _hover={{
                                bg: "gray.700",
                              }}
                              width={{
                                base: "150px",
                                md: "200px",
                                lg: "250px",
                              }}
                              align={"center"}
                            >
                              Add To Cart
                            </Button>
                          </VStack>
                        </Stack>
                      </Link>
                    </Box>
                  </Center>
                </CardBody>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Home;
