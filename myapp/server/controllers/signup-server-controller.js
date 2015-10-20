/*
*  Sign up controller
*/

exports.display = function(req, res){

	res.render('signup', 
		{
			userNotif: '',
			emailNotif: '',
			phoneNotif: '',
			zipNotif: '',
			pwNotif: '',
			repeatNotif: ''
		});
}

exports.createUser = function(req, res){

	var collection = req.db.collection("users");	

	// Check if user already exists
	// Username is unique
 	collection.findOne({ username: req.body.username }, function (err, user) {
      		if(!user) {

        		// User doesn't exist so we can create this user

			// Check if data is valid			

			// Insert new user data into users collection
			/*
			collection.insert( query, function (err, result) {
				if (err) {
        				console.log(err);
						
      				} else {
        				
					// User is created. Now redirect to home page.
					res.redirect('/');
				}				
    			});
			*/

    	       } else {

        		// User already exists

			// Notify user
						
			//res.render('signup', {});

      		}
    	});

};