const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '50.63.166.215',
    user: 'matias',
    password: 'Holaardu',
    database: 'encuesta'
  });
  
module.exports =  connection;  