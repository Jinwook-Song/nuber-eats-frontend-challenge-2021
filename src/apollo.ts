import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(false);

export const client = new ApolloClient({
  uri: "https://nuber-eats-backend-challenge-j.herokuapp.com/graphql",
  cache: new InMemoryCache({
    // save local state into cache
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return Boolean(localStorage.getItem("token"));
              // return isLoggedInVar();
            },
          },
        },
      },
    },
  }),
});
