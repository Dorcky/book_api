import mysql from 'mysql2';
import { config } from 'dotenv';

config();

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD
};

const dbName = 'booksdb';
const createDbQuery = `CREATE DATABASE IF NOT EXISTS ${dbName}`;
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS ${dbName}.books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    published_date DATE,
    isbn VARCHAR(13),
    pages INT,
    language VARCHAR(50),
    publisher VARCHAR(255)
  )
`;

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }

  connection.query(createDbQuery, (err) => {
    if (err) {
      console.error('Error creating database: ', err);
      return;
    }
    console.log(`Database ${dbName} created or successfully checked`);

    connection.query(createTableQuery, (err) => {
      if (err) {
        console.error('Error creating table: ', err);
        return;
      }
      console.log(`Table 'books' created or successfully checked`);
      connection.end();
    });
  });
});
