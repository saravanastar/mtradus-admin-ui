/**
 * 
 */

(function() {
	function categoryController($scope, spinnerEvent, $rootScope, procurementFactory, config, restClient) {
		var categoryControllerVM = this;
		
		function loadDefault() {
			 $scope.$parent.showCategory = false;
			categoryControllerVM.categoryListObject = null;
			categoryControllerVM.disableCategoryInputs = true;
			categoryControllerVM.message = {};
			categoryControllerVM.currentMode = {
				vendor : null,
				product : null,
				category : null
			};
			//productControllerVM.getProductList();
			
		}
		
		categoryControllerVM.getCategoryList = function() {
			
			spinnerEvent.show();
			restClient.get(config.apiUrl + "data/category/product/" + $scope.procureObject.product.productId).then(function(productCategoryList) {
				
				$scope.$parent.procureObject.product.productCategoryDetails = productCategoryList;
				spinnerEvent.hide();
			}, function() {
				spinnerEvent.hide();
			});
		}
		
		categoryControllerVM.oncategoryCancel = function() {
			categoryControllerVM.currentMode.category = null;
			categoryControllerVM.categoryName = '';
			categoryControllerVM.categoryId = '';
			categoryControllerVM.categoryActive = '';
			categoryControllerVM.categoryDescription = '';
			categoryControllerVM.disableCategoryInputs = true;
			categoryControllerVM.message = {};
			if (categoryControllerVM.selectedCategoryOption) {
				 $scope.$parent.showCategory = true;
				 $scope.$parent.procureObject.category = angular.fromJson(categoryControllerVM.selectedcategoryOption);
			}
		};
		
		
		categoryControllerVM.editCategory = function() {
			var convertedObject = angular.fromJson(categoryControllerVM.selectedCategoryOption);
			if(convertedObject) {
				
				categoryControllerVM.disableCategoryInputs
				categoryControllerVM.categoryName = convertedObject.categoryName;
				categoryControllerVM.categoryId = convertedObject.categoryId;
				categoryControllerVM.currentMode.category = "edit";
			}
		};
		
		categoryControllerVM.onCategorySubmit = function() {
			if(categoryControllerVM.categoryName) {
				if (categoryControllerVM.currentMode.category == 'edit') {
					categoryControllerVM.updateCategoryObject();
				}
				if (categoryControllerVM.currentMode.category == 'add') {
					categoryControllerVM.addCategoryObject();
				}
			}
		};
		
		
		categoryControllerVM.updateCategoryObject = function() {
			var categoryObject = {
					productId : $scope.procureObject.product.productId,
					categoryName : categoryControllerVM.categoryName,
					status : (categoryControllerVM.categoryActive === 'true'),
					description : categoryControllerVM.categoryDescription
			};
			spinnerEvent.show();
			restClient.put(config.apiUrl+'data/category/'+categoryControllerVM.categoryId,categoryObject).then(function(responseData) {
				categoryControllerVM.message.info = 'Data successfully updated';
				categoryControllerVM.categoryDefaultState();
				spinnerEvent.hide();	
			}, function(errorData) {
				categoryControllerVM.message.error = errorData.errorMessage;
				spinnerEvent.hide();
			})
		};
		
		categoryControllerVM.addCategoryObject = function() {
			var categoryObject = {
					productId : $scope.procureObject.product.productId,
					categoryName : categoryControllerVM.categoryName,
					status : (categoryControllerVM.categoryActive === 'true'),
					description : categoryControllerVM.categoryDescription
			};
			spinnerEvent.show();
			restClient.post(config.apiUrl+'data/category',categoryObject).then(function(responseData) {
				
				categoryControllerVM.message.info = 'Data successfully added';
				categoryControllerVM.categoryDefaultState();
				spinnerEvent.hide();	
			}, function(errorData) {
				categoryControllerVM.message.error = errorData.errorMessage;
				spinnerEvent.hide();
			})
		};
		
		categoryControllerVM.deleteCategoryObject = function() {
			var convertedObject = angular.fromJson(categoryControllerVM.selectedCategoryOption);
			if (convertedObject) {
				spinnerEvent.show();
				restClient.callDelete(config.apiUrl+'data/category/'+convertedObject.categoryId).then(function(responseData) {
					
					categoryControllerVM.message.info = 'Data successfully deleted';
					categoryControllerVM.categoryDefaultState();
					spinnerEvent.hide();	
				}, function(errorData) {
					categoryControllerVM.message.error = errorData.errorMessage;
					spinnerEvent.hide();
				})
			}
			
		};
		
		categoryControllerVM.editCategory = function() {
			var convertedObject = angular.fromJson(categoryControllerVM.selectedCategoryOption);
			if(convertedObject) {
				
				categoryControllerVM.disableCategoryInputs = false;
				categoryControllerVM.categoryName = convertedObject.categoryName;
				categoryControllerVM.categoryId = convertedObject.categoryId;
				categoryControllerVM.categoryActive = String(convertedObject.status);
				categoryControllerVM.categoryDescription = convertedObject.description;
				categoryControllerVM.currentMode.category = "edit";
			}
		};
		
		categoryControllerVM.addCategory = function() {
				
				categoryControllerVM.disableCategoryInputs = false;
				categoryControllerVM.categoryName = '';
				categoryControllerVM.categoryId = '';
				categoryControllerVM.categoryActive = '';
				categoryControllerVM.categoryDescription = '';
				categoryControllerVM.currentMode.category = "add";
			
		};
		
		categoryControllerVM.categoryDefaultState = function() {
			categoryControllerVM.disableCategoryInputs = true;
			categoryControllerVM.currentMode.category = null;
			categoryControllerVM.selectedCategoryOption = null;
			categoryControllerVM.getCategoryList();
		};
		
		categoryControllerVM.onCategoryChange = function() {
			categoryControllerVM.disableCategoryInputs = true;
			categoryControllerVM.currentMode.category = null;
			categoryControllerVM.categoryName = '';
			categoryControllerVM.categoryId = '';
			categoryControllerVM.categoryActive = '';
			categoryControllerVM.categoryDescription = '';
			categoryControllerVM.message = {};
			var convertedObject = angular.fromJson(categoryControllerVM.selectedCategoryOption);
			if (convertedObject) {
				$scope.$parent.procureObject.category = convertedObject;
			}
		}
		
		loadDefault();
	}
	
	angular.module('category',[]).controller('categoryController',['$scope', 'spinnerEvent', '$rootScope', 'procurementFactory', 'config', 'restClient',categoryController])
})();