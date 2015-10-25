/*
*  Controller for the model:
*  to fullfil HTTP requests from client
*  for model goods/services data
*/

// Goods/services Collection

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




// Retrieve search from the database
// Search will have category, good/service, and zipcode

exports.searchGS = function (req,res) {


		// Get the documents collection
    		var collection = req.db.collection("gs");
			

		//Search by substring to get more results
		var gsName  = req.body.gsName;
		var subName = gsName.substring(0, Math.ceil( gsName.length/2 ));

		// pattern, attributes
		var gs = new RegExp(subName, 'i');

		// Use i for case insensitive and / for "like"
		var query = {   name: gs,
			 	zipcode: req.body.zipcode, 
				category: req.body.category };


		// If no zipcode is entered, search any zipcode
		// Use regular expression /./ to search all
		if( req.body.zipcode == '' ) 
			query.zipcode = /./;

		if( req.body.category == 'All' )	
			query.category = /./;
		console.log(query);

    		collection.find(query).sort({datePosted: -1}).toArray(function (err, results) {

      				if (err) {
        				console.log(err);

      				} else if (results.length) {
		
					// Send every result to the client
					res.end( JSON.stringify(results) );
						
      				} else {
        				console.log('No document(s) found with defined "find" criteria!');
      					res.end();
				}				
    		});


}



// Get inventory based on current user
// Automatically sort by name
exports.findInventory = function (req,res) {

		// Search goods / services collection
    		var collection = req.db.collection("gs");

		// Find goods / services belonging to current user

		if( req.session && req.session.user ){

    		    collection.find({owner: req.session.user.username})
			  .sort({name: -1}).toArray(function (err, results) {

      				if (err) {
        				console.log(err);

      				} else if (results.length) {
		
					// Send every result to the client
					res.end( JSON.stringify(results) );
						
      				} else {
        				console.log('No document(s) found with defined "find" criteria!');
      					res.end();
				}				
    		    });

		}else{

		    res.end();
		}
}
