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
		})
		.catch(function(error) {
			console.error('Error deleting product:', error);
			throw error;
		  });
	}

	function updateCart(product) {
		return $http.put('http://localhost:3000/cart/' + product.id, product)
		.catch(function(error) {
			console.error('Error updating cart:', error);
			throw error;
		  });
	}

	function addtoCart(product) {
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
		  $http.post('http://localhost:3000/cart', newObject).then(function (response) {
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
		  });
		  console.log(cartData);
		} else {
		  cartData[existingProduct].quantity++;
		  updateCart(cartData[existingProduct]);
		}
	  }
	return {
		getProducts: getProducts,
		getCartData: getCartData,
		saveCartData: saveCartData,
		deleteProduct: deleteProduct,
		updateCart: updateCart,
		addtoCart: addtoCart
	};
}


	//   $http.put('http://localhost:3000/cart/' + cartData[existingProduct].id, cartData[existingProduct]).then(function (response) {
		// 	console.log(cartData[existingProduct].id);
		//   });