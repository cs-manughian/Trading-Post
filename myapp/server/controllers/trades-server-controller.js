/*
*  Trades controller:
*  Handle trade operations like
*  request, accept, reject
*
*/

// Request to trade 
exports.requestTrade = function (req,res) {

    		var collection = req.db.collection("trades");

		var currDateAndTime = new Date().toISOString().replace('T', ' ').substr(0, 19);

		// Insert trade into trades collection 
		// with a pending status

		// reqItemID is the item that is being requested
		// offeredItemID is the item that is being offered
		var trade = {
				requestingUser: req.session.user.username,
				owner: req.body.clickedGS.owner,
				reqItemID: req.body.clickedGS._id,
				offeredItemID: req.body.offeredGS._id,
				status: "pending",
				dataRequested: currDateAndTime,
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