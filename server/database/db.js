require('dotenv').config({ path: "../.env" })
const mongoose = require('mongoose');

// ENVIRONMENT VARIABLES
const URI = process.env.MONGODB_URL

const connectDB = async () => {
    try {
        await mongoose.connect(URI, {
            // ANALYSEUR URL
            useNewUrlParser: true,
            // TOPOLOGIE UNIFIÉE
            useUnifiedTopology: true,
        });

        console.log(`MongoDB connection SUCCESS`)
    } catch (error) {
        console.log(`MongoDB connection FAIL`)
        process.exit(1);
    }
}


module.exports = connectDB