angular.module('webshop').controller('homeController', homeController);

homeController.$inject = ['$http', 'CartService'];

function homeController($http, CartService) {
	var vm = this;
	vm.searchTerm = ''; // searchTerm for searching products
	vm.cartIsOpen = false;
	vm.toggleCart = toggleCart;
	vm.addtoCart = addtoCart;
	vm.cartTotal = cartTotal;
	vm.cartTotalQuantity = cartTotalQuantity;
	vm.removeProduct = removeProduct;
	vm.buyOrder = buyOrder;
	vm.filterProducts = filterProducts;
	vm.clearCart = false;

	function toggleCart() {
		vm.cartIsOpen = !vm.cartIsOpen;
	}

	CartService.getCartData().then(function (cart) {
		vm.cart = cart;
	});

	CartService.getProducts().then(function (products) {
		vm.products = products;
	});
	function addtoCart(product) {
        CartService.addtoCart(product).then(function(response) {
            console.log(response);
        });
    };

	function buyOrder() {
		CartService.buyOrder().then(function(response) {
			console.log(response);
			vm.cart = [];
		});
	}

	function cartTotal() {
		var totalPrice = 0;
		angular.forEach(vm.cart, function (product) {
			totalPrice += product.price * product.quantity;
		});
		return totalPrice;
	}

	function cartTotalQuantity() {
		var totalQuantity = 0;
		angular.forEach(vm.cart, function (product) {
			totalQuantity += product.quantity;
		});
		return totalQuantity;
	};

	// function removeProduct(cart) {
	// 	try {
	// 		if (!cart) throw 'Product not found.';
	// 		CartService.deleteProduct(cart.id).then(function () {
	// 			vm.cart = vm.cart.filter(function (c) {
	// 				return c.id !== cart.id;
	// 			});
	// 		});
	// 		console.log(cart);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// }
	function removeProduct (cart) {
        $http;
        CartService.deleteProduct(cart.id).then(function (response) {
                var index = vm.cart.findIndex(function (item) {
                    return item.id === cart.id;
                });
                vm.cart.splice(index, 1);
                console.log('Successfully deleted item with id:', cart.id);
            })
            .catch(function (error) {
                console.log(error);
                console.log(cart.id);
            });
    };

	// function buyOrder() {
	// 		vm.clearCart = true;
	// 		for (let i = vm.cart.length - 1; i >= 0; i--) {
	// 			$timeout(function () {
	// 				$http
	// 					.delete('http://localhost:3000/cart/' + vm.cart[i].id)
	// 					.then(function (response) {})
	// 					.catch(function (error) {
	// 						console.log(error);
	// 					});
	// 			}, 500 * i);
	// 		}
	// 		$timeout(function () {
	// 			vm.cart = [];
	// 			vm.clearCart = false;
	// 		}, 500 * vm.cart.length + 500);
	// 	}

		// function buyOrder() {
		// 	vm.clearCart = true;
		// 	for (let i = vm.cart.length - 1; i >= 0; i--) {
		// 		$timeout(function () {
		// 			$http
		// 				.delete('http://localhost:3000/cart/' + vm.cart[i].id)
		// 				.then(function (response) {
		// 					var index = vm.cart.findIndex(function (item) {
		// 						return item.id === vm.cart[i].id;
		// 					});
		// 					vm.cart.splice(index, 1);
		// 					console.log('Successfully deleted item with id:', vm.cart[i].id);
		// 				})
		// 				.catch(function (error) {
		// 					console.log(error);
		// 				});
		// 		}, 500 * i);
		// 	}
		// 	$timeout(function () {
		// 		vm.clearCart = false;
		// 	}, 500 * vm.cart.length + 500);
		// }

	function filterProducts(product) {
		return vm.searchTerm == '' || product.name.toLowerCase().indexOf(vm.searchTerm.toLowerCase()) !== -1;
	}
}