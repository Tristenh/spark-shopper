import { FormControl, FormLabel, Input,Stack } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_USER } from "../../utils/mutations";
import { validateEmail } from "../../utils/helpers";

function SignupForm() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    userName: "",
    isAdmin: false,
  });
  const [addUser] = useMutation(ADD_USER);
  const [errorMessage, setErrorMessage] = useState("");

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
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
        isAdmin: formState.isAdmin,
      },
    });
    const token = mutationResponse.data.addUser.token;

    Auth.login(token);
  };

  const handleInput = (e) => {
    const type = e.target.name;
    const value = e.target.value;
    // set value of selected field
    if (type === "userName" || type === "email" || type === "password") {
      setFormState({ ...formState, [type]: value });
    }
  };

  return (
    <Stack
      spacing={4}
      
      justify={{ base: "center", md: "space-between" }}
    >
      <h2>Signup</h2>
      <form
        onSubmit={(e) => {
          handleFormSubmit(e);
        }}
      >
        <FormControl>
          <FormLabel>Username</FormLabel>
          {/* <Input ref={initialRef} placeholder="Username" /> */}
          <Input
            type="username"
            value={formState.user}
            name="email"
            onChange={handleInput}
            onBlur={handleInputOnFocusOut}
            placeholder="Username"
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Email" />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="*******" />
        </FormControl>
      </form>
    </Stack>
  );
}

export default SignupForm;
