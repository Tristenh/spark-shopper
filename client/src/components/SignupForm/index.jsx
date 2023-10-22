import { FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const mutationResponse = await addUser({
        variables: {
          email: formState.email,
          password: formState.password,
          userName: formState.userName,
          isAdmin: formState.isAdmin,
        },
      });
      const token = mutationResponse.data.addUser.token;

      Auth.login(token);
    } catch (error) {
      console.log(error);
    }
    setFormState({
      userName: "",
      email: "",
      password: "",
    });
  };

  const handleInput = (e) => {
    const type = e.target.name;
    const value = e.target.value;
    // set value of selected field
    if (type === "userName" || type === "email" || type === "password") {
      setFormState({ ...formState, [type]: value });
    }
  };
  const handleInputOnFocusOut = (e) => {
    const type = e.target.name;
    const value = e.target.value;
    // check if field left empty and email is invalid and set errormessage
    if (type === "email" && !validateEmail(value)) {
      setErrorMessage("Please enter valid email address");
    } else if (type === "userName" && (!value || value.length < 3)) {
      setErrorMessage("Please enter valid username  ");
    } else if (type === "password" && !value) {
      setErrorMessage("Please enter password");
    } else {
      setErrorMessage("");
    }
  };

  return (
    <Stack spacing={4} justify={{ base: "center", md: "space-between" }}>
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
            value={formState.userName}
            name="userName"
            onChange={handleInput}
            onBlur={handleInputOnFocusOut}
            placeholder="Username"
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
