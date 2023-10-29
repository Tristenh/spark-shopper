import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Radio, HStack, Box,Text } from "@chakra-ui/react";
import CommentForm from "../CommentForm";
export default function StarRating({ rating, setRating, count, productId }) {


  const [hover, setHover] = useState(null);

  return (
    <>
      <HStack spacing={"2px"} color={"white"}>
        {[...Array(count || 5)].map((_, index) => {
          const ratingValue = index + 1;

          return (
            <Box
              as="label"
              key={index}
              border={"1px solid #ffc107"}
              m={.5}
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            >
              <Radio
                name="rating"
                onChange={() => setRating(ratingValue)}
                value={ratingValue}
                display="none"
             
              ></Radio>
              <FaStar cursor={"pointer"} size={24} transition="color 200ms" />
            </Box>
          );
        })}
        
      </HStack>
      <Text color={"white"}>Review this product</Text>
      <HStack mt={6}>
        <CommentForm
          productId={productId}
          rating={rating}
          setRating={setRating}
        />
      </HStack>
      
    </>
  );
}
