import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import chakra components
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
  Flex,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  Tooltip,
  IconButton,
  StackDivider,
} from "@chakra-ui/react";
// import react icons for wishlist, write a review and star button
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Spinner } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

// import chakra icon for accordian button
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import { useQuery, useMutation } from "@apollo/client";
import { useStoreContext } from "../utils/GlobalState";
import { idbPromise } from "../utils/helpers";
import Auth from "../utils/auth";

// import components from files
import Reviews from "../components/Reviews";
import Cart from "../components/Cart";
import StarDisplay from "../components/UI/StarDisplay";
import Feature from "../components/UI/Feature";

// import actions
import {
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
  CURRENT_PRODUCT,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from "../utils/actions";
// import query and mutation
import { QUERY_PRODUCTS, QUERY_USER } from "../utils/queries";
import { ADD_WISHLIST } from "../utils/mutations";

function Product() {
  //mutation to add wish list
  const [addWishList] = useMutation(ADD_WISHLIST, {
    refetchQueries: [QUERY_USER, "getUser"],
  });
  let tooTipText = "";

  const [state, dispatch] = useStoreContext();
  //get product id from route
  const { id } = useParams();
  const [product, setProduct] = useState({});
  // query to get all products
  const { loading, data: productData } = useQuery(QUERY_PRODUCTS);
  const { products, cart, currentProduct, wishList } = state;
  const [isActive, setIsActive] = useState(false);
  // colors
  const descriptionColor = useColorModeValue("gray.500", "gray.400");
  const headerColor = useColorModeValue("yellow.500", "yellow.300");
  const dividerColor = useColorModeValue("gray.200", "gray.600");
  let averageRatingAmount;

  useEffect(() => {
    // set currentProduct in state
    if (products.length) {
      setProduct(products.find((product) => product._id === id));
      dispatch({
        type: CURRENT_PRODUCT,
        currentProduct: { ...product },
      });
    }
    // when received from database save it in state
    else if (productData) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: productData.products,
      });
      //save it to indexdb cache
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
  }, [products, productData, loading, dispatch, id, product]);

  const addToWishList = () => {
    //checks whether the user is authenticated before adding to wishlist
    if (!Auth.loggedIn()) {
      return;
    }
    const itemInWishList = wishList.find(
      (wishListItem) => wishListItem._id === currentProduct._id
    );

    if (itemInWishList) {
      dispatch({
        type: REMOVE_FROM_WISHLIST,
        _id: currentProduct._id,
      });
      //remove the product from wishList in indexedDB
      idbPromise("wishList", "delete", {
        ...currentProduct,
      });
    } else {
      dispatch({
        type: ADD_TO_WISHLIST,
        product: { ...currentProduct },
      });
      //Add the product to wishList in indexedDB
      idbPromise("wishList", "put", { ...currentProduct });
    }

    //saves the wishlist to database
    async function saveWishList() {
      const wish = await idbPromise("wishList", "get");
      const productIds = wish.map((item) => item._id);
      // const productIds = state.wishList.map((item) => item._id);
      await addWishList({
        variables: { products: productIds },
      });
    }
    saveWishList();
  };
  // add to cart triggers on add to cart button clicks
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

  // set average rating amount and return array of 5 stars-- full stars as 1 and partial stars in decimal otherwise 0
  function averageRating() {
    let totalRating;
    const arr = [];
    // total of all ratings given by users
    if (currentProduct.comments) {
      currentProduct.comments.map((comment) => {
        arr.push(comment.rating);
        totalRating = arr.reduce((acc, val) => {
          return acc + val;
        }, 0);
      });
      // find average by dividing it with total number of comments
      averageRatingAmount = (
        totalRating / currentProduct.comments.length
      ).toFixed(2);
      const starArr = StarDisplay(averageRatingAmount);
      return starArr;
    }
  }

  if (Auth.loggedIn()) {
    idbPromise("wishList", "get").then((wishListProducts) => {
      const itemInWishList = wishListProducts.find(
        (wishListItem) => wishListItem._id === currentProduct._id
      );
      if (itemInWishList) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    });
  }
  //changes the tootip text according to authentication
  !Auth.loggedIn()
    ? (tooTipText = "Login to add to Wish list")
    : (tooTipText = "Add to Wish list");

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
              {/* product image */}
              <Image
                rounded={"md"}
                alt={"product image"}
                border={"2px solid"}
                borderColor={"gray.100"}
                boxShadow={"2xl"}
                src={`/images/${currentProduct.image}`}
                objectFit={"contain"}
                overflow={"hidden"}
                align={"center"}
                w={"100%"}
                py={4}
                h={{ base: "auto", sm: "400px", lg: "500px" }}
              />
              <Flex
                rounded={"md"}
                border={"2px solid"}
                borderColor={"gray.100"}
                boxShadow={"2xl"}
                bg={"white"}
                p={6}
                spacing={{ base: 6, md: 10 }}
                columns={2}
                alignItems={"center"}
                justifyContent={"center"}
                width={"100%"}
              >
                {/* add to cart button  */}
                <Button
                  rounded={"none"}
                  mr={2}
                  p={4}
                  size={"lg"}
                  py={"7"}
                  colorScheme="black"
                  bgColor="#495C62"
                  borderRadius="full"
                  width={{
                    base: "150px",
                    sm: "190px",
                    md: "220px",
                    lg: "200px",
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
                {/* add to wishlist button */}
                <Box
                  onClick={() => {
                    setIsActive(!isActive);
                  }}
                >
                  {isActive && Auth.loggedIn() ? (
                    <IconButton
                      isRound={true}
                      variant="solid"
                      colorScheme="gray"
                      aria-label="Done"
                      fontSize="20px"
                      icon={<FaHeart />}
                      color="red.600"
                      onClick={addToWishList}
                      _hover={{
                        fontSize: { base: "20px", md: "24px" },
                      }}
                    />
                  ) : (
                    <Tooltip
                      label={tooTipText}
                      bg="white"
                      placement={"top"}
                      color={"gray.800"}
                      fontSize={"1.2em"}
                    >
                      <IconButton
                        isRound={true}
                        variant="solid"
                        colorScheme="gray"
                        aria-label="Done"
                        fontSize="20px"
                        icon={<FaRegHeart />}
                        onClick={addToWishList}
                        _hover={{
                          color: "red.600",
                          fontSize: { base: "20px", md: "24px" },
                        }}
                      />
                    </Tooltip>
                  )}
                </Box>
              </Flex>
            </VStack>
            <VStack
              h={"auto"}
              rounded={"md"}
              border={"2px solid"}
              borderColor={"gray.100"}
              boxShadow={"2xl"}
              p={10}
              spacing={{ base: 6, md: 10 }}
              alignItems={"start"}
              divider={<StackDivider borderColor={dividerColor} />}
            >
              {/* product name */}
              <Box as={"header"}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={500}
                  fontSize={{ base: "3xl", lg: "4xl" }}
                >
                  {currentProduct.name}
                </Heading>
                {/* if rating present then calls function to find average and displays stars in full and partial for decimal  */}
                {/* eg. if average is 4.3 then it will show 4 stars and .3 as partial star */}
                <Box display="flex" mt={2} alignItems="center">
                  {averageRating() &&
                    averageRating().map((val, i) => (
                      <FaStar
                        key={i}
                        viewBox={`0 0 ${val * 576} 512`}
                        size={val < 1 ? "18" : "20"}
                        color="#FFEE58"
                      />
                    ))}
                  {/* if no reviews then shows empty string */}
                  <Text fontSize={"sm"} fontWeight={"400"}>
                    {isNaN(averageRatingAmount) ? "" : averageRatingAmount}
                  </Text>{" "}
                  {/* total comments */}
                  <Box as="span" ml="2" fontSize="sm">
                    ({currentProduct.comments && currentProduct.comments.length}
                    ) reviews
                  </Box>
                </Box>

                <Box
                  p={2}
                  bgGradient="linear(to-r, #94948C, yellow.400, #94948C)"
                  align={"center"}
                  width="150px"
                  fontWeight={700}
                  borderRadius={5}
                  mb={-2}
                  mt={6}
                >
                  {`$${currentProduct.price}`}
                </Box>
              </Box>
              <Stack spacing={{ base: 4, sm: 6 }} direction={"column"}>
                <Text
                  textAlign={{ md: "justify" }}
                  color={descriptionColor}
                  fontSize={"1xl"}
                  fontWeight={"400"}
                >
                  {currentProduct.description}
                </Text>

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
                    {/* review component */}
                  </AccordionItem>
                  <Reviews averageRatingAmount={averageRatingAmount} />
                </Accordion>
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
