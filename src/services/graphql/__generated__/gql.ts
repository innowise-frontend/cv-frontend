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
  "mutation AddCvSkill($skill: AddCvSkillInput!) {\n  addCvSkill(skill: $skill) {\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}": typeof types.AddCvSkillDocument;
  "mutation AddProfileLanguage($language: AddProfileLanguageInput!) {\n  addProfileLanguage(language: $language) {\n    languages {\n      name\n      proficiency\n    }\n  }\n}": typeof types.AddProfileLanguageDocument;
  "mutation AddProfileSkill($skill: AddProfileSkillInput!) {\n  addProfileSkill(skill: $skill) {\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}": typeof types.AddProfileSkillDocument;
  "mutation ChangePassword($args: ChangePasswordInput!) {\n  changePassword(args: $args) {\n    id\n    email\n  }\n}": typeof types.ChangePasswordDocument;
  "mutation CreateCv($cv: CreateCvInput!) {\n  createCv(cv: $cv) {\n    id\n    name\n    education\n    description\n    user {\n      email\n    }\n  }\n}": typeof types.CreateCvDocument;
  "mutation CreateDepartment($department: CreateDepartmentInput!) {\n  createDepartment(department: $department) {\n    id\n    name\n  }\n}": typeof types.CreateDepartmentDocument;
  "mutation CreateLanguage($language: CreateLanguageInput!) {\n  createLanguage(language: $language) {\n    id\n  }\n}": typeof types.CreateLanguageDocument;
  "mutation CreatePosition($position: CreatePositionInput!) {\n  createPosition(position: $position) {\n    id\n    name\n  }\n}": typeof types.CreatePositionDocument;
  "mutation CreateProject($project: CreateProjectInput!) {\n  createProject(project: $project) {\n    id\n    name\n    domain\n    description\n    start_date\n    end_date\n    environment\n  }\n}": typeof types.CreateProjectDocument;
  "mutation CreateSkill($skill: CreateSkillInput!) {\n  createSkill(skill: $skill) {\n    id\n    name\n    created_at\n    category_name\n    category_parent_name\n    category {\n      id\n      name\n    }\n  }\n}": typeof types.CreateSkillDocument;
  "mutation CreateUser($user: CreateUserInput!) {\n  createUser(user: $user) {\n    id\n    email\n    role\n  }\n}": typeof types.CreateUserDocument;
  "mutation DeleteCv($cv: DeleteCvInput!) {\n  deleteCv(cv: $cv) {\n    affected\n  }\n}": typeof types.DeleteCvDocument;
  "mutation DeleteCvSkill($skill: DeleteCvSkillInput!) {\n  deleteCvSkill(skill: $skill) {\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}": typeof types.DeleteCvSkillDocument;
  "mutation DeleteDepartment($department: DeleteDepartmentInput!) {\n  deleteDepartment(department: $department) {\n    affected\n  }\n}": typeof types.DeleteDepartmentDocument;
  "mutation DeleteLanguage($language: DeleteLanguageInput!) {\n  deleteLanguage(language: $language) {\n    affected\n  }\n}": typeof types.DeleteLanguageDocument;
  "mutation DeletePosition($position: DeletePositionInput!) {\n  deletePosition(position: $position) {\n    affected\n  }\n}": typeof types.DeletePositionDocument;
  "mutation DeleteProfileLanguage($language: DeleteProfileLanguageInput!) {\n  deleteProfileLanguage(language: $language) {\n    languages {\n      name\n      proficiency\n    }\n  }\n}": typeof types.DeleteProfileLanguageDocument;
  "mutation DeleteProfileSkill($skill: DeleteProfileSkillInput!) {\n  deleteProfileSkill(skill: $skill) {\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}": typeof types.DeleteProfileSkillDocument;
  "mutation DeleteProject($project: DeleteProjectInput!) {\n  deleteProject(project: $project) {\n    affected\n  }\n}": typeof types.DeleteProjectDocument;
  "mutation DeleteSkill($skill: DeleteSkillInput!) {\n  deleteSkill(skill: $skill) {\n    affected\n  }\n}": typeof types.DeleteSkillDocument;
  "mutation DeleteUser($userId: ID!) {\n  deleteUser(userId: $userId) {\n    affected\n  }\n}": typeof types.DeleteUserDocument;
  "mutation ForgotPassword($auth: ForgotPasswordInput!) {\n  forgotPassword(auth: $auth)\n}": typeof types.ForgotPasswordDocument;
  "mutation Login($auth: AuthInput!) {\n  login(auth: $auth) {\n    user {\n      id\n    }\n    access_token\n    refresh_token\n  }\n}": typeof types.LoginDocument;
  "mutation ResetPassword($auth: ResetPasswordInput!) {\n  resetPassword(auth: $auth)\n}": typeof types.ResetPasswordDocument;
  "mutation sendVerification($email: String!) {\n  sendVerification(email: $email)\n}": typeof types.SendVerificationDocument;
  "mutation Signup($auth: AuthInput!) {\n  signup(auth: $auth) {\n    user {\n      id\n    }\n    access_token\n    refresh_token\n  }\n}": typeof types.SignupDocument;
  "mutation UpdateCv($cv: UpdateCvInput!) {\n  updateCv(cv: $cv) {\n    id\n    name\n    education\n    description\n    user {\n      email\n    }\n  }\n}": typeof types.UpdateCvDocument;
  "mutation UpdateCvSkill($skill: UpdateCvSkillInput!) {\n  updateCvSkill(skill: $skill) {\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}": typeof types.UpdateCvSkillDocument;
  "mutation UpdateDepartment($department: UpdateDepartmentInput!) {\n  updateDepartment(department: $department) {\n    id\n    name\n  }\n}": typeof types.UpdateDepartmentDocument;
  "mutation UpdateLanguage($language: UpdateLanguageInput!) {\n  updateLanguage(language: $language) {\n    id\n    name\n    iso2\n    native_name\n  }\n}": typeof types.UpdateLanguageDocument;
  "mutation UpdatePosition($position: UpdatePositionInput!) {\n  updatePosition(position: $position) {\n    id\n    name\n  }\n}": typeof types.UpdatePositionDocument;
  "mutation UpdateProfile($profile: UpdateProfileInput!) {\n  updateProfile(profile: $profile) {\n    id\n    first_name\n    last_name\n    full_name\n    avatar\n  }\n}": typeof types.UpdateProfileDocument;
  "mutation UpdateProfileLanguage($language: UpdateProfileLanguageInput!) {\n  updateProfileLanguage(language: $language) {\n    languages {\n      name\n      proficiency\n    }\n  }\n}": typeof types.UpdateProfileLanguageDocument;
  "mutation UpdateProfileSkill($skill: UpdateProfileSkillInput!) {\n  updateProfileSkill(skill: $skill) {\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}": typeof types.UpdateProfileSkillDocument;
  "mutation UpdateProject($project: UpdateProjectInput!) {\n  updateProject(project: $project) {\n    id\n    name\n    domain\n    description\n    start_date\n    end_date\n    environment\n  }\n}": typeof types.UpdateProjectDocument;
  "mutation UpdateSkill($skill: UpdateSkillInput!) {\n  updateSkill(skill: $skill) {\n    id\n    name\n    created_at\n    category_name\n    category_parent_name\n    category {\n      id\n      name\n    }\n  }\n}": typeof types.UpdateSkillDocument;
  "mutation UpdateToken {\n  updateToken {\n    access_token\n    refresh_token\n  }\n}": typeof types.UpdateTokenDocument;
  "mutation UpdateUser($user: UpdateUserInput!) {\n  updateUser(user: $user) {\n    id\n    created_at\n    email\n    is_verified\n    role\n    department_name\n    position_name\n    profile {\n      id\n      created_at\n      first_name\n      last_name\n      full_name\n      avatar\n    }\n    department {\n      id\n      name\n    }\n    position {\n      id\n      name\n    }\n  }\n}": typeof types.UpdateUserDocument;
  "mutation UploadAvatar($avatar: UploadAvatarInput!) {\n  uploadAvatar(avatar: $avatar)\n}": typeof types.UploadAvatarDocument;
  "mutation verifyMail($otp: String!) {\n  verifyMail(mail: {otp: $otp})\n}": typeof types.VerifyMailDocument;
  "query Cvs($params: SearchPaginationInput!) {\n  cvs(params: $params) {\n    items {\n      id\n      name\n      education\n      description\n      user {\n        id\n        email\n      }\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}\n\nquery Cv($cvId: ID!) {\n  cv(cvId: $cvId) {\n    id\n    name\n    education\n    description\n    user {\n      id\n      email\n    }\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}": typeof types.CvsDocument;
  "query Departments($params: SearchPaginationInput!) {\n  departments(params: $params) {\n    items {\n      id\n      name\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}": typeof types.DepartmentsDocument;
  "query Languages($params: SearchPaginationInput!) {\n  languages(params: $params) {\n    items {\n      id\n      name\n      native_name\n      iso2\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}": typeof types.LanguagesDocument;
  "query Me {\n  me {\n    id\n    is_verified\n    role\n    id\n  }\n}": typeof types.MeDocument;
  "query Positions($params: SearchPaginationInput!) {\n  positions(params: $params) {\n    items {\n      id\n      name\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}": typeof types.PositionsDocument;
  "query Profile($userId: ID!) {\n  profile(userId: $userId) {\n    languages {\n      name\n      proficiency\n    }\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}": typeof types.ProfileDocument;
  "query Projects($params: SearchPaginationInput!) {\n  projects(params: $params) {\n    items {\n      id\n      name\n      domain\n      description\n      start_date\n      end_date\n      environment\n    }\n    total_pages\n    total\n    limit\n    page\n  }\n}": typeof types.ProjectsDocument;
  "query Skills($params: SearchPaginationInput!) {\n  skills(params: $params) {\n    items {\n      id\n      name\n      created_at\n      category_name\n      category_parent_name\n      category {\n        id\n        name\n      }\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}\n\nquery SkillCategories {\n  skillCategories {\n    id\n    name\n    children {\n      id\n      name\n    }\n    parent {\n      id\n      name\n    }\n  }\n}": typeof types.SkillsDocument;
  "query CvsByUserId($params: SearchPaginationInput!, $userId: ID!) {\n  cvsByUserId(params: $params, userId: $userId) {\n    items {\n      id\n      name\n      education\n      description\n      user {\n        id\n        email\n      }\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}": typeof types.CvsByUserIdDocument;
  "query user($userId: ID!) {\n  user(userId: $userId) {\n    id\n    email\n    created_at\n    department {\n      id\n      name\n    }\n    position {\n      id\n      name\n    }\n    profile {\n      avatar\n      email\n      first_name\n      last_name\n      full_name\n      created_at\n    }\n  }\n  departments {\n    items {\n      id\n      name\n    }\n  }\n  positions {\n    items {\n      id\n      name\n    }\n  }\n}": typeof types.UserDocument;
  "query Users($params: SearchPaginationInput!) {\n  users(params: $params) {\n    items {\n      id\n      department {\n        id\n        name\n      }\n      position {\n        id\n        name\n      }\n      email\n      role\n      is_verified\n      profile {\n        last_name\n        first_name\n        avatar\n      }\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}": typeof types.UsersDocument;
};
const documents: Documents = {
  "mutation AddCvSkill($skill: AddCvSkillInput!) {\n  addCvSkill(skill: $skill) {\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}":
    types.AddCvSkillDocument,
  "mutation AddProfileLanguage($language: AddProfileLanguageInput!) {\n  addProfileLanguage(language: $language) {\n    languages {\n      name\n      proficiency\n    }\n  }\n}":
    types.AddProfileLanguageDocument,
  "mutation AddProfileSkill($skill: AddProfileSkillInput!) {\n  addProfileSkill(skill: $skill) {\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}":
    types.AddProfileSkillDocument,
  "mutation ChangePassword($args: ChangePasswordInput!) {\n  changePassword(args: $args) {\n    id\n    email\n  }\n}":
    types.ChangePasswordDocument,
  "mutation CreateCv($cv: CreateCvInput!) {\n  createCv(cv: $cv) {\n    id\n    name\n    education\n    description\n    user {\n      email\n    }\n  }\n}":
    types.CreateCvDocument,
  "mutation CreateDepartment($department: CreateDepartmentInput!) {\n  createDepartment(department: $department) {\n    id\n    name\n  }\n}":
    types.CreateDepartmentDocument,
  "mutation CreateLanguage($language: CreateLanguageInput!) {\n  createLanguage(language: $language) {\n    id\n  }\n}":
    types.CreateLanguageDocument,
  "mutation CreatePosition($position: CreatePositionInput!) {\n  createPosition(position: $position) {\n    id\n    name\n  }\n}":
    types.CreatePositionDocument,
  "mutation CreateProject($project: CreateProjectInput!) {\n  createProject(project: $project) {\n    id\n    name\n    domain\n    description\n    start_date\n    end_date\n    environment\n  }\n}":
    types.CreateProjectDocument,
  "mutation CreateSkill($skill: CreateSkillInput!) {\n  createSkill(skill: $skill) {\n    id\n    name\n    created_at\n    category_name\n    category_parent_name\n    category {\n      id\n      name\n    }\n  }\n}":
    types.CreateSkillDocument,
  "mutation CreateUser($user: CreateUserInput!) {\n  createUser(user: $user) {\n    id\n    email\n    role\n  }\n}":
    types.CreateUserDocument,
  "mutation DeleteCv($cv: DeleteCvInput!) {\n  deleteCv(cv: $cv) {\n    affected\n  }\n}":
    types.DeleteCvDocument,
  "mutation DeleteCvSkill($skill: DeleteCvSkillInput!) {\n  deleteCvSkill(skill: $skill) {\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}":
    types.DeleteCvSkillDocument,
  "mutation DeleteDepartment($department: DeleteDepartmentInput!) {\n  deleteDepartment(department: $department) {\n    affected\n  }\n}":
    types.DeleteDepartmentDocument,
  "mutation DeleteLanguage($language: DeleteLanguageInput!) {\n  deleteLanguage(language: $language) {\n    affected\n  }\n}":
    types.DeleteLanguageDocument,
  "mutation DeletePosition($position: DeletePositionInput!) {\n  deletePosition(position: $position) {\n    affected\n  }\n}":
    types.DeletePositionDocument,
  "mutation DeleteProfileLanguage($language: DeleteProfileLanguageInput!) {\n  deleteProfileLanguage(language: $language) {\n    languages {\n      name\n      proficiency\n    }\n  }\n}":
    types.DeleteProfileLanguageDocument,
  "mutation DeleteProfileSkill($skill: DeleteProfileSkillInput!) {\n  deleteProfileSkill(skill: $skill) {\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}":
    types.DeleteProfileSkillDocument,
  "mutation DeleteProject($project: DeleteProjectInput!) {\n  deleteProject(project: $project) {\n    affected\n  }\n}":
    types.DeleteProjectDocument,
  "mutation DeleteSkill($skill: DeleteSkillInput!) {\n  deleteSkill(skill: $skill) {\n    affected\n  }\n}":
    types.DeleteSkillDocument,
  "mutation DeleteUser($userId: ID!) {\n  deleteUser(userId: $userId) {\n    affected\n  }\n}":
    types.DeleteUserDocument,
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
  "mutation UpdateCv($cv: UpdateCvInput!) {\n  updateCv(cv: $cv) {\n    id\n    name\n    education\n    description\n    user {\n      email\n    }\n  }\n}":
    types.UpdateCvDocument,
  "mutation UpdateCvSkill($skill: UpdateCvSkillInput!) {\n  updateCvSkill(skill: $skill) {\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}":
    types.UpdateCvSkillDocument,
  "mutation UpdateDepartment($department: UpdateDepartmentInput!) {\n  updateDepartment(department: $department) {\n    id\n    name\n  }\n}":
    types.UpdateDepartmentDocument,
  "mutation UpdateLanguage($language: UpdateLanguageInput!) {\n  updateLanguage(language: $language) {\n    id\n    name\n    iso2\n    native_name\n  }\n}":
    types.UpdateLanguageDocument,
  "mutation UpdatePosition($position: UpdatePositionInput!) {\n  updatePosition(position: $position) {\n    id\n    name\n  }\n}":
    types.UpdatePositionDocument,
  "mutation UpdateProfile($profile: UpdateProfileInput!) {\n  updateProfile(profile: $profile) {\n    id\n    first_name\n    last_name\n    full_name\n    avatar\n  }\n}":
    types.UpdateProfileDocument,
  "mutation UpdateProfileLanguage($language: UpdateProfileLanguageInput!) {\n  updateProfileLanguage(language: $language) {\n    languages {\n      name\n      proficiency\n    }\n  }\n}":
    types.UpdateProfileLanguageDocument,
  "mutation UpdateProfileSkill($skill: UpdateProfileSkillInput!) {\n  updateProfileSkill(skill: $skill) {\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}":
    types.UpdateProfileSkillDocument,
  "mutation UpdateProject($project: UpdateProjectInput!) {\n  updateProject(project: $project) {\n    id\n    name\n    domain\n    description\n    start_date\n    end_date\n    environment\n  }\n}":
    types.UpdateProjectDocument,
  "mutation UpdateSkill($skill: UpdateSkillInput!) {\n  updateSkill(skill: $skill) {\n    id\n    name\n    created_at\n    category_name\n    category_parent_name\n    category {\n      id\n      name\n    }\n  }\n}":
    types.UpdateSkillDocument,
  "mutation UpdateToken {\n  updateToken {\n    access_token\n    refresh_token\n  }\n}":
    types.UpdateTokenDocument,
  "mutation UpdateUser($user: UpdateUserInput!) {\n  updateUser(user: $user) {\n    id\n    created_at\n    email\n    is_verified\n    role\n    department_name\n    position_name\n    profile {\n      id\n      created_at\n      first_name\n      last_name\n      full_name\n      avatar\n    }\n    department {\n      id\n      name\n    }\n    position {\n      id\n      name\n    }\n  }\n}":
    types.UpdateUserDocument,
  "mutation UploadAvatar($avatar: UploadAvatarInput!) {\n  uploadAvatar(avatar: $avatar)\n}":
    types.UploadAvatarDocument,
  "mutation verifyMail($otp: String!) {\n  verifyMail(mail: {otp: $otp})\n}":
    types.VerifyMailDocument,
  "query Cvs($params: SearchPaginationInput!) {\n  cvs(params: $params) {\n    items {\n      id\n      name\n      education\n      description\n      user {\n        id\n        email\n      }\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}\n\nquery Cv($cvId: ID!) {\n  cv(cvId: $cvId) {\n    id\n    name\n    education\n    description\n    user {\n      id\n      email\n    }\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}":
    types.CvsDocument,
  "query Departments($params: SearchPaginationInput!) {\n  departments(params: $params) {\n    items {\n      id\n      name\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}":
    types.DepartmentsDocument,
  "query Languages($params: SearchPaginationInput!) {\n  languages(params: $params) {\n    items {\n      id\n      name\n      native_name\n      iso2\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}":
    types.LanguagesDocument,
  "query Me {\n  me {\n    id\n    is_verified\n    role\n    id\n  }\n}": types.MeDocument,
  "query Positions($params: SearchPaginationInput!) {\n  positions(params: $params) {\n    items {\n      id\n      name\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}":
    types.PositionsDocument,
  "query Profile($userId: ID!) {\n  profile(userId: $userId) {\n    languages {\n      name\n      proficiency\n    }\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}":
    types.ProfileDocument,
  "query Projects($params: SearchPaginationInput!) {\n  projects(params: $params) {\n    items {\n      id\n      name\n      domain\n      description\n      start_date\n      end_date\n      environment\n    }\n    total_pages\n    total\n    limit\n    page\n  }\n}":
    types.ProjectsDocument,
  "query Skills($params: SearchPaginationInput!) {\n  skills(params: $params) {\n    items {\n      id\n      name\n      created_at\n      category_name\n      category_parent_name\n      category {\n        id\n        name\n      }\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}\n\nquery SkillCategories {\n  skillCategories {\n    id\n    name\n    children {\n      id\n      name\n    }\n    parent {\n      id\n      name\n    }\n  }\n}":
    types.SkillsDocument,
  "query CvsByUserId($params: SearchPaginationInput!, $userId: ID!) {\n  cvsByUserId(params: $params, userId: $userId) {\n    items {\n      id\n      name\n      education\n      description\n      user {\n        id\n        email\n      }\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}":
    types.CvsByUserIdDocument,
  "query user($userId: ID!) {\n  user(userId: $userId) {\n    id\n    email\n    created_at\n    department {\n      id\n      name\n    }\n    position {\n      id\n      name\n    }\n    profile {\n      avatar\n      email\n      first_name\n      last_name\n      full_name\n      created_at\n    }\n  }\n  departments {\n    items {\n      id\n      name\n    }\n  }\n  positions {\n    items {\n      id\n      name\n    }\n  }\n}":
    types.UserDocument,
  "query Users($params: SearchPaginationInput!) {\n  users(params: $params) {\n    items {\n      id\n      department {\n        id\n        name\n      }\n      position {\n        id\n        name\n      }\n      email\n      role\n      is_verified\n      profile {\n        last_name\n        first_name\n        avatar\n      }\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}":
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
  source: "mutation AddCvSkill($skill: AddCvSkillInput!) {\n  addCvSkill(skill: $skill) {\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}",
): (typeof documents)["mutation AddCvSkill($skill: AddCvSkillInput!) {\n  addCvSkill(skill: $skill) {\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}"];
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
  source: "mutation AddProfileSkill($skill: AddProfileSkillInput!) {\n  addProfileSkill(skill: $skill) {\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}",
): (typeof documents)["mutation AddProfileSkill($skill: AddProfileSkillInput!) {\n  addProfileSkill(skill: $skill) {\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}"];
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
  source: "mutation CreateCv($cv: CreateCvInput!) {\n  createCv(cv: $cv) {\n    id\n    name\n    education\n    description\n    user {\n      email\n    }\n  }\n}",
): (typeof documents)["mutation CreateCv($cv: CreateCvInput!) {\n  createCv(cv: $cv) {\n    id\n    name\n    education\n    description\n    user {\n      email\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation CreateDepartment($department: CreateDepartmentInput!) {\n  createDepartment(department: $department) {\n    id\n    name\n  }\n}",
): (typeof documents)["mutation CreateDepartment($department: CreateDepartmentInput!) {\n  createDepartment(department: $department) {\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation CreateLanguage($language: CreateLanguageInput!) {\n  createLanguage(language: $language) {\n    id\n  }\n}",
): (typeof documents)["mutation CreateLanguage($language: CreateLanguageInput!) {\n  createLanguage(language: $language) {\n    id\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation CreatePosition($position: CreatePositionInput!) {\n  createPosition(position: $position) {\n    id\n    name\n  }\n}",
): (typeof documents)["mutation CreatePosition($position: CreatePositionInput!) {\n  createPosition(position: $position) {\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation CreateProject($project: CreateProjectInput!) {\n  createProject(project: $project) {\n    id\n    name\n    domain\n    description\n    start_date\n    end_date\n    environment\n  }\n}",
): (typeof documents)["mutation CreateProject($project: CreateProjectInput!) {\n  createProject(project: $project) {\n    id\n    name\n    domain\n    description\n    start_date\n    end_date\n    environment\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation CreateSkill($skill: CreateSkillInput!) {\n  createSkill(skill: $skill) {\n    id\n    name\n    created_at\n    category_name\n    category_parent_name\n    category {\n      id\n      name\n    }\n  }\n}",
): (typeof documents)["mutation CreateSkill($skill: CreateSkillInput!) {\n  createSkill(skill: $skill) {\n    id\n    name\n    created_at\n    category_name\n    category_parent_name\n    category {\n      id\n      name\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation CreateUser($user: CreateUserInput!) {\n  createUser(user: $user) {\n    id\n    email\n    role\n  }\n}",
): (typeof documents)["mutation CreateUser($user: CreateUserInput!) {\n  createUser(user: $user) {\n    id\n    email\n    role\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation DeleteCv($cv: DeleteCvInput!) {\n  deleteCv(cv: $cv) {\n    affected\n  }\n}",
): (typeof documents)["mutation DeleteCv($cv: DeleteCvInput!) {\n  deleteCv(cv: $cv) {\n    affected\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation DeleteCvSkill($skill: DeleteCvSkillInput!) {\n  deleteCvSkill(skill: $skill) {\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}",
): (typeof documents)["mutation DeleteCvSkill($skill: DeleteCvSkillInput!) {\n  deleteCvSkill(skill: $skill) {\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation DeleteDepartment($department: DeleteDepartmentInput!) {\n  deleteDepartment(department: $department) {\n    affected\n  }\n}",
): (typeof documents)["mutation DeleteDepartment($department: DeleteDepartmentInput!) {\n  deleteDepartment(department: $department) {\n    affected\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation DeleteLanguage($language: DeleteLanguageInput!) {\n  deleteLanguage(language: $language) {\n    affected\n  }\n}",
): (typeof documents)["mutation DeleteLanguage($language: DeleteLanguageInput!) {\n  deleteLanguage(language: $language) {\n    affected\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation DeletePosition($position: DeletePositionInput!) {\n  deletePosition(position: $position) {\n    affected\n  }\n}",
): (typeof documents)["mutation DeletePosition($position: DeletePositionInput!) {\n  deletePosition(position: $position) {\n    affected\n  }\n}"];
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
  source: "mutation DeleteProfileSkill($skill: DeleteProfileSkillInput!) {\n  deleteProfileSkill(skill: $skill) {\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}",
): (typeof documents)["mutation DeleteProfileSkill($skill: DeleteProfileSkillInput!) {\n  deleteProfileSkill(skill: $skill) {\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation DeleteProject($project: DeleteProjectInput!) {\n  deleteProject(project: $project) {\n    affected\n  }\n}",
): (typeof documents)["mutation DeleteProject($project: DeleteProjectInput!) {\n  deleteProject(project: $project) {\n    affected\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation DeleteSkill($skill: DeleteSkillInput!) {\n  deleteSkill(skill: $skill) {\n    affected\n  }\n}",
): (typeof documents)["mutation DeleteSkill($skill: DeleteSkillInput!) {\n  deleteSkill(skill: $skill) {\n    affected\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation DeleteUser($userId: ID!) {\n  deleteUser(userId: $userId) {\n    affected\n  }\n}",
): (typeof documents)["mutation DeleteUser($userId: ID!) {\n  deleteUser(userId: $userId) {\n    affected\n  }\n}"];
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
  source: "mutation UpdateCv($cv: UpdateCvInput!) {\n  updateCv(cv: $cv) {\n    id\n    name\n    education\n    description\n    user {\n      email\n    }\n  }\n}",
): (typeof documents)["mutation UpdateCv($cv: UpdateCvInput!) {\n  updateCv(cv: $cv) {\n    id\n    name\n    education\n    description\n    user {\n      email\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation UpdateCvSkill($skill: UpdateCvSkillInput!) {\n  updateCvSkill(skill: $skill) {\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}",
): (typeof documents)["mutation UpdateCvSkill($skill: UpdateCvSkillInput!) {\n  updateCvSkill(skill: $skill) {\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation UpdateDepartment($department: UpdateDepartmentInput!) {\n  updateDepartment(department: $department) {\n    id\n    name\n  }\n}",
): (typeof documents)["mutation UpdateDepartment($department: UpdateDepartmentInput!) {\n  updateDepartment(department: $department) {\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation UpdateLanguage($language: UpdateLanguageInput!) {\n  updateLanguage(language: $language) {\n    id\n    name\n    iso2\n    native_name\n  }\n}",
): (typeof documents)["mutation UpdateLanguage($language: UpdateLanguageInput!) {\n  updateLanguage(language: $language) {\n    id\n    name\n    iso2\n    native_name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation UpdatePosition($position: UpdatePositionInput!) {\n  updatePosition(position: $position) {\n    id\n    name\n  }\n}",
): (typeof documents)["mutation UpdatePosition($position: UpdatePositionInput!) {\n  updatePosition(position: $position) {\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation UpdateProfile($profile: UpdateProfileInput!) {\n  updateProfile(profile: $profile) {\n    id\n    first_name\n    last_name\n    full_name\n    avatar\n  }\n}",
): (typeof documents)["mutation UpdateProfile($profile: UpdateProfileInput!) {\n  updateProfile(profile: $profile) {\n    id\n    first_name\n    last_name\n    full_name\n    avatar\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation UpdateProfileLanguage($language: UpdateProfileLanguageInput!) {\n  updateProfileLanguage(language: $language) {\n    languages {\n      name\n      proficiency\n    }\n  }\n}",
): (typeof documents)["mutation UpdateProfileLanguage($language: UpdateProfileLanguageInput!) {\n  updateProfileLanguage(language: $language) {\n    languages {\n      name\n      proficiency\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation UpdateProfileSkill($skill: UpdateProfileSkillInput!) {\n  updateProfileSkill(skill: $skill) {\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}",
): (typeof documents)["mutation UpdateProfileSkill($skill: UpdateProfileSkillInput!) {\n  updateProfileSkill(skill: $skill) {\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation UpdateProject($project: UpdateProjectInput!) {\n  updateProject(project: $project) {\n    id\n    name\n    domain\n    description\n    start_date\n    end_date\n    environment\n  }\n}",
): (typeof documents)["mutation UpdateProject($project: UpdateProjectInput!) {\n  updateProject(project: $project) {\n    id\n    name\n    domain\n    description\n    start_date\n    end_date\n    environment\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation UpdateSkill($skill: UpdateSkillInput!) {\n  updateSkill(skill: $skill) {\n    id\n    name\n    created_at\n    category_name\n    category_parent_name\n    category {\n      id\n      name\n    }\n  }\n}",
): (typeof documents)["mutation UpdateSkill($skill: UpdateSkillInput!) {\n  updateSkill(skill: $skill) {\n    id\n    name\n    created_at\n    category_name\n    category_parent_name\n    category {\n      id\n      name\n    }\n  }\n}"];
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
  source: "query Cvs($params: SearchPaginationInput!) {\n  cvs(params: $params) {\n    items {\n      id\n      name\n      education\n      description\n      user {\n        id\n        email\n      }\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}\n\nquery Cv($cvId: ID!) {\n  cv(cvId: $cvId) {\n    id\n    name\n    education\n    description\n    user {\n      id\n      email\n    }\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}",
): (typeof documents)["query Cvs($params: SearchPaginationInput!) {\n  cvs(params: $params) {\n    items {\n      id\n      name\n      education\n      description\n      user {\n        id\n        email\n      }\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}\n\nquery Cv($cvId: ID!) {\n  cv(cvId: $cvId) {\n    id\n    name\n    education\n    description\n    user {\n      id\n      email\n    }\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query Departments($params: SearchPaginationInput!) {\n  departments(params: $params) {\n    items {\n      id\n      name\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}",
): (typeof documents)["query Departments($params: SearchPaginationInput!) {\n  departments(params: $params) {\n    items {\n      id\n      name\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query Languages($params: SearchPaginationInput!) {\n  languages(params: $params) {\n    items {\n      id\n      name\n      native_name\n      iso2\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}",
): (typeof documents)["query Languages($params: SearchPaginationInput!) {\n  languages(params: $params) {\n    items {\n      id\n      name\n      native_name\n      iso2\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query Me {\n  me {\n    id\n    is_verified\n    role\n    id\n  }\n}",
): (typeof documents)["query Me {\n  me {\n    id\n    is_verified\n    role\n    id\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query Positions($params: SearchPaginationInput!) {\n  positions(params: $params) {\n    items {\n      id\n      name\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}",
): (typeof documents)["query Positions($params: SearchPaginationInput!) {\n  positions(params: $params) {\n    items {\n      id\n      name\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query Profile($userId: ID!) {\n  profile(userId: $userId) {\n    languages {\n      name\n      proficiency\n    }\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}",
): (typeof documents)["query Profile($userId: ID!) {\n  profile(userId: $userId) {\n    languages {\n      name\n      proficiency\n    }\n    skills {\n      name\n      mastery\n      categoryId\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query Projects($params: SearchPaginationInput!) {\n  projects(params: $params) {\n    items {\n      id\n      name\n      domain\n      description\n      start_date\n      end_date\n      environment\n    }\n    total_pages\n    total\n    limit\n    page\n  }\n}",
): (typeof documents)["query Projects($params: SearchPaginationInput!) {\n  projects(params: $params) {\n    items {\n      id\n      name\n      domain\n      description\n      start_date\n      end_date\n      environment\n    }\n    total_pages\n    total\n    limit\n    page\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query Skills($params: SearchPaginationInput!) {\n  skills(params: $params) {\n    items {\n      id\n      name\n      created_at\n      category_name\n      category_parent_name\n      category {\n        id\n        name\n      }\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}\n\nquery SkillCategories {\n  skillCategories {\n    id\n    name\n    children {\n      id\n      name\n    }\n    parent {\n      id\n      name\n    }\n  }\n}",
): (typeof documents)["query Skills($params: SearchPaginationInput!) {\n  skills(params: $params) {\n    items {\n      id\n      name\n      created_at\n      category_name\n      category_parent_name\n      category {\n        id\n        name\n      }\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}\n\nquery SkillCategories {\n  skillCategories {\n    id\n    name\n    children {\n      id\n      name\n    }\n    parent {\n      id\n      name\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query CvsByUserId($params: SearchPaginationInput!, $userId: ID!) {\n  cvsByUserId(params: $params, userId: $userId) {\n    items {\n      id\n      name\n      education\n      description\n      user {\n        id\n        email\n      }\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}",
): (typeof documents)["query CvsByUserId($params: SearchPaginationInput!, $userId: ID!) {\n  cvsByUserId(params: $params, userId: $userId) {\n    items {\n      id\n      name\n      education\n      description\n      user {\n        id\n        email\n      }\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query user($userId: ID!) {\n  user(userId: $userId) {\n    id\n    email\n    created_at\n    department {\n      id\n      name\n    }\n    position {\n      id\n      name\n    }\n    profile {\n      avatar\n      email\n      first_name\n      last_name\n      full_name\n      created_at\n    }\n  }\n  departments {\n    items {\n      id\n      name\n    }\n  }\n  positions {\n    items {\n      id\n      name\n    }\n  }\n}",
): (typeof documents)["query user($userId: ID!) {\n  user(userId: $userId) {\n    id\n    email\n    created_at\n    department {\n      id\n      name\n    }\n    position {\n      id\n      name\n    }\n    profile {\n      avatar\n      email\n      first_name\n      last_name\n      full_name\n      created_at\n    }\n  }\n  departments {\n    items {\n      id\n      name\n    }\n  }\n  positions {\n    items {\n      id\n      name\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query Users($params: SearchPaginationInput!) {\n  users(params: $params) {\n    items {\n      id\n      department {\n        id\n        name\n      }\n      position {\n        id\n        name\n      }\n      email\n      role\n      is_verified\n      profile {\n        last_name\n        first_name\n        avatar\n      }\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}",
): (typeof documents)["query Users($params: SearchPaginationInput!) {\n  users(params: $params) {\n    items {\n      id\n      department {\n        id\n        name\n      }\n      position {\n        id\n        name\n      }\n      email\n      role\n      is_verified\n      profile {\n        last_name\n        first_name\n        avatar\n      }\n    }\n    total\n    page\n    limit\n    total_pages\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
