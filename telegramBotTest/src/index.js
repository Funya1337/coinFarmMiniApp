const express = require('express');
const cors = require('cors');
const connectToDB = require('./database');
const logger = require('./logger');
const routes = require('./routes');
const bot = require('./bot');
const app = express();
const PORT = process.env.PORT || 8000;

async function startServer() {
    
    await connectToDB();

    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use('/api', routes);

    app.listen(PORT, () => logger.info(`Server listening at http://localhost:${PORT}`));
}

module.exports = startServer;