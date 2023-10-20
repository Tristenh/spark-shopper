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
  Image,
  chakra,
  Heading,
  Center,
  Tooltip,
  Stack,
} from "@chakra-ui/react";
import { FaPlayCircle, FaRegHeart } from "react-icons/fa";

//Importing the required component for linking between pages
import pic from "../assets/drone.webp";
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
      <Box p={{ base: 10, md: 20, lg: "200px" }}>
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
            <GridItem
              key={index}
              p={{ base: 0, md: 1 }}
              pb={{ base: 1, md: 1 }}
            >
              <Card p={{ base: 0, md: 10 }}>
                <CardHeader>
                  <Link href={product.github}>
                    <Box
                      as="div"
                      bgGradient="linear(to-r, gray.300, orange.100, yellow.400)"
                      align={"end"}
                      mr={10}
                    >
                      <Tooltip
                        label="Add to Wish list"
                        bg="white"
                        placement={"top"}
                        color={"gray.800"}
                        fontSize={"1.2em"}
                      >
                        <chakra.a href={"#"} display={"flex"}>
                          <Icon
                            position="absolute"
                            as={FaRegHeart}
                            boxSize={{ base: "24px", md: "24px" }}
                            _hover={{
                              color: "red.600",
                            }}
                            _click={{ color: "red.600",}}
                          />
                        </chakra.a>
                      </Tooltip>
                    </Box>
                  </Link>
                </CardHeader>
                <Center py={12}>
                  <Box
                    role={"group"}
                    p={6}
                    maxW={"330px"}
                    w={"full"}
                    bg={"white"}
                    boxShadow={"2xl"}
                    rounded={"lg"}
                    pos={"relative"}
                    zIndex={1}
                  >
                    <Link href={product.href}>
                      <Box
                        rounded={"lg"}
                        mt={-12}
                        pos={"relative"}
                        height={"230px"}
                        _after={{
                          transition: "all .3s ease",
                          content: '""',
                          w: "full",
                          h: "full",
                          pos: "absolute",
                          top: 5,
                          left: 0,
                          backgroundImage: `url(${pic})`,
                          filter: "blur(15px)",
                          zIndex: -1,
                        }}
                        _groupHover={{
                          _after: {
                            filter: "blur(20px)",
                          },
                        }}
                      >
                        <Image
                          rounded={"lg"}
                          // height={230}
                          // width={282}
                          objectFit={"cover"}
                          src={pic}
                          alt="#"
                        />
                      </Box>
                      <Stack pt={10} align={"center"}>
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
                          mt={1}
                          p={2}
                          bgGradient="linear(to-r, gray.300, orange.100, orange.100)"
                          align={"center"}
                          borderTopLeftRadius={40}
                          borderBottomRightRadius={40}
                          width="150px"
                          fontWeight={700}
                        >
                          $ 1999
                        </Box>
                        <Button
                          mt={10}
                          p={2}
                          colorScheme="black"
                          type="submit"
                          bgGradient={["linear(to-b, blue.700, gray.800)"]}
                          borderRadius="full"
                          boxShadow={
                            "0px 1px 25px -5px (blue.700 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                          }
                          _hover={{
                            bg: "gray.700",
                          }}
                          width="250px"
                          align={"center"}
                        >
                          Add To Cart
                        </Button>
                      </Stack>
                    </Link>
                  </Box>
                </Center>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Home;
