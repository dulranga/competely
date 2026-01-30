import { drizzle } from "drizzle-orm/node-postgres";
// import * as enums from "./enums";
import * as schema from "./schema";

// import * as views from "./views";

// const db = drizzle(process.env.DATABASE_URL!, { schema: { ...schema, ...views, ...enums } });

const db = drizzle(process.env.DATABASE_URL!, { schema: { ...schema } });

export default db;
