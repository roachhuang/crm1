(function(){
    var core = angular.module('app.core');
    core.constant("templates", "../templates/");	
	core.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){     
        $urlRouterProvider.otherwise('./showtable.html');
        $stateProvider
        
        .state("import",
            {    
                url: '/import',       
                controller: 'ImportController',
                templateUrl: templates + "import.html"
            })  
        .state("export",
            {   
                url: '/export',        
                //controller: 'ExportController',
                templateUrl: templates + "export.html"
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
                templateUrl: templates + "home.html"
            })  
                   
    }]);
})();     