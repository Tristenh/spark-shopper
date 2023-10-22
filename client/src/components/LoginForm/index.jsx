import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from "@apollo/client";

import { LOGIN } from "../../utils/mutations";
import Auth from "../../utils/auth";

// Here we import a helper function that will check if the email is valid
import { validateEmail } from "../../utils/helpers";

export default function LoginForm() {
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
  // const handleInvalid = (e) => {
  //   // Preventing the default behavior of the form submit (which is to refresh the page)
  //   e.preventDefault();
  //   // Clear the error message if there are no errors
  //   setErrorMessage("");
  //   // First we check to see if the email is not valid or if the userName is empty. If so we set an error message to be displayed on the page.
  //   if (!validateEmail(email) || !email) {
  //     setErrorMessage("Email invalid");
  //     // We want to exit out of this code block if something is wrong so that the user can correct it
  //     return;
  //   }
  //   if (!userName) {
  //     setErrorMessage("username is invalid");
  //     // We want to exit out of this code block if something is wrong so that the user can correct it
  //     return;
  //   }
  //   if (userName.length < 3) {
  //     setErrorMessage("username minimum 3 characters");
  //     // We want to exit out of this code block if something is wrong so that the user can correct it
  //     return;
  //   }
  //   if (userName.length > 30) {
  //     setErrorMessage("username max 30 characters");
  //     // We want to exit out of this code block if something is wrong so that the user can correct it
  //     return;
  //   }

  //   // If everything goes according to plan, we want to clear out the input after a successful registration.
  //   setUserName("");
  //   setEmail("");
  // };
  return (
    <>
      <form
        onSubmit={(e) => {
          handleFormSubmit(e);
        }}
      >
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
        {errorMessage && (
          <div>
            <p style={{ color: "red" }}>{errorMessage}</p>
          </div>
        )}
      </form>
      {/* <form
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
          </form> */}
    </>
  );
}
