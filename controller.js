(function(){    
    var app = angular.module('crmApp', ['ngRoute', 'ngCsv', 'MyFactory']);    

    /* variable app is  a variable which used to control the array values to show the data to show in view  using the module name 'app' with arguments as an array */

    /* Initialize the controller by name 'PhoneListCtrl' holds the information of phone in form of array with keys name, snipper, price , quantity */

    /* $scope argument passed in function is a key arguments should be passed with exactly the same name */

    app.controller('CrmController', ['$scope', '$http', 'dataFactory', function($scope, $http, dataFactory) {
    $scope.filteredItems =  [];
    $scope.groupedItems  =  [];
    $scope.itemsPerPage  =  3;
    $scope.rows =  [];
    $scope.row = [];
    $scope.currentPage   =  0;
    $scope.reverse = false;
    $scope.sortField = 'prod_name';
    $scope.showAddBtn = true;

    /** function to get detail of row added in mysql referencing php **/

    $scope.get_row = function() {
        dataFactory.getData()
            .success(function(data){
                $scope.rows=data;              
            })
            .error(function(error){
                console.log('faile to read from db' + error.message);
            });
    };

    /** function to add details for rows in mysql referecing php **/

    $scope.row_submit = function(row) {
        dataFactory.submit(row)       
        .success(function (data, status, headers, config) {
          $scope.get_row(); 
        })
        .error(function(data, status, headers, config){
           console.log('fail to add a row')
        });
    };

    /** function to delete row from list of row referencing php **/

    $scope.prod_delete = function(index) {  
        dataFactory.deleteRow(index)      
            .success(function (data, status, headers, config) {    
               $scope.get_row();
        })
        .error(function(data, status, headers, config){
           
        });
    };

    /** fucntion to edit row details from list of row referencing php **/

    $scope.prod_edit = function(index) {
        $scope.showAddBtn = false;  
      //$scope.update_prod = true;
      //$scope.add_prod = false;
      dataFactory.editRow(index)     
        .success(function (data, status, headers, config) {    
            //alert(data[0]["prod_name"]);
            // 2-way data binding
            $scope.row.prod_id          =   data[0]["id"];
            $scope.row.prod_name        =   data[0]["prod_name"];
            $scope.row.prod_desc        =   data[0]["prod_desc"];
            $scope.row.prod_price       =   data[0]["prod_price"];
            $scope.row.prod_quantity    =   data[0]["prod_quantity"];
        })
        .error(function(data, status, headers, config){ 

        });
    };

    /** function to update row details after edit from list of rows referencing php **/

    $scope.update_row = function(row) {
        /*
        $http.post('./db.php?action=update_row', 
                    {
                     'id': row.prod_id,
                     'prod_name': row.prod_name,
                     'prod_desc': row.prod_desc, 
                     'prod_price': row.prod_price,
                     'prod_quantity': row.prod_quantity
                    }).success(function(data, status, headers, config){
                        console.log('good');
                    }).
                    error(function(data, status, headers, config){
                        console.log('bad');
                    });
        */
        $scope.showAddBtn=true;
        dataFactory.updateRow(row)
            .success(function (data, status, headers, config) {
                  $scope.get_row(); // callback when success
                })
            .error(function(data, status, headers, config){
                console.log('what the fuck');
                   
            });        
            
    };

    /** function to call prvious page , click on paging items button previous for row list **/

    $scope.prevPage = function() {        
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    /** function to set current page on paging items for row list **/

    $scope.setPage = function() { 
        alert(this.n);
        $scope.currentPage = this.n;
    };

    /** function to call next page , click on paging items button next for row list **/

    $scope.nextPage = function() {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };    

    /** fucntion to define the total number of pages, in reference of row list items based upon itemsperpage **/

    $scope.range = function (start, end) {             
        var ret = [];
        if (!end) {
            end = start;
            start = 0;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
    };

    }]); // end of Crmcontroller

    app.config(['$routeProvider', function($routeProvider){     
        $routeProvider.
        when("/showtable",
            {           
                controller: 'CrmController',
                templateUrl: "./templates/showtable.html"
            })      
        .when("/import",
            {           
                //controller: 'addCtrl',
                templateUrl: "./templates/import.html"
            })  
        .when("/export",
            {           
                //controller: 'addCtrl',
                templateUrl: "./templates/export.html"
            })  
        .otherwise({redirectTo: './showtable.html'});            
    }]);    
   
})();