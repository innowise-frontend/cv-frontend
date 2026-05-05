import { ALLOWED_MIME, EXT_RE } from "./constants";
import type { PreparedAvatarFields } from "./types";
import type { TFunction } from "i18next";

function readFileAsDataUrl(file: File, t: TFunction): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error(t("page.profile.avatar.readFailed")));
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.readAsDataURL(file);
  });
}

export async function prepareAvatarForUpload(
  file: File,
  maxBytes: number,
  t: TFunction,
): Promise<{ ok: true; avatar: PreparedAvatarFields } | { ok: false; message: string }> {
  const extOk = EXT_RE.test(file.name);
  const mimeOk = !file.type || ALLOWED_MIME.has(file.type.toLowerCase());

  if (!mimeOk && !extOk) {
    return { ok: false, message: t("page.profile.avatar.wrongType") };
  }

  if (file.size > maxBytes) {
    return { ok: false, message: t("page.profile.avatar.tooLarge") };
  }

  const base64DataUrl = await readFileAsDataUrl(file, t);

  if (!base64DataUrl.startsWith("data:")) {
    return { ok: false, message: t("page.profile.avatar.invalidEncoding") };
  }

  const mime =
    (file.type && file.type.toLowerCase().replace("image/jpg", "image/jpeg")) ||
    base64DataUrl.slice("data:".length, base64DataUrl.indexOf(";")) ||
    "image/jpeg";

  return {
    ok: true,
    avatar: {
      base64: base64DataUrl,
      size: file.size,
      type: mime,
    },
  };
}
