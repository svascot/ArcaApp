angular.module('arcaConductor.CrearCompromisoCtrl', [])

.controller('CrearCompromisoCtrl', function($scope,$rootScope,$q,$http,CompromisoData) {
     $scope.compromiso={};
     $scope.slots = {epochTime: 12600, format: 24, step: 15};
     $scope.slots2 = {epochTime: 12600, format: 24, step: 15};
      $scope.tempDate=new Date();
       var i=0;
      while(i<25){
      if(i*3600>=$scope.tempDate.getHours()*3600){
        $scope.slots.epochTime=(i+1)*3600;
        $scope.slots2.epochTime=(i+1)*3600;
        break;
      }
      i++;
  }
 
      
      $i=new Date(($scope.slots.epochTime+18000)*1000);
      $r=new Date(($scope.slots.epochTime+18000)*1000);
      $scope.compromiso.horaInicio=$i;
      $scope.compromiso.horaFin=$r;

      $fechaini=new Date();
      $fechaini2=new Date();

      $scope.compromiso.fechaInicio=$fechaini;
      $scope.compromiso.fechaFin=$fechaini2;

    $scope.setFechaFin = function (val) {
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        $scope.compromiso.fechaFin=val;
       // $scope.hsalida=$i.getHours()+":"+$i.getMinutes();
        console.log('Selected time is : ', val);    // `val` will contain the selected time in epoch
      }
    };

    $scope.setFechaInicio = function (val) {
        if(typeof(val)==='undefined'){      
            console.log('Date not selected');
        }else{
            $scope.compromiso.fechaInicio=val;
            console.log('Selected date is : ', val);
        }
    };
     $scope.setHoraInicio = function (val) {
        if(typeof(val)==='undefined'){      
            console.log('Date not selected');
        }else{
          $scope.slots.epochTime=val;
            $scope.compromiso.horaInicio=new Date(($scope.slots.epochTime+18000)*1000);
            
        }
    };
     $scope.setHoraFin = function (val) {
        if(typeof(val)==='undefined'){      
            console.log('Date not selected');

        }else{
          $scope.slots2.epochTime=val;
            $scope.compromiso.horaFin=new Date(($scope.slots2.epochTime+18000)*1000); 
        }
    };
    
    $scope.crearCompromiso = function(){
        $scope.compromiso.fechaInicio.setHours($scope.compromiso.horaInicio.getHours(),$scope.compromiso.horaInicio.getMinutes());
        $scope.compromiso.fechaFin.setHours($scope.compromiso.horaFin.getHours(),$scope.compromiso.horaFin.getMinutes());

        
        if($scope.compromiso.fechaInicio < $scope.compromiso.fechaFin){
          var d = new Date();
          if($scope.compromiso.fechaInicio > d){
          CompromisoData.async($scope.compromiso.fechaInicio,$scope.compromiso.fechaFin,$scope.compromiso.descripcion)
            .then(function(val){
              if(val=='ok'){
                  $rootScope.alert("Tiempo reservado exitosamente");
                  //$scope.compromiso={};
              }

            });
          }else{
            $rootScope.alert("la fecha inicial es anterior a la actual");
          }
        }else{
          $rootScope.alert("la fecha final es anterior a la de inicial");
        }
        //alert($scope.compromiso.fechaInicio);
        //alert($scope.compromiso.fechaFin);
        

    };



});
