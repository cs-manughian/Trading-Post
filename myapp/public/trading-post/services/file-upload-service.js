/*
*  Service to upload files using
*  ng-file-upload
*
*/

angular.module('trading-post').factory('UploadService', function($http) {

	
	var UploadServiceOp = {};

	// uploadFile method:
	// Only works with input type="file" and name="file"
	UploadServiceOp.uploadFile = function( formName ) {

	  var fd = new FormData();

	  // Only upload 1 file from the form with name 
	  // specified in the parameters
	  fd.append('file', formName[0].files[0]);

	  return $http.post('/upload', fd, 
		// angular.identity is a function that returns its first argument.
		// Let the browser decide what's the best content type.
		{
		   transformRequest: angular.identity,
		   headers: {'Content-Type': undefined}

		});

	};

	UploadServiceOp.deleteFile = function(fileUrl) {
 		// Send only the file name
		// Url starts from ./img/
		var q = {};
		q.filename = fileUrl.slice(6);	
		$http.post('/rfile', q);
	}

	return UploadServiceOp;
	       
});