/*
*  Controller for home page
*
*/

exports.display = function(req, res){
	
   	if( req.session.user ) {
		res.render('index', {usergreeting: 'Hello, '+req.session.user.username+'! '});
	} else {
   		res.render('index', {usergreeting: ''});
	}
	
}

