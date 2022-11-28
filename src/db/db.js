import { createPool } from "mysql2/promise";
import { DB_DATABASE, DB_PASSWORD, DB_HOST, DB_PORT, DB_USER } from './config.js'

const sql = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
})

export default sql