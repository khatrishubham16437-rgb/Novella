const {BookModel , UserModel} = require("../models");

const IssuedBook = require("../dtos/book-dto")

exports.getAllBooks = async(req, res) => {
    const books = await BookModel.find()

    if(books.length === 0)
    {
        return res.status(404).json({
            success : false,
            message : "no book in the system"
        })
    }

    res.status(200).json({
        success : true,
        data : books
    })
}

exports.getSingleBookById = async(req,res) => {
    const {id} = req.params;
    const book = await BookModel.findById(id);

    if(!book)
    {
        return res.status(404).json({
            success : false,
            message : "book not found"
        })
    }

    res.status(200).json({
        success : true,
        data : book
    })
}

exports.getAllIssuedBooks = async(req,res) => {
    const user = await UserModel.find({
        issuedBook : {$exists : true, $ne: null},
    }).populate("issuedBook")

    const issuedBook = user.map((each) => {
        return new IssuedBook(each);
    });

    if(issuedBook.length === 0)
    {
        return res.status(404).json({
            success : false,
            message: "no book issued yet"
        })
    }

    res.status(200).json({
        success : true,
        data : issuedBook
    });
};


exports.addNewBook = async(req,res) => {
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0)
    {
        return res.status(404).json({
            success: false,
            message : "Please provide the data to add a new book"
        })
    }

    await BookModel.create(data);

    const allBooks = await BookModel.find();
    res.status(201).json({
        success : true,
        message: "Book added successfully",
        data : allBooks
    })
}

exports.updateBookById = async(req,res) => {
    const {id} = req.params;
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0)
    {
        return res.status(404).json({
            success: false,
            message: "Please provide data to update"
        })
    }

    const updatedBook = await BookModel.findOneAndUpdate(
        {_id : id},
        data,
        {new: true}
    );

    if(!updatedBook){
        return res.status(404).json({
            success: false,
            message: "Book not found"
        })
    }

    res.status(200).json({
        success: true,
        message: "Book Updated Successfully",
        data : updatedBook
    })
}

exports.deleteBookById = async(req,res) => {
    const {id} = req.params;

    const book = await BookModel.findById(id);

    if(!book)
    {
        return res.status(404).json({
            success: false,
            message: "Book not found"
        })
    }

    await BookModel.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "Book Deleted Successfully"
    })
}