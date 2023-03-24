var app = angular.module("webshop", ["ui.router"])
	.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise("/home");
	$stateProvider
	.state("home", {
		url: "/home",
		templateUrl:"./templates/home.html",
		controller:"homeController",
		controllerAs: "homeCtrl"

	})	
	.state("ProductDetails", {
			url: "/productDetails/:id",
			templateUrl: "./templates/productDetails.html",
			controller: "productDetailsController",
			controllerAs: "productDetailsCtrl"
		})	
		$locationProvider.html5Mode(true);
	})

	
.controller("homeController", homeController)
.controller("productDetailsController", productDetails)
.factory("CartService", CartService)
  
function CartService($http) {
    var cartData = [];

    function getCartData() {
      return cartData;
    }
  
    function saveCartData(cart) {
      $http.post("http://localhost:3000/cart", cart)
      .then(function(response) {
      	cartData = response.data;
      });
    }
  
    return {
      getCartData: getCartData,
      saveCartData: saveCartData,
    };
}
  

function homeController($http, CartService) {
  var vm = this;
  vm.searchTerm = ""; // searchTerm for searching products
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

  vm.cart = CartService.getCartData(); 

  $http.get("http://localhost:3000/products")
  .then(function (response) {
    vm.products = response.data;
    console.log(vm.products);
  });

  function addtoCart(product) {
    var existingProduct = vm.cart.find(function (item) {
      return item.id === product.id;
    });
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      product.quantity = 1;
      vm.cart.push(product);
    }
    CartService.saveCartData(vm.cart);
  }

  function cartTotal() {
    var totalPrice = 0;
    angular.forEach(vm.cart, function (product) {
      totalPrice += product.price * product.quantity;
    });
    return totalPrice;
  }

  function removeProduct(product) {
    var index = vm.cart.indexOf(product);
    vm.cart.splice(index, 1);
    CartService.saveCartData(vm.cart); 
  }

  function buyOrder() {
    var orderProducts = [];

    angular.forEach(vm.cart, function (product) {
      orderProducts.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      });
    });

    var order = {
      products: orderProducts,
      total: vm.cartTotal(),
    };

    $http.post("http://localhost:3000/orders", order)
    .then(function (response) {
      alert("Order successful!");
    });
    vm.cart = [];
    CartService.saveCartData(vm.cart);
  }

  function filterProducts(product) {
    return (
      vm.searchTerm == "" ||
      product.name.toLowerCase().indexOf(vm.searchTerm.toLowerCase()) !== -1
    );
  }
}
	
function productDetails($http, $stateParams, CartService) {
  var vm = this;
  vm.initCart = function () {
      vm.cart = CartService.getCartData();
  };

  $http({
      url: "http://localhost:3000/products",
      params: { id: $stateParams.id },
      method: "get"
  }).then(function (response) {
      vm.product = response.data[0];
  });

  vm.addToCart = function (product) {
      var existingProduct = vm.cart.find(function (item) {
          return item.id === product.id;
      });
      if (existingProduct) {
          existingProduct.quantity++;
      } else {
          product.quantity = 1;
          vm.cart.push(product);
      }
      CartService.saveCartData(vm.cart);
  };

  vm.initCart(); //immediatly after function add to cart, for latest data
}
	  
	