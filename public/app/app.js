var myApp = angular.module('app', ['ngResource', 'ngRoute']);

myApp.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enable: true,
        requireBase: false
    });
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main',
            controller: 'mainCtrl'
        });

});

myApp.controller('mainCtrl', function($scope) {
    $scope.myVar = "Hello World";
});
