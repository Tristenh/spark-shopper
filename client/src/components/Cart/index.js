import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import { useStoreContext } from "../../utils/GlobalState";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import "./style.css";
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

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

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

  // if (!state.cartOpen) {
  //   return (
  //     <div className="cart-closed" onClick={toggleCart}>
  //       <span role="img" aria-label="trash">
  //         🛒
  //       </span>
  //     </div>
  //   );
  // }
  if (state.cartOpen) {
    console.log(state.cart);

    let qty = 0;
    {
      state.cart.map((item) => (qty = qty + item.purchaseQuantity));
    }

    return (
      <>
        <Drawer isOpen={onOpen} placement="right" onClose={onclose} size={"xl"}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton onClick={toggleCart} />
            <DrawerHeader></DrawerHeader>

            <DrawerBody>
              <Box
                maxW={{ base: "3xl", lg: "7xl" }}
                mx="auto"
                px={{ base: "4", md: "8", lg: "12" }}
                py={{ base: "6", md: "8", lg: "12" }}
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
                    <Heading fontSize="2xl" fontWeight="extrabold">
                      Shopping Cart ({qty} items)
                    </Heading>
                    <Stack spacing="40">
                      {state.cart.length ? (
                        <Box>
                          {state.cart.map((item) => (
                            <CartItem key={item._id} item={item} />
                          ))}
                          <Box>
                            <strong>Total: ${calculateTotal()}</strong>
                            {Auth.loggedIn() ? (
                              <Button onClick={submitCheckout}>Checkout</Button>
                            ) : (
                              <Link>(log in to check out)</Link>
                            )}
                          </Box>
                        </Box>
                      ) : (
                        <h3>
                          <Text>😱</Text>
                          You haven't added anything to your cart yet!
                        </h3>
                      )}
                    </Stack>
                  </Stack>
                  <Flex direction="column" align="center" flex="1">
                    {/*<CartOrderSummary />*/}
                    <HStack mt="6" fontWeight="semibold">
                      <p>or</p>
                      <Link color={"black"}>Continue shopping</Link>
                    </HStack>
                  </Flex>
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
