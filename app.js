require('dotenv').config()

const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const index = require('./routes/index.js');
//const hello = require('./routes/hello');


const port = process.env.PORT || 1337;

app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
app.use(express.json());

// This is middleware called for all routes.
// Middleware takes three parameters.
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

//app.disable('x-powered-by');

app.use('/', index);

// Don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // Use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

// Add a route
app.get("/", (req, res) => {
    const data = {
        data: {
            msg: "Hello World"
        }
    };

    res.json(data);
});

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

// Start up server
const server = app.listen(port, () => {
    console.log(`Application programming interface listening on port ${port}!`)
});

module.exports = server;
