import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from "@apollo/client";

import { LOGIN } from "../../utils/mutations";
import Auth from "../../utils/auth";

// Here we import a helper function that will check if the email is valid
import { validateEmail } from "../../utils/helpers";

export default function LoginForm(props) {
  // Create state variables for the fields in the form
  // We are also setting their initial values to an empty string

  const [errorMessage, setErrorMessage] = useState("");
  const [login, { error }] = useMutation(LOGIN);
  const [formState, setFormState] = useState({ email: "", password: "" });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
      // if no error message then submit successfully
      if (!errorMessage) {
        console.log("Login successfully", formState);
        setFormState({ email: "", password: "" });
      } else {
        setErrorMessage("incorrect email or password ");
      }
    } catch (error) {
      console.log(error);
    }
    setFormState({
      email: "",
      password: "",
    });
  };

  const handleInput = (e) => {
    const type = e.target.name;
    const value = e.target.value;
    // set value of selected field
    if (type === "email" || type === "password") {
      setFormState({ ...formState, [type]: value });
    }
  };

  const handleInputOnFocusOut = (e) => {
    const type = e.target.name;
    const value = e.target.value;
    // check if field left empty and email is invalid and set errormessage
    if (type === "email" && !validateEmail(value)) {
      setErrorMessage("Please enter valid email address");
    } else if (type === "password" && !value) {
      setErrorMessage("Please enter password");
    } else {
      setErrorMessage("");
    }
  };

  return (
    <Stack spacing={4} justify={{ base: "center", md: "space-between" }}>
      <ModalHeader>Login Form</ModalHeader>
      <ModalCloseButton />{" "}
      <form
        onSubmit={(e) => {
          handleFormSubmit(e);
        }}
      >
        <ModalBody>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              value={formState.email}
              type="email"
              name="email"
              onChange={handleInput}
              onBlur={handleInputOnFocusOut}
              // ref={initialRef}
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
          <Button type="submit">Login</Button>
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
