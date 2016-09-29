(function() {
	
	function topHeaderController($scope, $rootScope, spinnerEvent, restClient, $state, config, userState) {
		var topHeaderControllerVm = this;
		topHeaderControllerVm.spinnerEvent = spinnerEvent;
		topHeaderControllerVm.userObject = {};
			spinnerEvent.show();
			restClient.get(config.apiUrl +'/user/login').then(function(responseData) {
				topHeaderControllerVm.userObject = responseData;
				userState.authorized();
				spinnerEvent.hide();	
			}, function(errorData) {
				$state.go('app.login');
				spinnerEvent.hide();
			});
		
		topHeaderControllerVm.logout = function() {
			spinnerEvent.show();
			restClient.post(config.apiUrl + 'user/signout').then(function(responseData) {
				topHeaderControllerVm.userObject = null;
				userState.unAuthorized();
				$state.go('app.login');
				
				spinnerEvent.hide();	
			}, function(errorData) {
				spinnerEvent.hide();
			});
		}
		
		topHeaderControllerVm.logIn = function() {
			$state.go('app.login');
		}
		
		 $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
		    	if (!userState.loggedInStatus && toState.name !== 'app.login') {
		    		e.preventDefault();
		    		$state.go('app.login');
		    	}
		        
		});
		 
	}
	
	angular.module('topHeader',[]).controller('topHeaderController',['$scope', '$rootScope','spinnerEvent', 
	                                                                 'restClient', '$state', 'config', 'userState', topHeaderController]);
})();