import { ClientError, GraphQLClient, RequestDocument } from "graphql-request";
import { LOCAL_STORAGE_KEYS } from "@constants/localStorage";
import { UpdateTokenDocument } from "./__generated__/graphql";

const url = import.meta.env.VITE_GRAPHQL_URL;

export const graphqlClient = new GraphQLClient(url, {
  headers: {
    "Content-Type": "application/json",
  },
});

const getAuthHeader = (token: string | null): Record<string, string> | undefined =>
  token ? { Authorization: `Bearer ${token}` } : undefined;

const isUnauthorizedError = (error: unknown): error is ClientError => {
  if (!(error instanceof ClientError)) {
    return false;
  }

  if (error.response.status === 401) {
    return true;
  }

  return (
    error.response.errors?.some(({ message }) => {
      const normalizedMessage = message.toLowerCase();

      return (
        normalizedMessage.includes("unauthorized") || normalizedMessage.includes("unathorized")
      );
    }) ?? false
  );
};

export async function requestWithAuth<TData, TVariables extends object>(
  document: RequestDocument,
  variables?: TVariables,
): Promise<TData> {
  const token = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN) || "null");

  try {
    return await graphqlClient.request<TData>(document, variables, getAuthHeader(token));
  } catch (error) {
    if (isUnauthorizedError(error)) {
      const refreshToken = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN) || "null",
      );

      if (!refreshToken) {
        throw error;
      }

      const response = await graphqlClient.request(
        UpdateTokenDocument,
        undefined,
        getAuthHeader(refreshToken),
      );
      const newToken = response.updateToken.access_token;
      const newRefreshToken = response.updateToken.refresh_token;

      localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, JSON.stringify(newToken));
      localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, JSON.stringify(newRefreshToken));

      return await graphqlClient.request<TData>(document, variables, getAuthHeader(newToken));
    }

    throw error;
  }
}
