(function() {
	angular.module('dashBoard').controller("dashBoardController",["$scope", dashBoardController]);
	function dashBoardController($scope) {
		var dashBoardControllerVM = this;
		dashBoardControllerVM.dashboardName = "mtradus1";
	}

})();