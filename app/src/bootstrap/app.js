(function(){
 var app = angular.module("mtradus",['appUtils', 'menu','ui.router','login','dashBoard', 'topHeader']);
 app.config(function($stateProvider,$urlRouterProvider){
	 $stateProvider.state('app',{
		 abstract :  true,
		 views : {			 
			 'topheader@' : {
				 templateUrl : '@@cxt/component/widget/top-header/template/top-header.html',
				 controller : 'topHeaderController as topHeaderControllerVm'
				 
			 },
			 'hamburger@' : {
				 templateUrl : '@@cxt/component/widget/hamburger/template/hamburgerMenu.html',
				 controller : 'hamburgerMenuController as hamburgerMenuControllerVM'
				 
			 },
			 'footer@' : {
				 templateUrl : '@@cxt/component/widget/footer/template/footer.html',
			 }
			 
		 },
		 resolve : {
			 spinnerEvent : function() {
				 return {
					 visible: false,
		              show: function() {
		                this.visible = true;
		              },
		              hide: function() {
		                this.visible = false;
		              }
				 }
			 } 
		 }
	 });
 });
app.run(['$rootScope', '$state', '$stateParams', function ($rootScope,   $state, $stateParams) {
    $state.go('app.login');
}]);
})();