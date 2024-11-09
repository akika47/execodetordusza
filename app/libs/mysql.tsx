import mysql, { Pool, FieldPacket } from 'mysql2/promise'

const pool: Pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA
})

export default pool