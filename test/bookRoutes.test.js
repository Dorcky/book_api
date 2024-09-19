// test/bookRoutes.test.js
import request from 'supertest';
import { Sequelize } from 'sequelize';
import app from '../app'; // Import from the correct path

const sequelize = new Sequelize('booksdb', 'admin', 'Admin@2020', {
  host: 'localhost',
  dialect: 'mysql'
});

beforeAll(async () => {
  await sequelize.authenticate();
  await sequelize.sync({ force: true }); // Synchronize the database
});

afterAll(async () => {
  await sequelize.close();
});

describe('Book API', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(4000, done); // Start the server before tests
  });

  afterAll((done) => {
    server.close(done); // Close the server after tests
  });

  // Test GET /api/books
  describe('GET /api/books', () => {
    it('should return all books', async () => {
      const res = await request(app).get('/api/books');
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });

  // Test GET /api/books/:id
  describe('GET /api/books/:id', () => {
    it('should return a single book by ID', async () => {
      const res = await request(app).get('/api/books/1');
      if (res.statusCode === 200) {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('title');
      } else {
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('message', 'Book not found');
      }
    });
  });

  // Test POST /api/books
  describe('POST /api/books', () => {
    it('should create a new book', async () => {
      const newBook = {
        title: 'New Book',
        author: 'John Doe',
        published_date: '2023-09-17',
        isbn: '1234567890123',
        pages: 300,
        language: 'English',
        publisher: 'XYZ Publications'
      };

      const res = await request(app)
        .post('/api/books')
        .send(newBook);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('title', 'New Book');
    });
  });

  // Test PUT /api/books/:id
  describe('PUT /api/books/:id', () => {
    it('should update an existing book', async () => {
      const updatedBook = {
        title: 'Updated Book',
        author: 'Jane Doe'
      };

      const res = await request(app)
        .put('/api/books/1')
        .send(updatedBook);

      if (res.statusCode === 200) {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('title', 'Updated Book');
      } else {
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('message', 'Book not found');
      }
    });
  });

  // Test DELETE /api/books/:id
  describe('DELETE /api/books/:id', () => {
    it('should delete a book by ID', async () => {
      const res = await request(app).delete('/api/books/1');

      if (res.statusCode === 200) {
        expect(res.body).toHaveProperty('message', 'Book successfully deleted');
      } else {
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('message', 'Book not found');
      }
    });
  });
});
