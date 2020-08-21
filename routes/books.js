const express = require("express");
const book_router = express.Router();

const Book = require("../models/books");


book_router.get("/", async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

book_router.post("/", async (req, res) => {
  let book = new Book({
    title: req.body.title,
    author: req.body.author,
  });
   book=await book.save();
  res.send(book);
});

module.exports=book_router