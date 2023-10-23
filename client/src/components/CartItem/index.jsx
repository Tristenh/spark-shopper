//importing actions,queries, GlobalState and helpers
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
//importing CHAKRA UI components
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
  //removes the item from state Cart and deletes the item from indexedDB
  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise("cart", "delete", { ...item });
  };
  //updates the state Cart when the purchase quantity changes and updates indexedDb
  const onChange = (e) => {
    const value = e.target.value;

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
        price: item.price,
      });
      //updates indexedDb with new price when the  quantity changes
      idbPromise("cart", "put", {
        ...item,
        price: parseFloat(item.price) * parseInt(value),
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
    }
  };
  //renders a product in the cart
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align="center"
    >
      <VStack mt={3}>
        {/* Cart item display on Desktop */}
        <Flex
          width="full"
          justify="space-between"
          display={{ base: "none", md: "flex" }}
        >
          <VStack>
            <HStack>
              <img
                rounded="lg"
                width="120px"
                height="120px"
                fit="cover"
                draggable="false"
                loading="lazy"
                src={`/images/${item.image}`}
                alt="product image"
              />
              <Text w={{ md: 300, lg: 380 }}> {item.name}</Text>

              <Select
                maxW="64px"
                aria-label="Select quantity"
                focusBorderColor={useColorModeValue("#51636C", "#51636C")}
                value={item.purchaseQuantity}
                onChange={onChange}
                mr={5}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Select>
              <Text mr={5} fontWeight={"bold"}>
                ${item.price * item.purchaseQuantity}
              </Text>
              <CloseButton
                aria-label={`Delete ${item.name} from cart`}
                onClick={() => removeFromCart(item)}
              />
            </HStack>
          </VStack>
        </Flex>
        {/* Cart item display on Mobile */}
        <Flex
          mt="4"
          align="center"
          width="full"
          justify="space-between"
          display={{ base: "flex", md: "none" }}
        >
          <VStack>
            <HStack>
              <img
                rounded="lg"
                width="120px"
                height="120px"
                fit="cover"
                draggable="false"
                loading="lazy"
                src={`/images/${item.image}`}
                alt="product image"
              />
              <Text w={200}> {item.name}</Text>
            </HStack>
            <HStack>
              <Select
                maxW="64px"
                aria-label="Select quantity"
                focusBorderColor={useColorModeValue("blue.500", "blue.200")}
                value={item.purchaseQuantity}
                onChange={onChange}
                mr={3}
                ml={120}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Select>
              <Text mr={3} fontWeight={"bold"}>
                ${item.price * item.purchaseQuantity}
              </Text>
              <CloseButton
                aria-label={`Delete ${item.name} from cart`}
                onClick={() => removeFromCart(item)}
              />
            </HStack>
          </VStack>
        </Flex>
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
