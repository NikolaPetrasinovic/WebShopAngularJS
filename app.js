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