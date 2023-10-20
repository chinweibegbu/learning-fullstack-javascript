const express = require('express');
const app = express();

// Connect to SQLite DB
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// Initialise port for app
const PORT = process.env.PORT || 4000;

// Import middleware core modules
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');
const morgan = require('morgan');

// Set up middleware
app.use(bodyParser.json());     // Body parser
app.use(cors());                // CORS enabler
app.use(errorHandler());        // Error handler
app.use(morgan('tiny'));        // Logger

// Import Express routers
const employeesRouter = require('./api/employees');
app.use('/api/employees', employeesRouter);

const menusRouter = require('./api/menus');
app.use('/api/menus', menusRouter);

// Set up app on the defined port
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

module.exports = app;