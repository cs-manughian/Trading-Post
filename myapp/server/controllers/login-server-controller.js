/*
*  Login controller
*
*/


exports.logInUser = function(req, res){


    var collection = req.db.collection("users");

    // Look up user that's logging in
    // No hash or salt for password for now
    collection.findOne({ username: req.body.username, password: req.body.passw }, function (err, user) {
      		if(!user) {

        		// Render login page with error status
			res.render('login', {status:'Try again. Wrong password or username.'});

    	       } else {

        		// User exists

			//Generate a new session
			//Express will automatically send the cookie to the user
			req.session.regenerate(function (err) {

   				// Set user's info
				req.session.user = user;
				res.locals.username = user.username;

				// Delete the password from the session
				delete req.session.user.password; 

				console.log("sess:", req.session.user);
				
				// So just redirect to the home page
				// after session is created
			
				//res.render('index', {usergreeting: 'Hello, '+user.username+'! '});
				res.locals.usergreeting = 'Hello, '+user.username+'! ';
				res.redirect('/');
				
			});

			req.session.save();

      		}
    	});


};



exports.logOutUser = function(req, res){
    req.session.destroy(function () {
	res.locals.username = '';
        res.redirect('/');
    });

}

exports.getLoginInfo = function(req, res){
	if(req.session && req.session.user) {
		// The user logged in
		// User is authorized
		res.send(req.session.user);			

	} else {
		// User is not authorized
		res.send('0');
	}
}

exports.requiredAuthentication = function(req, res, next){

  // On every page, if session exists
  // Attach user info to request obj 
  if (req.session && req.session.user) {
 
    var collection = req.db.collection("users");

    collection.findOne({ username: req.session.user.username }, function(err, user) {

 	// The user exists
	// Update user data
   	if (user) {

        	req.user = user;
        	req.session.user = user;  // Refresh the session value

		res.locals.username = user.username;

		// Delete the password from the session
		delete req.session.user.password; 

		req.session.save();

       }

      	// Finish processing the middleware and run the route
      	next();

    });

  } else {
      	
	 // They must login first
        req.session.error = 'Access denied!';
	 
	 //res.redirect('login');
	 next();
  }

};