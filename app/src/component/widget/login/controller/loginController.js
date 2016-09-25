/**
 * 
 */

(function() {
	
	function loginController($scope, $rootScope, spinnerEvent, restClient) {
		var loginControllerVM = this;
		
		loginControllerVM.onClickLogin =  function() {
			if (loginControllerVM.userName && loginControllerVM.password) {
				
			}
			spinnerEvent.show();
		}
		
		
	}
	angular.module("login").controller("loginController",['$scope',
	             '$rootScope', 'spinnerEvent', 'restClient',loginController])
})();