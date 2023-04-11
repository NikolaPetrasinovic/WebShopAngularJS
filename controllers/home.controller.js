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

	function removeProduct(){
		CartService.removeProduct(cartData);
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
        CartService.addtoCart(product)
		alert("Product added.")
    };
	function buyOrder() {
		homeCtrl.buying = true;
		CartService.buyOrder().then(function(response) {
		  console.log(response);
		  CartService.getCartData().then(function (cartData) {
			vm.cartData = cartData;
			homeCtrl.buying = false;
		  });
		});
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
	};
	function removeProduct (cartData) {
        $http;
        CartService.deleteProduct(cartData.id).then(function (response) {
                var index = vm.cartData.findIndex(function (item) {
                    return item.id === cartData.id;
                });
                vm.cartData.splice(index, 1);
                console.log('Successfully deleted item with id:', cartData.id);
            })
            .catch(function (error) {
                console.log(error);
                console.log(cartData.id);
            });
    };
	function filterProducts(product) {
		return vm.searchTerm == '' || product.name.toLowerCase().indexOf(vm.searchTerm.toLowerCase()) !== -1;
	}
}