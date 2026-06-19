const express = require('express');

const {books} = require('../data/books.json');
const {users} = require('../data/users.json');
const { getAllBooks, getSingleBookById, addNewBook, updateBookById, deleteBookById, getAllIssuedBooks } = require('../controllers/book_controller');
const router = express.Router();

/*
route = /books
method = get
description = get all books
access = public
parameters = none
*/

router.get("/", getAllBooks)

router.get("/issued/for-users", getAllIssuedBooks)

/*
route = /books/:id
method = get
description = get all books by their id
access = public
parameters = id
*/
router.get("/:id",getSingleBookById)

/*
route = /books
method = get
description = registring new book
access = public
parameters = none
*/

router.post("/",addNewBook)

// updating book by their id

router.put("/:id",updateBookById)  

/*
route = /books/:id
method = DELETE
description = deleting book by their id
access = public
parameters = none
*/

router.delete("/:id",deleteBookById)

module.exports = router;