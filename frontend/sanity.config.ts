import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/lib/sanity/schemas";

export default defineConfig({
  projectId: "ih14cr70",
  dataset: "production",
  title: "Conscious Pregnancy",
  schema: {
    types: schemaTypes,
  },
  plugins: [structureTool()],
});
