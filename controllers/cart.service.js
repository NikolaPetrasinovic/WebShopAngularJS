angular.module('webshop').factory('CartService', CartService);

CartService.$inject = ['$http', '$timeout', '$q'];

function CartService($http, $timeout, $q) {
	var vm = this;
	var cartData = [];

	var service = {
		getProducts: getProducts,
		getCartData: getCartData,
		saveCartData: saveCartData,
		deleteProduct: deleteProduct,
		updateCart: updateCart,
		addtoCart: addtoCart,
		buyOrder: buyOrder,
		removeProduct: removeProduct
	};

	return service;

	function getProducts() {
		return $http
			.get('http://localhost:3000/products')
			.then(function (response) {
				vm.products = response.data;
				return vm.products;
			})
			.catch(function (error) {
				console.error(error);
				alert("Error retrieving products. Please try again later.");
				throw error;
			});
	}

	function getCartData() {
		return $http
			.get('http://localhost:3000/cart')
			.then(function (response) {
				cartData = response.data;
				return cartData;
			})
			.catch(function (error) {
				console.error(error);
				alert("Error retrieving cart data. Please try again later.");
				throw error;
			});
	}

	function saveCartData(cartData) {
		try {
			if (!cartData) throw 'Cart data not found.';
			return $http.post('http://localhost:3000/cart', cartData).then(function (response) {
				cartData = response.data;
			});
		} catch (error) {
			console.error(error);
		}
	}
	function deleteProduct(id) {
		return $http
			.delete('http://localhost:3000/cart/' + id)
			.then(function (deleteResponse) {
				console.log('Product deleted.');
			})
			.catch(function (error) {
				console.error('Error deleting product:', error);
				throw error;
			});
	}

	function updateCart(product) {
		return $http.put('http://localhost:3000/cart/' + product.id, product).catch(function (error) {
			console.error('Error updating cart:', error);
			throw error;
		});
	}

	function addtoCart(product) {
		return new Promise(function (resolve, reject) {
			if (!Array.isArray(cartData)) {
				cartData = [];
			}
			var existingProduct = cartData.findIndex(function (item) {
				return item.productID === product.id;
			});
			if (existingProduct === -1) {
				var newObject = {
					productID: product.id,
					name: product.name,
					price: product.price,
					quantity: product.quantity,
					imageURL: product.image
				};
				var t;
				$http
					.post('http://localhost:3000/cart', newObject)
					.then(function (response) {
						t = response.data.id;
						t = {
							productID: product.id,
							name: product.name,
							price: product.price,
							quantity: product.quantity,
							imageURL: product.image,
							id: t
						};
						cartData.push(t);
						resolve(cartData);
					})
					.catch(function (error) {
						console.error('Error adding product to cart:', error);
						reject(error);
					});
			} else {
				cartData[existingProduct].quantity++;
				updateCart(cartData[existingProduct]);
				resolve(cartData);
			}
		});
	}

	function removeProduct(product, cartData) {
		$http;
		deleteProduct(product.id)
			.then(function (response) {
				var index = cartData.findIndex(function (item) {
					return item.id === product.id;
				});
				cartData.splice(index, 1);
				console.log('Successfully deleted item with id:', product.id);
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	
	function buyOrder() {
		if (cartData.length === 0) {
			return $q.reject('Cannot buy an empty cart.');
		}
		for (let i = cartData.length - 1; i >= 0; i--) {
			$timeout(function () {
				$http
					.delete('http://localhost:3000/cart/' + cartData[i].id)
					.then(function (response) {})
					.catch(function (error) {
						console.log(error);
					});
			}, 500 * i);
		}
		$timeout(function () {
			cartData = [];
		}, 500 * cartData.length + 500);

		// return the promise to be resolved in homeController
		return $timeout(function () {
			return true;
		}, 500 * cartData.length + 500);
	}
}
