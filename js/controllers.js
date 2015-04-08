(function(){
	// angular.module('myApp', ['angularUtils.directives.dirPagination', 'ngCsv']).controller('TblController', ['$scope', 'dataFactory', 'sharing', function($scope, dataFactory, sharing) {
       //$scope.data = sharing; // sharing $scope.data.sharingRows btw controllers
       //$scope.rows =  []];
    // the same module as mainApp
    var app = angular.module('mainApp');
    app.controller('TblController', function($scope, dataFactory, sharing, modalService){   
        var vm = $scope;   
        vm.isPopupVisible = false;      
        vm.composeEmail = {};   

        vm.actionForBox = 'Add a row';
        vm.row = [];  
        vm.pageSize=3; 
        //$scope.currentPage=1;
        vm.reverse = false;
        vm.sortField = 'inn_name';
        vm.showAddBtn = true;

        /** function to get detail of row added in mysql referencing php **/
        // remember to change success to then for all functions later when i have time
        vm.get_row = function() {
            $scope.data = sharing; // sharing $scope.data.sharingRows btw controllers
        //    $scope.data.sharingRows = dataFactory.getData();      
            dataFactory.getData().then(function(response){
                    $scope.data.sharingRows=response.data;  
                    $scope.currentPage =1;
                    $scope.pageSize = 5; // max no of rows displaying in a page
                    $scope.filteredItems = $scope.data.sharingRows.lenght; //init for no filter
                    $scope.totalItems = $scope.data.sharingRows.lenght;
                    //$scope.rows=data;                             
                    //console.log(promise.data);          
                },
                function(error){
                    console.log('faile to read from db' + error);
                });                      
        };
        
        /** function to add details for rows in mysql referecing php **/

        vm.add_row = function(row) {
            if (confirm("Are you sure to add the row?") === true){
                dataFactory.submit(row)       
                .success(function (data, status, headers, config) {
                vm.get_row(); 
                })
                .error(function(data, status, headers, config){
                console.log('fail to add a row')
                });
            }    
            vm.row =[];     // clear inputbox
        };

        vm.cancel = function(){
            vm.row =[];
            vm.showAddBtn = true;
            vm.actionForBox = 'Add a row';
        };
        /** function to delete row from list of row referencing php **/

        vm.delete_row = function(index) { 
            //if (confirm("Are you sure to delete the row?") === true){ 
                dataFactory.deleteRow(index)      
                    .success(function (data, status, headers, config) {    
                       vm.get_row();
                })
                .error(function(data, status, headers, config){
                   
                });
            //}    
        };     
 
        vm.sendEmail = function(){
            alert('sent');
        };
       
    /*
        vm.sendMail = function(){        
            var link = "mailto:mark.huang@ca-sec.come"
                 + "?cc=giraftw2002@gmail.com"
                 + "&subject=" + escape("This is my subject")
                 + "&body=" + escape(document.getElementById('myText').value);

        window.location.href = link;
    }
        }
    */
        /** fucntion to edit row details from list of row referencing php **/

        vm.edit_row = function(index) {
           vm.showAddBtn = false;
           vm.actionForBox = 'Edit the row';  
            //vm.update_prod = true;
            //vm.add_prod = false;
            dataFactory.editRow(index)     
            .then(function(promise) {    
                //alert(data[0]["prod_name"]);
                // 2-way data binding
                vm.row = promise.data;
                /*
                vm.row.id = data[0];
                vm.row.inn_name = data[1];
                vm.row.tel = data[2];
                vm.row.fax = data[3];
                vm.row.addr = data[4];           
                */
            },
            function(error){ 
                console.log('fail to edit row' + error);
            });
        };

        /** function to update row details after edit from list of rows referencing php **/

        vm.update_row = function(row) {
            if (confirm("Are you sure to update the row?") === true){
                vm.showAddBtn=true;
                vm.actionForBox = 'Add a row';
                dataFactory.updateRow(row)
                    .success(function (data, status, headers, config) {
                          vm.get_row(); // callback when success
                        })
                    .error(function(data, status, headers, config){
                        console.log('what the fuck');                   
                    });       
            }        
            vm.row=[];
        };

        vm.xModal = function () {            
            modalService.showModal().then(function (result) {
                console.log(result);                
            });
        };
    });  // end of Crmcontroller  
          
    // export controller
    app.controller('ExportController', function($scope, sharing){
        $scope.data = sharing; // sharing $scope.data.sharingRows btw controllers
    });
})();