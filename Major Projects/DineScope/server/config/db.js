import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const sql = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "yelp",
    password: "password",
    port: 5432,
});
sql.connect();

export default sql;