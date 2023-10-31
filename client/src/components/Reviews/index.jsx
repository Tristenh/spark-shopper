// import packages from react
import React from "react";
import { FaStar } from "react-icons/fa";

// import chakra components
import {
  Box,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  useColorModeValue,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";
// import icons
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import { MdOutlineModeEditOutline } from "react-icons/md";

import { useStoreContext } from "../../utils/GlobalState";
import Auth from "../../utils/auth";
// import functions from files
import Rating from "../Rating";
import CommentList from "../CommentList";
import StarDisplay from "../UI/StarDisplay";

export default function Reviews({ averageRatingAmount }) {
  // set state for modal open and close
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const [state] = useStoreContext();
  // get current product from state
  const { currentProduct } = state;
  const headerColor = useColorModeValue("yellow.500", "yellow.300");

  function averageRating() {
    const starArr = StarDisplay(averageRatingAmount);
    return starArr;
  }
  return (
    <>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton _expanded={{ bg: "back.900", color: "white" }}>
                <Box
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={headerColor}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                  as="span"
                  flex="1"
                  textAlign="left"
                >
                  Reviews
                </Box>
                {isExpanded ? (
                  <MinusIcon fontSize="12px" />
                ) : (
                  <AddIcon fontSize="12px" />
                )}
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Box display="flex" alignItems="center">
                {/* if rating present then calls function to find average and displays stars in full and partial for decimal  */}
                {/* eg. if average is 4.3 then it will show 4 stars and .3 as partial star */}
                {averageRating() &&
                  averageRating().map((val, i) => (
                    <FaStar
                      key={i}
                      viewBox={`0 0 ${val * 576} 512`}
                      size={val < 1 ? "18" : "20"}
                      color="#FFEE58"
                    />
                  ))}
                <VStack>
                  {/* if no reviews then shows message*/}

                  {isNaN(averageRatingAmount) ? (
                    <>
                      {" "}
                      <Text>This product has no reviews</Text>
                    </>
                  ) : (
                    <>
                      {" "}
                      <Text mt={2} fontSize={"xs"}>
                        Average Rating
                      </Text>{" "}
                      <Text fontSize={"lg"} fontWeight={"400"}>
                        {averageRatingAmount}
                      </Text>{" "}
                    </>
                  )}
                </VStack>
              </Box>
              {currentProduct.comments &&
              currentProduct.comments.length === 0 ? (
                ""
              ) : (
                <>
                  {" "}
                  {/* total comments */}
                  <Box as="span" ml="2" fontSize="sm">
                    {currentProduct.comments && currentProduct.comments.length}{" "}
                    reviews
                  </Box>
                </>
              )}

              {/*can write review when logged in */}
              {Auth.loggedIn() ? (
                <>
                  <Box
                    ref={finalRef}
                    tabIndex={-1}
                    aria-label="Focus moved to this box"
                  ></Box>

                  <Button
                    variant="ghost"
                    my={6}
                    boxShadow={"2xl"}
                    border={"2px solid"}
                    borderColor={"gray.300"}
                    onClick={onOpen}
                    _hover={{ bg: "gray.400" }}
                  >
                    <MdOutlineModeEditOutline />
                    <Text ml={3}>Write a Review</Text>
                  </Button>
                  <Modal
                    size={{ base: "xs", md: "lg" }}
                    aria-labelledby="review-modal"
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                  >
                    <ModalOverlay />
                    <ModalContent bg={"back.900"}>
                      <ModalHeader
                        mb={5}
                        borderBottom={"2px solid"}
                        borderColor={"gray.400"}
                        color={"white"}
                      >
                        Write a Review
                      </ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Rating close={onClose} />
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                </>
              ) : (
                ""
              )}
              <CommentList />
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </>
  );
}
