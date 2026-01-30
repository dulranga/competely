import { pgGenerate } from "drizzle-dbml-generator";
import * as schema from "../schema";
// import * as enums from "../enums";

const out = "./src/db/dbml/schema.dbml";
const relational = true;

pgGenerate({ schema: { ...schema /*, ...enums */ }, out, relational });
