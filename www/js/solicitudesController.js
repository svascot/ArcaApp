angular.module('arcaConductor.SolicitudesCtrl', [])

.controller('SolicitudesCtrl', function($scope,$rootScope,$q,$http,SolicitudesData) {
 
    

   

    $scope.aceptarSolicitud=function(viaje){
        $scope.temporal = SolicitudesData.aceptarSolicitudService(viaje);
        $scope.temporal.then(function(){
          $scope.listarSolicitudes();
        });
    }
    $scope.cancelarSolicitud=function(viaje){
        $scope.temporal = SolicitudesData.cancelarSolicitudService(viaje);
        $scope.temporal.then(function(){
            $scope.listarSolicitudes();
        });
    }
    /*
     $scope.eliminarDeLista=function(viaje){
       
           viaje =SolicitudesData.get(viaje);
           SolicitudesData.remove(viaje);
         
        
    }
*/
    $scope.listarSolicitudes = function(){
        
        $scope.temporal = SolicitudesData.async(); 
        $scope.temporal.then(function(val){
            $scope.temporal=SolicitudesData.getAll();
            console.log($scope.temporal);  
            if($scope.temporal){
                $scope.solicitudes = $scope.temporal.listDep;
            }
            else{
                $scope.solicitudes ={};
            }

        });
        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.listarSolicitudes();

});
