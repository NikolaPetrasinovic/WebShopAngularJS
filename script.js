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
				
				vm.addtoCart = function(product) {
					// Check if product Id already exists in cart
					var existingProduct = vm.cart.find(function(item) {
					  return item.id === product.id;
					});
				  
					// If product Id exists in cart, update quantity
					if (existingProduct) {
					  existingProduct.quantity++;
					} else { // Otherwise, add new product to cart
					  product.quantity = 1;
					  vm.cart.push(product);
					}
				  };

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
		var orderProducts = [];
	
		// Create array of products with relevant details for order
		angular.forEach(vm.cart, function(product) {
		  orderProducts.push({
			id: product.id,
			name: product.name,
			price: product.price,
			quantity: product.quantity
		  });
		});
	
		// Add total to order object
		var order = {
		  products: orderProducts,
		  total: vm.cartTotal()
		};
	
		$http.post('http://localhost:3000/orders', order)
		  .then(function(response){
			alert('Order successful!');
		  });
	
		// Clear cart after order is placed
		this.cart = [];
	  };
	
		
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

	