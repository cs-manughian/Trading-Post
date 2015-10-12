/*
*  Controller for the model:
*  to fullfil HTTP requests from client
*  for model goods/services data
*
*  SCRUD operations for querying model
*/


// Goods/Services collection


// Retrieve recent posts from the database
exports.sendRecentPosts = function (req,res) {


		// Get the documents collection
    		var collection = req.db.collection("gs");
				
    		// Find document based on today's date and time
		// 1 is for ascending and -1 is for descending order

    		collection.find().sort({datePosted: -1}).toArray(function (err, result) {
      				if (err) {
        				console.log(err);

      				} else if (result.length) {

       					console.log('Found:', result);


					// Take the first six recent posts
					var firstSix = [];
					var max = 6;
					var i;

					if( result.length < 6 )
						max = result.length;

					for( i = 0; i < max; i++ )
						firstSix[i] = result[i]; 
					
					// Send the data to the client
					res.end( JSON.stringify(firstSix) );

						
      				} else {
        				console.log('No document(s) found with defined "find" criteria!');
      					res.end();
				}				
    		});

}


// Update a good/service value field
exports.updateGoodsOrServices = function (req,res) {


		// Get the documents collection
    		var collection = req.db.collection("gs");
		
		oldQuery = {};
		newQuery = {};
		oldQuery[req.body.oldkey] = req.body.oldvalue;
		newQuery[req.body.newkey] = req.body.newvalue;

    		collection.update(oldQuery, {$set: newQuery}, function (err, result) {
      				
				if (err) {
        				console.log(err);
      				} else {
        				console.log('Updated data!');
      					res.end();
				}				
    		});

}


// Insert a good/service
exports.insertGoodsOrServices = function (req,res) {

		// Get the documents collection
    		var collection = req.db.collection("gs");

    		collection.insert({
	
				owner: req.body.owner,
				zipcode: req.body.zipcode,	
				name: req.body.name,
				type: req.body.type,
				quantity: req.body.quantity,
				imgUrl: req.body.imgUrl,
				category: req.body.category,
				datePosted: req.body.datePosted
			
			}, function (err, result) {
      				
				if (err) {
        				console.log(err);
						
      				} else {
        				console.log('Inserted data!');
      					res.end();
				}				
    		});

}


// Remove a good/service
exports.removeGoodsOrServices = function (req,res) {

		// Get the documents collection
    		var collection = req.db.collection("gs");

		// Remove a users good/service based on the ID (or whatever).
		// Values can be an array of keys in case we want to
		// remove multiple goods/services in one query.
	
		query = {};
		query[req.body.key] = {'$in': req.body.values};
		
		//{req.body._id: {'$in': req.body.values}}

    		collection.remove( query , function (err, result) {
      				
				if (err) {
        				console.log(err);      		
						
      				} else {
        				console.log('Removed data!');
      					res.end();
				}				
    		});

}


//======================================================//
// Query function can perform these actions:
// Get a good/service
	// Search goods/services by a key 
	//{req.body.key: {$exists: true}}

	// Search goods/services by a key and value
	//{req.body.key: req.body.value}
//======================================================//

exports.queryGoodsAndServices = function (req,res) {

		// Get the documents collection
    		var collection = req.db.collection("gs");
		var query = {};
		
		if( req.body.value )
			query[req.body.key] = req.body.value;
		else
			query[req.body.key] = {$exists: true};

    		collection.find( query ).toArray(function (err, result) {
      				
				if (err) {
        				console.log(err);

      				} else if (result.length) {

       					console.log('Found:', result);
					
					// Send the data to the client
					res.end( JSON.stringify(result) );

						
      				} else {
        				console.log('No document(s) found with defined "find" criteria!');
      					res.end();
				}				
    		});

}



getDate = function()
{
	var today 	= new Date();
	var dd 		= today.getDate();
	var mm 		= today.getMonth()+1; //January is 0!
	var yyyy 	= today.getFullYear();
	var hour 	= today.getHours();
	var minute 	= today.getMinutes();
	var second 	= today.getSeconds();


	if(dd<10) {
	    dd = '0' + dd
	} 

	if(mm<10) {
	    mm = '0'+ mm
	} 
	
	if(hour<10) {
	    hour = '0' + hour;
	}

	if(minute<10) {
	    hour = '0' + minute;
	}

	if(second<10) {
	    hour = '0' + second
	}

	//console.log( (new Date()).toString());

	today = mm+'/'+dd+'/'+yyyy + ' ' + hour + ':' + minute + ':' + second;
	return today;

}
