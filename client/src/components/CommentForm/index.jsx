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
import { CURRENT_PRODUCT } from "../../utils/actions";
import Auth from "../../utils/auth";

const CommentForm = ({ rating, setRating, close }) => {
  const [state, dispatch] = useStoreContext();
  const { currentProduct } = state;
  const [commentDesc, setCommentDesc] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if(currentProduct.comments){
      dispatch({
        type:ADD_COMMENT_TEXT,
        comments:currentProduct.comments
      })
      currentProduct.comments.forEach((comment)=>{
        idbPromise("comments", "put", comment);
      })
      
    }
    else{
      idbPromise("comments", "get").then((indexedComment) => {
        dispatch({
          type: CURRENT_PRODUCT,
          comments: indexedComment,
        });
      });
    }
   
  }, [currentProduct,dispatch]);
  const productId = currentProduct._id;
  const [addComment, { loading }] = useMutation(ADD_COMMENT);

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

      if (data) {
        dispatch({
          type: CURRENT_PRODUCT,
          currentProduct: { ...data.addComment },
        });
        idbPromise("singleProduct", "put", data.addComment);
      } else if (!loading) {
        idbPromise("singleProduct", "get").then((indexedProduct) => {
          dispatch({
            type: CURRENT_PRODUCT,
            product: indexedProduct,
          });
        });
      }
      console.log(state.currentProduct);
      if (!errorMessage) {
        console.log("Review Received");
        setRating(0);
        setCommentDesc("");
        
      }
      close();
    } catch (err) {
      console.error(err);
      setErrorMessage("Kindly select rating stars to add your review");
    }
    setRating(0);
    setCommentDesc("");
  };
  console.log(state.currentProduct);
  const handleChange = (event) => {
    setErrorMessage("");
    const { name, value } = event.target;
    if (name === "commentDesc" && value.length <= 280) {
      setCommentDesc(value);
      setCharacterCount(value.length);
    }
  };


  return (
    <Stack
      width={"100%"}
      textColor={"white"}
      spacing={4}
      justify={{ base: "center", md: "space-between" }}
    >
      {/* modal to display comment form  */}
      {/* {Auth.loggedIn ? (
        <> */}
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

        {/* <ModalFooter> */}
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
        {/* </ModalFooter> */}
      </form>
      {/* </>
      ) : (
        ""
      )} */}
    </Stack>
  );
};

export default CommentForm;
