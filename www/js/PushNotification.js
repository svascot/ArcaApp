(function(cordova) {

    function PushNotification() {}

    // Call this to register for push notifications and retreive a deviceToken
    PushNotification.prototype.registerDevice = function(config, success, fail) {
        cordova.exec(success, fail, "PushNotification", "registerDevice", config ? [config] : []);
    };

    // Call this to set tags for the device
    PushNotification.prototype.setTags = function(config, success, fail) {
        cordova.exec(success, fail, "PushNotification", "setTags", config ? [config] : []);
    };

    //Android Only----
    PushNotification.prototype.unregisterDevice = function(success, fail) {
        cordova.exec(success, fail, "PushNotification", "unregisterDevice", []);
    };

    PushNotification.prototype.startGeoPushes = function(success, fail) {
        cordova.exec(success, fail, "PushNotification", "startGeoPushes", []);
    };

    PushNotification.prototype.stopGeoPushes = function(success, fail) {
        cordova.exec(success, fail, "PushNotification", "stopGeoPushes", []);
    };

    //Android End----

    //iOS only----
    // Call this to send geo location for the device
    PushNotification.prototype.sendLocation = function(config, success, fail) {
        cordova.exec(success, fail, "PushNotification", "sendLocation", config ? [config] : []);
    };

    PushNotification.prototype.onDeviceReady = function() {
        cordova.exec(null, null, "PushNotification", "onDeviceReady", []);
    };

    // Call this to get a detailed status of remoteNotifications
    PushNotification.prototype.getRemoteNotificationStatus = function(callback) {
        cordova.exec(callback, callback, "PushNotification", "getRemoteNotificationStatus", []);
    };

    // Call this to set the application icon badge
    PushNotification.prototype.setApplicationIconBadgeNumber = function(badge, callback) {
        cordova.exec(callback, callback, "PushNotification", "setApplicationIconBadgeNumber", [{badge: badge}]);
    };

    // Call this to clear all notifications from the notification center
    PushNotification.prototype.cancelAllLocalNotifications = function(callback) {
        cordova.exec(callback, callback, "PushNotification", "cancelAllLocalNotifications", []);
    };
    //iOS End----

    // Event spawned when a notification is received while the application is active
    PushNotification.prototype.notificationCallback = function(notification) {
        var ev = document.createEvent('HTMLEvents');
        ev.notification = notification;
        ev.initEvent('push-notification', true, true, arguments);
        document.dispatchEvent(ev);
    };

    /* cordova.addConstructor(function() {
        if(!window.plugins) window.plugins = {};
        window.plugins.pushNotification = new PushNotification();
    }); */

    window.pushNotification = new PushNotification();

})(window.cordova || window.Cordova || window.PhoneGap);

function initPushwoosh()
{

    var pushNotification = window.pushNotification;
    pushNotification.onDeviceReady();

    pushNotification.registerDevice({alert:true, badge:true, sound:true, pw_appid:"17009-69D5F", appname:"Snow Day"},
                                    function(status) {
                                        var deviceToken = status['deviceToken'];
                                        console.warn('registerDevice: ' + deviceToken);
                                    },
                                    function(status) {
                                        console.warn('failed to register : ' + JSON.stringify(status));
                                        navigator.notification.alert(JSON.stringify(['failed to register ', status]));
                                    });

    pushNotification.setApplicationIconBadgeNumber(0);

    document.addEventListener('push-notification', function(event) {
                                    var notification = event.notification;
                                    navigator.notification.alert(notification.aps.alert);
                                    pushNotification.setApplicationIconBadgeNumber(0);
                              });
}