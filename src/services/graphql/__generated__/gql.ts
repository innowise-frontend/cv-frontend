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
  "mutation AddProfileLanguage($language: AddProfileLanguageInput!) {\n  addProfileLanguage(language: $language) {\n    languages {\n      name\n      proficiency\n    }\n  }\n}": typeof types.AddProfileLanguageDocument;
  "mutation ChangePassword($args: ChangePasswordInput!) {\n  changePassword(args: $args) {\n    id\n    email\n  }\n}": typeof types.ChangePasswordDocument;
  "mutation DeleteProfileLanguage($language: DeleteProfileLanguageInput!) {\n  deleteProfileLanguage(language: $language) {\n    languages {\n      name\n      proficiency\n    }\n  }\n}": typeof types.DeleteProfileLanguageDocument;
  "mutation ForgotPassword($auth: ForgotPasswordInput!) {\n  forgotPassword(auth: $auth)\n}": typeof types.ForgotPasswordDocument;
  "mutation Login($auth: AuthInput!) {\n  login(auth: $auth) {\n    user {\n      id\n    }\n    access_token\n    refresh_token\n  }\n}": typeof types.LoginDocument;
  "mutation ResetPassword($auth: ResetPasswordInput!) {\n  resetPassword(auth: $auth)\n}": typeof types.ResetPasswordDocument;
  "mutation sendVerification($email: String!) {\n  sendVerification(email: $email)\n}": typeof types.SendVerificationDocument;
  "mutation Signup($auth: AuthInput!) {\n  signup(auth: $auth) {\n    user {\n      id\n    }\n    access_token\n    refresh_token\n  }\n}": typeof types.SignupDocument;
  "mutation UpdateProfileLanguage($language: UpdateProfileLanguageInput!) {\n  updateProfileLanguage(language: $language) {\n    languages {\n      name\n      proficiency\n    }\n  }\n}": typeof types.UpdateProfileLanguageDocument;
  "mutation UpdateProfile($profile: UpdateProfileInput!) {\n  updateProfile(profile: $profile) {\n    id\n    first_name\n    last_name\n    full_name\n    avatar\n  }\n}": typeof types.UpdateProfileDocument;
  "mutation UpdateToken {\n  updateToken {\n    access_token\n    refresh_token\n  }\n}": typeof types.UpdateTokenDocument;
  "mutation UpdateUser($user: UpdateUserInput!) {\n  updateUser(user: $user) {\n    id\n    created_at\n    email\n    is_verified\n    role\n    department_name\n    position_name\n    profile {\n      id\n      created_at\n      first_name\n      last_name\n      full_name\n      avatar\n    }\n    department {\n      id\n      name\n    }\n    position {\n      id\n      name\n    }\n  }\n}": typeof types.UpdateUserDocument;
  "mutation UploadAvatar($avatar: UploadAvatarInput!) {\n  uploadAvatar(avatar: $avatar)\n}": typeof types.UploadAvatarDocument;
  "mutation verifyMail($otp: String!) {\n  verifyMail(mail: {otp: $otp})\n}": typeof types.VerifyMailDocument;
  "query Languages($params: SearchPaginationInput!) {\n  languages(params: $params) {\n    items {\n      id\n      name\n      native_name\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}": typeof types.LanguagesDocument;
  "query Me {\n  me {\n    role\n    id\n  }\n}": typeof types.MeDocument;
  "query Profile($userId: ID!) {\n  profile(userId: $userId) {\n    languages {\n      name\n      proficiency\n    }\n  }\n}": typeof types.ProfileDocument;
  "query Me {\n  me {\n    id\n    is_verified\n    role\n  }\n}": typeof types.MeDocument;
  "query user($userId: ID!) {\n  user(userId: $userId) {\n    id\n    email\n    created_at\n    department {\n      id\n      name\n    }\n    position {\n      id\n      name\n    }\n    profile {\n      avatar\n      email\n      first_name\n      last_name\n      full_name\n      created_at\n    }\n  }\n  departments {\n    id\n    name\n  }\n  positions {\n    id\n    name\n  }\n}": typeof types.UserDocument;
  "query Users($params: SearchPaginationInput!) {\n  users(params: $params) {\n    items {\n      id\n      department_name\n      position_name\n      email\n      profile {\n        last_name\n        first_name\n        avatar\n      }\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}": typeof types.UsersDocument;
};
const documents: Documents = {
  "mutation AddProfileLanguage($language: AddProfileLanguageInput!) {\n  addProfileLanguage(language: $language) {\n    languages {\n      name\n      proficiency\n    }\n  }\n}":
    types.AddProfileLanguageDocument,
  "mutation ChangePassword($args: ChangePasswordInput!) {\n  changePassword(args: $args) {\n    id\n    email\n  }\n}":
    types.ChangePasswordDocument,
  "mutation DeleteProfileLanguage($language: DeleteProfileLanguageInput!) {\n  deleteProfileLanguage(language: $language) {\n    languages {\n      name\n      proficiency\n    }\n  }\n}":
    types.DeleteProfileLanguageDocument,
  "mutation ForgotPassword($auth: ForgotPasswordInput!) {\n  forgotPassword(auth: $auth)\n}":
    types.ForgotPasswordDocument,
  "mutation Login($auth: AuthInput!) {\n  login(auth: $auth) {\n    user {\n      id\n    }\n    access_token\n    refresh_token\n  }\n}":
    types.LoginDocument,
  "mutation ResetPassword($auth: ResetPasswordInput!) {\n  resetPassword(auth: $auth)\n}":
    types.ResetPasswordDocument,
  "mutation sendVerification($email: String!) {\n  sendVerification(email: $email)\n}":
    types.SendVerificationDocument,
  "mutation Signup($auth: AuthInput!) {\n  signup(auth: $auth) {\n    user {\n      id\n    }\n    access_token\n    refresh_token\n  }\n}":
    types.SignupDocument,
  "mutation UpdateProfileLanguage($language: UpdateProfileLanguageInput!) {\n  updateProfileLanguage(language: $language) {\n    languages {\n      name\n      proficiency\n    }\n  }\n}":
    types.UpdateProfileLanguageDocument,
  "mutation UpdateProfile($profile: UpdateProfileInput!) {\n  updateProfile(profile: $profile) {\n    id\n    first_name\n    last_name\n    full_name\n    avatar\n  }\n}":
    types.UpdateProfileDocument,
  "mutation UpdateToken {\n  updateToken {\n    access_token\n    refresh_token\n  }\n}":
    types.UpdateTokenDocument,
  "mutation UpdateUser($user: UpdateUserInput!) {\n  updateUser(user: $user) {\n    id\n    created_at\n    email\n    is_verified\n    role\n    department_name\n    position_name\n    profile {\n      id\n      created_at\n      first_name\n      last_name\n      full_name\n      avatar\n    }\n    department {\n      id\n      name\n    }\n    position {\n      id\n      name\n    }\n  }\n}":
    types.UpdateUserDocument,
  "mutation UploadAvatar($avatar: UploadAvatarInput!) {\n  uploadAvatar(avatar: $avatar)\n}":
    types.UploadAvatarDocument,
  "mutation verifyMail($otp: String!) {\n  verifyMail(mail: {otp: $otp})\n}":
    types.VerifyMailDocument,
  "query Languages($params: SearchPaginationInput!) {\n  languages(params: $params) {\n    items {\n      id\n      name\n      native_name\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}":
    types.LanguagesDocument,
  "query Me {\n  me {\n    role\n    id\n  }\n}": types.MeDocument,
  "query Profile($userId: ID!) {\n  profile(userId: $userId) {\n    languages {\n      name\n      proficiency\n    }\n  }\n}":
    types.ProfileDocument,
  "query Me {\n  me {\n    id\n    is_verified\n    role\n  }\n}": types.MeDocument,
  "query user($userId: ID!) {\n  user(userId: $userId) {\n    id\n    email\n    created_at\n    department {\n      id\n      name\n    }\n    position {\n      id\n      name\n    }\n    profile {\n      avatar\n      email\n      first_name\n      last_name\n      full_name\n      created_at\n    }\n  }\n  departments {\n    id\n    name\n  }\n  positions {\n    id\n    name\n  }\n}":
    types.UserDocument,
  "query Users($params: SearchPaginationInput!) {\n  users(params: $params) {\n    items {\n      id\n      department_name\n      position_name\n      email\n      profile {\n        last_name\n        first_name\n        avatar\n      }\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}":
    types.UsersDocument,
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
  source: "mutation AddProfileLanguage($language: AddProfileLanguageInput!) {\n  addProfileLanguage(language: $language) {\n    languages {\n      name\n      proficiency\n    }\n  }\n}",
): (typeof documents)["mutation AddProfileLanguage($language: AddProfileLanguageInput!) {\n  addProfileLanguage(language: $language) {\n    languages {\n      name\n      proficiency\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation ChangePassword($args: ChangePasswordInput!) {\n  changePassword(args: $args) {\n    id\n    email\n  }\n}",
): (typeof documents)["mutation ChangePassword($args: ChangePasswordInput!) {\n  changePassword(args: $args) {\n    id\n    email\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation DeleteProfileLanguage($language: DeleteProfileLanguageInput!) {\n  deleteProfileLanguage(language: $language) {\n    languages {\n      name\n      proficiency\n    }\n  }\n}",
): (typeof documents)["mutation DeleteProfileLanguage($language: DeleteProfileLanguageInput!) {\n  deleteProfileLanguage(language: $language) {\n    languages {\n      name\n      proficiency\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation ForgotPassword($auth: ForgotPasswordInput!) {\n  forgotPassword(auth: $auth)\n}",
): (typeof documents)["mutation ForgotPassword($auth: ForgotPasswordInput!) {\n  forgotPassword(auth: $auth)\n}"];
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
  source: "mutation ResetPassword($auth: ResetPasswordInput!) {\n  resetPassword(auth: $auth)\n}",
): (typeof documents)["mutation ResetPassword($auth: ResetPasswordInput!) {\n  resetPassword(auth: $auth)\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation sendVerification($email: String!) {\n  sendVerification(email: $email)\n}",
): (typeof documents)["mutation sendVerification($email: String!) {\n  sendVerification(email: $email)\n}"];
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
  source: "mutation UpdateProfileLanguage($language: UpdateProfileLanguageInput!) {\n  updateProfileLanguage(language: $language) {\n    languages {\n      name\n      proficiency\n    }\n  }\n}",
): (typeof documents)["mutation UpdateProfileLanguage($language: UpdateProfileLanguageInput!) {\n  updateProfileLanguage(language: $language) {\n    languages {\n      name\n      proficiency\n    }\n  }\n}"];
  source: "mutation UpdateProfile($profile: UpdateProfileInput!) {\n  updateProfile(profile: $profile) {\n    id\n    first_name\n    last_name\n    full_name\n    avatar\n  }\n}",
): (typeof documents)["mutation UpdateProfile($profile: UpdateProfileInput!) {\n  updateProfile(profile: $profile) {\n    id\n    first_name\n    last_name\n    full_name\n    avatar\n  }\n}"];
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
  source: "mutation UpdateUser($user: UpdateUserInput!) {\n  updateUser(user: $user) {\n    id\n    created_at\n    email\n    is_verified\n    role\n    department_name\n    position_name\n    profile {\n      id\n      created_at\n      first_name\n      last_name\n      full_name\n      avatar\n    }\n    department {\n      id\n      name\n    }\n    position {\n      id\n      name\n    }\n  }\n}",
): (typeof documents)["mutation UpdateUser($user: UpdateUserInput!) {\n  updateUser(user: $user) {\n    id\n    created_at\n    email\n    is_verified\n    role\n    department_name\n    position_name\n    profile {\n      id\n      created_at\n      first_name\n      last_name\n      full_name\n      avatar\n    }\n    department {\n      id\n      name\n    }\n    position {\n      id\n      name\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation UploadAvatar($avatar: UploadAvatarInput!) {\n  uploadAvatar(avatar: $avatar)\n}",
): (typeof documents)["mutation UploadAvatar($avatar: UploadAvatarInput!) {\n  uploadAvatar(avatar: $avatar)\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation verifyMail($otp: String!) {\n  verifyMail(mail: {otp: $otp})\n}",
): (typeof documents)["mutation verifyMail($otp: String!) {\n  verifyMail(mail: {otp: $otp})\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query Languages($params: SearchPaginationInput!) {\n  languages(params: $params) {\n    items {\n      id\n      name\n      native_name\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}",
): (typeof documents)["query Languages($params: SearchPaginationInput!) {\n  languages(params: $params) {\n    items {\n      id\n      name\n      native_name\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}"];
  source: "query Me {\n  me {\n    id\n    is_verified\n    role\n  }\n}",
): (typeof documents)["query Me {\n  me {\n    id\n    is_verified\n    role\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query Me {\n  me {\n    role\n    id\n  }\n}",
): (typeof documents)["query Me {\n  me {\n    role\n    id\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query Profile($userId: ID!) {\n  profile(userId: $userId) {\n    languages {\n      name\n      proficiency\n    }\n  }\n}",
): (typeof documents)["query Profile($userId: ID!) {\n  profile(userId: $userId) {\n    languages {\n      name\n      proficiency\n    }\n  }\n}"];
  source: "query user($userId: ID!) {\n  user(userId: $userId) {\n    id\n    email\n    created_at\n    department {\n      id\n      name\n    }\n    position {\n      id\n      name\n    }\n    profile {\n      avatar\n      email\n      first_name\n      last_name\n      full_name\n      created_at\n    }\n  }\n  departments {\n    id\n    name\n  }\n  positions {\n    id\n    name\n  }\n}",
): (typeof documents)["query user($userId: ID!) {\n  user(userId: $userId) {\n    id\n    email\n    created_at\n    department {\n      id\n      name\n    }\n    position {\n      id\n      name\n    }\n    profile {\n      avatar\n      email\n      first_name\n      last_name\n      full_name\n      created_at\n    }\n  }\n  departments {\n    id\n    name\n  }\n  positions {\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query Users($params: SearchPaginationInput!) {\n  users(params: $params) {\n    items {\n      id\n      department_name\n      position_name\n      email\n      profile {\n        last_name\n        first_name\n        avatar\n      }\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}",
): (typeof documents)["query Users($params: SearchPaginationInput!) {\n  users(params: $params) {\n    items {\n      id\n      department_name\n      position_name\n      email\n      profile {\n        last_name\n        first_name\n        avatar\n      }\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
