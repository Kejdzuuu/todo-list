import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';

const uri = 'http://localhost:4000';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: uri
  })
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
