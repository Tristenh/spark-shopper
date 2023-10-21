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
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Nav() {
  const [showModal, setShowModal] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const initialRef = React.useRef(null);

  return (
    <HStack>
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

          <Button onClick={onOpen}>Login</Button>
          <Modal
            size="lg"
            show={showModal}
            onHide={() => setShowModal(false)}
            aria-labelledby="login-modal"
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Login Form</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {" "}
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input type='email' ref={initialRef} placeholder="Email" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Password</FormLabel>
                  <Input  type="password" placeholder="*******" />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant="ghost">Login</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Box
            ref={finalRef}
            tabIndex={-1}
            aria-label="Focus moved to this box"
          ></Box>

          <Button onClick={onOpen}>SignUp</Button>
          <Modal
            size="lg"
            show={showModal}
            onHide={() => setShowModal(false)}
            aria-labelledby="signup-modal"
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Signup Form</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {" "}
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input ref={initialRef} placeholder="Username" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input type='email' placeholder="Email" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Password</FormLabel>
                  <Input  type="password" placeholder="*******" />
                </FormControl>

              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant="ghost">Create my Account</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </HStack>
  );
}

export default Nav;
