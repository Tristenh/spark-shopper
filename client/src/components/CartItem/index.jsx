import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import {
  CloseButton,
  Flex,
  useColorModeValue,
  Divider,
  VStack,
  HStack,
  Text,
  Select,
} from "@chakra-ui/react";

const CartItem = ({ item }) => {
  const [state, dispatch] = useStoreContext();

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise("cart", "delete", { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
    console.log(e.target.value);
    if (value === "0") {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });
      idbPromise("cart", "delete", { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value),
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align="center"
    >
      <VStack>
        <HStack
          width="full"
          justify="space-between"
          display={{ base: "none", md: "flex" }}
        >
          <img
            rounded="lg"
            width="120px"
            height="120px"
            fit="cover"
            draggable="false"
            loading="lazy"
            src={`/images/${item.image}`}
            alt=""
          />
          <Text w={380}> {item.name}</Text>
          <Select
            maxW="64px"
            aria-label="Select quantity"
            focusBorderColor={useColorModeValue("blue.500", "blue.200")}
            value={item.purchaseQuantity}
            onChange={onChange}
            mr={5}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="4">5</option>
          </Select>
          <Text mr={5}>${item.price}</Text>
          <CloseButton
            aria-label={`Delete ${item.name} from cart`}
            onClick={() => removeFromCart(item)}
          />
        </HStack>
        <Divider
          borderColor="gray.600"
          mt={{ base: 12, md: 5 }}
          mb={{ base: 1, md: 5 }}
          opacity={0.2}
        />
      </VStack>
    </Flex>
  );
};

export default CartItem;
