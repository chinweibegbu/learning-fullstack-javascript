const express = require('express');
const api = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');
const morgan = require('morgan');

const PORT = process.env.PORT || 4002;

// Set up middleware
api.use(bodyParser.json());     // Body parser
api.use(cors());                // CORS enabler
api.use(errorHandler());        // Error handler
api.use(morgan('tiny'));        // Logger

// Import and mount Express routers
const apiRouter = require('./api/api');
api.use('/api', apiRouter);

const artistRouter = require('./api/artists');
api.use('/api/artists', artistRouter);

const seriesRouter = require('./api/series');
api.use('/api/series', seriesRouter);

// Set server up at the specified port
api.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`)
});

module.exports = api;
