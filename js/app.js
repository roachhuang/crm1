(function(){  
    // moudle name in camel case
    var app = angular.module('myApp',
                    ['ui.router',
                      'myDirective',
                       'myController',
                       'myFactory',
                       // 'ngAnimate',
                       'ui.bootstrap',
                       'myModal',
                    ]);    

    /* variable app is  a variable which used to control the array values to show the data to show in view  using the module name 'app' with arguments as an array */

    /* Initialize the controller by name 'PhoneListCtrl' holds the information of phone in form of array with keys name, snipper, price , quantity */

    /* $scope argument passed in function is a key arguments should be passed with exactly the same name */

    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){     
        $urlRouterProvider.otherwise('./showtable.html');
        $stateProvider
        .state("showtable",
            {       
                url: '/showtable',    
                controller: 'TblController',
                templateUrl: "./templates/showtable.html"
            })      
        .state("import",
            {    
                url: '/import',       
                controller: 'ImportController',
                templateUrl: "./templates/import.html"
            })  
        .state("export",
            {   
                url: '/export',        
                controller: 'ExportController',
                templateUrl: "./templates/export.html"
            })  
        .state("home",
            {    
                url: '/',   
                templateUrl: "./templates/home.html"
            })  
                    
    }]);    

    /* to be move to app.js for animation*/
    
    app.run(function ($rootScope) {
      $rootScope.$on('$routeChangeSuccess', function(e, current, previous) {
        var direction = current && previous && current.depth < previous.depth;

        $rootScope.viewSlideAnimation = {
          enter: direction ? 'slide-left-enter' : 'slide-right-enter',
          leave: direction ? 'slide-right-leave' : 'slide-left-leave'
        }
      });
    });
   
})();
