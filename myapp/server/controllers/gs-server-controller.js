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
				
    		// Find document based on today's date and time
		// 1 is for ascending and -1 is for descending order

		// We need to find it based on category, GS (name), and zipcode
		// "$regex" is a regular expression. 
		// "i" means "case insensitive"

		//Search by substring to get more results
		console.log(req.body.myQuery);

		var gs = req.body.myQuery.gsName;
		var subName = gs.substring(0, Math.ceil( gs.length/2 ));
		
		//{name: { $regex: /gs*/i }}
    		collection.find( {name: req.body.myQuery.gsName,
				    zipcode: req.body.myQuery.zipcode, 
				    category: req.body.myQuery.category})
			   .sort({datePosted: -1}).toArray(function (err, results) {

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

