import mysql from 'mysql2/promise';

export const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'woai88mysql',
    database: 'harrycapstone'
})