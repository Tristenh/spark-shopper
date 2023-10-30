import {
  Stack,
  Text,
  Box,
  VStack,
  Flex,
  HStack,
  Heading,
} from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";
import { useStoreContext } from "../../utils/GlobalState";
const CommentList = () => {
  // const { id } = useParams();
  const [state] = useStoreContext();
  const { currentProduct } = state;

  return (
    <>
      <Stack>
        <Box w={"100%"} borderBottom={"2px solid"} borderColor={"gray.300"}>
          <Text fontSize={{ base: "lg", lg: "xl" }}>Customer Reviews</Text>
        </Box>
      </Stack>
      <VStack alignItems={"flex-start"}>
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

              // // boxShadow={useColorModeValue(
              //   "6px 6px 0 black",
              //   "6px 6px 0 cyan"
              // )}
            >
              <Box p={4}>
                <Stack direction={"column"} spacing={0}>
                  <Text fontSize={"md"} fontWeight={600}>
                    {comment.userName}{" "}
                  </Text>
                  <Text fontSize={"xs"} color={"gray.500"}>
                    {comment.dateCreated}
                  </Text>
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
                  <Text borderLeft={"1px"} borderColor="gray.600" pl={4} fontSize={"md"} fontWeight={"semibold"}>
                    {comment.commentDesc}
                  </Text>
                  {/* <BsArrowUpRight   /> */}
                </Flex>
              </HStack>
            </Box>

          
          ))}
      </VStack>

     
    </>
  );
};

export default CommentList;
