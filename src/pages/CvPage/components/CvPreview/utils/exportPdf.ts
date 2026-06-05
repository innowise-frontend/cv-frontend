import cvPreviewExportCss from "./cvPreviewExport.css?inline";

export const buildCvPreviewExportHtml = (documentHtml: string): string => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <style>${cvPreviewExportCss}</style>
  </head>
  <body>${documentHtml}</body>
</html>`;

export const downloadBase64Pdf = (base64: string, filename: string) => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

export const sanitizePdfFilename = (name: string) =>
  name
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "_") || "cv";
