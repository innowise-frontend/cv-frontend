/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  "mutation ForgotPassword($auth: ForgotPasswordInput!) {\n  forgotPassword(auth: $auth)\n}\n\nmutation ResetPassword($auth: ResetPasswordInput!) {\n  resetPassword(auth: $auth)\n}\n\nmutation ChangePassword($args: ChangePasswordInput!) {\n  changePassword(args: $args) {\n    id\n    email\n  }\n}\n\nmutation verifyMail($otp: String!) {\n  verifyMail(mail: {otp: $otp})\n}": typeof types.ForgotPasswordDocument;
  "mutation Login($auth: AuthInput!) {\n  login(auth: $auth) {\n    user {\n      id\n    }\n    access_token\n    refresh_token\n  }\n}": typeof types.LoginDocument;
  "mutation Signup($auth: AuthInput!) {\n  signup(auth: $auth) {\n    user {\n      id\n    }\n    access_token\n    refresh_token\n  }\n}": typeof types.SignupDocument;
  "mutation UpdateToken {\n  updateToken {\n    access_token\n    refresh_token\n  }\n}": typeof types.UpdateTokenDocument;
  "query Me {\n  me {\n    role\n  }\n}": typeof types.MeDocument;
};
const documents: Documents = {
  "mutation ForgotPassword($auth: ForgotPasswordInput!) {\n  forgotPassword(auth: $auth)\n}\n\nmutation ResetPassword($auth: ResetPasswordInput!) {\n  resetPassword(auth: $auth)\n}\n\nmutation ChangePassword($args: ChangePasswordInput!) {\n  changePassword(args: $args) {\n    id\n    email\n  }\n}\n\nmutation verifyMail($otp: String!) {\n  verifyMail(mail: {otp: $otp})\n}":
    types.ForgotPasswordDocument,
  "mutation Login($auth: AuthInput!) {\n  login(auth: $auth) {\n    user {\n      id\n    }\n    access_token\n    refresh_token\n  }\n}":
    types.LoginDocument,
  "mutation Signup($auth: AuthInput!) {\n  signup(auth: $auth) {\n    user {\n      id\n    }\n    access_token\n    refresh_token\n  }\n}":
    types.SignupDocument,
  "mutation UpdateToken {\n  updateToken {\n    access_token\n    refresh_token\n  }\n}":
    types.UpdateTokenDocument,
  "query Me {\n  me {\n    role\n  }\n}": types.MeDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation ForgotPassword($auth: ForgotPasswordInput!) {\n  forgotPassword(auth: $auth)\n}\n\nmutation ResetPassword($auth: ResetPasswordInput!) {\n  resetPassword(auth: $auth)\n}\n\nmutation ChangePassword($args: ChangePasswordInput!) {\n  changePassword(args: $args) {\n    id\n    email\n  }\n}\n\nmutation verifyMail($otp: String!) {\n  verifyMail(mail: {otp: $otp})\n}",
): (typeof documents)["mutation ForgotPassword($auth: ForgotPasswordInput!) {\n  forgotPassword(auth: $auth)\n}\n\nmutation ResetPassword($auth: ResetPasswordInput!) {\n  resetPassword(auth: $auth)\n}\n\nmutation ChangePassword($args: ChangePasswordInput!) {\n  changePassword(args: $args) {\n    id\n    email\n  }\n}\n\nmutation verifyMail($otp: String!) {\n  verifyMail(mail: {otp: $otp})\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation Login($auth: AuthInput!) {\n  login(auth: $auth) {\n    user {\n      id\n    }\n    access_token\n    refresh_token\n  }\n}",
): (typeof documents)["mutation Login($auth: AuthInput!) {\n  login(auth: $auth) {\n    user {\n      id\n    }\n    access_token\n    refresh_token\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation Signup($auth: AuthInput!) {\n  signup(auth: $auth) {\n    user {\n      id\n    }\n    access_token\n    refresh_token\n  }\n}",
): (typeof documents)["mutation Signup($auth: AuthInput!) {\n  signup(auth: $auth) {\n    user {\n      id\n    }\n    access_token\n    refresh_token\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation UpdateToken {\n  updateToken {\n    access_token\n    refresh_token\n  }\n}",
): (typeof documents)["mutation UpdateToken {\n  updateToken {\n    access_token\n    refresh_token\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query Me {\n  me {\n    role\n  }\n}",
): (typeof documents)["query Me {\n  me {\n    role\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
