import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8000/api/graphql",
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:8000"
  },
  cache: new InMemoryCache()
});

export default client;
