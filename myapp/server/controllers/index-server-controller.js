/*
*  Logic for controlling server routes
*
*/




//=======Functions to handle specific HTTP requests======//


// GET home page

exports.index = function(req, res){

	res.render('index'); 

};


// GET sign-up page

exports.signup = function(req, res){

	res.render('signup'); 

};