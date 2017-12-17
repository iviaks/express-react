import fetch from "node-fetch";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

export default new ApolloClient({
  link: new HttpLink({
    uri: "http://api.cooklist.co/graphql",
    fetch
  }),
  cache: new InMemoryCache()
});
