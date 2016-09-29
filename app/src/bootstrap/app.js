(function(){
 var app = angular.module("mtradus",['appUtils', 'menu','ui.router','login','dashBoard', 'topHeader', 'procurement']);
 app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider,$urlRouterProvider, $httpProvider){
	 $httpProvider.interceptors.push('appHttpInterceptor');
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
			 },
		 	userState : function() {
		 		return {
		 			loggedInStatus : false,
		 			authorized : function() {
		 				this.loggedInStatus = true;
		 			},
		 			unAuthorized : function() {
		 				this.loggedInStatus = false;
		 			}
		 		}
		 	}
		 }
	 });
 }]);
app.run(['$rootScope', '$state', '$stateParams', function ($rootScope,   $state, $stateParams) {
    
   
    $state.go('app.dashboard');
}]);
app.constant('config', {
    appName: 'Mtradus',
    appVersion: 2.0,
    apiUrl: "http://localhost/mtradus/service/"
});
})();