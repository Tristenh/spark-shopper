import {
  FormControl,
  FormLabel,
  Textarea,
  Stack,
  ModalFooter,
  Button,
  Text,
  Box,
  HStack,
  VStack,
} from "@chakra-ui/react";
// import { useStoreContext } from "../utils/GlobalState";
import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
// import { useQuery} from "@apollo/client";
// import { Link, useParams } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";

import { QUERY_PRODUCT } from "../../utils/queries";
const CommentList = () => {
  // const { id } = useParams();
  const [state, dispatch] = useStoreContext();
  const { currentProduct } = state;

  // const { loading, data } = useQuery(QUERY_PRODUCT, {
  //   // pass URL parameter
  //   variables: { productId: id },
  // });

  // const product = data?.product || {};
  // const [state, dispatch] = useStoreContext();
  // const [getProductById, { loading }] = useLazyQuery(QUERY_PRODUCT);
  // useEffect(() => {
  //   // already in global store
  //   // if (productId) {
  //     // getProductById({
  //     //   variables: {
  //     //     productId:id,
  //     //   },
  //     // }).then(({product}) => {
  //     //   console.log(product);
  //     // });
  //   // }
  //   // if (!comments.length) {
  //   //   return <h3>No Comments Yet</h3>;
  //   // }
  // }, [getProductById,id]);

  return (
    <>
      <Stack>
        <Box w={"100%"} borderBottom={"2px solid"} borderColor={"gray.300"}>
          <Text fontSize={{ base: "lg", lg: "xl" }}>Customer Reviews</Text>
        </Box>
      </Stack>
      <VStack alignItems={"flex-start"}>
        {currentProduct.comments &&
          currentProduct.comments.map((comment, i) => (
            <>
            <Box key={i} w={"100%"} mt={5} border={"2px solid"} borderColor={"gray.300"}>

              {comment.userName}
            </Box>
            </>
          ))}
         
      </VStack>

      {/* <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: "1px dotted #1a1a1a" }}
      >
        Comments
      </h3> */}
      <div className="flex-row my-4">
        {currentProduct.comments &&
          currentProduct.comments.map((comment) => (
            <div key={comment._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                  {comment.userName} commented{" "}
                  <span style={{ fontSize: "0.825rem" }}>
                    on {comment.dateCreated}
                  </span>
                </h5>
                <p className="card-body">{comment.commentDesc}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentList;
