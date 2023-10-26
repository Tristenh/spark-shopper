//import component WishList
import WishList from "../components/WishList";
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
      <Flex justify={"center"} mt={50}>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>
              {/**/}
              <Heading color="#495C62" fontSize={20}>
                Wish List
              </Heading>
            </Tab>
            <Tab>
              <Heading color="#495C62" fontSize={20}>
                Order History
              </Heading>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>
                <WishList />
              </p>
            </TabPanel>
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
