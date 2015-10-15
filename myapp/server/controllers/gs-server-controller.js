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

