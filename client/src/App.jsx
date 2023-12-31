import { ChakraProvider } from "@chakra-ui/react";
import { Grid } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { theme } from "./styles/theme.jsx";
import Header from "./components/Header";
import { StoreProvider } from "./utils/GlobalState";
import "./App.css";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme} >
        <StoreProvider>
          <Header />
          <Grid>
            <Outlet />
          </Grid>
        </StoreProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
