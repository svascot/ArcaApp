angular.module('arcaConductor.AppCtrl', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$rootScope,$q,$http,md5,$rootScope,$state,$ionicHistory,LoginData,PushData,$cordovaPush,$cordovaDialogs) {
$rootScope.monthListEsp = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  $rootScope.weekDaysListEsp = ["Domingo","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
  $rootScope.monthListEng = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  $rootScope.weekDaysListEng = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  $rootScope.naturalDateEsp = function(date) {
    nDate=$rootScope.weekDaysListEsp[date.getDay()]+" "+date.getDate()+" de "+$rootScope.monthListEsp[date.getMonth()]+" , "+date.getFullYear();
    return nDate;
  };

$rootScope.alert = function(message){
    $cordovaDialogs.alert(message, "Mensaje:", "aceptar")
      .then(function() {
      // callback success
    });
};
$rootScope.$on('$cordovaPush:notificationReceived', function (event,notification) {
  if($ionicHistory.currentView().stateId=="nomenu.login"){
    return;
  }
    if (notification.event != "registered") {
    //  
        if(notification.payload.payload.to=='viaje'){
        $cordovaDialogs.confirm('Deseas ir a solicitudes?', 'Tienes una nueva solicitud!', ['Si','No'])
            .then(function(buttonIndex) {
                if (buttonIndex==1) {
                    $state.go(notification.payload.payload.state);  
                }
            });
      
        }
        if(notification.payload.payload.to=='recurrente'){
        $cordovaDialogs.confirm('Deseas ir a tus compromisos?', 'Tienes nuevos compromisos recurrentes!', ['Si','No'])
            .then(function(buttonIndex) {
                if (buttonIndex==1) {
                    $state.go(notification.payload.payload.state);  
                }
            });
      
        }
        if(notification.payload.payload.to=='notificacion'){
            $rootScope.alert(notification.payload.payload.state);
      
        }
    }

    
});
 $scope.logout = function() { 
    localStorage.removeItem("ArcaConductorCc");
    localStorage.removeItem("ArcaConductorNombre");
    localStorage.removeItem("ArcaConductorApellido_uno");
    localStorage.removeItem("ArcaConductorApellido_dos");
    localStorage.removeItem("ArcaConductorCelular");
    localStorage.removeItem("ArcaConductorCorreo");
    localStorage.removeItem("ArcaConductorPuntos");
    localStorage.removeItem("ArcaConductorCarro");
    localStorage.removeItem("ArcaConductorImagen");
    localStorage.removeItem("ArcaConductorPassword");
    localStorage.removeItem("ArcaConductorAgencia");
    $ionicHistory.nextViewOptions({
        disableBack: true
    });
    PushData.actualizartoken(-1);
    $scope.loginData = {};
    $state.go('nomenu.login'); 
  };

$rootScope.guia = function(){
    window.open('https://docs.google.com/forms/d/1h-jO1iOwTdFBAKHiDg6SFkg0qNQU85-JcpXVH_5Dp9w/viewform?c=0&w=1", "_system');
  };

 $rootScope.toUTCDate = function(date){
    var _utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    return _utc;
  };
  
  $rootScope.millisToUTCDate = function(millis){
    return $rootScope.toUTCDate(new Date(millis));
  };
  
    



});
