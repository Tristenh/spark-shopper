//importing CHAKRA UI components
import {
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

//import icon used for wishlist
import { FaRegHeart } from "react-icons/fa";
//import GlobalState
import { useStoreContext } from "../../utils/GlobalState";
import { idbPromise } from "../../utils/helpers";
//Importing the required component for linking between pages

import { Link } from "react-router-dom";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const { image, name, _id, price } = item;
  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };
  //displays product details in card such as name ,image,price, buttons to add to cart and wish list
  return (
    <GridItem p={{ base: 0, md: 1 }} pb={{ base: 1, md: 1 }}>
      <Card p={{ base: 0, md: 5 }} h={700}>
        <CardHeader>
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
              <Link to={`/products/${_id}`}>
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
                    backgroundImage: `url(${image})`,
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
                    objectFit={"cover"}
                    src={`/images/${image}`}
                    alt="#"
                  />
                </Box>
              </Link>
              <Stack pt={10} align={"center"}>
                <Link to={`/products/${_id}`}>
                  <Text
                    fontSize={"md"}
                    pb={"10px"}
                    align={"center"}
                    fontWeight={700}
                  >
                    {name}
                  </Text>
                </Link>
                <VStack pos={"absolute"} zIndex={-1} mt={"100px"}>
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
                    {`$${price}`}
                  </Box>
                  <Button
                    mt={10}
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
                      lg: "250px",
                    }}
                    align={"center"}
                  >
                    Add To Cart
                  </Button>
                </VStack>
              </Stack>
            </Box>
          </Center>
        </CardBody>
      </Card>
    </GridItem>
  );
}
export default ProductItem;
