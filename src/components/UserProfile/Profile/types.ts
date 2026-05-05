import { UploadAvatarInput } from "@root/services/graphql/__generated__/graphql";

export type Option = { value: string; label: string };

export type PreparedAvatarFields = Omit<UploadAvatarInput, "userId">;
