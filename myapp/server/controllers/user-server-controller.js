/*
*   User controller
*/

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
