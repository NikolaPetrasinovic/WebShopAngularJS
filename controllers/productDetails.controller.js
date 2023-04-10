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
            console.log(response);
        });
    };

	vm.initCart(); //immediatly after function add to cart, for latest data
}








// vm.addToCart = function (product) {
	// 	if (!Array.isArray(vm.cart)) {
    //         vm.cart = [];
    //     }
	// 		var existingProduct = vm.cart.findIndex(function (item) {
	// 			return item.productID === product.id;
	// 		}); product
	// 		if (existingProduct === -1) {
	// 			var newObject = {
	// 				productID: product.id,
	// 				name: product.name,
	// 				price: product.price,
	// 				quantity: product.quantity,
	// 				imageURL: product.image
	// 		}; 
	// 		var t;
	// 		$http.post('http://localhost:3000/cart', newObject).then(function (response) {
    //             t = response.data.id;
	// 			t = {
	// 				productID: product.id,
    //                 name: product.name,
    //                 price: product.price,
    //                 quantity: product.quantity,
    //                 imageURL: product.image,
    //                 id: t
	// 			};
	// 			vm.cart.push(t);
	// 		});
	// 	} else {
	// 		vm.cart[existingProduct].quantity++;
	// 		$http.put('http://localhost:3000/cart/' + vm.cart[existingProduct].id, vm.cart[existingProduct]).then(function (response) {
    //             console.log(vm.cart[existingProduct].id);
	// 			alert('Product successfuly added.');
    //         });
	// 	}
	// }
	// vm.addToCart = function (product) {
	// 	if (!Array.isArray(vm.cart)) {
	// 		vm.cart = [];
	// 	}
	// 	var existingProduct = vm.cart.find(function (item) {
	// 		return item.id === product.id;
	// 	});
	// 	if (existingProduct) {
	// 		existingProduct.quantity++;
	// 		CartService.updateCart(existingProduct) //catch blok za ovo uraditi !!!!!
	// 	} else {
	// 		product.quantity = 1;
	// 		CartService.saveCartData(product).then(function(){
	// 			vm.cart.push(product)
	// 			alert('Product successfuly added.');
	// 		})		
	// 	}	
	// };