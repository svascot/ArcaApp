angular.module('arcaConductor.CanceladosCtrl', [])

.controller('CanceladosCtrl', function($scope,$rootScope,$q,$http,CanceladosData) {
     $scope.cancelados=[];

    $scope.listarCancelados = function(){
    $scope.cancelados ={};
        CanceladosData.async().then(function(val){
        	if(val){
            $scope.cancelados = val.listDep;
        	}
        	else
        	{
        		$scope.cancelados ={};
        	}

        });
        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.listarCancelados();

});
