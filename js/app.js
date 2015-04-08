(function(){  
    // moudle name in camel case
    var app = angular.module('mainApp',
                    [  'ui.router',
                       'mainApp.Directives', 'mainApp.Factories', 'mainApp.Services',
                       'angularUtils.directives.dirPagination', 
                       'ngAnimate',
                       //'ui.bootstrap',                       
                    ]);    

    /* variable app is  a variable which used to control the array values to show the data to show in view  using the module name 'app' with arguments as an array */

    /* Initialize the controller by name 'PhoneListCtrl' holds the information of phone in form of array with keys name, snipper, price , quantity */

    /* $scope argument passed in function is a key arguments should be passed with exactly the same name */

    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){     
        $urlRouterProvider.otherwise('./showtable.html');
        $stateProvider
        
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
        .state("showtable",
            {       
                url: '/showtable',    
                controller: 'TblController',
                // table view or editor view
                templateUrl: "./templates/showtable.html"               
            })                   
        .state("home",
            {    
                url: '/',   
                templateUrl: "./templates/home.html"
            })  
                   
    }]); 
})();
