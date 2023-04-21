angular.module('webshop').controller('productDetailsController', productDetails);

productDetails.$inject = ['$http', '$stateParams', 'CartService'];

function productDetails($http, $stateParams, CartService) {
	var vm = this;
	vm.addToCart = addtoCart;
	vm.initCart = function () {
		vm.cart = CartService.getCartData();
	};

	$http({
		url: 'http://localhost:3000/products',
		params: { id: $stateParams.id },
		method: 'get'
	}).then(function (response) {
		vm.product = response.data[0];
	});

	function addtoCart(product) {
        CartService.addtoCart(product).then(function(response) {
			alert("Product added.")
        });
    };

	vm.initCart(); //immediatly after function add to cart, for latest data
}
