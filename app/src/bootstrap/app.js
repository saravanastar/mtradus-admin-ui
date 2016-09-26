(function(){
 var app = angular.module("mtradus",['appUtils', 'menu','ui.router','login','dashBoard', 'topHeader']);
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
			 userObject : function(restClient) {
				 return {
					 user : null,
					 getObject : function() {
						 if (this.user == null) {
							 restClient.get('/mtradus/service/user/login').then(function(responseData) {
								 this.user = responseData;
								 return this.user;
							 })
						 }
						 
					 },
					 loadObject : function() {
						 this.getObject();
					 }
				 }
			 }
		 }
	 });
 }]);
app.run(['$rootScope', '$state', '$stateParams', function ($rootScope,   $state, $stateParams) {
    $state.go('app.dashboard');
}]);
})();