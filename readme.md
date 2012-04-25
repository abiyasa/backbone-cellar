# Backbone.js Wine Cellar Tutorial (with Node backend) #

This is based on [Backbone Wine-cellar example](https://github.com/ccoenraets/backbone-cellar) from Christophe Coenraets  but with Node.js as backend support

## Current Status ##

* The Node for part 1 will return the wine list from static array (no database support)
* The Node for part 2 & 3 will return wine list from the database

## Set Up: ##

* Go to subfolder `node`
* Make sure that `mysql` is already on. 
* To activate part 1:

    `node app1.js`

* To activate part 2:

    `node app2.js`
	
* To activate part 3:

    `node app3.js`	
	
* Go to `localhost:3000` on your favourite browser
	
## Dependency ##
* `express` (tested on version 2.5.8)
* `jade` (tested on version 0.22.0) 
* `mysql` (tested on version 0.9.5)

## Database ##
* The backend will create database `backbone_cellar` if it's not exist
* The backend will reset the database (delete and recreate table) evertime you restart the node parts