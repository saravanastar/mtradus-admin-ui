/**
 * 
 */
(function() {
	angular.module('dashBoard',['ui.router']);
	angular.module('dashBoard').config(['$stateProvider',stateConfig]);
	function stateConfig($stateProvider) {
		$stateProvider.state('app.dashboard', {
			
		});
	}
})();