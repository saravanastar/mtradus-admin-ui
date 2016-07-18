(function(){
 var app = angular.module("mtradus",['menu','ui.router','login',"dashBoard"]);
 app.config(function($stateProvider,$urlRouterProvider){
	 $stateProvider.state('app',{
		 abstract :  true,
		 views : {
			/* '' : {
				 templateUrl : '/static/component/widget/dashboard/template/dashboard.html',
				 controller : 'topHeaderController',
				 controllerAs : 'topHeaderControllerVM'
			 },*/
			/* '' : {
				 templateUrl : '@@cxt/component/widget/dashboard/template/dashboard.html',
				 controller : 'dashBoardController',
				 controllerAs : 'dashBoardControllerVM'
			 },*/
				 
			 'topheader@' : {
				 templateUrl : '@@cxt/component/widget/top-header/template/top-header.html',
				 /*controller : 'topHeaderController',
				 controllerAs : 'topHeaderControllerVM'*/
			 },
			 'hamburger@' : {
				 templateUrl : '@@cxt/component/widget/hamburger/template/hamburgerMenu.html',
				 controller : 'hamburgerMenuController as hamburgerMenuControllerVM'
				 
			 },
			 'footer@' : {
				 templateUrl : '@@cxt/component/widget/footer/template/footer.html',
				/* controller : 'footerController',
				 controllreAs : 'footerControllerVM'*/
			 }
			 
		 }
	 });
 });
app.run(['$rootScope', '$state', '$stateParams', function ($rootScope,   $state, $stateParams) {
    $state.go('app.login');
}]);
})();