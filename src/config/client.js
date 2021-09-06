import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: `https://pangaea-interviews.now.sh/api/graphql`,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),

  defaultOptions: {
    query: {
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});

export default client;
