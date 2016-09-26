/**
 * 
 */

(function() {
	
	function loginController($scope, $rootScope, spinnerEvent, restClient, $state, userObject) {
		var loginControllerVM = this;
		
		loginControllerVM.onClickLogin =  function() {
			if (loginControllerVM.userName && loginControllerVM.password) {
				var userObject = {
						userName : loginControllerVM.userName,
						password : loginControllerVM.password
				}
				spinnerEvent.show();
				restClient.post('/mtradus/service/user/login', userObject).then(function(userData) {
					$state.go('app.dashboard');
					userObject.loadObject();
					spinnerEvent.hide();
				}, function(errorData) {
					loginControllerVM.isError = true;
					spinnerEvent.hide();
				});
			}
			
		}
		
		
	}
	angular.module("login").controller("loginController",['$scope',
	             '$rootScope', 'spinnerEvent', 'restClient', '$state', 'userObject', loginController])
})();