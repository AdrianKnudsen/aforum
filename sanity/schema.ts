import { type SchemaTypeDefinition } from "sanity";
import generalPostSchema from "./schema/generalPost";
import technologyPostSchema from "./schema/technologyPost";
import lifestyleHobbiesPostSchema from "./schema/lifestyleHobbies";
import scienceNaturePostSchema from "./schema/scienceNature";
import sportsPostSchema from "./schema/sportsPost";
import entertainmentPostSchema from "./schema/entertainmentPost";
import businessPostSchema from "./schema/businessPost";
import authorSchema from "./schema/author";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    authorSchema,
    generalPostSchema,
    technologyPostSchema,
    lifestyleHobbiesPostSchema,
    scienceNaturePostSchema,
    sportsPostSchema,
    entertainmentPostSchema,
    businessPostSchema,
  ],
};
