angular.module('webshop').factory('CartService', CartService);

CartService.$inject = ['$http'];

function CartService($http) {
	var vm = this;
	var cartData = [];

	function getProducts() {
		return $http.get('http://localhost:3000/products').then(function (response) { 
			vm.products = response.data;
			return vm.products;
		})
		.catch(function(error) {
			console.error(error);
			throw error;
		});
	}
	

	function getCartData() {
		return $http.get('http://localhost:3000/cart').then(function (response) {
			cartData = response.data;
			return cartData;
		})
		.catch(function(error) {
            console.error(error);
            throw error;
        });
	}

	function saveCartData(cart) {
		try {
			if (!cart) throw 'Cart data not found.';
			return $http.post('http://localhost:3000/cart', cart).then(function (response) {
				cartData = response.data;
			});
		} catch (error) {
			console.error(error);
		}
	}
	function deleteProduct(id) {
		return $http.delete('http://localhost:3000/cart/' + id).then(function (deleteResponse) {
			console.log('Product deleted.');
		});
	}

	function updateCart(product) {
		return $http.put('http://localhost:3000/cart/' + product.id, product);
	}
	return {
		getProducts: getProducts,
		getCartData: getCartData,
		saveCartData: saveCartData,
		deleteProduct: deleteProduct,
		updateCart: updateCart
	};
}
