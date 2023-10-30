import { useState } from "react";
import { FaStar } from "react-icons/fa";
// import chakra components
import { Radio, HStack, Box, Text } from "@chakra-ui/react";
import CommentForm from "../CommentForm";

export default function Rating({ close }) {
  // set state 
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  return (
    <>
      <HStack spacing={"2px"} color={"white"}>
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;

          return (
            // create five stars - shows hover effect -set rating value on click
            <Box
              as="label"
              key={index}
              border={"1px solid #ffee58"}
              m={0.5}
              color={ratingValue <= (hover || rating) ? "#ffee58" : "#e4e5e9"}
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
        {/* call comment form */}
        <CommentForm  rating={rating} setRating={setRating} close={close} />
      </HStack>
    </>
  );
}
