// import packages from react
import React from "react";

// import components from chakra
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
  Button,
  useDisclosure,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

// import icons
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";

//import functions from files
import Auth from "../../utils/auth";
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";

function Nav() {
  // set state for modal open and close
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  // const initialRef = React.useRef(null);

  return (
    <HStack
      spacing={0}
      align="center"
      justify={{ base: "center", md: "space-between" }}
    >
      {/* if logged in then display profile and logout button */}
      {Auth.loggedIn() ? (
        <>
          <HStack as={"nav"} spacing={8} 
           >
            <Link to="/order">
              {/* profile button */}
              <Button
                variant="ghost"
                cursor={"pointer"}
                display={"inline-block"}
                verticalAlign={"middle"}
                _hover={{ bg: "gray.400" }}
              >
                <Box
                  display={"inline-block"}
                  verticalAlign={"middle"}
                  align="center"
                  color={"white"}
                  _hover={{ color: "black" }}
                >
                  {" "}
                  <Avatar size={"2xs"} />
                  <Text> Profile</Text>
                </Box>
              </Button>
            </Link>
            {/* logout button */}
            <Button
              variant="ghost"
              cursor={"pointer"}
              display={"inline-block"}
              verticalAlign={"middle"}
              onClick={Auth.logout}
              _hover={{ bg: "gray.400" }}
            >
              <Box
                display={"inline-block"}
                verticalAlign={"middle"}
                align="center"
                color={"white"}
                _hover={{ color: "black" }}
              >
                {" "}
                <MdOutlineLogout />
                <Text fontSize={"1.25rem"}> Logout</Text>
              </Box>{" "}
            </Button>
          </HStack>
        </>
      ) : (
        <>
          <Box
            ref={finalRef}
            tabIndex={-1}
            aria-label="Focus moved to this box"
          ></Box>
          {/* on loggin out, it displays login button */}
          <Button variant="ghost" onClick={onOpen}  _hover={{ bg: "gray.400" }}>
            <Box
              display={"inline-block"}
              verticalAlign={"middle"}
              align="center"
              color={"white"}
              _hover={{ color: "black" }}
            >
              <MdOutlineLogin /> <Text fontSize={"1.25rem"}> Login</Text>
            </Box>
          </Button>
          <Modal
            size={{ base: "xs", md: "lg" }}
           
            aria-labelledby="login-modal"
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent bg={"back.900"}>
              {/* tabs to switch between login and signup */}
              <Tabs>
                <TabList>
                  <Tab  textColor={"white"} _selected={{bg: "gray.300",color:"black"}} fontSize={"2xl"}>Login</Tab>
                  <Tab textColor={"white"}_selected={{bg: "gray.400" ,color:"black"}} fontSize={"2xl"}> Signup</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <LoginForm close={onClose} />
                  </TabPanel>
                  <TabPanel>
                    <SignupForm close={onClose} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </ModalContent>
          </Modal>
        </>
      )}
    </HStack>
  );
}

export default Nav;
