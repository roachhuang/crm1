(function(){
    angular.module('app.core')
    .constant("templates", "../templates/")	
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){     
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