angular.module('arcaConductor.LoginCtrl', [])

.controller('LoginCtrl', function($scope,$cordovaPush, $ionicModal, $timeout,$rootScope,$q,$http,md5,$rootScope,$state,$ionicHistory,LoginData,ionPlatform,PushData,$cordovaDialogs) {
    

      $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

 
  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

$rootScope.alert = function(message){
    $cordovaDialogs.alert(message, "Mensaje:", "aceptar")
      .then(function() {
      // callback success
    });
};


  // Open the login modal
  $rootScope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
     LoginData.async($scope.loginData.correo,$scope.loginData.password).then(function(val){

        if(val){        
            localStorage.setItem("ArcaConductorCc",val[0].cc);
            localStorage.setItem("ArcaConductorNombre",val[0].nombre);
            PushData.actualizartoken(val[0].correo);
            localStorage.setItem("ArcaConductorApellido_uno",val[0].apellido_uno);
            localStorage.setItem("ArcaConductorApellido_dos",val[0].apellido_dos);
            localStorage.setItem("ArcaConductorCelular",val[0].celular);
            localStorage.setItem("ArcaConductorCorreo",val[0].correo);  
            localStorage.setItem("ArcaConductorPuntos",val[0].puntos);
            localStorage.setItem("ArcaConductorCarro",val[0].carro);
            localStorage.setItem("ArcaConductorImagen",val[0].imagen);
            localStorage.setItem("ArcaConductorPassword",val[0].password);
            localStorage.setItem("ArcaConductorAgencia",val[0].agencia);
            $rootScope.agencia=val[0].agencia;
            $scope.closeLogin();
            $state.go('app.home');
        }
        else{
          alert('Informacion invalida');
        }

    });
};



    $scope.notifications = [];

    // call to register automatically upon device ready
    ionPlatform.ready.then(function (device) {
       // alert(device.uuid);

        localStorage.setItem("uuid",window.device.uuid);
        if(localStorage.getItem("ArcaConductorCc")){//ITS MANDATORY TO HAVE A WAY  TO KNOW IF USER IS LOG OR NOT
            $scope.register();
            $state.go('app.home');
        }
        else{
            $scope.register();
        }

    });


    // Register
    $scope.register = function () {
        var config = null;

        if (ionic.Platform.isAndroid()) {
            localStorage.setItem("arcaconductor_platform","1");
            config = {
                "senderID": "757350486782" // REPLACE THIS WITH YOURS FROM GCM CONSOLE - also in the project URL like: https://console.developers.google.com/project/434205989073
            };
        }
        else if (ionic.Platform.isIOS()) {
            localStorage.setItem("arcaconductor_platform","2");
            config = {
                "badge": "true",
                "sound": "true",
                "alert": "true"
            }
        }

        $cordovaPush.register(config).then(function (result) {
            console.log("Register success " + result);

            $scope.registerDisabled=true;
            // ** NOTE: Android regid result comes back in the pushNotificationReceived, only iOS returned here
            if (ionic.Platform.isIOS()) {
                $scope.regId = result;
                storeDeviceToken("ios");
            }
        }, function (err) {
            console.log("Register error " + err)
        });
    }

    // Notification Received
    $scope.$on('$cordovaPush:notificationReceived', function (event,notification) {
       // alert(JSON.stringify([notification]));
        console.log(JSON.stringify([notification]));
        if (ionic.Platform.isAndroid()) {
            handleAndroid(notification);
        }
        else if (ionic.Platform.isIOS()) {
            handleIOS(notification);
            $scope.$apply(function () {
                $scope.notifications.push(JSON.stringify(notification.alert));
            })
        }
    });

    // Android Notification Received Handler
    function handleAndroid(notification) {
        // ** NOTE: ** You could add code for when app is in foreground or not, or coming from coldstart here too
        //             via the console fields as shown.
        console.log("In foreground " + notification.foreground  + " Coldstart " + notification.coldstart);
        if (notification.event == "registered") {
            localStorage.setItem("pushtoken",notification.regid);
            PushData.insertartoken(-1,notification.regid);
            //alert(JSON.stringify(notification));
            //$scope.regId = notification.regid;
            //storeDeviceToken("android");
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
       
        //else if (notification.event == "message") {
            //$cordovaDialogs.alert(notification.message, "Push Notification Received");
          //  $scope.$apply(function () {
            //    $scope.notifications.push(JSON.stringify(notification.message));
            //})
        //}
        //else if (notification.event == "error")
            //$cordovaDialogs.alert(notification.msg, "Push notification error event");
        //else $cordovaDialogs.alert(notification.event, "Push notification handler - Unprocessed Event");
    }

    // IOS Notification Received Handler
    function handleIOS(notification) {
        // The app was already open but we'll still show the alert and sound the tone received this way. If you didn't check
        // for foreground here it would make a sound twice, once when received in background and upon opening it from clicking
        // the notification when this code runs (weird).
        if (notification.foreground == "1") {
            // Play custom audio if a sound specified.
            //if (notification.sound) {
              //  var mediaSrc = $cordovaMedia.newMedia(notification.sound);
              //  mediaSrc.promise.then($cordovaMedia.play(mediaSrc.media));
            //}

            if (notification.body && notification.messageFrom) {
               // $cordovaDialogs.alert(notification.body, notification.messageFrom);
            }
            else $cordovaDialogs.alert(notification.alert, "Push Notification Received");

            if (notification.badge) {
                $cordovaPush.setBadgeNumber(notification.badge).then(function (result) {
                    console.log("Set badge success " + result)
                }, function (err) {
                    console.log("Set badge error " + err)
                });
            }
        }
        // Otherwise it was received in the background and reopened from the push notification. Badge is automatically cleared
        // in this case. You probably wouldn't be displaying anything at this point, this is here to show that you can process
        // the data in this situation.
        else {
            //if (notification.body && notification.messageFrom) {
              //  $cordovaDialogs.alert(notification.body, "(RECEIVED WHEN APP IN BACKGROUND) " + notification.messageFrom);
            //}
            //else $cordovaDialogs.alert(notification.alert, "(RECEIVED WHEN APP IN BACKGROUND) Push Notification Received");
        }
    }




});
