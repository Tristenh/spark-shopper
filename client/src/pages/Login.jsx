import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
// import { LOGIN } from "../utils/mutations";

// Here we import a helper function that will check if the email is valid
import { validateEmail } from "../utils/helpers";

export default function Login() {
  // Create state variables for the fields in the form
  // We are also setting their initial values to an empty string
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  //   const [login, { error }] = useMutation(LOGIN);
  const [formState, setFormState] = useState({ email: "", userName: "" });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });

    // Based on the input type, we set the state of either email, username, and password
    if (inputType === "email") {
      setEmail(inputValue);
    } else if (inputType === "userName") {
      setUserName(inputValue);
    }
  };
  const handleBlur = (e) => {
    // This function is called when an input field loses focus (on blur)
    const { name, value } = e.target;

    // Check for errors when an input field loses focus
    if (
      (name === "email" && !validateEmail(value)) ||
      (name === "userName" && !value)
    ) {
      setErrorMessage("Email or username is invalid");
    } else {
      // Clear the error message if there are no errors
      setErrorMessage("");
    }
  };
  const handleInvalid = (e) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    e.preventDefault();
    // Clear the error message if there are no errors
    setErrorMessage("");
    // First we check to see if the email is not valid or if the userName is empty. If so we set an error message to be displayed on the page.
    if (!validateEmail(email) || !email) {
      setErrorMessage("Email invalid");
      // We want to exit out of this code block if something is wrong so that the user can correct it
      return;
    }
    if (!userName) {
      setErrorMessage("username is invalid");
      // We want to exit out of this code block if something is wrong so that the user can correct it
      return;
    }
    if (userName.length < 3) {
      setErrorMessage("username minimum 3 characters");
      // We want to exit out of this code block if something is wrong so that the user can correct it
      return;
    }
    if (userName.length > 30) {
      setErrorMessage("username max 30 characters");
      // We want to exit out of this code block if something is wrong so that the user can correct it
      return;
    }

    // If everything goes according to plan, we want to clear out the input after a successful registration.
    setUserName("");
    setEmail("");
  };
  return (
    <>
      <Center mt={"5rem"} maxW="100vw">
        <form
          onSubmit={(e) => {
            handleInvalid(e);
            handleFormSubmit(e);
          }}
        >
          <FormLabel ml="1rem">Sign up</FormLabel>
          <FormControl
            onSubmit={(e) => {
              handleInvalid(e);
              handleFormSubmit(e);
            }}
            isRequired
          >
            <FormLabel ml="1rem">Name:</FormLabel>
            <Input
              value={userName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              name="userName"
              type="text"
              w="100vw"
              maxW="50rem"
            />
            <FormLabel ml="1rem">Email address:</FormLabel>
            <Input
              value={email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              type="email"
              name="email"
              w="100vw"
              maxW="50rem"
            />
            <Center>
              <Button type="submit" w={"20rem"} mt={"2rem"} colorscheme="green">
                Submit
              </Button>
            </Center>
            {errorMessage && (
              <div>
                <p style={{ color: "red" }}>{errorMessage}</p>
              </div>
            )}
          </FormControl>
        </form>
      </Center>
    </>
  );
}
