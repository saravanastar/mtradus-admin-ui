/**
 * 
 */
(function() {
	angular.module('dashBoard',['ui.router']);
	angular.module('dashBoard').config(['$stateProvider',stateConfig]);
	function stateConfig($stateProvider) {
		$stateProvider.state('app.dashboard', {
			views : {
				'@' : {
					 templateUrl : '@@cxt/component/widget/dashboard/template/dashboard.html',
					 controller : 'dashBoardController',
					 controllerAs : 'dashBoardControllerVM'
				 },
				 'recentChanges@app.dashboard' : {
					 templateUrl : '@@cxt/component/widget/recent-changes/template/recent-changes.html'
				 }
			}
		});
	}
})();