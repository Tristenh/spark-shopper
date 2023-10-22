import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import {
  CloseButton,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Divider,
  VStack,
  HStack,
  Text,
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

  // return (
  //   <div className="flex-row">
  //     <div>
  //       <img src={`/images/${item.image}`} alt="" />
  //     </div>
  //     <div>
  //       <div>
  //         {item.name}, ${item.price}
  //       </div>
  //       <div>
  //         <span>Qty:</span>
  //         <input
  //           type="number"
  //           placeholder="1"
  //           value={item.purchaseQuantity}
  //           onChange={onChange}
  //         />
  //         <span
  //           role="img"
  //           aria-label="trash"
  //           onClick={() => removeFromCart(item)}
  //         >
  //           🗑️
  //         </span>
  //       </div>
  //     </div>
  //   </div>
  // );
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
          <NumberInput
            defaultValue={item.purchaseQuantity}
            min={1}
            max={10}
            w={100}
            onChange={onChange}
            mr={5}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
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
