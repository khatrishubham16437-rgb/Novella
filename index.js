const express = require('express');

// const {users} = require('./data/users.json');

const dotenv = require('dotenv');
dotenv.config();

// import database connction file
const Dbconnection = require('./DatabaseConnection');

Dbconnection();

const cors = require('cors');

// Place this right after initializing your routers or right before your app setup
// importing routers
const userRouter = require('./routes/users');
const bookRouter = require('./routes/books');

const app = express();
app.use(cors());
const PORT = 8081;

app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({message:"Home Page"});
})

app.use("/users",userRouter);
app.use("/books",bookRouter);    



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})  