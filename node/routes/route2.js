/**
 * Module dependencies.
 */
var mysql = require('mysql');

var db = undefined;
var DATABASE_NAME = 'wine';

/**
 * Initiate database 
 */
var initDatabase = function() {
  console.log('init database');
  
  db = mysql.createClient({
    user: 'root',
    password: ''
  });
  
  db.on('error', onError);
  
  // TODO try to open database
  db.query('use ' + DATABASE_NAME);
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

  // TODO do database query
  
  // TODO check the item id  
  var itemId = req.params.id;
  var theItem;
  if (itemId) {
    console.log('searching for wine id=', itemId);

    //  get the item
    var hasFound = false;
    var numOfItems = fakeDBItems.length;  
    for (var i = 0; i < numOfItems; i++) {
      theItem = fakeDBItems[i];
      if (theItem.hasOwnProperty('id') && (theItem.id === itemId)) {
        console.log('has found wine id=', itemId);
        
        hasFound = true;
        break;
      }
    }  
  } else {
    // return all wine
    console.log('will return all wine');
    
  }  

    // TODO return
  res.send(false);  
};

initDatabase();