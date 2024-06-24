const mongoose = require('mongoose');
const logger = require('../logger');

const connectToDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        logger.info("Connected to MongoDB");
    })
    .catch((err) => {
        logger.error("Error connecting to MongoDB", err);
    });
}

module.exports = connectToDB;