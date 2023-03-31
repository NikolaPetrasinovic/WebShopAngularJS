angular.module('webshop').controller('productDetailsController', productDetails);

// productDetails.$inject = ['$http', '$stateParams', 'CartService'];

function productDetails($http, $stateParams, CartService) {
	var vm = this;
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

	vm.addToCart = function (product) {
		if (!Array.isArray(vm.cart)) {
			vm.cart = [];
		}
		var existingProduct = vm.cart.find(function (item) {
			return item.id === product.id;
		});
		if (existingProduct) {
			existingProduct.quantity++;
			CartService.updateCart(existingProduct)
		} else {
			product.quantity = 1;
			CartService.saveCartData(product).then(function(){
				vm.cart.push(product)
			})		
		}

	
		alert('Product successfuly added.');
	};

	vm.initCart(); //immediatly after function add to cart, for latest data
}
