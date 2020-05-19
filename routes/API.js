const router =  require ('express').Router();
const MongoClient = require('mongodb').MongoClient;


const dbConnectionUrl = process.env.DB_URI;
var dbObject = null;
const dbName = "Covid19-India-Statewise-DB"

//Connect to the database 
MongoClient.connect(dbConnectionUrl,{ useUnifiedTopology:true, useNewUrlParser:true,poolSize:10}, function(err, dbInstance) {
      if (err) {
          console.log(`[MongoDB connection] ERROR: ${err}`);
          failureCallback(err); // this should be "caught" by the calling function
      } else {
          dbObject = dbInstance.db(dbName);
          console.log("[MongoDB connection] SUCCESS");
      }
  });

  //const dbCollection1 = dbObject.collection('Counts');
  //const dbCollection2 = dbObject.collection('Charts');


// API calls
router.route('/state-wise-data').get((req, res) => {
    dbObject.collection('Counts').find().maxTimeMS(100).toArray(function(err, result) {
        if (err) throw err;
        console.log(`GET request  /state-wise-data successful: STATUS CODE = [${res.statusCode}]`)
        res.send(result);  
    });

  });


  router.route('/recent-trends').get((req, res) => {
          dbObject.collection('Charts').findOne({'state':req.query.state},(err,result)=>{
          if (err) throw err;
          console.log(`GET request /recent-trends?state=${req.query.state} successful:STATUS CODE = [${res.statusCode}]`)
          res.json(result);
          });
  });

module.exports = router;
