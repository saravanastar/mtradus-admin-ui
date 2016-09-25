(function() {
	
	function topHeaderController($scope, $rootScope, spinnerEvent) {
		var topHeaderControllerVm = this;
		topHeaderControllerVm.spinnerEvent = spinnerEvent;
		
	}
	
	angular.module('topHeader',[]).controller('topHeaderController',['$scope', '$rootScope','spinnerEvent', topHeaderController]);
})();