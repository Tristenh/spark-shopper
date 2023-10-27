import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import { useStoreContext } from "../../utils/GlobalState";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
//importing CHAKRA UI components
import {
  Stack,
  Box,
  Heading,
  Flex,
  HStack,
  Link,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  //defined isOpen, onOpen, onClose to check for the chakra Drawer component in which Cart is displayed
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);
  //toggles the cart
  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }
  //calculates the total amount
  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }
  //This function will be called on click of the checkout button
  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  //if  cartOpen is true , then the cart is displayed
  if (state.cartOpen) {
    let totalQuantity = 0;
    {
      state.cart.map(
        (item) => (totalQuantity = totalQuantity + item.purchaseQuantity)
      );
    }
    //renders the cart
    return (
      <>
        <Drawer
          isOpen={onOpen}
          placement="right"
          onClose={onClose}
          size={{ base: "sm", md: "lg", lg: "lg" }}
          bgColor={"#51636C"}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton
              m={2}
              onClick={toggleCart}
              color="yellow.300"
              fontWeight="extrabold"
            />
            <DrawerHeader bgColor={"#51636C"}>
              <Heading
                fontSize="xl"
                fontWeight="extrabold"
                bgGradient="linear(to-r,yellow.400, orange.200, yellow.400)"
                bgClip="text"
              >
                Shopping Cart ({totalQuantity} items)
              </Heading>
            </DrawerHeader>

            <DrawerBody>
              <Box
                maxW={{ base: "sm", md: "xl", lg: "2xl" }}
                mx="auto"
                zIndex={4}
                overflow={"auto"}
                bgColor={"white"}
              >
                <VStack
                  direction={{ base: "column", lg: "row" }}
                  align={{ lg: "flex-start" }}
                  spacing={{ base: "8", md: "16" }}
                  zIndex={3}
                >
                  <Stack spacing={{ base: "8", md: "10" }} flex="2">
                    <Stack spacing="40">
                      {state.cart.length ? (
                        <Box>
                          {state.cart.map((item) => (
                            <CartItem key={item._id} item={item} />
                          ))}
                          <Box>
                            <HStack>
                              <Text w={490} fontWeight={"bold"}>
                                Total:
                              </Text>
                              <Text fontWeight={"bold"} align="right">
                                ${calculateTotal()}
                              </Text>
                            </HStack>

                            {Auth.loggedIn() ? (
                              <Flex
                                align={"flex-end"}
                                justify={"space-between"}
                              >
                                <center>
                                  <Link
                                    fontWeight="semibold"
                                    onClick={toggleCart}
                                    color={"black"}
                                  >
                                    Continue shopping
                                  </Link>
                                </center>
                                <center>
                                  <Button
                                    mt={10}
                                    ml={120}
                                    p={2}
                                    colorScheme="black"
                                    type="submit"
                                    bgColor="#495C62"
                                    borderRadius="full"
                                    _hover={{
                                      bg: "gray.700",
                                    }}
                                    width={{
                                      base: "150px",
                                      md: "200px",
                                      lg: "200px",
                                    }}
                                    align={"center"}
                                    onClick={submitCheckout}
                                  >
                                    Checkout
                                  </Button>
                                </center>
                              </Flex>
                            ) : (
                              <Flex
                                direction={{ base: "column", md: "row" }}
                                align="left"
                                flex="1"
                              >
                                <Stack mt="6" fontWeight="semibold">
                                  <Text>Log in to check out</Text>
                                  <p>Or</p>
                                  <Link onClick={toggleCart} color={"black"}>
                                    Continue shopping
                                  </Link>
                                </Stack>
                              </Flex>
                            )}
                          </Box>
                        </Box>
                      ) : (
                        <Heading fontSize={20} mt={10}>
                          You haven't added anything to your cart yet!
                        </Heading>
                      )}
                    </Stack>
                  </Stack>
                </VStack>
              </Box>
            </DrawerBody>

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  }
};

export default Cart;
