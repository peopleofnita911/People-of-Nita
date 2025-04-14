const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Newer versions may need these additional options:
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            maxPoolSize: 10 // Maximum number of sockets in the connection pool
        });
        
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exit(1); // Exit with failure
    }
}

module.exports = connectDB;