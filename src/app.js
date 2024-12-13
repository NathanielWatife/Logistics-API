const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const morgan = require('morgan');
// import the routes folder
const routes = require('./routes');

// load the environment variables
dotenv.config();

const app = express();


// set up middlewares
// enable cors
app.use(cors());
// secure the headers
app.use(helmet());
// we log request in dev mode
app.use(morgan('dev'));
// we parse the json request body
app.use(express.json());
// we parse encoded url data
app.use(express.urlencoded({
    extended: true
}));


// routes
app.use('/api', routes);

// erro handling for middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.stack || 500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;