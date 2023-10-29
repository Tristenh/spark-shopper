import { useState } from "react";
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

import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_COMMENT } from "../../utils/mutations";

import Auth from "../../utils/auth";

const CommentForm = ({ productId, rating, setRating, close }) => {
  const [commentDesc, setCommentDesc] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

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
      if (!errorMessage) {
        console.log("Review Received");
        setRating(0);        
        setCommentDesc("");
      }
      setRating(0);        
      setCommentDesc("");
    } catch (err) {
      console.error(err);
      setErrorMessage("Kindly select rating stars to add your review");
    }
  };

  const handleChange = (event) => {
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
      {Auth.loggedIn ? (
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

          <ModalFooter >
            <Button _hover={{ bg: "gray.400" }} mr={5} onClick={close}>
              Close
            </Button>
            <Button type="submit" _hover={{ bg: "gray.400" }}>
              Comment
            </Button>
          </ModalFooter>
        </form>
      ) : (
        ""
      )}
    </Stack>
  );
};

export default CommentForm;
