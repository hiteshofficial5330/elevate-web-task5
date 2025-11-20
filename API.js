// 1. Import Express
const express = require('express');

// 2. Initialize the Express app
const app = express();
const PORT = process.env.PORT || 3000; // Use port 3000 as per hint [cite: 115]

// 3. Middleware: Parse incoming JSON requests
// This is required for req.body to work 
app.use(express.json());

// 4. In-memory "database" (an array) [cite: 116]
let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];
let nextId = 3; // To simulate auto-incrementing IDs

// --- 5. Implement REST API Endpoints (CRUD Operations) ---

/**
 * @route   GET /books
 * @desc    Get all books [cite: 117]
 * @access  Public
 */
app.get('/books', (req, res) => {
    res.status(200).json(books); // 200 OK
});

/**
 * @route   POST /books
 * @desc    Add a new book [cite: 118]
 * @access  Public
 */
app.post('/books', (req, res) => {
    const { title, author } = req.body;

    // Basic validation
    if (!title || !author) {
        return res.status(400).json({ message: 'Title and author are required' }); // 400 Bad Request
    }

    const newBook = {
        id: nextId++,
        title: title,
        author: author
    };

    books.push(newBook);
    res.status(201).json(newBook); // 201 Created 
});

/**
 * @route   GET /books/:id
 * @desc    Get a single book by ID
 * @access  Public
 * (Note: This is a professional addition, good to have)
 */
app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({ message: 'Book not found' }); // 404 Not Found
    }

    res.status(200).json(book); // 200 OK
});

/**
 * @route   PUT /books/:id
 * @desc    Update a book by ID [cite: 120]
 * @access  Public
 */
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({ message: 'Book not found' }); // 404 Not Found
    }

    const { title, author } = req.body;
    
    // Basic validation
    if (!title || !author) {
        return res.status(400).json({ message: 'Title and author are required' }); // 400 Bad Request
    }

    const updatedBook = {
        id: bookId,
        title: title,
        author: author
    };

    books[bookIndex] = updatedBook;
    res.status(200).json(updatedBook); // 200 OK
});

/**
 * @route   DELETE /books/:id
 * @desc    Delete a book by ID [cite: 121]
 * @access  Public
 */
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({ message: 'Book not found' }); // 404 Not Found
    }

    // Remove the book from the array
    books.splice(bookIndex, 1);

    res.status(204).send(); // 204 No Content 
});

// 6. Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});