/**
 * 
 */

(function() {
	
	function loginController($scope, $rootScope) {
		var loginControllerVM = this;
		
		loginControllerVM.onClickLogin =  function() {
			
		}
		
		
	}
	angular.module("login").controller("loginController",['$scope',
	             '$rootScope',loginController])
})();