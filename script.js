var app = angular.module("webshop", ["ui.router"])
	.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise("/home");
	$stateProvider
	.state("home", {
		url: "/home",
		templateUrl:"./templates/home.html",
		controller:"homeController",
		controllerAs: "homeCtrl"

	})	
	.state("ProductDetails", {
			url: "/productDetails",
			templateUrl: "./templates/productDetails.html",
			controller: "productDetailsController",
			controllerAs: "productDetailsCtrl"
		})	
		$locationProvider.html5Mode(true);
	})

.controller("homeController", function($http){
		 	this.cart=[];
			var vm = this
			$http.get("http://localhost:3000/products")
                .then(function(response){
                  vm.products = response.data;
                });
		

		vm.addtoCart = function(product){
				vm.cart.push(product);
		}

		vm.cartTotal = function() {
			var totalPrice = 0;
			angular.forEach(vm.cart, function(product) {
				totalPrice += product.price * product.quantity;
			});
			return totalPrice;
		};

	vm.removeProduct = function(product) {
		var index = vm.cart.indexOf(product);
		vm.cart.splice(index, 1);

	  };
		
	})

	// .controller("productDetailsController", function($routeParams){
	// 	var vm = this;
	// 	var productId = $routeParams.id;
	// 	angular.forEach(vm.products, function(product) {
	// 		if (product.id === productId) {
	// 		  vm.selectedProduct = product;
	// 		}
	// 	})
	// })
	.controller("productDetailsController", function($http, $stateParams){
		var vm = this;
		
		$http({
			url:"http://localhost:3000/products",
			params:{id:$stateParams.id},
			method:"get"
		})
		.then(function(response){
			
			vm.product = response.data[0]
			console.log(response)
		})
	 })
