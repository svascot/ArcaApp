angular.module('arcaConductor.data', [])




.factory('CompromisosAceptadosData', function($http, $q) {
    var placa = localStorage.getItem("ArcaConductorCarro");
    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};
    var json = 'http://www.mvvtech.com/arca/controller/tarea.php?op=40&placa='+placa;
    console.log(json);
     service.async = function() {
    return $http({method: 'GET', url: json, timeout: 5000}).
     success(function(d) {  
        if(d){   
        data = d.listDep;
        deferred.resolve(d); 
        }
        else
        {
            deferred.reject(d);
        }   	
    	
    }).
    error(function(d) {
        deferred.reject(d);
    });
        
    
        
    };
    
    service.getAll = function() { return data; };

    service.get = function(id) { 
    	for (var i = data.length - 1; i >= 0; i--) {
    		if(data[i].id == id){
    			return data[i];
    		}
    	};
    };

    return service;
})
.factory('PushData', function($http, $q) {
    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};


    service.actualizartokenservice=function(usuario){  
      var q = $q.defer(); 
      $http.get('http://www.mvvtech.com/arca/controller/tarea.php?op=61&usuario='+usuario+'&token='+localStorage.getItem("pushtoken")+'&uuid='+localStorage.getItem("uuid")+'&app='+'1').success(function(data){
        q.resolve(data);
      });
      return q.promise;
    };
    service.actualizartoken = function(usuario){
      service.temporal = service.actualizartokenservice(usuario);
      service.temporal.then(function(val){
      });
    };
    service.actualizartoken2service=function(usuario){  
      var q = $q.defer(); 
      $http.get('http://www.mvvtech.com/arca/controller/tarea.php?op=59&usuario='+usuario+'&token='+localStorage.getItem("pushtoken")+'&uuid='+localStorage.getItem("uuid")+'&app='+'1').success(function(data){
        q.resolve(data);
      });
      return q.promise;
    };
    service.actualizartoken2 = function(usuario){
      service.temporal = service.actualizartoken2service(usuario);
      service.temporal.then(function(val){
      });
    };
    service.insertartokenservice=function(usuario,token){  
      var q = $q.defer(); 
      console.log('http://www.mvvtech.com/arca/controller/tarea.php?op=57&usuario='+usuario+'&token='+token+'&platform='+localStorage.getItem("arcaconductor_platform")+'&app='+'1'+'&uuid='+localStorage.getItem("uuid"));
      $http.get('http://www.mvvtech.com/arca/controller/tarea.php?op=57&usuario='+usuario+'&token='+token+'&platform='+localStorage.getItem("arcaconductor_platform")+'&app='+'1'+'&uuid='+localStorage.getItem("uuid")).success(function(data){
        q.resolve(data);
      }).
        error(function(data) {
            service.actualizartoken(-1);
            q.resolve(data);
        });
      return q.promise;
    };
    service.insertartoken = function(usuario,token){
      service.temporal = service.insertartokenservice(usuario,token);
      service.temporal.then(function(val){
        if(val=='ok'){
            //alert("popo");
        }else{
            service.actualizartoken2(usuario,token);
        }
      });
    };
    service.tokenbienvenidaservice=function(){  
      var q = $q.defer(); 
      console.log('http://www.mvvtech.com/arcapush/controller/welcomepush.php&token='+localStorage.getItem("pushtoken"));
      $http.get('http://www.mvvtech.com/arcapush/controller/welcomepush.php&token='+localStorage.getItem("pushtoken")).success(function(data){
        q.resolve(data);
      });
      return q.promise;
    };
    service.tokenbienvenida = function(){
      service.temporal = service.tokenbienvenidaservice();
      service.temporal.then(function(val){
        localStorage.setItem("ft",1);
      });
    };

    return service;
})




.factory('CompromisoData', function($http, $q) {

    var placa = localStorage.getItem("ArcaConductorCarro");
    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};
   
    function formatJson(inicio,fin,comentarios){
        console.log('http://mvvtech.com/arca/controller/tarea.php?op=47&usuario='+localStorage.getItem("ArcaConductorCc")+'&placa='+placa+'&comentarios='+comentarios+'&inicio='+inicio+'&fin='+fin);
        return ('http://mvvtech.com/arca/controller/tarea.php?op=47&usuario='+localStorage.getItem("ArcaConductorCc")+'&placa='+placa+'&comentarios='+comentarios+'&inicio='+inicio+'&fin='+fin);
    }
    service.async = function(inicio,fin,comentarios) {
         json = formatJson(inicio,fin,comentarios);
        $http({method: 'GET', url: json, timeout: 5000}).
         success(function(d) {
            if(d){   
        data = d.listDep;
        deferred.resolve(d); 
        }
        else
        {
            deferred.reject(d);
        }       
        }).
        error(function(d) {
            deferred.reject(d);
        });
            
        return promise;
        
    };
    
    service.getAll = function() { return data; };

    service.get = function(id) { 
    
     };
     service.reservarRecurrentemente= function(data){

        var q = $q.defer();
        var query=('http://www.mvvtech.com/arca/controller/tarea.php?op=50&fechaInicio='+data.fechaInicio+'&fechaFin='+data.fechaFin+'&horaInicio='+data.horaInicio+'&horaFin='+data.horaFin+'&tiempo='+data.tiempo+'&trabajaFestivos='+data.festivos+'&expresionDias='+data.dias+'&carro='+localStorage.getItem("ArcaConductorCarro"));
        console.log(query);       
        $http.get(query)
        .success(function(data){
            q.resolve(data);
        });
        return q.promise;
    };




    return service;
})

.factory('CanceladosData', function($http, $q) {

    var placa = localStorage.getItem("ArcaConductorCarro");
    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};
    var json = 'http://www.mvvtech.com/arca/controller/tarea.php?op=41&placa='+placa;

    service.async = function() {
        $http({method: 'GET', url: json, timeout: 5000}).
         success(function(d) {
            if(d){   
        data = d.listDep;
        deferred.resolve(d); 
        }
        else
        {
            deferred.reject(d);
        }       
        }).
        error(function() {
            deferred.reject(d);
        });
            
        return promise;
        
    };
    
    service.getAll = function() { return data; };

    service.get = function(id) { return data[id]; };

    return service;
})
.factory('LoginData', function($http, $q,md5) {

   
    var service = {};


    service.async = function(correo,password) {

        var q = $q.defer();
        password = md5.createHash(password || '');
        $http.get('http://mvvtech.com/arca/controller/tarea.php?op=35&correo='+correo+'&password='
        +password).success(function(data){
            q.resolve(data.listDep);
        });
        return q.promise;

    };
    
    

    return service;
})
.factory('SolicitudesData', function($http, $q) {
    var placa = localStorage.getItem("ArcaConductorCarro");
    var q = $q.defer();
    var data = [];
    var service = {};
    var json = 'http://www.mvvtech.com/arca/controller/tarea.php?op=42&placa='+placa;

    service.async = function() {
       return $http.get(json).success(function(d) {          
            data = d;
            q.resolve(d); 
             
        }).error(function() {
            q.reject(d);
        });
            
         
        
    };
    
    service.getAll = function() {        
        return data;         
    };
    service.remove = function(viaje){
         for (var i = data.listDep.length - 1; i >= 0; i--) {
            if(data.listDep[i].id== viaje.id){
                data.listDep.pop(viaje);
                return;
            }
        };
    }
    service.get = function(id) { 
        for (var i = data.listDep.length - 1; i >= 0; i--) {
            if(data.listDep[i].id== id){
                return data.listDep[i]; 
                
            }
        };
        
    };

    service.aceptarSolicitudService = function(viaje){

        var q = $q.defer();
        console.log('http://www.mvvtech.com/arca/controller/tarea.php?op=43&viaje='+viaje+'&estado=0');
        $http.get('http://www.mvvtech.com/arca/controller/tarea.php?op=43&viaje='+viaje+'&estado=0')
        .success(function(data){
            q.resolve(data);
        });
        return q.promise;
    };

    service.cancelarSolicitudService = function(viaje){

        var q = $q.defer();

        $http.get('http://www.mvvtech.com/arca/controller/tarea.php?op=43&viaje='+viaje+'&estado=1').success(function(data){
            q.resolve(data);
        });
        return q.promise;
    };

    return service;

})