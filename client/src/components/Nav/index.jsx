import React from "react";
import Auth from "../../utils/auth";
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdOutlineCreate } from "react-icons/md";
import LoginForm from "../LoginForm";
import SignupForm  from "../SignupForm";
function Nav() {
  const [showModal, setShowModal] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  // const initialRef = React.useRef(null);

  return (
    <HStack spacing={0}>
      {Auth.loggedIn() ? (
        <>
          <Nav.Link as={Link} to="/saved">
            See Your Books
          </Nav.Link>
          <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
        </>
      ) : (
        <>
          <Box
            ref={finalRef}
            tabIndex={-1}
            aria-label="Focus moved to this box"
          ></Box>
          <Button variant="ghost"  onClick={onOpen}>

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
            size={{base:"xs", md:"lg"}}
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
                  <Tab >Login</Tab>
                  <Tab >Signup</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel >
                  <ModalHeader>Login Form</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      {" "}
                     <LoginForm/>
                    </ModalBody>

                    <ModalFooter>
                      <Button mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button>Login</Button>
                    </ModalFooter>
                  </TabPanel>
                  <TabPanel>
                    <ModalHeader>Signup Form</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      {" "}
                      <SignupForm/>
                    </ModalBody>

                    <ModalFooter>
                      <Button mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button>Create my Account</Button>
                    </ModalFooter>
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
