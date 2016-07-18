/**
 * 
 */

(function() {
	angular.module('login',['ui.router']);
	angular.module('login').config(['$stateProvider',stateConfig]);
	function stateConfig($stateProvider) {
		$stateProvider.state('app.login', {
			views : {
				'@' : {
					 templateUrl : '@@cxt/component/widget/login/template/login.html',
					 /*controller : 'dashBoardController',
					 controllerAs : 'dashBoardControllerVM'*/
				 }
			}
		});
	}
})();