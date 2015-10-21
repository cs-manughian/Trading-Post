
/*
 * Config for server-side routing
 *
 */


var MongoClient = require("mongodb").MongoClient;

module.exports = function (app) {


	//============Require functions to handle HTTP requests===========//

	var index	    = require('../controllers/index-server-controller.js');
	var users           = require('../controllers/users-server-controller.js');
	var goodsServices   = require('../controllers/gs-server-controller.js');
	var signup	    = require('../controllers/signup-server-controller.js');
	var login	    = require('../controllers/login-server-controller.js');
	var crudOps	    = require('../controllers/all-server-controller.js');


	//=======Specify functions to handle specific HTTP requests======//

	// For giving client login information
	app.get('/loginInfo', login.getLoginInfo);

	// For logging out the user
	app.get('/logout', login.logOutUser);

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

				// Session middleware for all routes

				//=================================================================//
				// Handle page requests
				//=================================================================//
				// For index page
				app.get('/', attachDB, login.requiredAuthentication, index.display);

				// For signup page
				app.get('/signup', attachDB, signup.display);

				// For login page
				app.get('/login', attachDB, function(req, res, next) {
   		 			res.render('login', {status:''});
				});

				// For anything else (like ng-view partials)
				app.get('/*', attachDB, login.requiredAuthentication, index.display);



				//=================================================================//
				// For querying the model ( the database )
				//=================================================================//
				// For recent posts
				app.post('/recent', attachDB, goodsServices.sendRecentPosts);

				//For sign-up form (Special insert-- Must process data first)
				app.post('/createUser', attachDB, signup.createUser);

				//For login form
				app.post('/login', attachDB, login.logInUser);

				//For getting search results
				app.post('/results', attachDB, goodsServices.searchGS);

				// For any page 
				app.post('/update', attachDB, crudOps.updateDocument);
				app.post('/insert', attachDB, crudOps.insertDocument);
				app.post('/search', attachDB, crudOps.searchDocuments);
				app.post('/remove', attachDB, crudOps.removeDocument);
			}
   	});
	
}

