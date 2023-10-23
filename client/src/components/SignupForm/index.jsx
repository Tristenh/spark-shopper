// import components from chakra
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
  Text
} from "@chakra-ui/react";

// import packages from react
import { useState } from "react";
import { useMutation } from "@apollo/client";

//import methods from files
import Auth from "../../utils/auth";
import { ADD_USER } from "../../utils/mutations";

// Here we import a helper function that will check if the email is valid
import { validateEmail } from "../../utils/helpers";

function SignupForm(props) {
  //set state to empty strings
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // add user mutation to signup
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // get output of add user
    try {
      const mutationResponse = await addUser({
        variables: {
          email: formState.email,
          password: formState.password,
          username: formState.username,
        },
      });
      // get token from output and save it in local storage
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    } catch (error) {
      console.log(error);
    }
    // after submit, set empty form state
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
    // check if any field left empty and email is invalid and set errormessage
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
    <Stack textColor={"white"} spacing={4} justify={{ base: "center", md: "space-between" }}>
      {/* modal to display signup form  */}
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
           {/* if state of error message changes */}
        {errorMessage && (
         <Stack>
            <Text fontSize={"1xl"} color={"white"}>{errorMessage}</Text>
          </Stack>
        )}
        </ModalBody>

        <ModalFooter>
          <Button
             _hover={{ bg: "gray.400" }}
            mr={3}
            onClick={() => {
              props.close();
            }}
          >
            Close
          </Button>
          <Button    _hover={{ bg: "gray.400" }} type="submit">Create my Account</Button>
        </ModalFooter>
       
      </form>
    </Stack>
  );
}

export default SignupForm;
