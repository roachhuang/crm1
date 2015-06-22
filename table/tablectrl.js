
    'use strict'
    angular.module('app.table')    
    // main controller
    .controller('mainCtrl', function($scope) {
        $scope.data = {}; // using controller inheritance
    })
    .controller('TblController', TblController);

    TblController.$inject = ['$scope', 'dataFactory', 'modalService'];

    function TblController() {  
        var vm = $scope; 
        vm.displayMode = 'list';
        vm.isPopupVisible = false;      
        vm.composeEmail = {};
        vm.actionForBox = 'Add a row';
        vm.row = [];  
        vm.pageSize = 3;        
        vm.reverse = false;
        vm.sortField = 'inn_name';
        vm.showAddBtn = true;
        /** function to get detail of row added in mysql referencing php **/
        // remember to change success to then for all functions later when i have time
vm.get_row = function() {
    dataFactory.getData()
    .then(function(response) {
        vm.data.products=response.data;  
        vm.currentPage =1;
        vm.pageSize = 5; // max no of rows displaying in a page
        vm.filteredItems = vm.data.products.lenght; //init for no filter
        vm.totalItems = vm.data.products.lenght;       
    }, function(error) {
        console.log('faile to read from db' + error);
    });                      
};
        
        /** function to add details for rows in mysql referecing php **/

        vm.add_row = function(row) {
            if (vm.xModal() === true){
                dataFactory.submit(row).then(function (response) {
                    vm.get_row(); 
                }, function(error){                    
                    console.log('fail to add a row')
                });
            }    
            vm.displayMode='list';
            vm.row =[];     // clear inputbox
        };

        vm.cancel = function() {
            vm.row =[];
            vm.showAddBtn = true;
            vm.actionForBox = 'Add a row';
            vm.displayMode='list';
        };
        /** function to delete row from list of row referencing php **/

        vm.delete_row = function(index) { 
            modalService.showModal().then(function(result){ 
                dataFactory.deleteRow(index)      
                    .success(function (data, status, headers, config) {    
                       vm.get_row();
                });         
            });   
        };     
 
        vm.sendEmail = function() {
            alert('sent');
        };
       
        /** fucntion to edit row details from list of row referencing php **/
        vm.edit_row = function(index) {
            vm.displayMode='edit';
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
            function(error) { 
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
            vm.displayMode='list';
        };

        vm.xModal = function () {            
            modalService.showModal().then(function (result) {
                console.log(result);             
                return true;    // ok         
            });
        };

    };
        
  
