
(function() {
	
	function hamburgerMenuController($scope) {
		var hamburgerMenuControllerVM = this;

		$scope.selectedMenu = 'dashboard';
        $scope.collapseVar = 0;
        $scope.multiCollapseVar = 0;
        
        $scope.check = function(x){
          
          if(x == $scope.collapseVar) {
            $scope.collapseVar = 0;
          } else {
            $scope.collapseVar = x;
          }
        };
        
        $scope.multiCheck = function(y){
          
          if(y==$scope.multiCollapseVar)
            $scope.multiCollapseVar = 0;
          else
            $scope.multiCollapseVar = y;
        };
		
	}

	angular.module('menu', ['ui.router']).controller("hamburgerMenuController",["$scope", hamburgerMenuController]);

})();


