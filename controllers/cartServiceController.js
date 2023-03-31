angular.module('webshop').factory('CartService', CartService);

CartService.$inject = ['$http'];

function CartService($http) {
	var vm = this;
	var cartData = [];
	vm.getCartData = getCartData;
	vm.saveCartData = saveCartData;
	vm.deleteProduct = deleteProduct;
	vm.updateCart = updateCart;

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
		getCartData: getCartData,
		saveCartData: saveCartData,
		deleteProduct: deleteProduct,
		updateCart: updateCart
	};
}
