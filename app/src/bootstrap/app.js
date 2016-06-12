(function(){
 var app = angular.module("mtradus",['ui.router']);
 app.config(function($stateProvider,$urlRouterProvider){
	 $stateProvider.state('home',{
		 abstract :  true,
		 views : {
			/* '' : {
				 templateUrl : '/static/component/widget/dashboard/template/dashboard.html',
				 controller : 'topHeaderController',
				 controllerAs : 'topHeaderControllerVM'
			 },*/
				 
			 'topheader@' : {
				 templateUrl : '/static/component/widget/top-header/template/top-header.html',
				 /*controller : 'topHeaderController',
				 controllerAs : 'topHeaderControllerVM'*/
			 },
			 'hamburger@' : {
				 templateUrl : '/static/component/widget/hamburger/template/hamburgerMenu.html',
				/* controller : 'hamburgerMenuController',
				 controllerAs : 'hamburgerMenuControllerVM'*/
			 },
			 'footer@' : {
				 templateUrl : '/static/component/widget/footer/template/footer.html',
				/* controller : 'footerController',
				 controllreAs : 'footerControllerVM'*/
			 }
			 
		 }
	 });
 });
	app.run(['$rootScope', '$state', '$stateParams', function ($rootScope,   $state, $stateParams) {
	    $state.transitionTo('home');
	}]);
})();