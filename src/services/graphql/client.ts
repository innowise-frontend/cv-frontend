import { GraphQLClient } from "graphql-request";

const url = import.meta.env.VITE_GRAPHQL_URL;

export const graphqlClient = new GraphQLClient(url, {
  headers: {
    "Content-Type": "application/json",
  },
});
