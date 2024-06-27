// src/schemas/schema.ts
import { type SchemaTypeDefinition } from "sanity";
import topicSchema from "./schema/topic";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [topicSchema],
};
