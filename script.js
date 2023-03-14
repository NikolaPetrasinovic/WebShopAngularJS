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

		vm.total = 0;
    	vm.countTotals = function(cart){
        if(cart){
            vm.total += cart.p_price;
        }
    }

	vm.remove_cart = function(cart){
        if(cart){
            vm.carts.splice(vm.carts.indexOf(cart), 1);
            vm.total -= cart.p_price;
        }
    }
		
	})

	// .controller("productDetailsController", function($scope, $routeParams){
	// 	var productId = $routeParams.id;
	// 	angular.forEach($scope.products, function(product) {
	// 		if (product.id === productId) {
	// 		  $scope.selectedProduct = product;
	// 		}
	// 	})
	// })

