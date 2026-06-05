import cvPreviewExportCss from "./cvPreviewExport.css?inline";

export const buildCvPreviewExportHtml = (documentHtml: string): string => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <style>${cvPreviewExportCss}</style>
  </head>
  <body>${documentHtml}</body>
</html>`;
