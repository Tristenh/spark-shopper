import { useState, useEffect } from "react";
//importing CHAKRA UI components
import {
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  keyframes,
  Box,
  Icon,
  Text,
  Button,
} from "@chakra-ui/react";
import { FaRegHeart } from "react-icons/fa";

//Importing the required component for linking between pages
import pic from "../assets/camera1.webp";
import { Link } from "react-router-dom";
const pulseRing = keyframes`
0%{transform:scale(0.001);}
40%
50%{
  opacity:0;
}
100%{
  opacity:0;
}
`;
const Home = () => {
  //  react hooks

  const [products, setProducts] = useState([]);

  // When the component mounts to the VDOM, run this callback to retrieve the information about all projects
  useEffect(() => {
    const products = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "f",
      "g",
      "h",
    ];
    setProducts(products);
  }, []);

  // Iterate over each  product to display its details
  return (
    <>
      <Box m={{ base: 10, md: 20, lg: 60 }}>
        <Grid
          templateRows={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
        >
          {products.map((product, index) => (
            // individual grid item with card inside
            <GridItem key={index} p={3}>
              <Card p={30}>
                <CardHeader>
                  <Link href={product.github}>
                    <Box
                      as="div"
                      _before={{
                        content: "''",
                        position: "relative",
                        display: "block",
                        width: "150%",
                        height: "150%",
                        boxSizing: "border-box",
                        marginLeft: "-25%",
                        bgColor: "black",
                        borderRadius: "50%",

                        animation: `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
                      }}
                    >
                      <Icon
                        position="absolute"
                        as={FaRegHeart}
                        boxSize={{ base: "24px", md: "24px" }}
                      ></Icon>
                    </Box>
                  </Link>
                </CardHeader>
                <CardBody>
                  <center>
                    <Link href={product.href}>
                      <img src={pic} alt={product.name} />
                      <Text
                        fontSize={"md"}
                        pb={"10px"}
                        align={"center"}
                        mb={10}
                        fontWeight={700}
                      >
                        Panasonic LUMIX S5II Full-Frame Mirrorless Camera with
                        20-60mm Lens [6K Video]
                      </Text>
                      <Box
                        mt={10}
                        p={2}
                        colorScheme="black"
                        bgGradient="linear(to-r, gray.300, orange.100, yellow.400)"
                        align={"center"}
                        borderTopLeftRadius={40}
                        borderBottomRightRadius={40}
                        width="150px"
                      >
                        $ 1999
                      </Box>
                    </Link>
                    <Button
                      mt={10}
                      p={2}
                      colorScheme="black"
                      type="submit"
                      bgGradient={["linear(to-b, blue.700, gray.800)"]}
                      borderRadius="full"
                      _hover={{
                        bg: "gray.700",
                      }}
                      width="250px"
                      align={"center"}
                    >
                      Add To Cart
                    </Button>
                  </center>
                </CardBody>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Home;
