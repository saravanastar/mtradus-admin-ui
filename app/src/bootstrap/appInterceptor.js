/**
 * 
 */

(function() {
	
	function appInterceptor($q, $location,  $injector) {
		  var state;
		    return {
		      'responseError': function(response) {
		          if (response.status === 401) {
		            state = $injector.get('$state');
		            state.go('app.login', {next : state.current.name});
		          }
		          return $q.reject(response);
		        }
		    };
	}
	
	angular.module('mtradus').factory('appHttpInterceptor',['$q', '$location', '$injector', appInterceptor]);
})();