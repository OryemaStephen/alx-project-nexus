// globals.d.ts
declare module "apollo-upload-client" {
  import { ApolloLink } from "@apollo/client";
  export function createUploadLink(options?: unknown): ApolloLink;
}
