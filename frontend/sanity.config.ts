import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/lib/sanity/schemas";
import { structure } from "./src/lib/sanity/structure";

export default defineConfig({
  projectId: "ih14cr70",
  dataset: "production",
  title: "Conscious Pregnancy",
  schema: {
    types: schemaTypes,
  },
  plugins: [structureTool({ structure })],
});
