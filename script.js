var app = angular
	.module('webshop', ['ui.router'])
	.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
		try {
			if (!$stateProvider) throw 'State provider not found';
			if (!$urlRouterProvider) throw 'URL router provider not found';
			if (!$locationProvider) throw 'Location provider not found';
			$urlRouterProvider.otherwise('/home');
			$stateProvider
				.state('home', {
					url: '/home',
					templateUrl: './templates/home.html',
					controller: 'homeController',
					controllerAs: 'homeCtrl'
				})
				.state('ProductDetails', {
					url: '/productDetails/:id',
					templateUrl: './templates/productDetails.html',
					controller: 'productDetailsController',
					controllerAs: 'productDetailsCtrl'
				});
			$locationProvider.html5Mode(true);
		} catch (error) {
			console.error(error);
		}
	})

// 	.controller('homeController', homeController)
// 	.controller('productDetailsController', productDetails)
// 	.factory('CartService', CartService);

// function CartService($http) {
// 	var cartData = [];

// 	function getCartData() {
// 		return $http.get('http://localhost:3000/cart').then(function (response) {
//             cartData = response.data;
//             return cartData;
//         });
// 	} 

// 	function saveCartData(cart) {
// 		try {
// 			if (!cart) throw 'Cart data not found.';
// 			return $http.post('http://localhost:3000/cart', cart).then(function (response) {
// 				cartData = response.data;
// 			});
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	}
// 	function deleteProduct(id) {
// 		return $http.delete('http://localhost:3000/cart/' + id).then(function (deleteResponse) {
// 			console.log('Product deleted.');
// 		});
// 	}

// 	function updateCart(product){
// 		return $http.put('http://localhost:3000/cart/' +product.id, product)
	
// 	}
// 	return {
// 		getCartData: getCartData,
// 		saveCartData: saveCartData,
// 		deleteProduct: deleteProduct,
// 		updateCart: updateCart
// 	};
// }

// function homeController($http, CartService, $timeout) {
// 	var vm = this;
// 	vm.searchTerm = ''; // searchTerm for searching products
// 	vm.cartIsOpen = false;
// 	vm.toggleCart = toggleCart;
// 	vm.addtoCart = addtoCart;
// 	vm.cartTotal = cartTotal;
// 	vm.removeProduct = removeProduct;
// 	vm.buyOrder = buyOrder;
// 	vm.filterProducts = filterProducts;

// 	function toggleCart() {
// 		vm.cartIsOpen = !vm.cartIsOpen;
// 	}

// 	CartService.getCartData().then(function (cart) {
//         vm.cart = cart;
//     });

// 	$http.get('http://localhost:3000/products').then(function (response) {
// 		vm.products = response.data;
// 		console.log(vm.products);
// 	});

// 	function addtoCart(product) {
// 		try {
// 			if (!product) throw 'Please select a product.';
// 			var existingProduct = vm.cart.find(function (item) {
// 				return item.id === product.id;
// 			});
// 			if (existingProduct) {
// 				existingProduct.quantity++;
// 				CartService.updateCart(existingProduct)
// 			} else {
// 				product.quantity = 1;
// 				CartService.saveCartData(product).then(function(){
// 					vm.cart.push(product)
// 				}).catch (function (){
// 					console.log("Error")
// 				})
// 			}
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	}

// 	function cartTotal() {
// 			var totalPrice = 0;
// 			angular.forEach(vm.cart, function (product) {
// 				totalPrice += product.price * product.quantity;
// 			});
// 			return totalPrice;
// 	}

// 	function removeProduct(cart) {
// 		try {
// 			if (!cart) throw 'Product not found.';
// 			CartService.deleteProduct(cart.id)
// 			.then(function (){
// 				vm.cart = vm.cart.filter(function (c){
// 					return c.id !== cart.id;
// 				})
// 			})
// 			console.log(cart)
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	}

// 	function buyOrder() {
// 		try {
// 			if (!vm.cart || vm.cart.length === 0) throw 'No products in cart.';
// 			var orderProducts = [];

// 			angular.forEach(vm.cart, function (product) {
// 				orderProducts.push({
// 					id: product.id,
// 					name: product.name,
// 					price: product.price,
// 					quantity: product.quantity
// 				});
// 			});

// 			var order = {
// 				products: orderProducts,
// 				total: vm.cartTotal()
// 			};
			
// 			angular.forEach(vm.cart, function (product) {
// 				$timeout(function () {
// 					$http.delete('http://localhost:3000/cart/' + product.id).then(function (deleteResponse) {
// 						console.log('Product deleted.');
// 						vm.cart = [];
// 					});
// 				}, 400);
// 			});
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	}

// 	function filterProducts(product) {
// 		return vm.searchTerm == '' || product.name.toLowerCase().indexOf(vm.searchTerm.toLowerCase()) !== -1;
// 	}
// }

// function productDetails($http, $stateParams, CartService) {
// 	var vm = this;
// 	vm.initCart = function () {
// 		vm.cart = CartService.getCartData();
// 	};

// 	$http({
// 		url: 'http://localhost:3000/products',
// 		params: { id: $stateParams.id },
// 		method: 'get'
// 	}).then(function (response) {
// 		vm.product = response.data[0];
// 	});

// 	vm.addToCart = function (product) {
// 		if (!Array.isArray(vm.cart)) {
// 			vm.cart = [];
// 		}
// 		var existingProduct = vm.cart.find(function (item) {
// 			return item.id === product.id;
// 		});
// 		if (existingProduct) {
// 			existingProduct.quantity++;
// 			CartService.updateCart(existingProduct)
// 		} else {
// 			product.quantity = 1;
// 			CartService.saveCartData(product).then(function(){
// 				vm.cart.push(product)
// 			})		
// 		}

	
// 		alert('Product successfuly added.');
// 	};

// 	vm.initCart(); //immediatly after function add to cart, for latest data
// }
