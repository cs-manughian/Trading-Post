
/*
 * Config for server-side routing
 *
 */


var MongoClient = require("mongodb").MongoClient;

module.exports = function (app) {


	//============Require functions to handle HTTP requests===========//

	var index	    = require('../controllers/index-server-controller.js');
	var signup	    = require('../controllers/signup-server-controller.js');
	var login	    = require('../controllers/login-server-controller.js');
	var user	    = require('../controllers/user-server-controller.js');
	var anyPage	    = require('../controllers/all-server-controller.js');
	var goodsServices   = require('../controllers/gs-server-controller.js');
	var trades	    = require('../controllers/trades-server-controller.js');

	//=======Specify functions to handle specific HTTP requests======//

	// For giving client user information
	app.get('/userInfo', user.getUserInfo);

	// For logging out the user
	app.get('/logout', login.logOut);

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

				//=================================================================//
				// For querying the model ( the database )
				//=================================================================//
			
				//For sign-up form (Special insert-- Must process data first)
				app.post('/createUser', attachDB, signup.createUser);

				//For login form
				app.post('/login', attachDB, login.logIn);

				// For recent posts
				app.post('/recent', attachDB, goodsServices.sendRecentPosts);

				// For getting search results
				app.post('/results', attachDB, goodsServices.searchGS);

				// For requesting to trade
				app.post('/reqTrade', attachDB, trades.requestTrade);

				// For getting current user's inventory
				app.post('/inventory', attachDB, goodsServices.findInventory);

				// For updating wishlist
				app.post('/updateWishList', attachDB, user.updateWishList);

				// For any page 
				app.post('/update', attachDB, anyPage.updateDocument);
				app.post('/insert', attachDB, anyPage.insertDocument);
				app.post('/search', attachDB, anyPage.searchDocuments);
				app.post('/remove', attachDB, anyPage.removeDocument);
			}
   	});

	// Handle 404
	app.use(function(req, res, next){
  		res.status(404).render('404', { url: req.url });
	});

  	// Handle 500
  	app.use(function(error, req, res, next) {
  		res.status(500).render('500', { url: req.url });	
  	});
	
}

