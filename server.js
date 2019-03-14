// init project
let express = require('express');
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

//api for case of blank date_string
app.get("/api/timestamp/", (req, res) => {
  let date = new Date()
  res.json({"unix": date.getTime(), "utc": date.toUTCString()});
});

//api when date_string included
app.get("/api/timestamp/:date_string", (req, res) => {
  
  let date = req.params.date_string;
  date = req.params.date_string.indexOf('-') < 0 ? parseInt(date) : date;
  date = new Date(date);
  res.json({"unix": date.getTime(), "utc": date.toUTCString()});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});