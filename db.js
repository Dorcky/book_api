import mysql from 'mysql2';
import { config } from 'dotenv';

config();

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

connection.connect(error => {
  if (error) throw error;
  console.log("Connected to the database.");
});

export default connection;
