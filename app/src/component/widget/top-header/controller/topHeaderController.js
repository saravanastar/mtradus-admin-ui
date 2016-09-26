(function() {
	
	function topHeaderController($scope, $rootScope, spinnerEvent, restClient, $state, userObject) {
		var topHeaderControllerVm = this;
		topHeaderControllerVm.spinnerEvent = spinnerEvent;
		topHeaderControllerVm.userObject = userObject;
		topHeaderControllerVm.userObject.loadObject();
		spinnerEvent.show();
		restClient.get('/mtradus/service/user/login').then(function(responseData) {
			spinnerEvent.hide();	
		}, function(errorData) {
			$state.go('app.login');
			spinnerEvent.hide();
		});
		
	}
	
	angular.module('topHeader',[]).controller('topHeaderController',['$scope', '$rootScope','spinnerEvent', 
	                                                                 'restClient', '$state', 'userObject', topHeaderController]);
})();