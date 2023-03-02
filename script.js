var app = angular.module("Demo", ["ngRoute"])
                 .config(function($routeProvider, $locationProvider){
                    $routeProvider
                        .when("/home", {
                            templateUrl:"./templates/home.html",
                            controller:"homeController as homeCtrl"
                        })
                        .when("/courses", {
                            templateUrl:"./templates/courses.html",
                            controller:"coursesController as coursesCtrl"
                        })
                        .when("/students", {
                            templateUrl:"./templates/students.html",
                            controller:"studentsController as studentsCtrl"
                        })
                        .when("/students/:id", {
                            templateUrl:"./templates/studentDetails.html",
                            controller:"studentDetailsController as studentDetailsCtrl" 
                        })
                        .otherwise({
                            redirectTo: "/home"
                        })
                    $locationProvider.html5Mode(true);
                 })
                 .controller("homeController", function(){
                    this.message = "Home Page";
                 })
                 .controller("studentsController", function($http){
                    this.message = "Students Page";
                    var vm = this;
                    $http.get('http://localhost:3000/Students')
                         .then(function (response){
                            vm.students = response.data;
                         })
                 })
                 .controller("coursesController", function($http){
                    this.message = ["C#", "SQL", "PHP", "C++"];
                    var vm = this;
                    $http.get('http://localhost:3000/courses')
                         .then(function (response){
                            vm.courses = response.data
                         })
                 })
                 .controller("studentDetailsController", function($http, $routeParams){
                    var vm = this;
                    vm.students = [];
                    $http({
                        url:"http://localhost:3000/Students",
                        params:{id:$routeParams.id},
                        method:"get"
                    })
                    .then(function(response){
                        
                        vm.students = response.data
                    })
                 })
