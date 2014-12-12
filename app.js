(function(){    
    var app = angular.module('crmApp', ['ngRoute', 'crmControllers', 'myFactory']);    

    /* variable app is  a variable which used to control the array values to show the data to show in view  using the module name 'app' with arguments as an array */

    /* Initialize the controller by name 'PhoneListCtrl' holds the information of phone in form of array with keys name, snipper, price , quantity */

    /* $scope argument passed in function is a key arguments should be passed with exactly the same name */

    app.config(['$routeProvider', function($routeProvider){     
        $routeProvider.
        when("/showtable",
            {           
                controller: 'tblCtrl',
                templateUrl: "./templates/showtable.html"
            })      
        .when("/import",
            {           
                //controller: 'addCtrl',
                //templateUrl: "./templates/import.html"
            })  
        .when("/export",
            {           
                controller: 'ExportCtrl',
                templateUrl: "./templates/export.html"
            })  
        .otherwise({redirectTo: './showtable.html'});            
    }]);    
   
})();