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
*  which can be used for any collection ("all")
*
*/

// Collections:
// gs, messages, trades, users

var ObjectID = require('mongodb').ObjectID;

// Update a document's value field
exports.updateDocument = function (req,res) {

		// Get the documents collection
    		var collection = req.db.collection( req.body.collName );

		// Take the collection name off so we can 
		// just have the data
		delete req.body.collName;

		var oldQuery = req.body.oldQuery;
		var newQuery = req.body.newQuery;


		// Check if we are getting an id 
		// and convert its value to a new 
		// object ID in case we are getting a String
		for( var key in oldQuery ){
			if( key == '_id' )
				oldQuery._id = new ObjectID( oldQuery._id );
		}		

		// Do the same for the new query
		for( var key in newQuery ){
			if( key == '_id' )
				newQuery._id = new ObjectID( newQuery._id );
		}	


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

		var query = req.body;

		// Check if we are getting an id 
		// and convert its value to a new 
		// object ID in case we are getting a String
		for( var key in query ){
			if( key == '_id' )
				query._id = new ObjectID( query._id );
		}

		// Values can be an array of keys in case we want to
		// remove multiple goods/services in one query.
		//query[req.body.key] = {'$in': req.body.values};	
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

		collection.find( req.body ).toArray(function (err, result) {
      				
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

