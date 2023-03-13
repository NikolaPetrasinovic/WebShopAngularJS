var app = angular.module("shoppingcart", ["ui.router"])
	.config(function($stateProvider) {
	$stateProvider
		.state("ProductDetails", {
			url: "/productDetails",
			templateUrl: "./templates/productDetails.html",
			controller: "productDetailsController",
			controllerAs: "productDetailsCtrl"
		})	
		
	})

.controller("shoppingCTR", function($scope){
			$scope.carts=[];
			$scope.products = [
				{p_id : "1", p_name: "Nike AirMax 270", p_image: "img/1.jpg", p_price: 150},
				{p_id : "2", p_name: "Backpack", p_image: "img/2.jpg", p_price: 100},
				{p_id : "3", p_name: "Galaxy Fold Z", p_image: "img/3.jpg", p_price: 900},
			];
		

		$scope.add_cart = function(product){
			if(product){
				$scope.carts.push({p_id: product.p_id, p_name: product.p_name, p_price: product.p_price});
			}
		}

		$scope.total = 0;
    	$scope.setTotals = function(cart){
        if(cart){
            $scope.total += cart.p_price;
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

