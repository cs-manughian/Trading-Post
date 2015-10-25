/*
*  Sign up controller
*/

exports.display = function(req, res){

	res.render('signup', 
		{
			userNotif: '',
			pwNotif: ''
		});
}

exports.createUser = function(req, res){

	var collection = req.db.collection("users");	

	var currDateAndTime = new Date().toISOString().replace('T', ' ').substr(0, 19);

	// Check if user already exists
	// Username is unique
 	collection.findOne({ username: req.body.username }, function (err, user) {
      		if(!user) {

        		// User doesn't exist so we can create this user		

			// Check both passwords are correct
			if( req.body.passw1 !== req.body.passw2 ) {
				res.render('signup', { userNotif: '', pwNotif: 'Entered passwords do not match.' });
			} else {

			  // Otherwise
			  // Insert new user data into users collection

			  /* For wishlist: 
				wishlist: [	    
					    {				
						name: "",
						type: "",
						qty: 0,
						importance: 0
					     },{				
						name: "",
						type: "",
						qty: 0,
						importance: 0
					     }
				]
			  */

			  collection.insert( 
				{
					username: req.body.username,
					password: req.body.passw1,
					email: req.body.email,
					zipcode: req.body.zip,
					phoneNumber: req.body.phone,
					dataCreated: currDateAndTime,
					rating: {
						one: 0,
						two: 0,
						three: 0,
						four: 0,
						five: 0
					},
	 				wishList: []

				}, function (err, result) {

				      if (err) {
        				  console.log(err);	
      				      } else {
        				
					   // User is created. Now redirect to home page.
					   res.redirect('/');
				      }				
    			  });
		       }

    	       } else {

        		// User already exists
			// Notify user
			res.render('signup', {userNotif: 'User already exists.', pwNotif: ''});

      		}
    	});

};