/**
 * 
 */

(function() {
	function vendorController($scope, spinnerEvent, $rootScope, procurementFactory, config, restClient) {
		var vendorControllerVM = this;

		function loadDefault() {
			$scope.showCategory = false;
			$scope.$parent.showProduct = false;
			vendorControllerVM.vendorListObject = null;
			vendorControllerVM.enableVendorInputs = true;
			vendorControllerVM.message = {};
			vendorControllerVM.currentMode = {
				vendor : null,
				product : null,
				category : null
			};
			vendorControllerVM.getVendorList();
		}
		
		
		
		vendorControllerVM.getVendorList = function() {
			var vendorObject = null;
			spinnerEvent.show();
			restClient.get(config.apiUrl + "data/vendors").then(function(vendorList) {
				vendorControllerVM.vendorListObject = vendorList;
				spinnerEvent.hide();
			}, function() {
				spinnerEvent.hide();
			});
		}
		
		vendorControllerVM.onVendorCancel = function() {
			vendorControllerVM.currentMode.vendor = null;
			vendorControllerVM.vendorName = '';
			vendorControllerVM.vendorId = '';
			vendorControllerVM.vendorActive = '';
			vendorControllerVM.enableVendorInputs = true;
			vendorControllerVM.message = {};
			if (vendorControllerVM.selectedVendorOption) {
				$scope.$parent.showProduct = true;
			}
		};
		
		vendorControllerVM.onVendorSubmit = function() {
			if(vendorControllerVM.vendorName && vendorControllerVM.vendorActive) {
				if (vendorControllerVM.currentMode.vendor == 'edit') {
					vendorControllerVM.updateVendorObject();
				}
				if (vendorControllerVM.currentMode.vendor == 'add') {
					vendorControllerVM.addVendorObject();
				}
			}
		};
		
		vendorControllerVM.updateVendorObject = function() {
			var vendorObject = {
					
					vendorName : vendorControllerVM.vendorName,
					active : (vendorControllerVM.vendorActive === 'true')
			};
			spinnerEvent.show();
			restClient.put(config.apiUrl+'data/vendor/'+vendorControllerVM.vendorId,vendorObject).then(function(responseData) {
				vendorControllerVM.message.info = 'Data successfully updated';
				vendorControllerVM.vendorDefaultState();
				spinnerEvent.hide();	
			}, function(errorData) {
				vendorControllerVM.message.error = errorData.errorMessage;
				spinnerEvent.hide();
			})
		};
		
		vendorControllerVM.addVendorObject = function() {
			var vendorObject = {
					vendorName : vendorControllerVM.vendorName,
					active : (vendorControllerVM.vendorActive === 'true')
			};
			spinnerEvent.show();
			restClient.post(config.apiUrl+'data/vendor',vendorObject).then(function(responseData) {
				
				vendorControllerVM.message.info = 'Data successfully added';
				vendorControllerVM.vendorDefaultState();
				spinnerEvent.hide();	
			}, function(errorData) {
				vendorControllerVM.message.error = errorData.errorMessage;
				spinnerEvent.hide();
			})
		};
		
		vendorControllerVM.deleteVendorObject = function() {
			var convertedObject = angular.fromJson(vendorControllerVM.selectedVendorOption);
			if (convertedObject) {
				spinnerEvent.show();
				restClient.callDelete(config.apiUrl+'data/vendor/'+convertedObject.vendorId).then(function(responseData) {
					
					vendorControllerVM.message.info = 'Data successfully deleted';
					vendorControllerVM.vendorDefaultState();
					spinnerEvent.hide();	
				}, function(errorData) {
					vendorControllerVM.message.error = errorData.errorMessage;
					spinnerEvent.hide();
				})
			}
			
		};
		
		vendorControllerVM.editVendor = function() {
			var convertedObject = angular.fromJson(vendorControllerVM.selectedVendorOption);
			if(convertedObject) {
				$scope.$parent.showProduct = false;
				vendorControllerVM.enableVendorInputs = false;
				vendorControllerVM.vendorName = convertedObject.vendorName;
				vendorControllerVM.vendorId = convertedObject.vendorId;
				vendorControllerVM.vendorActive = String(convertedObject.active);
				vendorControllerVM.currentMode.vendor = "edit";
			}
		};
		
		vendorControllerVM.addVendor = function() {
				$scope.$parent.showProduct = false;
				vendorControllerVM.enableVendorInputs = false;
				vendorControllerVM.vendorName = '';
				vendorControllerVM.vendorId = '';
				vendorControllerVM.vendorActive = '';
				vendorControllerVM.currentMode.vendor = "add";
			
		};
		
		vendorControllerVM.onVendorChange = function() {
			vendorControllerVM.vendorName = '';
			vendorControllerVM.vendorId = '';
			vendorControllerVM.vendorActive = '';
			vendorControllerVM.message = {};
			vendorControllerVM.currentMode.vendor = null;
			vendorControllerVM.enableVendorInputs = true;
			if(vendorControllerVM.selectedVendorOption) {
				$scope.$parent.showProduct = true;
				$scope.$parent.procureObject.vendor = angular.fromJson(vendorControllerVM.selectedVendorOption);
				/*$scope.$parent.productObject = angular.fromJson(vendorControllerVM.selectedVendorOption).productDetails;*/
			}
		};
		
		vendorControllerVM.vendorDefaultState = function() {
			vendorControllerVM.enableVendorInputs = true;
			vendorControllerVM.currentMode.vendor = null;
			vendorControllerVM.selectedVendorOption = null;
			vendorControllerVM.getVendorList();
		};
		loadDefault();
		
	}
	angular.module('vendor',[]).controller('vendorController',['$scope', 'spinnerEvent', '$rootScope', 'procurementFactory', 'config', 'restClient', vendorController])
})();