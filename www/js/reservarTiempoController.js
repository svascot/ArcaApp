    angular.module('arcaConductor.ReservartiempoCtrl', [])

    .controller('reservartiempoCtrl', function($scope,$q,$http,$state,$rootScope,CompromisoData) {
      $scope.data={}
      $scope.slots = {epochTime: 12600, format: 12, step: 15};
      $scope.slots2 = {epochTime: 12600, format: 24, step: 15};
      
      $i=new Date(($scope.slots.epochTime+18000)*1000);
      $r=new Date(($scope.slots.epochTime+18000)*1000);
      $scope.data.horaInicio=$i;
      $scope.data.horaFin=$r;

      $fechaini=new Date();
      $fechaini2=new Date();

      $scope.currentDate=$fechaini;
      $scope.currentDate1=$fechaini2;


    $scope.setFechaFin = function (val) {
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        $scope.data.fechaFin=val;
       // $scope.hsalida=$i.getHours()+":"+$i.getMinutes();
        console.log('Selected time is : ', val);    // `val` will contain the selected time in epoch
      }
    };

    $scope.setFechaInicio = function (val) {
        if(typeof(val)==='undefined'){      
            console.log('Date not selected');
        }else{
            $scope.data.fechaInicio=val;
            console.log('Selected date is : ', val);
        }
    };
     $scope.setHoraInicio = function (val) {
        if(typeof(val)==='undefined'){      
            console.log('Date not selected');
        }else{
          $scope.slots.epochTime=val;
            $scope.data.horaInicio=new Date(($scope.slots.epochTime+18000)*1000);
            console.log('Selected hour is : ',$scope.data.horaInicio);
        }
    };
     $scope.setHoraFin = function (val) {
        if(typeof(val)==='undefined'){      
            console.log('Date not selected');

        }else{
          $scope.slots2.epochTime=val;
            $scope.data.horaFin= new Date(($scope.slots2.epochTime+18000)*1000); 
            console.log('Selected hour is : ', $scope.data.horaFin);
        }
    };

    $scope.setDias=function(){
            $scope.data.dias='';
            if($scope.data.flagLunes==true){
              $scope.data.dias=$scope.data.dias+"l";
            }
            if($scope.data.flagMartes==true){
              $scope.data.dias=$scope.data.dias+"m";
            }
            if($scope.data.flagMiercoles==true){
              $scope.data.dias=$scope.data.dias+"w";
            }
            if($scope.data.flagJueves==true){
              $scope.data.dias=$scope.data.dias+"j";
            }
            if($scope.data.flagViernes==true){
              $scope.data.dias=$scope.data.dias+"v";
            }
            if($scope.data.flagSabado==true){
              $scope.data.dias=$scope.data.dias+"s";
            }
            if($scope.data.flagDomingo==true){
              $scope.data.dias=$scope.data.dias+"d";
            }            
    };

    $scope.validar=function(){
        
     
     
       if($scope.data.fechaInicio < $scope.data.fechaFin){
          var d = new Date();
          if($scope.data.fechaInicio>d){
                
              
            
          }else{
            $rootScope.alert("la fecha inicial es anterior a la actual");
             return false;
          }
       }else{
          $rootScope.alert("la fecha final es anterior a la de inicial");
           return false;
       }
       return true;
    };

    $scope.reservar = function(){
      if($scope.validar()){
          if($scope.data.flagFestivos === true){
            $scope.data.festivos= 1;
          }
          else{
            $scope.data.festivos= 0;
          }
          $scope.setDias();
          $scope.data.tiempo = ($scope.data.horaFin - $scope.data.horaInicio)/1000;
         
          //alert($scope.data.tiempo);
          CompromisoData.reservarRecurrentemente($scope.data).then(function(val){
          });

      }

    }






     
})
