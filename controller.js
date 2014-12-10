(function(){    
    var app = angular.module('crmApp', ['ngRoute', 'ngCsv']);    

    /* variable app is  a variable which used to control the array values to show the data to show in view  using the module name 'app' with arguments as an array */

    /* Initialize the controller by name 'PhoneListCtrl' holds the information of phone in form of array with keys name, snipper, price , quantity */

    /* $scope argument passed in function is a key arguments should be passed with exactly the same name */

    app.controller('CrmController', ['$scope', '$http', 'dataFactory', function($scope, $http, dataFactory) {
    $scope.filteredItems =  [];
    $scope.groupedItems  =  [];
    $scope.itemsPerPage  =  3;
    $scope.rows =  [];
    $scope.currentPage   =  0;

    /** function to get detail of product added in mysql referencing php **/

    $scope.get_product = function() {
        dataFactory.getData()
            .success(function(data){
                $scope.rows=data;              
            })
            .error(function(error){
                console.log('faile to read from db' + error.message);
            });
    };

    /** function to add details for products in mysql referecing php **/

    $scope.product_submit = function() {
        $http.post('db.php?action=add_product', 
            {
                'prod_name'     : $scope.prod_name, 
                'prod_desc'     : $scope.prod_desc, 
                'prod_price'    : $scope.prod_price,
                'prod_quantity' : $scope.prod_quantity
            }
        )
        .success(function (data, status, headers, config) {
          $scope.get_product();
        })

        .error(function(data, status, headers, config){
           
        });
    };

    /** function to delete product from list of product referencing php **/

    $scope.prod_delete = function(index) {  
     
      $http.post('db.php?action=delete_product', 
            {
                'prod_index'     : index
            }
        )      
        .success(function (data, status, headers, config) {    
             $scope.get_product();
        })

        .error(function(data, status, headers, config){
           
        });
    };

    /** fucntion to edit product details from list of product referencing php **/

    $scope.prod_edit = function(index) {  
      $scope.update_prod = true;
      $scope.add_prod = false;
      $http.post('db.php?action=edit_product', 
            {
                'prod_index'     : index
            }
        )      
        .success(function (data, status, headers, config) {    
            //alert(data[0]["prod_name"]);
            $scope.prod_id          =   data[0]["id"];
            $scope.prod_name        =   data[0]["prod_name"];
            $scope.prod_desc        =   data[0]["prod_desc"];
            $scope.prod_price       =   data[0]["prod_price"];
            $scope.prod_quantity    =   data[0]["prod_quantity"];

        })

        .error(function(data, status, headers, config){
           
        });
    };

    /** function to update product details after edit from list of products referencing php **/

    $scope.update_product = function() {

        $http.post('db.php?action=update_product', 
                    {
                        'id'            : $scope.prod_id,
                        'prod_name'     : $scope.prod_name, 
                        'prod_desc'     : $scope.prod_desc, 
                        'prod_price'    : $scope.prod_price,
                        'prod_quantity' : $scope.prod_quantity
                    }
                  )
                .success(function (data, status, headers, config) {
                  $scope.get_product();
                })
                .error(function(data, status, headers, config){
                   
                });
    };

    /** function to call prvious page , click on paging items button previous for product list **/

    $scope.prevPage = function() {        
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    /** function to set current page on paging items for product list **/

    $scope.setPage = function() { 
        alert(this.n);
        $scope.currentPage = this.n;
    };

    /** function to call next page , click on paging items button next for product list **/

    $scope.nextPage = function() {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };    

    /** fucntion to define the total number of pages, in reference of product list items based upon itemsperpage **/

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
                //controller: 'tblCtrl',
                //templateUrl: "./templates/showtable.html"
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
            });  
        // .otherwise({redirectTo: './templates/showtable'});            
    }]);

    app.factory('dataFactory', ['$http', function($http){
        // import csv file
        var factory = {};       
        // "this" equal to the runtime factory
        factory.getCsv = function(){
            var url='./test.csv';
            $http.get(url).then(function(response){
                return csvParser(response.data);
            });     
        };
        // read CRM table from asiayo database
        factory.getData = function(){
            return $http.get("./db.php?action=get_product");            
        };  
        return factory; // return an object
    }]);
   
})();