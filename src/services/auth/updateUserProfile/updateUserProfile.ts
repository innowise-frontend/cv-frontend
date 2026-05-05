import {
  UpdateProfileDocument,
  UpdateUserDocument,
  UploadAvatarDocument,
  UserDocument,
} from "@services/graphql/__generated__/graphql";
import type {
  UpdateProfileInput,
  UpdateProfileMutation,
  UpdateProfileMutationVariables,
  UpdateUserInput,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  UploadAvatarInput,
  UploadAvatarMutation,
  UploadAvatarMutationVariables,
  UserQuery,
  UserQueryVariables,
} from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export async function fetchUserProfile(userId: string): Promise<UserQuery> {
  return requestWithAuth<UserQuery, UserQueryVariables>(UserDocument, { userId });
}

export async function submitUpdateUser(user: UpdateUserInput): Promise<UpdateUserMutation> {
  return requestWithAuth<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, {
    user,
  });
}

export async function submitUpdateProfile(
  profile: UpdateProfileInput,
): Promise<UpdateProfileMutation> {
  return requestWithAuth<UpdateProfileMutation, UpdateProfileMutationVariables>(
    UpdateProfileDocument,
    { profile },
  );
}

export async function submitUploadAvatar(avatar: UploadAvatarInput): Promise<UploadAvatarMutation> {
  return requestWithAuth<UploadAvatarMutation, UploadAvatarMutationVariables>(
    UploadAvatarDocument,
    { avatar },
  );
}
