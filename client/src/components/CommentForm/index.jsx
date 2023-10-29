import { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Textarea,
  Stack,
  ModalFooter,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";

import { ADD_COMMENT_TEXT } from "../../utils/actions";
import { useMutation } from "@apollo/client";
import { idbPromise } from "../../utils/helpers";

import { ADD_COMMENT } from "../../utils/mutations";
import { useStoreContext } from "../../utils/GlobalState";

import Auth from "../../utils/auth";

const CommentForm = ({ productId, rating, setRating, close }) => {
  const [state, dispatch] = useStoreContext();

  const [commentDesc, setCommentDesc] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentProduct, setCurrentProduct] = useState({});
  const { comments, products } = state;

  useEffect(() => {
    // already in global store
 
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === productId));
    }
  }, [products, productId]);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          productId,
          rating,
          commentDesc,
          userName: "Auth.getProfile().data.username",
        },
      });
      console.log(data.addComment.comments)
      if (comments.length) {
        dispatch({
          type: ADD_COMMENT_TEXT,
          comments: data.addComment.comments,
        });
        comments.forEach((comment) => {
          idbPromise("comments", "put", comment);
        });
      } else {
        idbPromise("comments", "get").then((indexedComments) => {
          dispatch({
            type: ADD_COMMENT_TEXT,
            comments: indexedComments,
          });
        });
      }

      if (!errorMessage) {
        console.log("Review Received");
        setRating(0);
        setCommentDesc("");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Kindly select rating stars to add your review");
    }
    setRating(0);
    setCommentDesc("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "commentDesc" && value.length <= 280) {
      setCommentDesc(value);
      setCharacterCount(value.length);
    }
  };
  // const handleCommentClick = () => {
  //   const itemInCart = cart.find((cartItem) => cartItem._id === id);
  //   if (itemInCart) {
  //     dispatch({
  //       type: UPDATE_CART_QUANTITY,
  //       _id: id,
  //       purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
  //     });
  //     idbPromise("cart", "put", {
  //       ...itemInCart,
  //       purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
  //     });
  //   } else {
  //     dispatch({
  //       type: ADD_TO_CART,
  //       product: { ...currentProduct, purchaseQuantity: 1 },
  //     });
  //     idbPromise("cart", "put", { ...currentProduct, purchaseQuantity: 1 });
  //   }
  // };

  return (
    <Stack
      width={"100%"}
      textColor={"white"}
      spacing={4}
      justify={{ base: "center", md: "space-between" }}
    >
      {/* modal to display comment form  */}
      {Auth.loggedIn ? (
        <>
          <form
            onSubmit={(e) => {
              handleFormSubmit(e);
            }}
          >
            <FormControl>
              <FormLabel>Add a Comment</FormLabel>

              <Textarea
                width={"95%"}
                name="commentDesc"
                value={commentDesc}
                onChange={handleChange}
                placeholder="Write your valuable comment"
              />
              <Stack alignItems={"flex-end"} marginRight={"6"}>
                <Box
                  fontSize={"sm"}
                  color={characterCount === 280 ? "orange" : "white"}
                >
                  Character Count: {characterCount}/280
                </Box>
              </Stack>
            </FormControl>

            {/* if state of error message changes */}
            {errorMessage && (
              <Stack>
                <Text fontSize={"1xl"} color={"orange"}>
                  {errorMessage}
                </Text>
              </Stack>
            )}

            <ModalFooter>
              <Button
                _hover={{ bg: "gray.400" }}
                mr={5}
                onClick={() => {
                  close();
                }}
              >
                Close
              </Button>
              <Button
                type="submit"
                // onClick={handleCommentClick}
                _hover={{ bg: "gray.400" }}
              >
                Comment
              </Button>
            </ModalFooter>
          </form>
        </>
      ) : (
        ""
      )}
    </Stack>
  );
};

export default CommentForm;
