/**
 * 
 */

(function() {
	function procurementController($scope, spinnerEvent, $rootScope, procurementFactory, config, restClient) {
		var procurementControllerVM = this;
		
		
		procurementControllerVM.vendorListObject = null;
		
		
		procurementControllerVM.getVendorList = function() {
			var vendorObject = null;
			spinnerEvent.show();
			restClient.get(config.apiUrl + "data/vendors").then(function(vendorList) {
				procurementControllerVM.vendorListObject = vendorList;
				spinnerEvent.hide();
			}, function() {
				spinnerEvent.hide();
			});
		}
		
		procurementControllerVM.getVendorList();
		
		

	}
	angular.module('procurement').controller('procurementController',
			[ '$scope', 'spinnerEvent', '$rootScope', 'procurementFactory', 'config', 'restClient', procurementController ])
})();