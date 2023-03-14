var app = angular.module("webshop", ["ui.router"])
	.config(function($stateProvider) {
	$stateProvider
		.state("ProductDetails", {
			url: "/productDetails",
			templateUrl: "./templates/productDetails.html",
			controller: "productDetailsController",
			controllerAs: "productDetailsCtrl"
		})	

	})

.controller("shopping", function($http){
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
				totalPrice += product.price;
			});
			return totalPrice;
		};

	vm.removeProduct = function(product) {
		var index = vm.cart.indexOf(product);
		vm.cart.splice(index, 1);
		product.getTotal();
	  };
		
	})

	// .controller("productDetailsController", function($scope, $routeParams){
	// 	var productId = $routeParams.id;
	// 	angular.forEach($scope.products, function(product) {
	// 		if (product.id === productId) {
	// 		  $scope.selectedProduct = product;
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
