/**
 * Module dependencies.
 */
var mysql = require('mysql'),
  fs = require('fs');

var db = undefined;
var DATABASE_NAME = 'backbone_cellar';
var TABLE_NAME = 'wine';

/**
 * Initiate database 
 */
var initDB = function() {
  console.log('init database');
  
  db = mysql.createClient({
    user: 'root',
    password: ''
  });
  
  db.on('error', onError);
  
  // try to use databases
  db.query('use ' + DATABASE_NAME, function(err){
    if (err) {
      if (err.number == mysql.ERROR_BAD_DB_ERROR) {
        console.log('Database ' + DATABASE_NAME + ' is not exist. Will create the DB');
        createDB();
      } else {
        throw err;
      }
      
      return;
    }
    
    openDB();
    resetTable();
  });
};

/**
 * Create database if it's not exist
 */
var createDB = function() {
  console.log('creating DB ' + DATABASE_NAME);
  
  db.query('create database ' + DATABASE_NAME, function(err) {
    if (err) {
      if (err.number == mysql.ERROR_DB_CREATE_EXISTS) {
        console.log('database is already exist');
      } else {
        throw err;
        return;
      }
    }
    
    openDB();
    resetTable();
  });
};

/**
 * Use and open database
 */
var openDB = function() {
  console.log('use database ' + DATABASE_NAME);
  
  db.query('use ' + DATABASE_NAME);
}

/**
 * will read SQL file for resetting the table content
 */
var resetTable = function() {
  console.log('will resetting the DB table');
  
  // try to get the sql file
  fs.readFile('../cellar.sql', function(err, data){
    if (err) {
      console.log('error in reading SQL file: ' + err);
      return;
    }
    
    // create query and execute!
    db.query(data.toString());
  });
};

/**
 * handle error on database
 */
var onError = function(err) {
    console.log('error in mysql client: ' + err);
    console.log('error number=' + err.number);
    
    // TODO remove this, no need to close database on every error
    if (db) {      
      console.log('ending mysql connection');
      db.end();
    }
};

/*
 * GET wine asset from database.
 */
exports.wineGet = function(req, res) {
  console.log('wineGet()');

  // check the item id  & prepare query
  var itemId = req.params.id;
  var queryStr = 'select * from ' + TABLE_NAME;
  if (itemId) {
    console.log('searching for wine id=', itemId);

    //  get the item
    queryStr += ' where id = \'' + itemId + '\'';
  } else {
    // return all wine
    console.log('will return all wine');
  }  

  // do database query
  var theResult = false;
  db.query(queryStr, function(err, results, fields) {
    if (err) {
      res.send(false);
      throw err;
      return;
    }
    
    tempResults = [];
    var numOfFields = fields.length;
    var numOfRows = results.length;
    for (var i = 0; i < numOfRows; i++) {
      var theRow = results[i];
      var tempRowRes = {};      
      for (fieldName in fields) {
        tempRowRes[fieldName] = theRow[fieldName];
      }
      
      tempResults.push(tempRowRes);
    }

    if (numOfRows == 0) {
      tempResults = false;
    } else if (numOfRows == 1) {
      tempResults = tempResults[0];
    }
    
    res.send(tempResults);  
  });
};

initDB();