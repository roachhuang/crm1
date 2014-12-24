(function(){  
    // moudle name in camel case
    var app = angular.module('crmApp', ['ngRoute', 'myDirective', 'myController', 'myFactory']);    

    /* variable app is  a variable which used to control the array values to show the data to show in view  using the module name 'app' with arguments as an array */

    /* Initialize the controller by name 'PhoneListCtrl' holds the information of phone in form of array with keys name, snipper, price , quantity */

    /* $scope argument passed in function is a key arguments should be passed with exactly the same name */

    app.config(['$routeProvider', function($routeProvider){     
        $routeProvider.
        when("/showtable",
            {           
                controller: 'TblController as TblCtrl',
                templateUrl: "./templates/showtable.html"
            })      
        .when("/import",
            {           
                controller: 'ImportController as ImportCtrl',
                templateUrl: "./templates/import.html"
            })  
        .when("/export",
            {           
                controller: 'ExportController as ExportCtrl',
                templateUrl: "./templates/export.html"
            })  
        .when("/home",
            {           
                //controller: 'exportCtrl',
                templateUrl: "./templates/home.html"
            })  
        .otherwise({redirectTo: './showtable.html'});            
    }]);    

    /* to be move to app.js for animation*/
    /*
    app.run(function ($rootScope) {
      $rootScope.$on('$routeChangeSuccess', function(e, current, previous) {
        var direction = current && previous && current.depth < previous.depth;

        $rootScope.viewSlideAnimation = {
          enter: direction ? 'slide-left-enter' : 'slide-right-enter',
          leave: direction ? 'slide-right-leave' : 'slide-left-leave'
        }
      });
    });
    */
})();
