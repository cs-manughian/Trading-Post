
/*
 * Config for server-side routing
 *
 */


var MongoClient = require("mongodb").MongoClient;

module.exports = function (app) {


	//============Require functions to handle HTTP requests===========//

	var users         = require('../controllers/users-server-controller.js');
	var goodsServices = require('../controllers/gs-server-controller.js');
	var signup	    = require('../controllers/signup-server-controller.js');
	var crudOps	    = require('../controllers/all-server-controller.js');

	//=======Specify functions to handle specific HTTP requests======//

	//Handle page requests
	app.get('/', function(req, res, next) {
   		 res.render('index');
	});

	app.get('/signup', function(req, res, next) {
   		 res.render('signup');
	});

	//Handle data (model) requests
	MongoClient.connect("mongodb://localhost:27017/tradingpost", function(err, db) {
    			if (err) { 
				console.log("Cannot connect to db");
    			}
			else {
    				console.log("Connected to DB: ", db.databaseName);
				var attachDB = function(req, res, next) {
					req.db = db;
					next();
				};

				// For recent posts
				app.post('/recent', attachDB, goodsServices.sendRecentPosts);

				//For sign-up form (Special insert-- Must process data first)
				app.post('/createUser', attachDB, signup.createUser);

				// For any page 
				app.post('/update', attachDB, crudOps.updateDocument);
				app.post('/insert', attachDB, crudOps.insertDocument);
				app.post('/search', attachDB, crudOps.searchDocuments);
				app.post('/remove', attachDB, crudOps.removeDocument);
			}
   	});
	
}

