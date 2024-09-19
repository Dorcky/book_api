import db from '../config/db.js';

const bookModel = {
  getAllBooks: (callback) => {
    db.query('SELECT * FROM books', callback);
  },

  getBookById: (id, callback) => {
    db.query('SELECT * FROM books WHERE id = ?', [id], callback);
  },

  createBook: (newBook, callback) => {
    db.query('INSERT INTO books SET ?', newBook, callback);
  },

  updateBook: (id, bookData, callback) => {
    db.query('UPDATE books SET ? WHERE id = ?', [bookData, id], callback);
  },

  deleteBook: (id, callback) => {
    db.query('DELETE FROM books WHERE id = ?', [id], callback);
  }
};

export default bookModel;
