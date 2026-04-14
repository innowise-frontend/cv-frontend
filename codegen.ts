/// <reference types="node" />

import "dotenv/config";
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: process.env.VITE_GRAPHQL_URL,
  documents: ["src/**/*.graphql"],
  generates: {
    "src/services/graphql/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  hooks: {
    afterAllFileWrite: ["prettier --write"],
  },
  ignoreNoDocuments: true,
};

export default config;
