angular.module('arcaConductor.InicioCtrl', [])

.controller('InicioCtrl', function($scope,$rootScope,CompromisosAceptadosData,$cordovaPush,$state,$ionicHistory,PushData) {

   
   PushData.actualizartoken(localStorage.getItem("ArcaConductorCorreo"));


    $scope.getWeekOfYear= function(date){
        var d= new Date(+date);
        d.setHours(0,0,0);
        d.setDate(d.getDate()+4-(d.getDay()||7));
        return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);

    }

    $scope.formatDate= function(dateTimestamp){
        var date = new Date(dateTimestamp*1000);
        console.log(date);
        return date;

    }

     $scope.getDayOfYear= function(dateTimestamp){
        var date = new Date(dateTimestamp*1000);
        console.log(date);
        return date;

    }

    $scope.checkdate= function(dateTimestamp){
        var estado = 0;
        var todayDate = new Date();
        var fechaInicio = new Date().getTime() / 1000 -18000;
        var diferencia =  parseInt(dateTimestamp) - fechaInicio ;
        try {
              if( diferencia <=31622400){//1 año igual
                estado++;
                if(diferencia <=2678400){//proximos 31 dias
                    estado++;
                    if(diferencia <= 604800){// proxuma semana 
                        estado++;
                        if(diferencia <= 86400){//4 dia  igual
                            estado++;
                        }
                    }
                }
            }
            return estado
        }
        catch(err) {
            document.getElementById("demo").innerHTML = err.message;
        }




    }   



    $scope.listarReservas = function(){
        $scope.ano=[]; $scope.mes=[]; $scope.semana=[]; $scope.dia=[];
         CompromisosAceptadosData.async().then(function(val){
            $scope.temporal=val.data;
            if($scope.temporal){
            console.log($scope.temporal.listDep);  
            $scope.viajes = $scope.temporal.listDep;
            for (i = 0; i < $scope.viajes.length; i++) { 
                var estado = 0;
                var viaje = $scope.viajes[i];
                estado = $scope.checkdate(viaje.fecha_incio);
                switch(estado) {
                    case 4:
                    $scope.mes.push(viaje);
                    $scope.semana.push(viaje);
                    $scope.dia.push(viaje);
                    break;

                    case 3:                 
                    $scope.mes.push(viaje);
                    $scope.semana.push(viaje);
                    break;

                    case 2:                 
                    $scope.mes.push(viaje);
                    break;

                }
            }
        }
        else{
             $scope.ano=[]; $scope.mes=[]; $scope.semana=[]; $scope.dia=[];
        }


        });
        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.listarReservas();

});
