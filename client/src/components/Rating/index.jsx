import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Radio, HStack, Box } from "@chakra-ui/react";
import CommentForm from "../CommentForm";
export default function StarRating({ rating, setRating, count, productId }) {


  const [hover, setHover] = useState(null);

  return (
    <>
      <HStack spacing={"2px"}>
        {[...Array(count || 5)].map((star, index) => {
          const ratingValue = index + 1;

          return (
            <Box
              as="label"
              key={index}
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
