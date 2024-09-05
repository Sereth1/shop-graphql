import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const host: string | undefined = process.env.SQL_HOST;
const user: string | undefined = process.env.SQL_USER;
const password: string | undefined = process.env.SQL_PASS;
const database: string | undefined = process.env.SQL_DB;

if (!host || !user || !password || !database) {
    throw new Error('Missing required environment variables for database connection.');
}

const pool: mysql.Pool = mysql.createPool({
    host,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default pool;