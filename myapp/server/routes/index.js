
/*
 * Config for server-side routing
 *
 */


var MongoClient = require("mongodb").MongoClient;
var model = require('../models/db');

module.exports = function (app) {


	//============Require functions to handle HTTP requests===========//

	var routes        = require('../controllers/index-server-controller.js');
	var users         = require('../controllers/users-server-controller.js');
	var goodsServices = require('../controllers/gs-server-controller.js');


	//=======Specify functions to handle specific HTTP requests======//

	//Handle page requests
	app.get('/', routes.index);
	app.get('/signup', routes.signup);


	//Handle data (model) requests
	MongoClient.connect("mongodb://localhost:27017/tradingpost", function(err, db) {
    			if (err) { 
				console.log("Cannot connect to db");
				callback(err);
    			}
			else {
    				console.log("Connected to DB: ", db.databaseName);
				var attachDB = function(req, res, next) {
					req.db = db;
					next();
				};

				app.post('/recent', attachDB, goodsServices.sendRecentPosts);

				// For Goods and Services
				app.post('/updategs', attachDB, goodsServices.updateGoodsOrServices);
				app.post('/insertgs', attachDB, goodsServices.insertGoodsOrServices);
				app.post('/searchgs', attachDB, goodsServices.queryGoodsAndServices);
				app.post('/removegs', attachDB, goodsServices.removeGoodsOrServices);
			}
   	});
	
}

