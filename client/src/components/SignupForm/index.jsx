import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_USER } from "../../utils/mutations";
import { validateEmail } from "../../utils/helpers";

function SignupForm(props) {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    username: "",
  
  });
  const [addUser] = useMutation(ADD_USER);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);
    try {
      const mutationResponse = await addUser({
        variables: {
          email: formState.email,
          password: formState.password,
          username: formState.username,
        },
      });
      console.log(mutationResponse)
      const token = mutationResponse.data.addUser.token;
      console.log("successful")

      Auth.login(token);
    } catch (error) {
      console.log(error);
    }
    setFormState({
      username: "",
      email: "",
      password: "",
    });
  };

  const handleInput = (e) => {
    const type = e.target.name;
    const value = e.target.value;
    // set value of selected field
    if (type === "username" || type === "email" || type === "password") {
      setFormState({ ...formState, [type]: value });
    }
  };
  const handleInputOnFocusOut = (e) => {
    const type = e.target.name;
    const value = e.target.value;
    // check if field left empty and email is invalid and set errormessage
    if (type === "email" && !validateEmail(value)) {
      setErrorMessage("Please enter valid email address");
    } else if (type === "username" && (!value || value.length < 3)) {
      setErrorMessage("Please enter valid username  ");
    } else if (type === "password" && !value) {
      setErrorMessage("Please enter password");
    } else {
      setErrorMessage("");
    }
  };

  return (
    <Stack spacing={4} justify={{ base: "center", md: "space-between" }}>
     
      <ModalHeader>Signup Form</ModalHeader>
      <ModalCloseButton />{" "}
      <form
        onSubmit={(e) => {
          handleFormSubmit(e);
        }}
      >
        <ModalBody>
          <FormControl>
            <FormLabel>username</FormLabel>
            {/* <Input ref={initialRef} placeholder="username" /> */}
            <Input
              type="username"
              value={formState.username}
              name="username"
              onChange={handleInput}
              onBlur={handleInputOnFocusOut}
              placeholder="username"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input
              value={formState.email}
              type="email"
              name="email"
              onChange={handleInput}
              onBlur={handleInputOnFocusOut}
              placeholder="Email"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleInput}
              onBlur={handleInputOnFocusOut}
              placeholder="*******"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            mr={3}
            onClick={() => {
              props.close();
            }}
          >
            Close
          </Button>
          <Button type="submit">Create my Account</Button>
        </ModalFooter>
        {errorMessage && (
          <div>
            <p style={{ color: "red" }}>{errorMessage}</p>
          </div>
        )}
      </form>
     
    </Stack>
  );
}

export default SignupForm;
