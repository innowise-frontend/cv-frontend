import { ClientError } from "graphql-request";
import i18n from "@root/i18n/i18n";

const errorCodeToTranslationKey: Record<string, string> = {
  FORBIDDEN: "page.error.api.forbidden",
  UNAUTHORIZED: "page.error.api.unauthorized",
  NOT_FOUND: "page.error.api.notFound",
  CONFLICT: "page.error.api.conflict",
  INTERNAL_SERVER_ERROR: "page.error.api.internalServerError",
};

const getErrorCode = (error: unknown): string | undefined => {
  if (error instanceof ClientError) {
    const code = error.response.errors?.[0]?.extensions?.code;

    if (typeof code === "string" && code.length > 0) {
      return code.toUpperCase();
    }
  }

  if (error instanceof Error) {
    const match = error.message.match(/\b(FORBIDDEN|UNAUTHORIZED|NOT_FOUND|CONFLICT)\b/i);

    if (match?.[1]) {
      return match[1].toUpperCase();
    }
  }

  return undefined;
};

export const getErrorToastMessage = (error: unknown): string => {
  const code = getErrorCode(error);

  if (code) {
    const translationKey = errorCodeToTranslationKey[code];

    if (translationKey) {
      return i18n.t(translationKey);
    }
  }

  if (error instanceof Error && error.message.length > 0) {
    return error.message;
  }

  return i18n.t("page.error.api.default");
};
