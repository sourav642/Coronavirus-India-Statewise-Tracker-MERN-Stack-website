const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
var path = require('path');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = process.env.WEBSITES_PORT || 5000;

app.use(express.static('./client/build'));

module.exports = app;


app.listen(port, () => console.log(`Server running on port: ${port}`));
const APIRouter = require('./routes/API');
app.use('/', APIRouter);
