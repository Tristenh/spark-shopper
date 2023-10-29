// import packages from react
import React from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  VStack,
  Button,
  Heading,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import { MdOutlineModeEditOutline } from "react-icons/md";

import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Spinner } from "@chakra-ui/react";

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
import CommentList from "../components/CommentList";
import StarDisplay from "../components/UI/StarDisplay";
import { FaStar } from "react-icons/fa";
import Auth from "../utils/auth";

import Feature from "../components/UI/Feature";
function Product() {
  // set state for modal open and close
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  // const initialRef = React.useRef(null);
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data: productData } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;
  const [rating, setRating] = useState(0);

  const descriptionColor = useColorModeValue("gray.500", "gray.400");
  const headerColor = useColorModeValue("yellow.500", "yellow.300");
  let averageRatingAmount;

  useEffect(() => {
    // already in global store

    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (productData) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: productData.products,
      });
      productData.products.forEach((product) => {
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
  }, [products, productData, loading, dispatch, id]);

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
  function averageRating() {
    let totalRating;
    const arr = [];
    if (currentProduct.comments) {
      currentProduct.comments.map((comment) => {
        arr.push(comment.rating);
        totalRating = arr.reduce((acc, val) => {
          return acc + val;
        }, 0);
      });
      averageRatingAmount = (
        totalRating / currentProduct.comments.length
      ).toFixed(2);
      const starArr = StarDisplay(averageRatingAmount);
      return starArr;
    }
  }

  return (
    <>
      {loading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="#94948C"
          size="xl"
        />
      ) : null}
      {currentProduct && cart ? (
        <Container maxW={"8xl"}>
          <Link to="/">← Back to Products</Link>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}
          >
            <VStack>
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

              <Accordion
                rounded={"md"}
                border={"2px solid"}
                borderColor={"gray.100"}
                boxShadow={"2xl"}
                bg={"white"}
                p={6}
                spacing={{ base: 6, md: 10 }}
                allowMultiple
                w={"100%"}
                px={2}
              >
                <AccordionItem>
                  {({ isExpanded }) => (
                    <>
                      <h2>
                        <AccordionButton
                          _expanded={{ bg: "back.900", color: "white" }}
                        >
                          <Box
                            fontSize={{ base: "16px", lg: "18px" }}
                            color={headerColor}
                            fontWeight={"500"}
                            textTransform={"uppercase"}
                            mb={"4"}
                            as="span"
                            flex="1"
                            textAlign="left"
                          >
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
                        <Box display="flex" alignItems="center">
                          {averageRating() &&
                            averageRating().map((val, i) => (
                              <FaStar
                                key={i}
                                viewBox={`0 0 ${val * 576} 512`}
                                size={val < 1 ? "18" : "20"}
                                color="#FFFF00"
                              />
                            ))}
                          <VStack>
                            <Text mt={2} fontSize={"xs"}>
                              Overall Rating
                            </Text>{" "}
                            <Text fontSize={"lg"} fontWeight={"400"}>
                              {averageRatingAmount}
                            </Text>{" "}
                          </VStack>
                        </Box>
                        <Box as="span" ml="2" fontSize="sm">
                          {currentProduct.comments &&
                            currentProduct.comments.length}{" "}
                          reviews
                        </Box>
                        {/*can write review when logged in */}
                        {Auth.loggedIn() ? (
                          <>
                            <Box
                              ref={finalRef}
                              tabIndex={-1}
                              aria-label="Focus moved to this box"
                            ></Box>

                            <Button
                              variant="ghost"
                              my={6}
                              boxShadow={"2xl"}
                              border={"2px solid"}
                              borderColor={"gray.300"}
                              onClick={onOpen}
                              _hover={{ bg: "gray.400" }}
                            >
                              <MdOutlineModeEditOutline />
                              <Text ml={3}>Write a Review</Text>
                            </Button>
                            <Modal
                              size={{ base: "xs", md: "lg" }}
                              aria-labelledby="review-modal"
                              finalFocusRef={finalRef}
                              isOpen={isOpen}
                              onClose={onClose}
                            >
                              <ModalOverlay />
                              <ModalContent bg={"back.900"}>
                                <ModalHeader mb={5} borderBottom={"2px solid"} borderColor={"gray.400"}  color={"white"}>Write a Review</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                  <Rating
                                    rating={rating}
                                    setRating={setRating}
                                    count={5}
                                    productId={id}
                                    close={onClose}
                                  />
                                </ModalBody>

                                <ModalFooter>
                                  {/* <Button
                                    colorScheme="blue"
                                    mr={3}
                                    onClick={onClose}
                                  >
                                    Close
                                  </Button> */}
                                 
                                </ModalFooter>
                              </ModalContent>
                            </Modal>
                          </>
                        ) : (
                          ""
                        )}

                        <CommentList />
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              </Accordion>
            </VStack>
            <VStack
              rounded={"md"}
              border={"2px solid"}
              borderColor={"gray.100"}
              boxShadow={"2xl"}
              p={10}
              spacing={{ base: 6, md: 10 }}
              alignItems={"start"}
            >
              <Box as={"header"}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={500}
                  fontSize={{ base: "3xl", lg: "4xl" }}
                >
                  {currentProduct.name}
                </Heading>

                <Box display="flex" mt={2} alignItems="center">
                  {averageRating() &&
                    averageRating().map((val, i) => (
                      <FaStar
                        key={i}
                        viewBox={`0 0 ${val * 576} 512`}
                        size={val < 1 ? "18" : "20"}
                        color="#FFFF00"
                      />
                    ))}
                  <Text fontSize={"sm"} fontWeight={"400"}>
                    {averageRatingAmount}
                  </Text>{" "}
                  <Box as="span" ml="2" fontSize="sm">
                    ({currentProduct.comments && currentProduct.comments.length}
                    ) reviews
                  </Box>
                </Box>

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
                  {console.log(state.products)}
                  {`$${currentProduct.price}`}
                </Box>
              </Box>
              <Stack spacing={{ base: 4, sm: 6 }} direction={"column"}>
                {/* <VStack  > */}
                <Text
                  textAlign={{ md: "justify" }}
                  color={descriptionColor}
                  fontSize={"1xl"}
                  fontWeight={"400"}
                >
                  {currentProduct.description}
                </Text>
                {/* /VStack> */}
                {/* <VStack alignItems={"start"}> */}
                <Accordion allowMultiple w={"100%"}>
                  <AccordionItem>
                    {({ isExpanded }) => (
                      <>
                        <h2>
                          <AccordionButton
                            _expanded={{ bg: "back.900", color: "white" }}
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

                            {isExpanded ? (
                              <MinusIcon fontSize="12px" />
                            ) : (
                              <AddIcon fontSize="12px" />
                            )}
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} textAlign={"justify"}>
                          <Feature>{currentProduct.features}</Feature>
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                </Accordion>

                <SimpleGrid
                  mx={4}
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
                        sm: "220px",

                        lg: "170px",
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
                      disabled={!cart.find((p) => p._id === currentProduct._id)}
                      mt={4}
                      p={4}
                      size={"lg"}
                      py={"7"}
                      color={"black"}
                      bgColor="#495C62"
                      borderRadius="full"
                      width={{
                        base: "220px",
                        sm: "220px",

                        lg: "200px",
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
            </VStack>
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
