// import required packages
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import {
  Grid,
  Flex,
  VStack,
  Box,
  Card,
  CardBody,
  Text,
} from "@chakra-ui/react";

// queires user data
function Order() {
  const { data, loading } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }
  // if data loading
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Flex justify={"center"} mt={50}>
      {user ? (
        <VStack>
          {/* back to products page link */}
          <Link to="/" color="black">
            ← Back to Products
          </Link>

          {/* title */}
          <Text  as='b' >Order History for {user.username}</Text>
          {user.orders.map((order) => (
            <div key={order._id}>
              {/* purchase date  */}
              <Text  as='b'>
                {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
              </Text>

              {/* card wraps around all orders */}
              <Card>
                {/* grid layout for induvidual product cards */}
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                  }}
                  gap={4}
                >
                  {order.products.map(({ _id, image, name, price }) => (
                    // induvidual product card
                    <Card key={_id} p={{ base: 0, md: 5 }}>
                      <CardBody>
                        {/* link to product page */}
                        <Link to={`/products/${_id}`}>
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
                            h={500}
                          >
                            <img alt={name} src={`/images/${image}`} />
                            {/* product name */}
                            <Text
                              pt={10}
                              fontSize={"md"}
                              pb={"10px"}
                              align={"center"}
                              fontWeight={700}
                            >
                              {name}
                            </Text>
                            {/* price box */}
                            <VStack pos={"center"} zIndex={-1} mt={"20px"}>
                              <Box
                                p={2}
                                bgGradient="linear(to-r, #94948C, yellow.400, #94948C)"
                                align={"center"}
                                borderRadius={5}
                                width="150px"
                                fontWeight={700}
                                mb={-3}
                                mt={0}
                              >
                                {`$${price}`}
                              </Box>
                            </VStack>
                          </Box>
                          <Box
                            rounded={"lg"}
                            mt={-20}
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
                              filter: "blur(15px)",
                              zIndex: -1,
                            }}
                            _groupHover={{
                              _after: {
                                filter: "blur(20px)",
                              },
                            }}
                          ></Box>
                        </Link>
                      </CardBody>
                    </Card>
                  ))}
                </Grid>
              </Card>
            </div>
          ))}
        </VStack>
      ) : null}
    </Flex>
  );
}

// export Order
export default Order;
