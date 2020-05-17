const express = require('express');
const app = express();
//const bodyParser = require('body-parser');
//const cors = require('cors')
const APIRouter = require('./routes/API');
var path = require('path');
//require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('./client/build'));

//const hostname = "localhost";
app.set('port', process.env.PORT || 5000);


app.get("*", (req, res) => { //our GET route needs to point to the index.html in our build
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

module.exports = app;

app.listen(app.get('port'), () => console.log('Server running on port:'+app.get('port')));

app.use('/', APIRouter);
