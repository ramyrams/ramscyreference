//copy paste this in app.js and run: node app.js

const pool = new sql.ConnectionPool({
    server: 'stgdbt.stg.internal', 
    database: 'CORe',
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true
    }
})

pool.connect().then(() => {
  pool.request().query('SELECT TOP 10 * FROM [Individual].[Individual]', (err, result) => {
        console.dir(result)
        console.log(result.recordset[1].PrimaryEmailAddress)
    }).catch(function(err) {
      User.printMsg()
    });


})

// Node.js Connection with SQL Server windows authentication

Install the following modules:

"dependencies": {
    "msnodesqlv8": "^0.4.14",
    "mssql": "^4.1.0"
  }
My node version: v8.1.4

const sql = require("mssql/msnodesqlv8");

const main = async () => {
  const pool = new sql.ConnectionPool({
    server: "myservername",
    database: "mydbname",
    options: {
      trustedConnection: true
    }
  });

  await pool.connect();

  const request = new sql.Request(pool);

  const query = `SELECT [FirstName]
    ,[LastName]
    ,[Email]
FROM [Dev].[Users]`;

  const result = await request.query(query);

  console.dir(result);
};
main()


# How to connect to SQL Server with windows authentication from Node.JS using mssql module
var sql = require('mssql/msnodesqlv8');
var config = {
  driver: 'msnodesqlv8',
  connectionString: 'Driver={SQL Server Native Client XX.0};Server={SERVER\\NAME};Database={dbName};Trusted_Connection={yes};',
};

sql.connect(config)
.then(function() {
 ...profit...
})
.catch(function(err) {
  // ... connect error checks
});



// 

https://github.com/tjanczuk/edge

https://github.com/tjanczuk/edge-sql

From there, it's pretty steamlined.

var edge = require('edge');
var params = {
  connectionString: "Server=YourServer;Database=YourDB;Integrated Security=True",
  source: "SELECT TOP 20 * FROM SampleData"
};  
var getData = edge.func( 'sql', params);

getData(null, function (error, result) {
   if (error) { console.log(error); return; }
   if (result) {
    console.log(result);
   }
   else {
    console.log("No results");
   }
 });