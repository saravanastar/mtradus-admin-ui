/**
 * 
 */

(function() {
	
	function loginController($scope, $rootScope, spinnerEvent, restClient, $state) {
		var loginControllerVM = this;
		
		loginControllerVM.onClickLogin =  function() {
			if (loginControllerVM.userName && loginControllerVM.password) {
				var userPayload = {
						userName : loginControllerVM.userName,
						password : loginControllerVM.password
				}
				spinnerEvent.show();
				restClient.post('/mtradus/service/user/login', userPayload).then(function(userData) {
					$state.go('app.dashboard');
					window.location.reload();
					
					spinnerEvent.hide();
				}, function(errorData) {
					loginControllerVM.isError = true;
					spinnerEvent.hide();
				});
			}
			
		}
		
		
	}
	angular.module("login").controller("loginController",['$scope',
	             '$rootScope', 'spinnerEvent', 'restClient', '$state', loginController])
})();