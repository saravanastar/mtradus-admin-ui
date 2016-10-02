/**
 * 
 */

(function() {
	function stateConfig($stateProvider) {
		$stateProvider.state('app.procurement', {
			url : '/procurement',
			views : {
				'@' : {
					
					 templateUrl : '@@cxt/component/widget/procurement/template/procurement.html',
					 controller : 'procurementController',
					 controllerAs : 'procurementControllerVM'
				},
				'vendor@app.procurement' : {
					templateUrl : '@@cxt/component/widget/procurement/vendor/template/vendor.html',
					controller : 'vendorController',
					controllerAs: 'vendorControllerVM'
				},
				'product@app.procurement' : {
					templateUrl : '@@cxt/component/widget/procurement/product/template/product.html',
					controller : 'productController',
					controllerAs: 'productControllerVM'
				}/*,
				'category@app.procurement' : {
					templateUrl : '@@cxt/component/widget/procurement/category/template/category.html',
					controller : 'categoryController',
					controllerAs: 'categoryControllerVM'
				}*/
			}
		});
	}
	angular.module('procurement',['ui.router', 'vendor', 'product']);
	angular.module('procurement').config(['$stateProvider',stateConfig]);
})();