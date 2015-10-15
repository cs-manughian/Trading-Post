/*
*  Controller for the model:
*  to fullfil HTTP requests from client
*  for model data
*
*  CRUD operations for querying model:
*    insertDocument
*    searchDocuments
*    updateDocument
*    removeDocument
*
*/

// Collections:
// gs, messages, trades, users

// Update a document's value field
exports.updateDocument = function (req,res) {

		// Get the documents collection
    		var collection = req.db.collection( req.body.collName );

		// Take the collection name off so we can 
		// just have the data
		delete req.body.collName;

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


// Insert a document
exports.insertDocument = function (req,res) {

		// Get the documents collection
    		var collection = req.db.collection( req.body.collName );

		// Take the collection name off so we can 
		// just have the data
		delete req.body.collName;

		// The query is attached to the request body
    		collection.insert( req.body, function (err, result) {
      				
				if (err) {
        				console.log(err);
						
      				} else {
        				console.log('Inserted data!');
      					res.end();
				}				
    		});
		
}


// Remove a document
exports.removeDocument = function (req,res) {

		// Get the documents collection
    		var collection = req.db.collection( req.body.collName );

		// Take the collection name off so we can 
		// just have the data
		delete req.body.collName;


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
// Get a document
	// Search documents by a key 
	//{req.body.key: {$exists: true}}

	// Search documents by a key and value
	//{req.body.key: req.body.value}
//======================================================//

exports.searchDocuments = function (req,res) {

		// Get the documents collection
    		var collection = req.db.collection( req.body.collName );

		// Take the collection name off so we can 
		// just have the data
		delete req.body.collName;

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
	var dd 	= today.getDate();
	var mm 	= today.getMonth()+1; //January is 0!
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
