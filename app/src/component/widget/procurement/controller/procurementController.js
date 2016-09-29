/**
 * 
 */

(function() {
	function procurementController($scope, spinnerEvent, $rootScope, procurementFactory, config, restClient) {
		var procurementControllerVM = this;
		
		
		
		function loadDefault() {
			procurementControllerVM.showCategory = false;
			procurementControllerVM.showProduct = false;
			procurementControllerVM.vendorListObject = null;
			procurementControllerVM.getVendorList();
		}
		
		
		
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
		
		procurementControllerVM.editVendor = function() {
			if(procurementControllerVM.selectedVendorOption) {
				procurementControllerVM.showProduct = true;
			}
		};
		procurementControllerVM.onVendorChange = function() {
			if(procurementControllerVM.selectedVendorOption) {
				procurementControllerVM.showProduct = true;
			}
		};
		
		
		loadDefault();
		
		
		

	}
	angular.module('procurement').controller('procurementController',
			[ '$scope', 'spinnerEvent', '$rootScope', 'procurementFactory', 'config', 'restClient', procurementController ])
})();