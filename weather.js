/**
 * Created by lakshmi on 9/27/15.
 */
angular.module('weatherApp',['ngRoute', 'ngResource'])
.config(function($routeProvider){
        $routeProvider

            .when('/',{
                templateUrl:'partials/home.html',
                controller:'myHome'
            })

            .when('/forecast',{
                templateUrl:'partials/forecast.html',
                controller:'myForecast'
            })

            .when('/forecast:days',{
                templateUrl:'partials/forecast.html',
                controller:'myForecast'
            })
    })
    .service('cityService', function(){
        this.city = "New York,NY";
    })
.controller('myHome', ['$scope','cityService', function($scope, cityService){
            $scope.city = cityService.city;
            console.log($scope.city);
            $scope.$watch('city', function(){
            cityService.city = $scope.city;
            })
    }])

.controller('myForecast',['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) {

        $scope.city = cityService.city;

        $scope.days = $routeParams.days || '2';

        console.log($scope.days);

        $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" },
            { get: { method: "JSONP" },  headers: {
                'x-api-key': '9bf8e187224d70d2f3e00257b359d7d8'
            }});

        $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });
        console.log($scope.weatherResult);



            $scope.convertToFarenheight = function(degK){
            return Math.round((1.8 * (degK - 273)) + 32);

            }

            $scope.convertDate = function(date){
            return new Date(date *1000);
            }

    }])
    .directive('panel', function(){
        return{
           restrict:"E",
            templateUrl: 'directives/panel.html',
            scope:{
                weatherDay : "=",
                dateFormat : "@",
                convertDate: "&",
                convertToStd: "&"
            }
        }
    })