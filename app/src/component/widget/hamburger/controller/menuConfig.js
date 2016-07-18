/**
 * 
 */

(function() {
	angular.module('menu');
	angular.module('menu').config(['$stateProvider',stateConfig]);
	function stateConfig($stateProvider) {
		$stateProvider.state('app.menu', {
			views : {
				'@' : {
					 templateUrl : '@@cxt/component/widget/login/template/hamburgerMenu.html',
					 /*controller : 'hamburgerController',
					 controllerAs : 'hamburgerControllerVM'*/
				 }
			}
		});
	}
})();