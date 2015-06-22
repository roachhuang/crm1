(function(){
	angular
	.module('app.table')	
	.constant("templateDir", "../templates/");

	.directive('navBar', function(){
		return {
			restrict: 'E',
			templateUrl: '../templates/navbar.html'
		}
	});

})();