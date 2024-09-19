import bookModel from '../models/bookModel.js';

export const getAllBooks = (req, res) => {
  bookModel.getAllBooks((err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

export const getBookById = (req, res) => {
  const { id } = req.params;
  bookModel.getBookById(id, (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else if (results.length) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  });
};

export const createBook = (req, res) => {
  const newBook = req.body;
  bookModel.createBook(newBook, (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(201).json({ id: results.insertId, ...newBook });
    }
  });
};

export const updateBook = (req, res) => {
  const { id } = req.params;
  const bookData = req.body;
  bookModel.updateBook(id, bookData, (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(200).json({ id, ...bookData });
    }
  });
};

export const deleteBook = (req, res) => {
  const { id } = req.params;
  bookModel.deleteBook(id, (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(200).json({ message: 'Book successfully deleted' });
    }
  });
};
