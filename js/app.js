var App = angular.module("App", ["ionic"]);

App.config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

App.service("PlanetApp", ["$http", "$log", PlanetApp]);

App.controller("AppCtrl", ["$scope", "PlanetApp", "$log", AppCtrl]);

function AppCtrl($scope, PlanetApp, $log) {
    $scope.posts = [];
    $scope.getInfo = function() {        
        PlanetApp.getBlogs($scope);
    }
}

function PlanetApp($http, $log) {
    this.getBlogs = function($scope) {
        $http.jsonp("http://suckup.de/planet-ubuntuusers-json/json.php?callback=JSON_CALLBACK")
            .success(function(result) {
                $scope.posts = result.posts;  
                $scope.$broadcast("scroll.refreshComplete");
            });
    };
}

