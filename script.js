var app = angular.module("shoppingcart", [])
		.controller("shoppingCTR", function($scope){
			$scope.carts=[];
			$scope.products = [
				{p_id : "1", p_name: "Nike AirMax 270", p_image: "img/1.jpg", p_price: 500},
				{p_id : "2", p_name: "Backpack", p_image: "img/2.jpg", p_price: 500},
				{p_id : "3", p_name: "Galaxy Fold Z", p_image: "img/3.jpg", p_price: 500},
			];
		

		$scope.add_cart = function(product){
			if(product){
				$scope.carts.push({p_id: product.p_id, p_name: product.p_name, p_price: product.p_price});
			}
		}

	})