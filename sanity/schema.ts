import { type SchemaTypeDefinition } from "sanity";
import generalPostSchema from "./schema/generalPost";
import technologyPostSchema from "./schema/technologyPost";
import lifestyleHobbiesPostSchema from "./schema/lifestyleHobbies";
import scienceNaturePostSchema from "./schema/scienceNature";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    generalPostSchema,
    technologyPostSchema,
    lifestyleHobbiesPostSchema,
    scienceNaturePostSchema,
  ],
};
