const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/express-mongo');
        console.log(`MongoDB connected ${mongoose.connection.host} ${mongoose.connection.name}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = dbConnection;