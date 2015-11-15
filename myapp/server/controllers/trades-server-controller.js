/*
*  Trades controller:
*  Handle trade operations like
*  request, accept, reject
*
*/

var ObjectID = require('mongodb').ObjectID;

// Request to trade 
exports.requestTrade = function (req,res) {

    		var collection = req.db.collection("trades");

		var currDateAndTime = new Date().toISOString().replace('T', ' ').substr(0, 19);

		// Insert trade into trades collection 
		// with a pending status

		// reqItemID is the item that is being requested
		// offeredItemID is the item that is being offered
		// Save extra data to make queries faster
		var trade = {
				requestingUser: req.session.user.username,
				owner: req.body.clickedGS.owner,
				reqItemID: req.body.clickedGS._id,
				offeredItemID: req.body.offeredGS._id,
				reqItemType: req.body.clickedGS.type,
				offeredItemType: req.body.offeredGS.type,
				reqItemName: req.body.clickedGS.name,
				offeredItemName: req.body.offeredGS.name,
				status: "pending",
				dateRequested: currDateAndTime,
				dateResponded: ""
			    };
	
    		collection.insert( trade, function (err, result) {
				if (err) {
        				console.log(err);						
      				} else {
        				console.log('Inserted trade request data!');
      					res.end();
				}				
    		});	
}


// Get incoming or outgoing trades 
exports.getTrades = function (req,res) {

    		var collection = req.db.collection("trades");
		var query = {};
		var trades = [];

		// If we are getting incoming trades,
		// search by owner = current user
		if( req.body.type === "incoming" ) {
			query.owner = req.session.user.username;
		}else{ 
			// If we are getting outgoing trades,
			// search by requesting user = current user
			query.requestingUser = req.session.user.username;
		}

		// First we need to find the incoming or outgoing trades
		// from the trades collection
		collection.find( query ).toArray( function (err, result) {
				if (err) {
        				console.log(err);						
      				} else {
        				console.log('Got trade data!');
      					res.end( JSON.stringify(result) );
				}				
    		});	

}

