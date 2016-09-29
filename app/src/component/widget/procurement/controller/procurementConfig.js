/**
 * 
 */

(function() {
	function stateConfig($stateProvider) {
		$stateProvider.state('app.procurement', {
			views : {
				'@' : {
					
					 templateUrl : '@@cxt/component/widget/procurement/template/procurement.html',
					 controller : 'procurementController',
					 controllerAs : 'procurementControllerVM'
				}
			}
		});
	}
	angular.module('procurement',['ui.router']);
	angular.module('procurement').config(['$stateProvider',stateConfig]);
})();