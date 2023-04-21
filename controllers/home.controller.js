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
	vm.updateQuantity = updateQuantity;
	vm.sortProducts = sortProducts;
	vm.clearingCart = false;

	function removeProduct(product) {
		CartService.removeProduct(product, vm.cartData);
	}
	function toggleCart() {
		vm.cartIsOpen = !vm.cartIsOpen;
	}

	CartService.getCartData().then(function (cartData) {
		vm.cartData = cartData;
	});

	CartService.getProducts().then(function (products) {
		vm.products = products;
	});
	function addtoCart(product) {
		CartService.addtoCart(product);
		alert('Product added.');
	}
	function buyOrder() {
		vm.clearingCart = true;
		CartService.buyOrder().then(function (response) {
			console.log(response);
			CartService.getCartData().then(function (cartData) {
				vm.cartData = cartData;
				vm.clearingCart = false;
			});
		});
	}

	function updateQuantity(product) {
		CartService.updateCart(product)
			.then(function (response) {
				for (var i = 0; i < vm.cartData.length; i++) {
					if (vm.cartData[i].id === product.id) {
						vm.cartData[i].quantity = product.quantity;
						break;
					}
				}
			})
			.catch(function (error) {
				console.error('Error updating cart:', error);
			});
	}

	function sortProducts() {
		var sortType = vm.sortType; // get the sort type from user input
		switch (sortType) {
			case 'alpha':
				vm.products.sort(function (a, b) {
					var nameA = a.name.toUpperCase();
					var nameB = b.name.toUpperCase();
					if (nameA < nameB) {
						return -1;
					}
					if (nameA > nameB) {
						return 1;
					}
					return 0;
				});
				break;
			case 'alphaReverse':
				vm.products.sort(function (a, b) {
					var nameA = a.name.toUpperCase();
					var nameB = b.name.toUpperCase();
					if (nameA > nameB) {
						return -1;
					}
					if (nameA < nameB) {
						return 1;
					}
					return 0;
				});
				break;
			case 'price':
				vm.products.sort(function (a, b) {
					return a.price - b.price;
				});
				break;
			case 'priceReverse':
				vm.products.sort(function (a, b) {
					return b.price - a.price;
				});
				break;
			default:
				break;
		}
	}

	function cartTotal() {
		var totalPrice = 0;
		angular.forEach(vm.cartData, function (product) {
			totalPrice += product.price * product.quantity;
		});
		return totalPrice;
	}

	function cartTotalQuantity() {
		var totalQuantity = 0;
		angular.forEach(vm.cartData, function (product) {
			totalQuantity += product.quantity;
		});
		return totalQuantity;
	}
	function filterProducts(product) {
		try {
			return vm.searchTerm == '' || product.name.toLowerCase().indexOf(vm.searchTerm.toLowerCase()) !== -1;
		} catch (error) {
			console.error('Error in filterProducts:', error);
			return false;
		}
	}
}
