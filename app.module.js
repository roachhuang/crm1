(function(){     
    // moudle name in camel case
    angular
    .module('app',
            [                       
            /* 
             * Everybody has access to these.
            */    
                      
            'ngAnimate',
            'ui.router',
            
            'app.core',
            'app.table'                                     
            ])    

    /* variable app is  a variable which used to control the array values to show the data to show in view  using the module name 'app' with arguments as an array */

    /* Initialize the controller by name 'PhoneListCtrl' holds the information of phone in form of array with keys name, snipper, price , quantity */

    /* $scope argument passed in function is a key arguments should be passed with exactly the same name */
    .constant("templates", "../templates/") 
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {     
        $urlRouterProvider.otherwise('./showtable.html');
        $stateProvider
        
        .state("import",
            {    
                url: '/import',       
                controller: 'ImportController',
                templateUrl: this.templates + "import.html"
            })  
        .state("export",
            {   
                url: '/export',        
                //controller: 'ExportController',
                templateUrl: this.templates + "export.html"
            }) 
        .state("showtable",
            {       
                url: '/showtable',    
                controller: 'TblController',
                // table view or editor view               
                template: function(){
                    // the id is defined in index.html
                    return angular.element(document.querySelector("#tableTemplate")).html();
                }            
            })                   
        .state("home",
            {    
                url: '/',   
                templateUrl: this.templates + "home.html"
            })  
                   
    }]);    
    
})();
