//import component WishList and Cart
import WishList from "../components/WishList";
import Cart from "../components/Cart";
//importing CHAKRA UI components
import {
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Tab,
  Flex,
  Heading,
} from "@chakra-ui/react";
import Order from "./Order";
const Profile = () => {
  //renders wishlist and order history on profile page
  return (
    <>
      <Flex justify={"center"} mt={50} w="full">
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em" width="full">
            {/* Wish List*/}
            <Tab>
              <Heading color="#495C62" fontSize={20}>
                Wish List
              </Heading>
            </Tab>
            {/*Order History*/}
            <Tab>
              <Heading color="#495C62" fontSize={20}>
                Order History
              </Heading>
            </Tab>
          </TabList>
          <TabPanels>
            {/*Renders Wish List*/}
            <TabPanel>
              <WishList />
              <Cart />
            </TabPanel>
            {/*Renders Order History*/}
            <TabPanel>
              <Order />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
};

export default Profile;
