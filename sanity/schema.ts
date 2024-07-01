import { type SchemaTypeDefinition } from "sanity";
import generalPostSchema from "./schema/generalPost";
import technologyPostSchema from "./schema/technologyPost";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [generalPostSchema, technologyPostSchema],
};
