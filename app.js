const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'sinhvien'
});

exports.db = connection
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const sinhvien = require('./routes/sinhvien')(express, connection)

app.use('/api', sinhvien);


const port = 3001;
app.listen(port, () => {
    console.log('Ready for GET requests on http://localhost:' + port);
});