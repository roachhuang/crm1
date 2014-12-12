(function(){
	var app = angular.module('crmControllers', ['ngCsv']);

	app.controller('tblCtrl', ['$scope', '$http', 'dataFactory', 'sharing', function($scope, $http, dataFactory, sharing) {
    $scope.filteredItems =  [];
    $scope.groupedItems  =  [];
    $scope.itemsPerPage  =  3;
    $scope.data = sharing; // sharing $scope.data.sharingRows btw controllers
    //$scope.rows =  []];
    $scope.row = [];
    $scope.currentPage   =  0;
    $scope.reverse = false;
    $scope.sortField = 'prod_name';
    $scope.showAddBtn = true;

    /** function to get detail of row added in mysql referencing php **/

    $scope.get_row = function() {
        dataFactory.getData()
            .success(function(data){
                //$scope.rows=data;  
                $scope.data.sharingRows=data;             
            })
            .error(function(error){
                console.log('faile to read from db' + error.message);
            });
    };

    /** function to add details for rows in mysql referecing php **/

    $scope.row_submit = function(row) {
        if (confirm("Are you sure to add the row?") === true){
            dataFactory.submit(row)       
            .success(function (data, status, headers, config) {
            $scope.get_row(); 
            })
            .error(function(data, status, headers, config){
            console.log('fail to add a row')
            });
        }    
        $scope.row =[];     // clear inputbox
    };

    $scope.cancel = function(){
        $scope.row =[];
        $scope.showAddBtn = true;
    }
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
        if (confirm("Are you sure to update the row?") === true){
            $scope.showAddBtn=true;
            dataFactory.updateRow(row)
                .success(function (data, status, headers, config) {
                      $scope.get_row(); // callback when success
                    })
                .error(function(data, status, headers, config){
                    console.log('what the fuck');                   
                });       
        }        
        $scope.row=[];
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

    $scope.import = function(){
        //$scope.rows = dataFactory.importCsv();
    }

    }]); // end of Crmcontroller


    app.controller('ExportCtrl', function($scope, sharing){
        $scope.data = sharing; // sharing $scope.data.sharingRows btw controllers
    })
})();