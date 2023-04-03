angular.module('webshop').controller('homeController', homeController);

homeController.$inject = ['$http', 'CartService', '$timeout'];

function homeController($http, CartService, $timeout) {
	var vm = this;
	vm.searchTerm = ''; // searchTerm for searching products
	vm.cartIsOpen = false;
	vm.toggleCart = toggleCart;
	vm.addtoCart = addtoCart;
	vm.cartTotal = cartTotal;
	vm.removeProduct = removeProduct;
	vm.buyOrder = buyOrder;
	vm.filterProducts = filterProducts;

	function toggleCart() {
		vm.cartIsOpen = !vm.cartIsOpen;
	}

	CartService.getCartData().then(function (cart) {
		vm.cart = cart;
	});

	$http.get('http://localhost:3000/products').then(function (response) {
		vm.products = response.data;
		console.log(vm.products);
	});

	function addtoCart(product) {
		try {
			if (!product) throw 'Please select a product.';
			var existingProduct = vm.cart.find(function (item) {
				return item.id === product.id;
			});
			if (existingProduct) {
				existingProduct.quantity++;
				CartService.updateCart(existingProduct);
			} else {
				product.quantity = 1;
				CartService.saveCartData(product)
					.then(function () {
						vm.cart.push(product);
					})
					.catch(function () {
						console.log('Error');
					});
			}
		} catch (error) {
			console.error(error);
		}
	}

	function cartTotal() {
		var totalPrice = 0;
		angular.forEach(vm.cart, function (product) {
			totalPrice += product.price * product.quantity;
		});
		return totalPrice;
	}

	function removeProduct(cart) {
		try {
			if (!cart) throw 'Product not found.';
			CartService.deleteProduct(cart.id).then(function () {
				vm.cart = vm.cart.filter(function (c) {
					return c.id !== cart.id;
				});
			});
			console.log(cart);
		} catch (error) {
			console.error(error);
		}
	}

	function buyOrder() {
		
			var orderProducts = [];

			angular.forEach(vm.cart, function (product) {
				orderProducts.push({
					id: product.id,
					name: product.name,
					price: product.price,
					quantity: product.quantity
				});
			});

			var order = {
				products: orderProducts,
				total: vm.cartTotal()
			};
			// $http.post("http://localhost:3000/orders", order).then(function (response) {
     		// 	 alert("Order successful!");
    		// });
			for (let i = vm.cart.length - 1; i >= 0; i--) {
				$timeout(function () {
					$http
						.delete('http://localhost:3000/cart/' + vm.cart[i].id)
						.then(function (response) {})
						.catch(function (error) {
							console.log(error);
						});
				}, 500 * i);
			}
			$timeout(function () {
				vm.cart = [];
			}, 500 * vm.cart.length + 500);
		}

	function filterProducts(product) {
		return vm.searchTerm == '' || product.name.toLowerCase().indexOf(vm.searchTerm.toLowerCase()) !== -1;
	}
}