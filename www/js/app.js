// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('arcaConductor', ['ionic', 'arcaConductor.controllers','arcaConductor.data','angular-md5','ionic-datepicker','ionic-timepicker','ngCordova'])

.run(function($ionicPlatform) {

})

.factory(("ionPlatform"), function( $q ){
    var ready = $q.defer();

    ionic.Platform.ready(function( device ){
        ready.resolve( device );
    });

    return {
        ready: ready.promise
    }
})


//http interceptors for show loading
.config(function($httpProvider) {
  $httpProvider.interceptors.push(function($rootScope) {
    return {
      request: function(config) {
        $rootScope.$broadcast('loading:show')
        return config
      },
      response: function(response) {
        $rootScope.$broadcast('loading:hide')
        return response
      }
    }
  })
})

.run(function($rootScope, $ionicLoading) {
  $rootScope.$on('loading:show', function() {
    $ionicLoading.show({template: 'Cargando...'})
  })

  $rootScope.$on('loading:hide', function() {
    $ionicLoading.hide()
  })
})

//end of http interceptors for show loading



.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
     
    // $ionicConfigProvider
    // http://ionicframework.com/docs/api/provider/%24ionicConfigProvider/
    $ionicConfigProvider.tabs.position('bottom');

    
    $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    }) 

    .state('nomenu', {
    url: "/nomenu",
    abstract: true,
    templateUrl: "templates/nomenu.html"
  	})    

    .state('nomenu.login', {    
      url: "/login",      
       data: {
          requireLogin: false
        },
      views: {
        'login': {
          templateUrl: "templates/login.html",
          controller: 'LoginCtrl'
        }
      }
    })

    .state('app.home', {
      cache: false,
      url: "/inicio",
      data: {
        requireLogin: false
      },
      views: {
        'menuContent' :{
          templateUrl: "templates/inicio.html",
          controller: 'InicioCtrl'
        }
      }
    })
  .state('app.crearCompromiso', {
      url: "/crearCompromiso",
      data: {
        requireLogin: false
      },
      views: {
        'menuContent' :{
          templateUrl: "templates/crearCompromiso.html",
          controller: 'CrearCompromisoCtrl'
        }
      }
    })
    .state('app.compromiso', {
      url: "/compromiso/:idCompromiso",
      data: {
        requireLogin: false
      },
      views: {
        'menuContent' :{
          templateUrl: "templates/compromiso.html",
          controller: 'CompromisoCtrl'
        }
      }
    })
  
  .state('app.cancelados', {
      cache: false,
      url: "/cancelados",
      data: {
        requireLogin: false
      },
      views: {
        'menuContent' :{
          templateUrl: "templates/cancelados.html",
          controller: 'CanceladosCtrl'
          
        }
      }
    })

  .state('app.solicitudes', {
    cache: false,
    url: "/solicitudes",
    data: {
        requireLogin: false
      },
    views: {
      'menuContent': {
        templateUrl: "templates/solicitudes.html",
        controller: 'SolicitudesCtrl'
      }
    }
  })
  .state('app.reservartiempo', {
      url: "/reservartiempo",
      data: {
        requireLogin: false
      },
      views: {
        'menuContent': {
          templateUrl: "templates/reservartiempo.html",
          controller: 'reservartiempoCtrl'
        }
      }
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
});

/**var androidConfig = {
    "senderID": "248891352186",
  };

  document.addEventListener("deviceready", function(){
    $cordovaPush.register(androidConfig).then(function(result) {
      alert(JSON.stringify(result));
    }, function(err) {
      // Error
    })

    $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
      switch(notification.event) {
        case 'registered':
          if (notification.regid.length > 0 ) {
            alert('registration ID = ' + notification.regid);

          }
          break;

        case 'message':
          // this is the actual push notification. its format depends on the data model from the push server
          alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
          break;

        case 'error':
          alert('GCM error = ' + notification.msg);
          break;

        default:
          alert('An unknown GCM event has occurred');
          break;
      }
    });


    // WARNING: dangerous to unregister (results in loss of tokenID)
    $cordovaPush.unregister(options).then(function(result) {
      // Success!
    }, function(err) {
      // Error
    })

  }, false);
**/
