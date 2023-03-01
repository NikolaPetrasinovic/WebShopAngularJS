var app = angular
            .module("Demo", ["ngRoute"])
            .config(function ($routeProvider) {
                $routeProvider
                    .when("/home", {
                        templateUrl: "./templates/home.html",
                        controller: "homeController"
                    })
                    .when("/courses", {
                        templateUrl: "./templates/courses.html",
                        controller: "coursesController"
                    })
                    .when("/students", {
                        templateUrl: "./templates/students.html",
                        controller: "studentsController"
                    })
            })
            .controller("homeController", function ($scope) {
                $scope.message = "Home Page";
            })
            .controller("coursesController", function ($scope) {
                $scope.courses = ["C#", "VB.NET", "ASP.NET", "SQL Server", "AngularJS", "JavaScript"];
            })
             .controller("studentsController", function ($scope, $http) {
                 $http.get("http://localhost:3000/Students")
                                        .then(function (response) {
                                            $scope.students = response.data;
                                        })
             })
