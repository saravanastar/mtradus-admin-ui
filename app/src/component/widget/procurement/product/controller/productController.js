/**
 * 
 */

(function() {
	function productController($scope, spinnerEvent, $rootScope, procurementFactory, config, restClient) {
		var productControllerVM = this;
		
		productControllerVM.showProduct =  $scope.$parent.showProduct;

		$scope.$watch('procureObject', function(newValue, oldValue) {
			if ($scope.$parent.procureObject.vendor) {
				console.log("sdf" + $scope.procureObject.vendor.vendorId);
			}
		});
		function loadDefault() {
			 $scope.$parent.showCategory = false;
			productControllerVM.productListObject = null;
			productControllerVM.disableProductInputs = true;
			productControllerVM.message = {};
			productControllerVM.currentMode = {
				vendor : null,
				product : null,
				category : null
			};
			//productControllerVM.getProductList();
		}
		
		
		
		productControllerVM.getProductList = function() {
	
			spinnerEvent.show();
			restClient.get(config.apiUrl + "data/vendor/" + $scope.procureObject.vendor.vendorId).then(function(productList) {
				
				$scope.$parent.procureObject.vendor = productList;
				spinnerEvent.hide();
			}, function() {
				spinnerEvent.hide();
			});
		}
		
		productControllerVM.onProductCancel = function() {
			productControllerVM.currentMode.product = null;
			productControllerVM.productName = '';
			productControllerVM.productId = '';
			productControllerVM.ProductActive = '';
			productControllerVM.productDescription = '';
			productControllerVM.disableProductInputs = true;
			productControllerVM.message = {};
			if (productControllerVM.selectedProductOption) {
				 $scope.$parent.showCategory = true;
				 $scope.$parent.procureObject.product = angular.fromJson(productControllerVM.selectedProductOption);
			}
		};
		
		productControllerVM.onProductSubmit = function() {
			if(productControllerVM.productName && productControllerVM.productActive
					&& productControllerVM.productDescription) {
				if (productControllerVM.currentMode.product == 'edit') {
					productControllerVM.updateProductObject();
				}
				if (productControllerVM.currentMode.product == 'add') {
					productControllerVM.addProductObject();
				}
			}
		};
		
		productControllerVM.updateProductObject = function() {
			var productObject = {
					vendorId : $scope.procureObject.vendor.vendorId,
					productName : productControllerVM.productName,
					status : (productControllerVM.productActive === 'true'),
					description : productControllerVM.productDescription
			};
			spinnerEvent.show();
			restClient.put(config.apiUrl+'data/product/'+productControllerVM.productId,productObject).then(function(responseData) {
				productControllerVM.message.info = 'Data successfully updated';
				productControllerVM.productDefaultState();
				spinnerEvent.hide();	
			}, function(errorData) {
				productControllerVM.message.error = errorData.errorMessage;
				spinnerEvent.hide();
			})
		};
		
		productControllerVM.addProductObject = function() {
			var productObject = {
					vendorId : $scope.procureObject.vendor.vendorId,
					productName : productControllerVM.productName,
					status : (productControllerVM.productActive === 'true'),
					description : productControllerVM.productDescription
			};
			spinnerEvent.show();
			restClient.post(config.apiUrl+'data/product',productObject).then(function(responseData) {
				
				productControllerVM.message.info = 'Data successfully added';
				productControllerVM.productDefaultState();
				spinnerEvent.hide();	
			}, function(errorData) {
				productControllerVM.message.error = errorData.errorMessage;
				spinnerEvent.hide();
			})
		};
		
		productControllerVM.deleteProductObject = function() {
			var convertedObject = angular.fromJson(productControllerVM.selectedProductOption);
			if (convertedObject) {
				spinnerEvent.show();
				restClient.callDelete(config.apiUrl+'data/product/'+convertedObject.productId).then(function(responseData) {
					
					productControllerVM.message.info = 'Data successfully deleted';
					productControllerVM.productDefaultState();
					spinnerEvent.hide();	
				}, function(errorData) {
					productControllerVM.message.error = errorData.errorMessage;
					spinnerEvent.hide();
				})
			}
			
		};
		
		productControllerVM.editProduct = function() {
			var convertedObject = angular.fromJson(productControllerVM.selectedProductOption);
			if(convertedObject) {
				
				productControllerVM.disableProductInputs = false;
				productControllerVM.productName = convertedObject.productName;
				productControllerVM.productId = convertedObject.productId;
				productControllerVM.productActive = String(convertedObject.status);
				productControllerVM.productDescription = convertedObject.description;
				productControllerVM.currentMode.product = "edit";
			}
		};
		
		productControllerVM.addProduct = function() {
				
				productControllerVM.disableProductInputs = false;
				productControllerVM.productName = '';
				productControllerVM.productId = '';
				productControllerVM.productActive = '';
				productControllerVM.productDescription = '';
				productControllerVM.currentMode.product = "add";
			
		};
		
		productControllerVM.onProductChange = function() {
			productControllerVM.productName = '';
			productControllerVM.productId = '';
			productControllerVM.productActive = '';
			productControllerVM.productDescription = '';
			productControllerVM.message = {};
			productControllerVM.currentMode.product = null;
			productControllerVM.disableProductInputs = true;
			if(productControllerVM.selectedProductOption) {
				$scope.$parent.showCategory = true;
				$scope.procureObject.product = angular.fromJson(productControllerVM.selectedProductOption);
				
				productControllerVM.loadCategoryByProductId();
				
			}
		};
		
		productControllerVM.productDefaultState = function() {
			productControllerVM.disableProductInputs = true;
			productControllerVM.currentMode.product = null;
			productControllerVM.selectedProductOption = null;
			productControllerVM.getProductList();
		};
		
		productControllerVM.loadCategoryByProductId = function() {
			
			restClient.get(config.apiUrl + 'data/category/product/'+$scope.procureObject.product.productId).then(function(responseData) {
				$scope.$parent.procureObject.product.productCategoryDetails = responseData;
			}, function(errorData) {
				
			})
		}
		loadDefault();
		
	}
	angular.module('product',[]).controller('productController',['$scope', 'spinnerEvent', '$rootScope', 'procurementFactory', 'config', 'restClient', productController])
})();