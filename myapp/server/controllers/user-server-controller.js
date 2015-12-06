/*
*   User controller
*/


var ObjectID = require('mongodb').ObjectID;


exports.getUserInfo = function(req, res){
	if(req.session && req.session.user) {
		// The user logged in
		// Send user info to client
		res.send(req.session.user);			

	} else {
		// User is not authorized
		res.send('0');
	}
}

exports.updateWishList = function(req, res){
	
	// We have the user's ID and wishlist
	// item name to remove

    	var collection = req.db.collection("users");

	var query = req.body;

	// Convert ID's value to a new 
	// object ID in case we are getting a String
	query._id = new ObjectID( query._id );
	
    	collection.update(  {'_id': query._id}, {$pull: { "wishList": { name: query.name }} },
		 function (err, result) {
    			
			if (err) {
    				console.log(err);      		
					
    			} else {
    				console.log('Updated wishlist!');
    				res.end();
			}				
    	});

}

exports.insertWishList = function(req, res){

    	var collection = req.db.collection("users");

	var item = req.body.item;

	// User not logged in
	if( !req.session.user ) {
		// Notify user to log in to
		// insert in wishlist
		res.send('0');

	} else {

	     // User is logged in
	     // So insert in wishlist.

	     // We got the item obj to insert.
	     // Take the item name, quantity, and type
	     // and added importance.

    	     collection.update( {username: req.session.user.username}, 
			      {$push: { "wishList": 
					{ 
						name: item.name,
						type: item.type,
						qty: item.quantity,
						importance: item.importance
					}
				      } 
			      },
	   	 function (err, result) {
    			
	   		if (err) {
    	   			console.log("Insert wishlist error: ",err);      		
					
    			} else {
    				console.log('Inserted in wishlist!');
    				res.end();
			}				
    	     });
	}
}

