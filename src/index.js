'use strict';
require('dotenv').config();
const fileUploadMiddleware = require('express-fileupload');
const cors = require('cors');

/**
 * Entry point of application
 */
const PORT = process.env.PORT || 3000;

const schedular = require('./models/scheduler/scheduler');
const server = require('./server');

// using fileUploadMiddleware for accepting uploaded file from request
server.use(fileUploadMiddleware());

// enabling cors to allowing access of resources
server.use(cors());

// starting server on configured port number
server.listen(PORT, () => {
    console.debug(`API server listening on ${PORT}`);

    // initiating internal jobs
    schedular.scheduler.initiate();
    // initiating application routes
    server.use(require('./routes'));
});
