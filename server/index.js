const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors"); // Import CORS
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const connectDB = require("./connectMongo");
const PORT = process.env.PORT || 5001;
dotenv.config();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure CORS
app.use(cors({
  origin: ['https://people-of-nita.vercel.app/',"*"], // Replace with your frontend URL
  credentials: true, // Include credentials if needed
}));

app.use(express.json());
// app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

connectDB();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY,       // Your Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Your Cloudinary API secret
});

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'peopleOfNita', // Change to your folder name
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
  },
});

const upload = multer({ storage: storage });

// Update the image upload route
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json({ url: req.file.path });
});

// Testing the server
app.get("/", (req, res) => {
  return res.json({
      success: true,
      message: "Your server is up and running ...",
  });
});

app.listen(PORT, () => {
  console.log("Backend is running at port 5001");
});
