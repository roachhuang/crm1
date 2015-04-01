(function(){
	var app = angular.module('myEmail', []);

	app.controller('EmailController', function($scope) {
		var vm = $scope;
		vm.isPopupVisible = false;		
		vm.composeEmail = {};
		vm.showPopup = function(email){
			vm.isPopupVisible = true;
			vm.selectedEmail = email;
		};
		vm.sendEmail = function(){
			alert('sent');
		};
	});
	
})();	