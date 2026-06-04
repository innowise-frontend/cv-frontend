/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** The `Void` scalar type represents a null variable. */
  Void: { input: any; output: any };
};

export type AddCvProjectInput = {
  cvId: Scalars["ID"]["input"];
  end_date?: InputMaybe<Scalars["String"]["input"]>;
  projectId: Scalars["ID"]["input"];
  responsibilities: Array<Scalars["String"]["input"]>;
  roles: Array<Scalars["String"]["input"]>;
  start_date: Scalars["String"]["input"];
};

export type AddCvSkillInput = {
  categoryId?: InputMaybe<Scalars["ID"]["input"]>;
  cvId: Scalars["ID"]["input"];
  mastery: Mastery;
  name: Scalars["String"]["input"];
};

export type AddProfileLanguageInput = {
  name: Scalars["String"]["input"];
  proficiency: Proficiency;
  userId: Scalars["ID"]["input"];
};

export type AddProfileSkillInput = {
  categoryId?: InputMaybe<Scalars["ID"]["input"]>;
  mastery: Mastery;
  name: Scalars["String"]["input"];
  userId: Scalars["ID"]["input"];
};

export type AuthInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type AuthResult = {
  __typename?: "AuthResult";
  access_token: Scalars["String"]["output"];
  refresh_token: Scalars["String"]["output"];
  user: User;
};

export type ChangePasswordInput = {
  confirmPassword: Scalars["String"]["input"];
  newPassword: Scalars["String"]["input"];
  oldPassword: Scalars["String"]["input"];
};

export type CreateCvInput = {
  description: Scalars["String"]["input"];
  education?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  userId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type CreateDepartmentInput = {
  name: Scalars["String"]["input"];
};

export type CreateLanguageInput = {
  iso2: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  native_name?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreatePositionInput = {
  name: Scalars["String"]["input"];
};

export type CreateProfileInput = {
  first_name?: InputMaybe<Scalars["String"]["input"]>;
  last_name?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateProjectInput = {
  description: Scalars["String"]["input"];
  domain: Scalars["String"]["input"];
  end_date?: InputMaybe<Scalars["String"]["input"]>;
  environment: Array<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  start_date: Scalars["String"]["input"];
};

export type CreateSkillInput = {
  categoryId?: InputMaybe<Scalars["ID"]["input"]>;
  name: Scalars["String"]["input"];
};

export type CreateUserInput = {
  auth: AuthInput;
  departmentId?: InputMaybe<Scalars["ID"]["input"]>;
  positionId?: InputMaybe<Scalars["ID"]["input"]>;
  profile: CreateProfileInput;
  role: UserRole;
};

export type Cv = {
  __typename?: "Cv";
  created_at: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  education?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  languages: Array<LanguageProficiency>;
  name: Scalars["String"]["output"];
  projects?: Maybe<Array<CvProject>>;
  skills: Array<SkillMastery>;
  user?: Maybe<User>;
};

export type CvProject = {
  __typename?: "CvProject";
  description: Scalars["String"]["output"];
  domain: Scalars["String"]["output"];
  end_date?: Maybe<Scalars["String"]["output"]>;
  environment: Array<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  internal_name: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  project: Project;
  responsibilities: Array<Scalars["String"]["output"]>;
  roles: Array<Scalars["String"]["output"]>;
  start_date: Scalars["String"]["output"];
};

export type DeleteAvatarInput = {
  userId: Scalars["ID"]["input"];
};

export type DeleteCvInput = {
  cvId: Scalars["ID"]["input"];
};

export type DeleteCvSkillInput = {
  cvId: Scalars["ID"]["input"];
  name: Array<Scalars["String"]["input"]>;
};

export type DeleteDepartmentInput = {
  departmentId: Scalars["ID"]["input"];
};

export type DeleteLanguageInput = {
  languageId: Scalars["ID"]["input"];
};

export type DeletePositionInput = {
  positionId: Scalars["ID"]["input"];
};

export type DeleteProfileInput = {
  userId: Scalars["ID"]["input"];
};

export type DeleteProfileLanguageInput = {
  name: Array<Scalars["String"]["input"]>;
  userId: Scalars["ID"]["input"];
};

export type DeleteProfileSkillInput = {
  name: Array<Scalars["String"]["input"]>;
  userId: Scalars["ID"]["input"];
};

export type DeleteProjectInput = {
  projectId: Scalars["ID"]["input"];
};

export type DeleteResult = {
  __typename?: "DeleteResult";
  affected: Scalars["Int"]["output"];
};

export type DeleteSkillInput = {
  skillId: Scalars["ID"]["input"];
};

export type Department = {
  __typename?: "Department";
  created_at: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export type ExportPdfInput = {
  html: Scalars["String"]["input"];
  margin?: InputMaybe<MarginInput>;
};

export type ForgotPasswordInput = {
  email: Scalars["String"]["input"];
};

export type Language = {
  __typename?: "Language";
  created_at: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  iso2: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  native_name?: Maybe<Scalars["String"]["output"]>;
};

export type LanguageProficiency = {
  __typename?: "LanguageProficiency";
  name: Scalars["String"]["output"];
  proficiency: Proficiency;
};

export type LanguageProficiencyInput = {
  name: Scalars["String"]["input"];
  proficiency: Proficiency;
};

export type Mail = {
  __typename?: "Mail";
  created_at: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  otp: Scalars["String"]["output"];
};

export type MarginInput = {
  bottom: Scalars["String"]["input"];
  left: Scalars["String"]["input"];
  right: Scalars["String"]["input"];
  top: Scalars["String"]["input"];
};

export enum Mastery {
  Advanced = "Advanced",
  Competent = "Competent",
  Expert = "Expert",
  Novice = "Novice",
  Proficient = "Proficient",
}

export type Mutation = {
  __typename?: "Mutation";
  addCvProject: Cv;
  addCvSkill: Cv;
  addProfileLanguage: Profile;
  addProfileSkill: Profile;
  changePassword: User;
  createCv: Cv;
  createDepartment: Department;
  createLanguage: Language;
  createPosition: Position;
  createProject: Project;
  createSkill: Skill;
  createUser: User;
  deleteAvatar?: Maybe<Scalars["Void"]["output"]>;
  deleteCv: DeleteResult;
  deleteCvSkill: Cv;
  deleteDepartment: DeleteResult;
  deleteLanguage: DeleteResult;
  deletePosition: DeleteResult;
  deleteProfileLanguage: Profile;
  deleteProfileSkill: Profile;
  deleteProject: DeleteResult;
  deleteSkill: DeleteResult;
  deleteUser: DeleteResult;
  exportPdf: Scalars["String"]["output"];
  forgotPassword?: Maybe<Scalars["Void"]["output"]>;
  login: AuthResult;
  removeCvProject: Cv;
  resetPassword?: Maybe<Scalars["Void"]["output"]>;
  sendVerification?: Maybe<Scalars["Void"]["output"]>;
  signup: AuthResult;
  updateCv: Cv;
  updateCvProject: Cv;
  updateCvSkill: Cv;
  updateDepartment: Department;
  updateLanguage: Language;
  updatePosition: Position;
  updateProfile: Profile;
  updateProfileLanguage: Profile;
  updateProfileSkill: Profile;
  updateProject: Project;
  updateSkill: Skill;
  updateToken: UpdateTokenResult;
  updateUser: User;
  uploadAvatar: Scalars["String"]["output"];
  verifyMail?: Maybe<Scalars["Void"]["output"]>;
};

export type MutationAddCvProjectArgs = {
  project: AddCvProjectInput;
};

export type MutationAddCvSkillArgs = {
  skill: AddCvSkillInput;
};

export type MutationAddProfileLanguageArgs = {
  language: AddProfileLanguageInput;
};

export type MutationAddProfileSkillArgs = {
  skill: AddProfileSkillInput;
};

export type MutationChangePasswordArgs = {
  args: ChangePasswordInput;
};

export type MutationCreateCvArgs = {
  cv: CreateCvInput;
};

export type MutationCreateDepartmentArgs = {
  department: CreateDepartmentInput;
};

export type MutationCreateLanguageArgs = {
  language: CreateLanguageInput;
};

export type MutationCreatePositionArgs = {
  position: CreatePositionInput;
};

export type MutationCreateProjectArgs = {
  project: CreateProjectInput;
};

export type MutationCreateSkillArgs = {
  skill: CreateSkillInput;
};

export type MutationCreateUserArgs = {
  user: CreateUserInput;
};

export type MutationDeleteAvatarArgs = {
  avatar: DeleteAvatarInput;
};

export type MutationDeleteCvArgs = {
  cv: DeleteCvInput;
};

export type MutationDeleteCvSkillArgs = {
  skill: DeleteCvSkillInput;
};

export type MutationDeleteDepartmentArgs = {
  department: DeleteDepartmentInput;
};

export type MutationDeleteLanguageArgs = {
  language: DeleteLanguageInput;
};

export type MutationDeletePositionArgs = {
  position: DeletePositionInput;
};

export type MutationDeleteProfileLanguageArgs = {
  language: DeleteProfileLanguageInput;
};

export type MutationDeleteProfileSkillArgs = {
  skill: DeleteProfileSkillInput;
};

export type MutationDeleteProjectArgs = {
  project: DeleteProjectInput;
};

export type MutationDeleteSkillArgs = {
  skill: DeleteSkillInput;
};

export type MutationDeleteUserArgs = {
  userId: Scalars["ID"]["input"];
};

export type MutationExportPdfArgs = {
  pdf: ExportPdfInput;
};

export type MutationForgotPasswordArgs = {
  auth: ForgotPasswordInput;
};

export type MutationLoginArgs = {
  auth: AuthInput;
};

export type MutationRemoveCvProjectArgs = {
  project: RemoveCvProjectInput;
};

export type MutationResetPasswordArgs = {
  auth: ResetPasswordInput;
};

export type MutationSendVerificationArgs = {
  email: Scalars["String"]["input"];
};

export type MutationSignupArgs = {
  auth: AuthInput;
};

export type MutationUpdateCvArgs = {
  cv: UpdateCvInput;
};

export type MutationUpdateCvProjectArgs = {
  project: UpdateCvProjectInput;
};

export type MutationUpdateCvSkillArgs = {
  skill: UpdateCvSkillInput;
};

export type MutationUpdateDepartmentArgs = {
  department: UpdateDepartmentInput;
};

export type MutationUpdateLanguageArgs = {
  language: UpdateLanguageInput;
};

export type MutationUpdatePositionArgs = {
  position: UpdatePositionInput;
};

export type MutationUpdateProfileArgs = {
  profile: UpdateProfileInput;
};

export type MutationUpdateProfileLanguageArgs = {
  language: UpdateProfileLanguageInput;
};

export type MutationUpdateProfileSkillArgs = {
  skill: UpdateProfileSkillInput;
};

export type MutationUpdateProjectArgs = {
  project: UpdateProjectInput;
};

export type MutationUpdateSkillArgs = {
  skill: UpdateSkillInput;
};

export type MutationUpdateUserArgs = {
  user: UpdateUserInput;
};

export type MutationUploadAvatarArgs = {
  avatar: UploadAvatarInput;
};

export type MutationVerifyMailArgs = {
  mail: VerifyMailInput;
};

export type PaginatedCvs = {
  __typename?: "PaginatedCvs";
  items: Array<Cv>;
  limit: Scalars["Int"]["output"];
  page: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
  total_pages: Scalars["Int"]["output"];
};

export type PaginatedDepartments = {
  __typename?: "PaginatedDepartments";
  items: Array<Department>;
  limit: Scalars["Int"]["output"];
  page: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
  total_pages: Scalars["Int"]["output"];
};

export type PaginatedLanguages = {
  __typename?: "PaginatedLanguages";
  items: Array<Language>;
  limit: Scalars["Int"]["output"];
  page: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
  total_pages: Scalars["Int"]["output"];
};

export type PaginatedPositions = {
  __typename?: "PaginatedPositions";
  items: Array<Position>;
  limit: Scalars["Int"]["output"];
  page: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
  total_pages: Scalars["Int"]["output"];
};

export type PaginatedProjects = {
  __typename?: "PaginatedProjects";
  items: Array<Project>;
  limit: Scalars["Int"]["output"];
  page: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
  total_pages: Scalars["Int"]["output"];
};

export type PaginatedSkills = {
  __typename?: "PaginatedSkills";
  items: Array<Skill>;
  limit: Scalars["Int"]["output"];
  page: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
  total_pages: Scalars["Int"]["output"];
};

export type PaginatedUsers = {
  __typename?: "PaginatedUsers";
  items: Array<User>;
  limit: Scalars["Int"]["output"];
  page: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
  total_pages: Scalars["Int"]["output"];
};

export type Position = {
  __typename?: "Position";
  created_at: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export enum Proficiency {
  A1 = "A1",
  A2 = "A2",
  B1 = "B1",
  B2 = "B2",
  C1 = "C1",
  C2 = "C2",
  Native = "Native",
}

export type Profile = {
  __typename?: "Profile";
  avatar?: Maybe<Scalars["String"]["output"]>;
  created_at: Scalars["String"]["output"];
  email?: Maybe<Scalars["String"]["output"]>;
  first_name?: Maybe<Scalars["String"]["output"]>;
  full_name?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  is_verified?: Maybe<Scalars["Boolean"]["output"]>;
  languages: Array<LanguageProficiency>;
  last_name?: Maybe<Scalars["String"]["output"]>;
  role?: Maybe<UserRole>;
  skills: Array<SkillMastery>;
};

export type Project = {
  __typename?: "Project";
  created_at: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  domain: Scalars["String"]["output"];
  end_date?: Maybe<Scalars["String"]["output"]>;
  environment: Array<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  internal_name: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  start_date: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  cv: Cv;
  cvs: PaginatedCvs;
  cvsByUserId: PaginatedCvs;
  departments: PaginatedDepartments;
  languages: PaginatedLanguages;
  me: Profile;
  position: Position;
  positions: PaginatedPositions;
  profile: Profile;
  project: Project;
  projects: PaginatedProjects;
  skillCategories: Array<SkillCategory>;
  skills: PaginatedSkills;
  user: User;
  users: PaginatedUsers;
};

export type QueryCvArgs = {
  cvId: Scalars["ID"]["input"];
};

export type QueryCvsArgs = {
  params?: InputMaybe<SearchPaginationInput>;
};

export type QueryCvsByUserIdArgs = {
  params?: InputMaybe<SearchPaginationInput>;
  userId: Scalars["ID"]["input"];
};

export type QueryDepartmentsArgs = {
  params?: InputMaybe<SearchPaginationInput>;
};

export type QueryLanguagesArgs = {
  params?: InputMaybe<SearchPaginationInput>;
};

export type QueryPositionArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryPositionsArgs = {
  params?: InputMaybe<SearchPaginationInput>;
};

export type QueryProfileArgs = {
  userId: Scalars["ID"]["input"];
};

export type QueryProjectArgs = {
  projectId: Scalars["ID"]["input"];
};

export type QueryProjectsArgs = {
  params?: InputMaybe<SearchPaginationInput>;
};

export type QuerySkillsArgs = {
  params?: InputMaybe<SearchPaginationInput>;
};

export type QueryUserArgs = {
  userId: Scalars["ID"]["input"];
};

export type QueryUsersArgs = {
  params?: InputMaybe<SearchPaginationInput>;
};

export type RemoveCvProjectInput = {
  cvId: Scalars["ID"]["input"];
  projectId: Scalars["ID"]["input"];
};

export type ResetPasswordInput = {
  confirmPassword: Scalars["String"]["input"];
  newPassword: Scalars["String"]["input"];
};

export type SearchPaginationInput = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort_by?: InputMaybe<Scalars["String"]["input"]>;
  sort_order?: InputMaybe<Scalars["String"]["input"]>;
};

export type Skill = {
  __typename?: "Skill";
  category?: Maybe<SkillCategory>;
  category_name?: Maybe<Scalars["String"]["output"]>;
  category_parent_name?: Maybe<Scalars["String"]["output"]>;
  created_at: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export type SkillCategory = {
  __typename?: "SkillCategory";
  children: Array<SkillCategory>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  order: Scalars["Int"]["output"];
  parent?: Maybe<SkillCategory>;
};

export type SkillMastery = {
  __typename?: "SkillMastery";
  categoryId?: Maybe<Scalars["ID"]["output"]>;
  mastery: Mastery;
  name: Scalars["String"]["output"];
};

export type SkillMasteryInput = {
  categoryId?: InputMaybe<Scalars["ID"]["input"]>;
  mastery: Mastery;
  name: Scalars["String"]["input"];
};

export type UpdateCvInput = {
  cvId: Scalars["ID"]["input"];
  description: Scalars["String"]["input"];
  education?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
};

export type UpdateCvProjectInput = {
  cvId: Scalars["ID"]["input"];
  end_date?: InputMaybe<Scalars["String"]["input"]>;
  projectId: Scalars["ID"]["input"];
  responsibilities: Array<Scalars["String"]["input"]>;
  roles: Array<Scalars["String"]["input"]>;
  start_date: Scalars["String"]["input"];
};

export type UpdateCvSkillInput = {
  categoryId?: InputMaybe<Scalars["ID"]["input"]>;
  cvId: Scalars["ID"]["input"];
  mastery: Mastery;
  name: Scalars["String"]["input"];
};

export type UpdateDepartmentInput = {
  departmentId: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
};

export type UpdateLanguageInput = {
  iso2: Scalars["String"]["input"];
  languageId: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
  native_name?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdatePositionInput = {
  name: Scalars["String"]["input"];
  positionId: Scalars["ID"]["input"];
};

export type UpdateProfileInput = {
  first_name?: InputMaybe<Scalars["String"]["input"]>;
  last_name?: InputMaybe<Scalars["String"]["input"]>;
  userId: Scalars["ID"]["input"];
};

export type UpdateProfileLanguageInput = {
  name: Scalars["String"]["input"];
  proficiency: Proficiency;
  userId: Scalars["ID"]["input"];
};

export type UpdateProfileSkillInput = {
  categoryId?: InputMaybe<Scalars["ID"]["input"]>;
  mastery: Mastery;
  name: Scalars["String"]["input"];
  userId: Scalars["ID"]["input"];
};

export type UpdateProjectInput = {
  description: Scalars["String"]["input"];
  domain: Scalars["String"]["input"];
  end_date?: InputMaybe<Scalars["String"]["input"]>;
  environment: Array<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  projectId: Scalars["ID"]["input"];
  start_date: Scalars["String"]["input"];
};

export type UpdateSkillInput = {
  categoryId?: InputMaybe<Scalars["ID"]["input"]>;
  name: Scalars["String"]["input"];
  skillId: Scalars["ID"]["input"];
};

export type UpdateTokenResult = {
  __typename?: "UpdateTokenResult";
  access_token: Scalars["String"]["output"];
  refresh_token: Scalars["String"]["output"];
};

export type UpdateUserInput = {
  departmentId?: InputMaybe<Scalars["ID"]["input"]>;
  positionId?: InputMaybe<Scalars["ID"]["input"]>;
  role?: InputMaybe<UserRole>;
  userId: Scalars["ID"]["input"];
};

export type UploadAvatarInput = {
  base64: Scalars["String"]["input"];
  size: Scalars["Int"]["input"];
  type: Scalars["String"]["input"];
  userId: Scalars["ID"]["input"];
};

export type User = {
  __typename?: "User";
  created_at: Scalars["String"]["output"];
  cvs?: Maybe<Array<Cv>>;
  department?: Maybe<Department>;
  department_name?: Maybe<Scalars["String"]["output"]>;
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  is_verified: Scalars["Boolean"]["output"];
  position?: Maybe<Position>;
  position_name?: Maybe<Scalars["String"]["output"]>;
  profile: Profile;
  role: UserRole;
};

export enum UserRole {
  Admin = "Admin",
  Employee = "Employee",
}

export type VerifyMailInput = {
  otp: Scalars["String"]["input"];
};

export type AddCvProjectMutationVariables = Exact<{
  project: AddCvProjectInput;
}>;

export type AddCvProjectMutation = {
  __typename?: "Mutation";
  addCvProject: {
    __typename?: "Cv";
    id: string;
    projects?: Array<{
      __typename?: "CvProject";
      id: string;
      name: string;
      domain: string;
      description: string;
      start_date: string;
      end_date?: string | null;
      environment: Array<string>;
      responsibilities: Array<string>;
      roles: Array<string>;
      project: { __typename?: "Project"; id: string };
    }> | null;
  };
};

export type AddProfileLanguageMutationVariables = Exact<{
  language: AddProfileLanguageInput;
}>;

export type AddProfileLanguageMutation = {
  __typename?: "Mutation";
  addProfileLanguage: {
    __typename?: "Profile";
    languages: Array<{
      __typename?: "LanguageProficiency";
      name: string;
      proficiency: Proficiency;
    }>;
  };
};

export type AddProfileSkillMutationVariables = Exact<{
  skill: AddProfileSkillInput;
}>;

export type AddProfileSkillMutation = {
  __typename?: "Mutation";
  addProfileSkill: {
    __typename?: "Profile";
    skills: Array<{
      __typename?: "SkillMastery";
      name: string;
      mastery: Mastery;
      categoryId?: string | null;
    }>;
  };
};

export type ChangePasswordMutationVariables = Exact<{
  args: ChangePasswordInput;
}>;

export type ChangePasswordMutation = {
  __typename?: "Mutation";
  changePassword: { __typename?: "User"; id: string; email: string };
};

export type CreateCvMutationVariables = Exact<{
  cv: CreateCvInput;
}>;

export type CreateCvMutation = {
  __typename?: "Mutation";
  createCv: {
    __typename?: "Cv";
    id: string;
    name: string;
    education?: string | null;
    description: string;
    user?: { __typename?: "User"; email: string } | null;
  };
};

export type CreateDepartmentMutationVariables = Exact<{
  department: CreateDepartmentInput;
}>;

export type CreateDepartmentMutation = {
  __typename?: "Mutation";
  createDepartment: { __typename?: "Department"; id: string; name: string };
};

export type CreateLanguageMutationVariables = Exact<{
  language: CreateLanguageInput;
}>;

export type CreateLanguageMutation = {
  __typename?: "Mutation";
  createLanguage: { __typename?: "Language"; id: string };
};

export type CreatePositionMutationVariables = Exact<{
  position: CreatePositionInput;
}>;

export type CreatePositionMutation = {
  __typename?: "Mutation";
  createPosition: { __typename?: "Position"; id: string; name: string };
};

export type CreateProjectMutationVariables = Exact<{
  project: CreateProjectInput;
}>;

export type CreateProjectMutation = {
  __typename?: "Mutation";
  createProject: {
    __typename?: "Project";
    id: string;
    name: string;
    domain: string;
    description: string;
    start_date: string;
    end_date?: string | null;
    environment: Array<string>;
  };
};

export type CreateSkillMutationVariables = Exact<{
  skill: CreateSkillInput;
}>;

export type CreateSkillMutation = {
  __typename?: "Mutation";
  createSkill: {
    __typename?: "Skill";
    id: string;
    name: string;
    created_at: string;
    category_name?: string | null;
    category_parent_name?: string | null;
    category?: { __typename?: "SkillCategory"; id: string; name: string } | null;
  };
};

export type CreateUserMutationVariables = Exact<{
  user: CreateUserInput;
}>;

export type CreateUserMutation = {
  __typename?: "Mutation";
  createUser: { __typename?: "User"; id: string; email: string; role: UserRole };
};

export type DeleteCvMutationVariables = Exact<{
  cv: DeleteCvInput;
}>;

export type DeleteCvMutation = {
  __typename?: "Mutation";
  deleteCv: { __typename?: "DeleteResult"; affected: number };
};

export type DeleteDepartmentMutationVariables = Exact<{
  department: DeleteDepartmentInput;
}>;

export type DeleteDepartmentMutation = {
  __typename?: "Mutation";
  deleteDepartment: { __typename?: "DeleteResult"; affected: number };
};

export type DeleteLanguageMutationVariables = Exact<{
  language: DeleteLanguageInput;
}>;

export type DeleteLanguageMutation = {
  __typename?: "Mutation";
  deleteLanguage: { __typename?: "DeleteResult"; affected: number };
};

export type DeletePositionMutationVariables = Exact<{
  position: DeletePositionInput;
}>;

export type DeletePositionMutation = {
  __typename?: "Mutation";
  deletePosition: { __typename?: "DeleteResult"; affected: number };
};

export type DeleteProfileLanguageMutationVariables = Exact<{
  language: DeleteProfileLanguageInput;
}>;

export type DeleteProfileLanguageMutation = {
  __typename?: "Mutation";
  deleteProfileLanguage: {
    __typename?: "Profile";
    languages: Array<{
      __typename?: "LanguageProficiency";
      name: string;
      proficiency: Proficiency;
    }>;
  };
};

export type DeleteProfileSkillMutationVariables = Exact<{
  skill: DeleteProfileSkillInput;
}>;

export type DeleteProfileSkillMutation = {
  __typename?: "Mutation";
  deleteProfileSkill: {
    __typename?: "Profile";
    skills: Array<{
      __typename?: "SkillMastery";
      name: string;
      mastery: Mastery;
      categoryId?: string | null;
    }>;
  };
};

export type DeleteProjectMutationVariables = Exact<{
  project: DeleteProjectInput;
}>;

export type DeleteProjectMutation = {
  __typename?: "Mutation";
  deleteProject: { __typename?: "DeleteResult"; affected: number };
};

export type DeleteSkillMutationVariables = Exact<{
  skill: DeleteSkillInput;
}>;

export type DeleteSkillMutation = {
  __typename?: "Mutation";
  deleteSkill: { __typename?: "DeleteResult"; affected: number };
};

export type DeleteUserMutationVariables = Exact<{
  userId: Scalars["ID"]["input"];
}>;

export type DeleteUserMutation = {
  __typename?: "Mutation";
  deleteUser: { __typename?: "DeleteResult"; affected: number };
};

export type ForgotPasswordMutationVariables = Exact<{
  auth: ForgotPasswordInput;
}>;

export type ForgotPasswordMutation = { __typename?: "Mutation"; forgotPassword?: any | null };

export type LoginMutationVariables = Exact<{
  auth: AuthInput;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "AuthResult";
    access_token: string;
    refresh_token: string;
    user: { __typename?: "User"; id: string };
  };
};

export type RemoveCvProjectMutationVariables = Exact<{
  project: RemoveCvProjectInput;
}>;

export type RemoveCvProjectMutation = {
  __typename?: "Mutation";
  removeCvProject: {
    __typename?: "Cv";
    id: string;
    projects?: Array<{
      __typename?: "CvProject";
      id: string;
      name: string;
      domain: string;
      description: string;
      start_date: string;
      end_date?: string | null;
      environment: Array<string>;
      responsibilities: Array<string>;
      roles: Array<string>;
      project: { __typename?: "Project"; id: string };
    }> | null;
  };
};

export type ResetPasswordMutationVariables = Exact<{
  auth: ResetPasswordInput;
}>;

export type ResetPasswordMutation = { __typename?: "Mutation"; resetPassword?: any | null };

export type SendVerificationMutationVariables = Exact<{
  email: Scalars["String"]["input"];
}>;

export type SendVerificationMutation = { __typename?: "Mutation"; sendVerification?: any | null };

export type SignupMutationVariables = Exact<{
  auth: AuthInput;
}>;

export type SignupMutation = {
  __typename?: "Mutation";
  signup: {
    __typename?: "AuthResult";
    access_token: string;
    refresh_token: string;
    user: { __typename?: "User"; id: string };
  };
};

export type UpdateCvMutationVariables = Exact<{
  cv: UpdateCvInput;
}>;

export type UpdateCvMutation = {
  __typename?: "Mutation";
  updateCv: {
    __typename?: "Cv";
    id: string;
    name: string;
    education?: string | null;
    description: string;
    user?: { __typename?: "User"; email: string } | null;
  };
};

export type UpdateCvProjectMutationVariables = Exact<{
  project: UpdateCvProjectInput;
}>;

export type UpdateCvProjectMutation = {
  __typename?: "Mutation";
  updateCvProject: {
    __typename?: "Cv";
    id: string;
    projects?: Array<{
      __typename?: "CvProject";
      id: string;
      name: string;
      domain: string;
      description: string;
      start_date: string;
      end_date?: string | null;
      environment: Array<string>;
      responsibilities: Array<string>;
      roles: Array<string>;
      project: { __typename?: "Project"; id: string };
    }> | null;
  };
};

export type UpdateDepartmentMutationVariables = Exact<{
  department: UpdateDepartmentInput;
}>;

export type UpdateDepartmentMutation = {
  __typename?: "Mutation";
  updateDepartment: { __typename?: "Department"; id: string; name: string };
};

export type UpdateLanguageMutationVariables = Exact<{
  language: UpdateLanguageInput;
}>;

export type UpdateLanguageMutation = {
  __typename?: "Mutation";
  updateLanguage: {
    __typename?: "Language";
    id: string;
    name: string;
    iso2: string;
    native_name?: string | null;
  };
};

export type UpdatePositionMutationVariables = Exact<{
  position: UpdatePositionInput;
}>;

export type UpdatePositionMutation = {
  __typename?: "Mutation";
  updatePosition: { __typename?: "Position"; id: string; name: string };
};

export type UpdateProfileMutationVariables = Exact<{
  profile: UpdateProfileInput;
}>;

export type UpdateProfileMutation = {
  __typename?: "Mutation";
  updateProfile: {
    __typename?: "Profile";
    id: string;
    first_name?: string | null;
    last_name?: string | null;
    full_name?: string | null;
    avatar?: string | null;
  };
};

export type UpdateProfileLanguageMutationVariables = Exact<{
  language: UpdateProfileLanguageInput;
}>;

export type UpdateProfileLanguageMutation = {
  __typename?: "Mutation";
  updateProfileLanguage: {
    __typename?: "Profile";
    languages: Array<{
      __typename?: "LanguageProficiency";
      name: string;
      proficiency: Proficiency;
    }>;
  };
};

export type UpdateProfileSkillMutationVariables = Exact<{
  skill: UpdateProfileSkillInput;
}>;

export type UpdateProfileSkillMutation = {
  __typename?: "Mutation";
  updateProfileSkill: {
    __typename?: "Profile";
    skills: Array<{
      __typename?: "SkillMastery";
      name: string;
      mastery: Mastery;
      categoryId?: string | null;
    }>;
  };
};

export type UpdateProjectMutationVariables = Exact<{
  project: UpdateProjectInput;
}>;

export type UpdateProjectMutation = {
  __typename?: "Mutation";
  updateProject: {
    __typename?: "Project";
    id: string;
    name: string;
    domain: string;
    description: string;
    start_date: string;
    end_date?: string | null;
    environment: Array<string>;
  };
};

export type UpdateSkillMutationVariables = Exact<{
  skill: UpdateSkillInput;
}>;

export type UpdateSkillMutation = {
  __typename?: "Mutation";
  updateSkill: {
    __typename?: "Skill";
    id: string;
    name: string;
    created_at: string;
    category_name?: string | null;
    category_parent_name?: string | null;
    category?: { __typename?: "SkillCategory"; id: string; name: string } | null;
  };
};

export type UpdateTokenMutationVariables = Exact<{ [key: string]: never }>;

export type UpdateTokenMutation = {
  __typename?: "Mutation";
  updateToken: { __typename?: "UpdateTokenResult"; access_token: string; refresh_token: string };
};

export type UpdateUserMutationVariables = Exact<{
  user: UpdateUserInput;
}>;

export type UpdateUserMutation = {
  __typename?: "Mutation";
  updateUser: {
    __typename?: "User";
    id: string;
    created_at: string;
    email: string;
    is_verified: boolean;
    role: UserRole;
    department_name?: string | null;
    position_name?: string | null;
    profile: {
      __typename?: "Profile";
      id: string;
      created_at: string;
      first_name?: string | null;
      last_name?: string | null;
      full_name?: string | null;
      avatar?: string | null;
    };
    department?: { __typename?: "Department"; id: string; name: string } | null;
    position?: { __typename?: "Position"; id: string; name: string } | null;
  };
};

export type UploadAvatarMutationVariables = Exact<{
  avatar: UploadAvatarInput;
}>;

export type UploadAvatarMutation = { __typename?: "Mutation"; uploadAvatar: string };

export type VerifyMailMutationVariables = Exact<{
  otp: Scalars["String"]["input"];
}>;

export type VerifyMailMutation = { __typename?: "Mutation"; verifyMail?: any | null };

export type CvQueryVariables = Exact<{
  cvId: Scalars["ID"]["input"];
}>;

export type CvQuery = {
  __typename?: "Query";
  cv: {
    __typename?: "Cv";
    id: string;
    name: string;
    education?: string | null;
    description: string;
    user?: { __typename?: "User"; id: string; email: string } | null;
    projects?: Array<{
      __typename?: "CvProject";
      id: string;
      name: string;
      domain: string;
      description: string;
      start_date: string;
      end_date?: string | null;
      environment: Array<string>;
      responsibilities: Array<string>;
      roles: Array<string>;
      project: { __typename?: "Project"; id: string };
    }> | null;
  };
};

export type CvsQueryVariables = Exact<{
  params: SearchPaginationInput;
}>;

export type CvsQuery = {
  __typename?: "Query";
  cvs: {
    __typename?: "PaginatedCvs";
    total: number;
    page: number;
    limit: number;
    total_pages: number;
    items: Array<{
      __typename?: "Cv";
      id: string;
      name: string;
      education?: string | null;
      description: string;
      user?: { __typename?: "User"; email: string } | null;
    }>;
  };
};

export type DepartmentsQueryVariables = Exact<{
  params: SearchPaginationInput;
}>;

export type DepartmentsQuery = {
  __typename?: "Query";
  departments: {
    __typename?: "PaginatedDepartments";
    total: number;
    page: number;
    limit: number;
    total_pages: number;
    items: Array<{ __typename?: "Department"; id: string; name: string }>;
  };
};

export type LanguagesQueryVariables = Exact<{
  params: SearchPaginationInput;
}>;

export type LanguagesQuery = {
  __typename?: "Query";
  languages: {
    __typename?: "PaginatedLanguages";
    total: number;
    page: number;
    limit: number;
    total_pages: number;
    items: Array<{
      __typename?: "Language";
      id: string;
      name: string;
      native_name?: string | null;
      iso2: string;
    }>;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me: { __typename?: "Profile"; id: string; is_verified?: boolean | null; role?: UserRole | null };
};

export type PositionsQueryVariables = Exact<{
  params: SearchPaginationInput;
}>;

export type PositionsQuery = {
  __typename?: "Query";
  positions: {
    __typename?: "PaginatedPositions";
    total: number;
    page: number;
    limit: number;
    total_pages: number;
    items: Array<{ __typename?: "Position"; id: string; name: string }>;
  };
};

export type ProfileQueryVariables = Exact<{
  userId: Scalars["ID"]["input"];
}>;

export type ProfileQuery = {
  __typename?: "Query";
  profile: {
    __typename?: "Profile";
    languages: Array<{
      __typename?: "LanguageProficiency";
      name: string;
      proficiency: Proficiency;
    }>;
    skills: Array<{
      __typename?: "SkillMastery";
      name: string;
      mastery: Mastery;
      categoryId?: string | null;
    }>;
  };
};

export type ProjectsQueryVariables = Exact<{
  params: SearchPaginationInput;
}>;

export type ProjectsQuery = {
  __typename?: "Query";
  projects: {
    __typename?: "PaginatedProjects";
    total_pages: number;
    total: number;
    limit: number;
    page: number;
    items: Array<{
      __typename?: "Project";
      id: string;
      name: string;
      domain: string;
      description: string;
      start_date: string;
      end_date?: string | null;
      environment: Array<string>;
    }>;
  };
};

export type SkillsQueryVariables = Exact<{
  params: SearchPaginationInput;
}>;

export type SkillsQuery = {
  __typename?: "Query";
  skills: {
    __typename?: "PaginatedSkills";
    total: number;
    page: number;
    limit: number;
    total_pages: number;
    items: Array<{
      __typename?: "Skill";
      id: string;
      name: string;
      created_at: string;
      category_name?: string | null;
      category_parent_name?: string | null;
      category?: { __typename?: "SkillCategory"; id: string; name: string } | null;
    }>;
  };
};

export type SkillCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type SkillCategoriesQuery = {
  __typename?: "Query";
  skillCategories: Array<{
    __typename?: "SkillCategory";
    id: string;
    name: string;
    children: Array<{ __typename?: "SkillCategory"; id: string; name: string }>;
    parent?: { __typename?: "SkillCategory"; id: string; name: string } | null;
  }>;
};

export type CvsByUserIdQueryVariables = Exact<{
  params: SearchPaginationInput;
  userId: Scalars["ID"]["input"];
}>;

export type CvsByUserIdQuery = {
  __typename?: "Query";
  cvsByUserId: {
    __typename?: "PaginatedCvs";
    total: number;
    page: number;
    limit: number;
    total_pages: number;
    items: Array<{
      __typename?: "Cv";
      id: string;
      name: string;
      education?: string | null;
      description: string;
      user?: { __typename?: "User"; email: string } | null;
    }>;
  };
};

export type UserQueryVariables = Exact<{
  userId: Scalars["ID"]["input"];
}>;

export type UserQuery = {
  __typename?: "Query";
  user: {
    __typename?: "User";
    id: string;
    email: string;
    created_at: string;
    department?: { __typename?: "Department"; id: string; name: string } | null;
    position?: { __typename?: "Position"; id: string; name: string } | null;
    profile: {
      __typename?: "Profile";
      avatar?: string | null;
      email?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      full_name?: string | null;
      created_at: string;
    };
  };
  departments: {
    __typename?: "PaginatedDepartments";
    items: Array<{ __typename?: "Department"; id: string; name: string }>;
  };
  positions: {
    __typename?: "PaginatedPositions";
    items: Array<{ __typename?: "Position"; id: string; name: string }>;
  };
};

export type UsersQueryVariables = Exact<{
  params: SearchPaginationInput;
}>;

export type UsersQuery = {
  __typename?: "Query";
  users: {
    __typename?: "PaginatedUsers";
    total: number;
    page: number;
    limit: number;
    total_pages: number;
    items: Array<{
      __typename?: "User";
      id: string;
      email: string;
      role: UserRole;
      is_verified: boolean;
      department?: { __typename?: "Department"; id: string; name: string } | null;
      position?: { __typename?: "Position"; id: string; name: string } | null;
      profile: {
        __typename?: "Profile";
        last_name?: string | null;
        first_name?: string | null;
        avatar?: string | null;
      };
    }>;
  };
};

export const AddCvProjectDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddCvProject" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "project" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "AddCvProjectInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addCvProject" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "project" },
                value: { kind: "Variable", name: { kind: "Name", value: "project" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "projects" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "domain" } },
                      { kind: "Field", name: { kind: "Name", value: "description" } },
                      { kind: "Field", name: { kind: "Name", value: "start_date" } },
                      { kind: "Field", name: { kind: "Name", value: "end_date" } },
                      { kind: "Field", name: { kind: "Name", value: "environment" } },
                      { kind: "Field", name: { kind: "Name", value: "responsibilities" } },
                      { kind: "Field", name: { kind: "Name", value: "roles" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "project" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddCvProjectMutation, AddCvProjectMutationVariables>;
export const AddProfileLanguageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddProfileLanguage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "language" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "AddProfileLanguageInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addProfileLanguage" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "Variable", name: { kind: "Name", value: "language" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "languages" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "proficiency" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddProfileLanguageMutation, AddProfileLanguageMutationVariables>;
export const AddProfileSkillDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddProfileSkill" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skill" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "AddProfileSkillInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addProfileSkill" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "skill" },
                value: { kind: "Variable", name: { kind: "Name", value: "skill" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "skills" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "mastery" } },
                      { kind: "Field", name: { kind: "Name", value: "categoryId" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddProfileSkillMutation, AddProfileSkillMutationVariables>;
export const ChangePasswordDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ChangePassword" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "args" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ChangePasswordInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "changePassword" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "args" },
                value: { kind: "Variable", name: { kind: "Name", value: "args" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateCvDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateCv" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "cv" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "CreateCvInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createCv" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "cv" },
                value: { kind: "Variable", name: { kind: "Name", value: "cv" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "education" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "email" } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateCvMutation, CreateCvMutationVariables>;
export const CreateDepartmentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateDepartment" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "department" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "CreateDepartmentInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createDepartment" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "department" },
                value: { kind: "Variable", name: { kind: "Name", value: "department" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateDepartmentMutation, CreateDepartmentMutationVariables>;
export const CreateLanguageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateLanguage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "language" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "CreateLanguageInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createLanguage" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "Variable", name: { kind: "Name", value: "language" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateLanguageMutation, CreateLanguageMutationVariables>;
export const CreatePositionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreatePosition" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "position" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "CreatePositionInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createPosition" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "position" },
                value: { kind: "Variable", name: { kind: "Name", value: "position" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreatePositionMutation, CreatePositionMutationVariables>;
export const CreateProjectDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateProject" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "project" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "CreateProjectInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createProject" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "project" },
                value: { kind: "Variable", name: { kind: "Name", value: "project" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "domain" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "start_date" } },
                { kind: "Field", name: { kind: "Name", value: "end_date" } },
                { kind: "Field", name: { kind: "Name", value: "environment" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateProjectMutation, CreateProjectMutationVariables>;
export const CreateSkillDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateSkill" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skill" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "CreateSkillInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createSkill" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "skill" },
                value: { kind: "Variable", name: { kind: "Name", value: "skill" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "created_at" } },
                { kind: "Field", name: { kind: "Name", value: "category_name" } },
                { kind: "Field", name: { kind: "Name", value: "category_parent_name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "category" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateSkillMutation, CreateSkillMutationVariables>;
export const CreateUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "user" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "CreateUserInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "user" },
                value: { kind: "Variable", name: { kind: "Name", value: "user" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "role" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteCvDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteCv" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "cv" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "DeleteCvInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteCv" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "cv" },
                value: { kind: "Variable", name: { kind: "Name", value: "cv" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "affected" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteCvMutation, DeleteCvMutationVariables>;
export const DeleteDepartmentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteDepartment" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "department" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "DeleteDepartmentInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteDepartment" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "department" },
                value: { kind: "Variable", name: { kind: "Name", value: "department" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "affected" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteDepartmentMutation, DeleteDepartmentMutationVariables>;
export const DeleteLanguageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteLanguage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "language" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "DeleteLanguageInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteLanguage" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "Variable", name: { kind: "Name", value: "language" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "affected" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteLanguageMutation, DeleteLanguageMutationVariables>;
export const DeletePositionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeletePosition" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "position" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "DeletePositionInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deletePosition" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "position" },
                value: { kind: "Variable", name: { kind: "Name", value: "position" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "affected" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeletePositionMutation, DeletePositionMutationVariables>;
export const DeleteProfileLanguageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteProfileLanguage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "language" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "DeleteProfileLanguageInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteProfileLanguage" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "Variable", name: { kind: "Name", value: "language" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "languages" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "proficiency" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteProfileLanguageMutation, DeleteProfileLanguageMutationVariables>;
export const DeleteProfileSkillDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteProfileSkill" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skill" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "DeleteProfileSkillInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteProfileSkill" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "skill" },
                value: { kind: "Variable", name: { kind: "Name", value: "skill" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "skills" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "mastery" } },
                      { kind: "Field", name: { kind: "Name", value: "categoryId" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteProfileSkillMutation, DeleteProfileSkillMutationVariables>;
export const DeleteProjectDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteProject" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "project" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "DeleteProjectInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteProject" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "project" },
                value: { kind: "Variable", name: { kind: "Name", value: "project" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "affected" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const DeleteSkillDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteSkill" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skill" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "DeleteSkillInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteSkill" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "skill" },
                value: { kind: "Variable", name: { kind: "Name", value: "skill" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "affected" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteSkillMutation, DeleteSkillMutationVariables>;
export const DeleteUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "userId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "userId" },
                value: { kind: "Variable", name: { kind: "Name", value: "userId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "affected" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const ForgotPasswordDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ForgotPassword" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "auth" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ForgotPasswordInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "forgotPassword" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "auth" },
                value: { kind: "Variable", name: { kind: "Name", value: "auth" } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Login" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "auth" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "AuthInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "login" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "auth" },
                value: { kind: "Variable", name: { kind: "Name", value: "auth" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "access_token" } },
                { kind: "Field", name: { kind: "Name", value: "refresh_token" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RemoveCvProjectDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RemoveCvProject" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "project" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "RemoveCvProjectInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "removeCvProject" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "project" },
                value: { kind: "Variable", name: { kind: "Name", value: "project" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "projects" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "domain" } },
                      { kind: "Field", name: { kind: "Name", value: "description" } },
                      { kind: "Field", name: { kind: "Name", value: "start_date" } },
                      { kind: "Field", name: { kind: "Name", value: "end_date" } },
                      { kind: "Field", name: { kind: "Name", value: "environment" } },
                      { kind: "Field", name: { kind: "Name", value: "responsibilities" } },
                      { kind: "Field", name: { kind: "Name", value: "roles" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "project" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RemoveCvProjectMutation, RemoveCvProjectMutationVariables>;
export const ResetPasswordDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ResetPassword" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "auth" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ResetPasswordInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "resetPassword" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "auth" },
                value: { kind: "Variable", name: { kind: "Name", value: "auth" } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const SendVerificationDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "sendVerification" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "email" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "sendVerification" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: { kind: "Variable", name: { kind: "Name", value: "email" } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SendVerificationMutation, SendVerificationMutationVariables>;
export const SignupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Signup" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "auth" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "AuthInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "signup" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "auth" },
                value: { kind: "Variable", name: { kind: "Name", value: "auth" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "access_token" } },
                { kind: "Field", name: { kind: "Name", value: "refresh_token" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>;
export const UpdateCvDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateCv" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "cv" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UpdateCvInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateCv" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "cv" },
                value: { kind: "Variable", name: { kind: "Name", value: "cv" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "education" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "email" } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateCvMutation, UpdateCvMutationVariables>;
export const UpdateCvProjectDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateCvProject" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "project" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UpdateCvProjectInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateCvProject" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "project" },
                value: { kind: "Variable", name: { kind: "Name", value: "project" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "projects" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "domain" } },
                      { kind: "Field", name: { kind: "Name", value: "description" } },
                      { kind: "Field", name: { kind: "Name", value: "start_date" } },
                      { kind: "Field", name: { kind: "Name", value: "end_date" } },
                      { kind: "Field", name: { kind: "Name", value: "environment" } },
                      { kind: "Field", name: { kind: "Name", value: "responsibilities" } },
                      { kind: "Field", name: { kind: "Name", value: "roles" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "project" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateCvProjectMutation, UpdateCvProjectMutationVariables>;
export const UpdateDepartmentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateDepartment" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "department" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UpdateDepartmentInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateDepartment" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "department" },
                value: { kind: "Variable", name: { kind: "Name", value: "department" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateDepartmentMutation, UpdateDepartmentMutationVariables>;
export const UpdateLanguageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateLanguage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "language" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UpdateLanguageInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateLanguage" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "Variable", name: { kind: "Name", value: "language" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "iso2" } },
                { kind: "Field", name: { kind: "Name", value: "native_name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateLanguageMutation, UpdateLanguageMutationVariables>;
export const UpdatePositionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdatePosition" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "position" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UpdatePositionInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updatePosition" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "position" },
                value: { kind: "Variable", name: { kind: "Name", value: "position" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdatePositionMutation, UpdatePositionMutationVariables>;
export const UpdateProfileDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateProfile" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "profile" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UpdateProfileInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateProfile" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "profile" },
                value: { kind: "Variable", name: { kind: "Name", value: "profile" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "first_name" } },
                { kind: "Field", name: { kind: "Name", value: "last_name" } },
                { kind: "Field", name: { kind: "Name", value: "full_name" } },
                { kind: "Field", name: { kind: "Name", value: "avatar" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const UpdateProfileLanguageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateProfileLanguage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "language" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateProfileLanguageInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateProfileLanguage" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "Variable", name: { kind: "Name", value: "language" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "languages" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "proficiency" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateProfileLanguageMutation, UpdateProfileLanguageMutationVariables>;
export const UpdateProfileSkillDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateProfileSkill" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skill" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UpdateProfileSkillInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateProfileSkill" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "skill" },
                value: { kind: "Variable", name: { kind: "Name", value: "skill" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "skills" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "mastery" } },
                      { kind: "Field", name: { kind: "Name", value: "categoryId" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateProfileSkillMutation, UpdateProfileSkillMutationVariables>;
export const UpdateProjectDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateProject" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "project" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UpdateProjectInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateProject" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "project" },
                value: { kind: "Variable", name: { kind: "Name", value: "project" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "domain" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "start_date" } },
                { kind: "Field", name: { kind: "Name", value: "end_date" } },
                { kind: "Field", name: { kind: "Name", value: "environment" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const UpdateSkillDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateSkill" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skill" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UpdateSkillInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateSkill" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "skill" },
                value: { kind: "Variable", name: { kind: "Name", value: "skill" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "created_at" } },
                { kind: "Field", name: { kind: "Name", value: "category_name" } },
                { kind: "Field", name: { kind: "Name", value: "category_parent_name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "category" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateSkillMutation, UpdateSkillMutationVariables>;
export const UpdateTokenDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateToken" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateToken" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "access_token" } },
                { kind: "Field", name: { kind: "Name", value: "refresh_token" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateTokenMutation, UpdateTokenMutationVariables>;
export const UpdateUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "user" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UpdateUserInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "user" },
                value: { kind: "Variable", name: { kind: "Name", value: "user" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "created_at" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "is_verified" } },
                { kind: "Field", name: { kind: "Name", value: "role" } },
                { kind: "Field", name: { kind: "Name", value: "department_name" } },
                { kind: "Field", name: { kind: "Name", value: "position_name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "profile" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "created_at" } },
                      { kind: "Field", name: { kind: "Name", value: "first_name" } },
                      { kind: "Field", name: { kind: "Name", value: "last_name" } },
                      { kind: "Field", name: { kind: "Name", value: "full_name" } },
                      { kind: "Field", name: { kind: "Name", value: "avatar" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "department" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "position" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const UploadAvatarDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UploadAvatar" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "avatar" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UploadAvatarInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "uploadAvatar" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "avatar" },
                value: { kind: "Variable", name: { kind: "Name", value: "avatar" } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UploadAvatarMutation, UploadAvatarMutationVariables>;
export const VerifyMailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "verifyMail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "otp" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "verifyMail" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "mail" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "otp" },
                      value: { kind: "Variable", name: { kind: "Name", value: "otp" } },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<VerifyMailMutation, VerifyMailMutationVariables>;
export const CvDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Cv" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "cvId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "cv" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "cvId" },
                value: { kind: "Variable", name: { kind: "Name", value: "cvId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "education" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "projects" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "domain" } },
                      { kind: "Field", name: { kind: "Name", value: "description" } },
                      { kind: "Field", name: { kind: "Name", value: "start_date" } },
                      { kind: "Field", name: { kind: "Name", value: "end_date" } },
                      { kind: "Field", name: { kind: "Name", value: "environment" } },
                      { kind: "Field", name: { kind: "Name", value: "responsibilities" } },
                      { kind: "Field", name: { kind: "Name", value: "roles" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "project" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CvQuery, CvQueryVariables>;
export const CvsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Cvs" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "params" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "SearchPaginationInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "cvs" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "params" },
                value: { kind: "Variable", name: { kind: "Name", value: "params" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "education" } },
                      { kind: "Field", name: { kind: "Name", value: "description" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "user" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "email" } }],
                        },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "total" } },
                { kind: "Field", name: { kind: "Name", value: "page" } },
                { kind: "Field", name: { kind: "Name", value: "limit" } },
                { kind: "Field", name: { kind: "Name", value: "total_pages" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CvsQuery, CvsQueryVariables>;
export const DepartmentsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Departments" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "params" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "SearchPaginationInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "departments" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "params" },
                value: { kind: "Variable", name: { kind: "Name", value: "params" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "total" } },
                { kind: "Field", name: { kind: "Name", value: "page" } },
                { kind: "Field", name: { kind: "Name", value: "limit" } },
                { kind: "Field", name: { kind: "Name", value: "total_pages" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DepartmentsQuery, DepartmentsQueryVariables>;
export const LanguagesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Languages" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "params" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "SearchPaginationInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "languages" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "params" },
                value: { kind: "Variable", name: { kind: "Name", value: "params" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "native_name" } },
                      { kind: "Field", name: { kind: "Name", value: "iso2" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "total" } },
                { kind: "Field", name: { kind: "Name", value: "page" } },
                { kind: "Field", name: { kind: "Name", value: "limit" } },
                { kind: "Field", name: { kind: "Name", value: "total_pages" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LanguagesQuery, LanguagesQueryVariables>;
export const MeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Me" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "me" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "is_verified" } },
                { kind: "Field", name: { kind: "Name", value: "role" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const PositionsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Positions" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "params" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "SearchPaginationInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "positions" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "params" },
                value: { kind: "Variable", name: { kind: "Name", value: "params" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "total" } },
                { kind: "Field", name: { kind: "Name", value: "page" } },
                { kind: "Field", name: { kind: "Name", value: "limit" } },
                { kind: "Field", name: { kind: "Name", value: "total_pages" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PositionsQuery, PositionsQueryVariables>;
export const ProfileDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Profile" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "userId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "profile" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "userId" },
                value: { kind: "Variable", name: { kind: "Name", value: "userId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "languages" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "proficiency" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "skills" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "mastery" } },
                      { kind: "Field", name: { kind: "Name", value: "categoryId" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProfileQuery, ProfileQueryVariables>;
export const ProjectsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Projects" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "params" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "SearchPaginationInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "projects" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "params" },
                value: { kind: "Variable", name: { kind: "Name", value: "params" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "domain" } },
                      { kind: "Field", name: { kind: "Name", value: "description" } },
                      { kind: "Field", name: { kind: "Name", value: "start_date" } },
                      { kind: "Field", name: { kind: "Name", value: "end_date" } },
                      { kind: "Field", name: { kind: "Name", value: "environment" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "total_pages" } },
                { kind: "Field", name: { kind: "Name", value: "total" } },
                { kind: "Field", name: { kind: "Name", value: "limit" } },
                { kind: "Field", name: { kind: "Name", value: "page" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProjectsQuery, ProjectsQueryVariables>;
export const SkillsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Skills" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "params" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "SearchPaginationInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "skills" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "params" },
                value: { kind: "Variable", name: { kind: "Name", value: "params" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "created_at" } },
                      { kind: "Field", name: { kind: "Name", value: "category_name" } },
                      { kind: "Field", name: { kind: "Name", value: "category_parent_name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "category" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "total" } },
                { kind: "Field", name: { kind: "Name", value: "page" } },
                { kind: "Field", name: { kind: "Name", value: "limit" } },
                { kind: "Field", name: { kind: "Name", value: "total_pages" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SkillsQuery, SkillsQueryVariables>;
export const SkillCategoriesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "SkillCategories" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "skillCategories" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "children" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "parent" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SkillCategoriesQuery, SkillCategoriesQueryVariables>;
export const CvsByUserIdDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "CvsByUserId" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "params" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "SearchPaginationInput" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "userId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "cvsByUserId" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "params" },
                value: { kind: "Variable", name: { kind: "Name", value: "params" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "userId" },
                value: { kind: "Variable", name: { kind: "Name", value: "userId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "education" } },
                      { kind: "Field", name: { kind: "Name", value: "description" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "user" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "email" } }],
                        },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "total" } },
                { kind: "Field", name: { kind: "Name", value: "page" } },
                { kind: "Field", name: { kind: "Name", value: "limit" } },
                { kind: "Field", name: { kind: "Name", value: "total_pages" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CvsByUserIdQuery, CvsByUserIdQueryVariables>;
export const UserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "user" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "userId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "userId" },
                value: { kind: "Variable", name: { kind: "Name", value: "userId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "created_at" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "department" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "position" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "profile" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "avatar" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      { kind: "Field", name: { kind: "Name", value: "first_name" } },
                      { kind: "Field", name: { kind: "Name", value: "last_name" } },
                      { kind: "Field", name: { kind: "Name", value: "full_name" } },
                      { kind: "Field", name: { kind: "Name", value: "created_at" } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "departments" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "positions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const UsersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Users" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "params" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "SearchPaginationInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "users" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "params" },
                value: { kind: "Variable", name: { kind: "Name", value: "params" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "department" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "position" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                          ],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      { kind: "Field", name: { kind: "Name", value: "role" } },
                      { kind: "Field", name: { kind: "Name", value: "is_verified" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "profile" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "last_name" } },
                            { kind: "Field", name: { kind: "Name", value: "first_name" } },
                            { kind: "Field", name: { kind: "Name", value: "avatar" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "total" } },
                { kind: "Field", name: { kind: "Name", value: "page" } },
                { kind: "Field", name: { kind: "Name", value: "limit" } },
                { kind: "Field", name: { kind: "Name", value: "total_pages" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
