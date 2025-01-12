const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log(" DB connection establised");
}

module.exports = connectDB;