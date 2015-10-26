 // Create a controller and add to trading-post module
angular.module('trading-post').controller('tradesController', function($scope, $http, $window, TradesService, UserService, AllService){

	// Vars
	$scope.name ='trades';
	$scope.isOutgoingTradeFound = false;
	$scope.isIncomingTradeFound = false;
	$scope.incomingTrades = {};
	$scope.outgoingTrades = {};

	// Functions
	$scope.getUser = function() {
		UserService.getUserInfo().
		   success(function(responseData) {

			// if no user data
			if( responseData == '0' ) {
				// Force login
				$window.location.href = "/login";
			}else{
				// We got the user's data
				$scope.user = responseData;
				$scope.getTrades( "incoming" );
				$scope.getTrades( "outgoing" );
			}
    		   }).
		   error(function(responseData) {
    	   		 console.log('Trades GET error. Received: ', responseData);
    	  	 });
	};

	$scope.getTrades = function( type ) {
		// Tell it to use the gs collection
    		var query = {};
		query.collName = "trades";

		if( type == "incoming" )
			query.owner = $scope.user.username;
		else 
			query.requestingUser = $scope.user.username;	//outgoing

		 AllService.search(query).
			 success(function(responseData) {
				
				if( type == "incoming" ) {
					$scope.incomingTrades = responseData;
					$scope.isIncomingTradeFound = !(  responseData == null || responseData == undefined || responseData == "");
				} else {
					$scope.outgoingTrades = responseData;
					$scope.isOutgoingTradeFound = !(  responseData == null || responseData == undefined || responseData == "");
				}
			}).
			error(function(responseData) {
				console.log('Trades POST error. Received: ', responseData);
			});
	};

	// Handle on clicks for responding to trades
	// using trades service

	$scope.respondToTrade = function(item, type){ 
		if( confirm("Are you sure you want to "+type+" this trade?") ){
			TradesService.respondToTrade(item, type);
			$window.location.reload();
		}
	};

	$scope.cancelTrade = function(item){ 
		if( confirm("Are you sure you want to cancel this trade?") ){
			TradesService.cancelTrade(item); 
			$window.location.reload();
		}
	};

	$scope.confirmTrade = function(item){ 
		if( confirm("Are you sure you want to confirm this trade?") ){
			TradesService.cancelTrade(item);	// Will remove the trade as well 
			$window.location.reload();
		}
	};

	// "Main"
	 $scope.getUser();	//then gets trades



});



