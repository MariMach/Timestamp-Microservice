// Basic requires imports for NodeJs App
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // for cross-orign requests

// Create an instance of all the imports
const app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
    res.json({ greeting: 'hello API' });
});

const dateFormatingOptions = { year: 'numeric', month: 'long', day: 'numeric' }

app.get("/api/timestamp", (req, res, next) => {
    console.log('URL works');
    var naturalDate = new Date();
    naturalDate = naturalDate.toUTCString("en-us", dateFormatingOptions);
    var unixDate = new Date(naturalDate).getTime() / 1000;
    res.json({ unix: unixDate, utc: naturalDate });
});



app.get("/api/timestamp/:date_string", (req, res, next) => {
    console.log('URL works');
    // gets the request date
    var date_string = req.params.date_string;
    // options for formating date in natural date view
    if (isNaN(date_string)) {
        var naturalDate = new Date(date_string);
        naturalDate = naturalDate.toUTCString("en-us", dateFormatingOptions);
        var unixDate = new Date(date_string).getTime() / 1000;
    } else {
        var unixDate = date_string;
        var naturalDate = new Date(date_string * 1000);
        naturalDate = naturalDate.toUTCString("en-us", dateFormatingOptions);
    }
    res.json({ unix: unixDate, utc: naturalDate });
});


// the last thing to do
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});


