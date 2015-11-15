 // Create a controller and add to trading-post module
angular.module('trading-post').controller('tradesController', function($scope, $http, $window, TradesService, UserService, AllService){

	// Vars
	$scope.name ='trades';
	$scope.isOutgoingTradeFound = false;
	$scope.isIncomingTradeFound = false;
	$scope.incomingItems = [];
	$scope.outgoingItems = [];
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

				TradesService.getTrades("incoming")
					.success(function(resIncoming) { 
						$scope.incomingTrades = resIncoming; 
						$scope.isIncomingTradeFound = !( resIncoming == null || resIncoming == undefined || resIncoming == "");
					});

				TradesService.getTrades("outgoing")
					.success(function(resOutgoing) { 
						$scope.outgoingTrades = resOutgoing;  
						$scope.isOutgoingTradeFound = !( resOutgoing == null || resOutgoing == undefined || resOutgoing == "");
					});
			}
    		   }).
		   error(function(responseData) {
    	   		 console.log('Trades GET error. Received: ', responseData);
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

	$scope.cancelTrade = function(item, type){ 
		if( confirm("Are you sure you want to "+type+" this trade?") ){
			TradesService.cancelTrade(item); //Will remove trade
			$window.location.reload();
		}
	};


	// "Main"
	 $scope.getUser();	//then gets trades

});



