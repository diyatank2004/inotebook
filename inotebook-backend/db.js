const mongoose = require('mongoose');

// Define the MongoDB URI with the database name 'inotebook'
const mongoURI = "mongodb://localhost:27017/inotebook";

const connectToMongo = async () => {
    try {
        // Connect to the 'inotebook' database
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB 'inotebook' database successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}

module.exports = connectToMongo;
