const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// Task 6: Register a new user
public_users.post("/register", (req,res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  if (isValid(username)) {
    return res.status(409).json({ message: "User already exists" });
  }

  addUser(username, password);
  return res.status(201).json({ message: "User registered successfully" });
});



// Get the book list available in the shop
// Original: app.get("/", ...)
router.get("/", async (req, res) => {
  try {
    // Simulating a call with a Promise (as if from a DB or API)
    const getBooks = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(books), 200);  // Simulate delay
      });
    };

    const allBooks = await getBooks();
    res.status(200).json(allBooks);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books." });
  }
});



router.get("/isbn/:isbn", async (req, res) => {
  try {
    const { isbn } = req.params;

    const getBookByIsbn = (isbn) => {
      return new Promise((resolve, reject) => {
        if (books[isbn]) resolve(books[isbn]);
        else reject("Book not found");
      });
    };

    const book = await getBookByIsbn(isbn);
    res.status(200).json(book);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

  
// Get book details based on author
router.get("/author/:author", async (req, res) => {
  try {
    const { author } = req.params;

    const getBooksByAuthor = () => {
      return new Promise((resolve) => {
        const matches = Object.values(books).filter(
          (book) => book.author === author
        );
        resolve(matches);
      });
    };

    const results = await getBooksByAuthor();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving books." });
  }
});



router.get("/title/:title", async (req, res) => {
  try {
    const { title } = req.params;

    const getBooksByTitle = () => {
      return new Promise((resolve) => {
        const matches = Object.values(books).filter(
          (book) => book.title === title
        );
        resolve(matches);
      });
    };

    const results = await getBooksByTitle();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving books." });
  }
});




// task 5
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});



module.exports.general = public_users;
