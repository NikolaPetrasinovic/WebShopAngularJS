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

.controller("shopping", function($scope,$http){
		 	$scope.cart=[];
			$http.get("http://localhost:3000/products")
                .then(function(response){
                  $scope.products = response.data;
                });
		

		$scope.addtoCart = function(product){
				$scope.cart.push(product);
		}

		$scope.total = 0;
    	$scope.countTotals = function(cart){
        if(cart){
            $scope.total += cart.p_price;
        }
    }

	$scope.remove_cart = function(cart){
        if(cart){
            $scope.carts.splice($scope.carts.indexOf(cart), 1);
            $scope.total -= cart.p_price;
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

