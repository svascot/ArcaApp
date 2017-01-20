angular.module('arcaConductor.CompromisoCtrl', [])

.controller('CompromisoCtrl', function($state,$scope,$rootScope,$q,$http,CompromisosAceptadosData,SolicitudesData,$stateParams) {

     $scope.compromiso=CompromisosAceptadosData.get($stateParams.idCompromiso);    

        $scope.cancelarCompromiso=function(){
        $scope.temporal = SolicitudesData.cancelarSolicitudService($scope.compromiso.id);
            $scope.temporal.then(function(){
                $rootScope.alert("Compromiso cancelado");
                $state.go('app.home');
            });
       }

        $scope.goCompromisos=function(){
                $state.go('app.home');
        };
       
    

})
