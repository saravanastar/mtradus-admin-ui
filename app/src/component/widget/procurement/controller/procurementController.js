/**
 * 
 */

(function() {
	function procurementController($scope, spinnerEvent, $rootScope, procurementFactory, config, restClient) {
		var procurementControllerVM = this;
		
		
		$scope.showProduct = false;
		$scope.showCategory = false;
		
		$scope.procureObject = {
				vendor:null,
				product : null,
				category:null
		};
		
		
		

	}
	angular.module('procurement').controller('procurementController',
			[ '$scope', 'spinnerEvent', '$rootScope', 'procurementFactory', 'config', 'restClient', procurementController ])
})();