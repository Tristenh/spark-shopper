// import chakra components
import { Stack, Text, Box, VStack, Flex, HStack } from "@chakra-ui/react";
// import react icon
import { AiFillStar } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";

import { idbPromise } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { useMutation } from "@apollo/client";
// mutation to remove comment from database
import { REMOVE_COMMENT } from "../../utils/mutations";
import { CURRENT_PRODUCT } from "../../utils/actions";

const CommentList = () => {
  const [state, dispatch] = useStoreContext();
  const { currentProduct } = state;
  const [removeComment, { loading }] = useMutation(REMOVE_COMMENT);

  const removeCommentbyId = async (commentId) => {
    // comment remove from database
    const { data } = await removeComment({
      variables: {
        commentId,
        productId: currentProduct._id,
      },
    });
// update current product state after comment remove
    if (data) {
      dispatch({
        type: CURRENT_PRODUCT,
        currentProduct: { ...data.removeComment },
      });
      idbPromise("singleProduct", "put", data.removeComment);
    } else if (!loading) {
      idbPromise("singleProduct", "get").then((indexedProduct) => {
        dispatch({
          type: CURRENT_PRODUCT,
          product: indexedProduct,
        });
      });
    }
  };
  return (
    <>
      <Stack>
        <Box w={"100%"} borderBottom={"2px solid"} borderColor={"gray.300"}>
          <Text fontSize={{ base: "lg", lg: "xl" }}>Customer Reviews</Text>
        </Box>
      </Stack>
      <VStack>
        {currentProduct.comments &&
          currentProduct.comments.map((comment) => (
            <Box
              key={comment._id}
              w="90%"
              rounded={"sm"}
              my={5}
              mx={[0, 5]}
              overflow={"hidden"}
              bg="white"
              border={"1px"}
              borderColor="gray.400"
            >
              {/* displays user name, comment text, rating in numbers and date of comment */}
              <Box p={4}>
                <Stack direction={"column"} spacing={0}>
                  <Text fontSize={"lg"} fontWeight={600}>
                    {comment.userName}{" "}
                  </Text>
                  <Flex justifyContent={"space-between"}>
                    <Text fontSize={"sm"} color={"gray.500"}>
                      {comment.dateCreated}
                    </Text>
                    {/* remove comment button */}
                    <Text
                      mt={0.5}
                      ml={1}
                      fontSize={"xl"}
                      onClick={() => removeCommentbyId(comment._id)}
                    >
                      <RiDeleteBinLine />
                    </Text>{" "}
                  </Flex>
                </Stack>
              </Box>
              <HStack borderTop={"1px"} borderColor="gray.400" color="black">
                <Flex p={4} roundedBottom={"sm"} cursor={"pointer"} w="full">
                  <Box
                    bg="gray.300"
                    display={"inline-block"}
                    px={2}
                    py={1}
                    color="black"
                    mr={4}
                  >
                    <Flex justifyContent={"center"}>
                      <Text fontSize={"sm"} fontWeight="medium">
                        {comment.rating}
                      </Text>
                      <Text mt={0.5} ml={1}>
                        <AiFillStar />
                      </Text>{" "}
                    </Flex>
                  </Box>
                  <Text
                    borderLeft={"1px"}
                    borderColor="gray.600"
                    pl={4}
                    fontSize={"md"}
                    fontWeight={"semibold"}
                  >
                    {comment.commentDesc}
                  </Text>
                </Flex>
              </HStack>
            </Box>
          ))}
      </VStack>
    </>
  );
};

export default CommentList;
