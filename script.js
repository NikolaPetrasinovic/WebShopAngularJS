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

		.state("productsSearch", {
			url: "/productsSearch/:name",
		  templateUrl:"./templates/productSearch.html",
		   controller:"productSearchController",
		   controllerAs: "productSearchCtrl"
	  })
		$locationProvider.html5Mode(true);
	})

	

.controller("homeController", function($http, $state){
		 	
			var vm = this
			vm.cart=[];
			$http.get("http://localhost:3000/products")
                .then(function(response){
                  vm.products = response.data;
				  console.log(vm.products)
                });

				vm.searchProduct = function(){
					if(vm.name){
						$state.go("productSearch", {name: vm.name})}
				}
				
		vm.addtoCart = function(product){
				vm.cart.push(product);
		}

		vm.cartTotal = function() {
			var totalPrice = 0;
			angular.forEach(vm.cart, function(product) {
				totalPrice += product.price * product.quantity;
			});
			return totalPrice;
		};

	vm.removeProduct = function(product) {
		var index = vm.cart.indexOf(product);
		vm.cart.splice(index, 1);

	  };

	  this.buyOrder = function() {
		var order = {
			total: vm.cartTotal()
		  };
		$http.post('http://localhost:3000/orders', order)
      .then(function(response){
		
		alert('Order successful!');
	  })
	  this.cart = [];
	}
		
	})
	
	.controller("productDetailsController", function($http, $stateParams){
		var vm = this;

		$http({
			url:"http://localhost:3000/products",
			params:{id:$stateParams.id},
			method:"get"
		})
		.then(function(response){
			
			vm.product = response.data[0]
			console.log(response)
		})
	 })

	 .controller("productSearchController", function($http, $stateParams){
		var vm = this;
		
		if($stateParams.name)
		{
			$http({
				url:"http://localhost:3000/products?name_like=" +$stateParams.name,
				method:"get"
			})
			.then(function(response){
				
				vm.products = response.data
			})
		}
		else{
			$http.get('http://localhost:3000/products')
			 .then(function (response){
				vm.products = response.data;
			 })
		}
		
	 })

	//  vm.addToCart = function(product) {
	// 	
	// 	var cartItemIndex = vm.cartItems.findIndex(function(item) {
	// 		return item.product.name === product.name;
	// 	});
	// 	if (cartItemIndex === -1) {
	// 	
	// 		vm.cartItems.push({
	// 			product: product,
	// 			quantity: 1
	// 		});
	// 	} else {
	// 		
	// 		vm.cartItems[cartItemIndex].quantity++;
	// 	}
	// 	console.log(vm.cartItems)
	// };