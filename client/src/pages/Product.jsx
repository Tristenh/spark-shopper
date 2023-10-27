import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  StackDivider,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
} from "@chakra-ui/react";

import { MdLocalShipping } from "react-icons/md";
import { StarIcon, MinusIcon, AddIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Spinner } from "@chakra-ui/react";

import Features from "../components/UI/Features";
import Cart from "../components/Cart";
import { useStoreContext } from "../utils/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from "../utils/actions";
import { QUERY_PRODUCTS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import Rating from "../components/Rating";

function Product() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;
  const [rating, setRating] = useState(0);
  const descriptionColor = useColorModeValue("gray.500", "gray.400");
  const dividerColor = useColorModeValue("gray.200", "gray.600");
  const headerColor = useColorModeValue("yellow.500", "yellow.300");

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise("products", "get").then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    idbPromise("cart", "delete", { ...currentProduct });
  };

  return (
    <>
      {currentProduct && cart ? (
        <Container maxW={"8xl"}>
          <Link to="/">← Back to Products</Link>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}
          >
            <Flex>
               <Image
                rounded={"md"}
                alt={"product image"}
                border={"2px solid"}
                borderColor={"gray.100"}
                boxShadow={"2xl"}
                src={`/images/${currentProduct.image}`}
                objectFit={"contain "}
                overflow={"hidden"}
                align={"center"}
                w={"100%"}
                py={4}
                h={{ base: "auto", sm: "400px", lg: "500px" }}
              />
           
              <VStack> <Accordion color={"black"}>
              <Image
                rounded={"md"}
                alt={"product image"}
                border={"2px solid"}
                borderColor={"gray.100"}
                boxShadow={"2xl"}
                src={`/images/${currentProduct.image}`}
                objectFit={"contain "}
                overflow={"hidden"}
                align={"center"}
                w={"100%"}
                py={4}
                h={{ base: "auto", sm: "400px", lg: "500px" }}
              />
           
                <AccordionItem>
                  {({ isExpanded }) => (
                    <>
                      <h2>
                        <AccordionButton
                          _expanded={{ bg: "tomato", color: "white" }}
                        >
                          <Box as="span" flex="1" textAlign="left">
                            Reviews
                          </Box>
                          {isExpanded ? (
                            <MinusIcon fontSize="12px" />
                          ) : (
                            <AddIcon fontSize="12px" />
                          )}
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              </Accordion>
              <Rating rating={rating} setRating={setRating} /></VStack>
             
            </Flex>
            <Stack
              rounded={"md"}
              border={"2px solid"}
              borderColor={"gray.100"}
              boxShadow={"2xl"}
              p={6}
              spacing={{ base: 6, md: 10 }}
              divider={<StackDivider borderColor={dividerColor} />}
            >
              <Box as={"header"}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5    xl" }}
                >
                  {currentProduct.name}
                </Heading>
                <Box
                  p={2}
                  bgGradient="linear(to-r, #94948C, yellow.400, #94948C)"
                  align={"center"}
                  borderTopLeftRadius={40}
                  borderBottomRightRadius={40}
                  width="150px"
                  fontWeight={700}
                  mb={-2}
                  mt={4}
                >
                  {`$${currentProduct.price}`}
                </Box>
              </Box>
              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={"column"}
                divider={<StackDivider borderColor={dividerColor} />}
              >
                <VStack alignItems={"start"} spacing={{ base: 4, sm: 6 }}>
                  <Box display="flex" mt="2" alignItems="center">
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          // color={i < property.rating ? 'teal.500' : 'gray.300'}
                        />
                      ))}
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                      {/* {property.reviewCount} reviews */} 4 reviews
                    </Box>
                  </Box>
                  <Text
                    textAlign={"justify"}
                    color={descriptionColor}
                    fontSize={"md"}
                    fontWeight={"400"}
                  >
                    {currentProduct.description}
                  </Text>
                </VStack>
                <VStack alignItems={"start"}>
                  <Accordion allowMultiple w={"100%"}>
                    <AccordionItem>
                      {({ isExpanded }) => (
                        <>
                          <h2>
                            <AccordionButton
                              _expanded={{ bg: "tomato", color: "white" }}
                            >
                              <Box
                                fontSize={{ base: "16px", lg: "18px" }}
                                color={headerColor}
                                fontWeight={"500"}
                                textTransform={"uppercase"}
                                mb={"4"}
                                flex="1"
                                textAlign="left"
                              >
                                KEY Features
                              </Box>
                              {/* <Box as="span" flex="1" textAlign="left">
                            Reviews
                          </Box> */}
                              {isExpanded ? (
                                <MinusIcon fontSize="12px" />
                              ) : (
                                <AddIcon fontSize="12px" />
                              )}
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4} textAlign={"justify"}>
                            <Features feature={`${currentProduct.features}`} />
                          </AccordionPanel>
                        </>
                      )}
                    </AccordionItem>
                  </Accordion>
                  {/* <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={useColorModeValue("yellow.500", "yellow.300")}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    KEY Features
                  </Text>

                  <Box w={"100%"} textAlign={"justify"}>
                    <Features feature={`${currentProduct.features}`} />
                  </Box> */}
                </VStack>
                  <SimpleGrid
                    m={4}
                    columns={{ base: 1, md: 2 }}
                    spacing={2}
                    alignItems={"center"}
                    justifyContent={"space-evenly"}
                  >
                    <GridItem justifySelf={"center"}>
                      <Button
                        rounded={"none"}
                        mt={4}
                        p={4}
                        size={"lg"}
                        py={"7"}
                        color={"black"}
                        bgColor="#495C62"
                        borderRadius="full"
                        width={{
                          base: "220px",
                          sm: "250px",

                          lg: "150px",
                          xl: "200px",
                        }}
                        align={"center"}
                        textTransform={"uppercase"}
                        onClick={addToCart}
                        _hover={{
                          bg: "gray.700",
                          transform: "translateY(2px)",
                          boxShadow: "lg",
                        }}
                      >
                        Add to cart
                      </Button>
                    </GridItem>
                    <GridItem justifySelf={"center"}>
                      {" "}
                      <Button
                        disabled={
                          !cart.find((p) => p._id === currentProduct._id)
                        }
                        mt={4}
                        p={4}
                        size={"lg"}
                        py={"7"}
                        color={"black"}
                        bgColor="#495C62"
                        borderRadius="full"
                        width={{
                          base: "220px",
                          sm: "250px",

                          lg: "19 0px",
                          xl: "200px",
                        }}
                        align={"center"}
                        textTransform={"uppercase"}
                        _hover={{
                          bg: "gray.700",
                          transform: "translateY(2px)",
                          boxShadow: "lg",
                        }}
                        onClick={removeFromCart}
                      >
                        Remove from Cart
                      </Button>
                    </GridItem>
                  </SimpleGrid>
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent={"center"}
              >
                <MdLocalShipping />
                <Text>2-3 business days delivery</Text>
              </Stack>
            </Stack>
          </SimpleGrid>
        </Container>
      ) : (
        "null"
      )}
      {loading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="#94948C"
          size="xl"
        />
      ) : null}
      <Cart />
    </>
  );
}

export default Product;
