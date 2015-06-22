(function(){
    'use strict';
	// angular.module('myApp', ['angularUtils.directives.dirPagination', 'ngCsv']).controller('TblController', ['$scope', 'dataFactory', 'sharing', function($scope, dataFactory, sharing) {
       //$scope.data = sharing; // sharing $scope.data.sharingRows btw controllers
       //$scope.rows =  []];
    // the same module as mainApp
    angular.module('app.table', 
    	['angularUtils.directives.dirPagination',
    	 'ngCsv',]);

})();