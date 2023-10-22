import React from "react";
import Auth from "../../utils/auth";
import { useState } from "react";
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
import { MdOutlineCreate, MdOutlineLogout } from "react-icons/md";
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";

function Nav() {
  const [showModal, setShowModal] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  // const initialRef = React.useRef(null);

  return (
    <HStack
      spacing={0}
      align="center"
      justify={{ base: "center", md: "space-between" }}
    >
      {Auth.loggedIn() ? (
        <>
          {/* <Box as={Link} to="/">
            See Your Books
          </Box> */}
          <HStack as={"nav"} spacing={8}>
            <Button
              variant="ghost"
              cursor={"pointer"}
              display={"inline-block"}
              verticalAlign={"middle"}
            >
              <Box
                display={"inline-block"}
                verticalAlign={"middle"}
                align="center"
              >
                {" "}
                <Avatar size={"2xs"} />
                <Text> Profile</Text>
              </Box>
            </Button>
            <Button
              variant="ghost"
              cursor={"pointer"}
              display={"inline-block"}
              verticalAlign={"middle"}
              onClick={Auth.logout}
            >
              <Box
                display={"inline-block"}
                verticalAlign={"middle"}
                align="center"
              >
                {" "}
                <MdOutlineLogout />
                <Text fontSize={"1xl"}> Logout</Text>
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
          <Button variant="ghost" onClick={onOpen}>
            {/* <Button variant="ghost" onClick={() => setShowModal(true)} > */}
            <Box
              display={"inline-block"}
              verticalAlign={"middle"}
              align="center"
            >
              <MdOutlineCreate /> <Text> Login/Signup</Text>
            </Box>
          </Button>
          <Modal
            size={{ base: "xs", md: "lg" }}
            show={showModal}
            onHide={() => setShowModal(false)}
            aria-labelledby="login-modal"
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent bg={"back.900"}>
              <Tabs>
                <TabList>
                  <Tab>Login</Tab>
                  <Tab>Signup</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <LoginForm />
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
