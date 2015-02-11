(function(){
	var app = angular.module('myController', ['angularUtils.directives.dirPagination', 'ngCsv']);

	app.controller('TblController', ['$scope', 'dataFactory', 'sharing', function($scope, dataFactory, sharing) {
       //$scope.data = sharing; // sharing $scope.data.sharingRows btw controllers
       //$scope.rows =  []];

    var vm = $scope;   
    vm.isPopupVisible = false;      
    vm.composeEmail = {};   

    $scope.actionForBox = 'Add a row';
    $scope.row = [];  
    $scope.pageSize=6; 
    //$scope.currentPage=1;
    $scope.reverse = false;
    $scope.sortField = 'inn_name';
    $scope.showAddBtn = true;

    /** function to get detail of row added in mysql referencing php **/
    // remember to change success to then for all functions later when i have time
    $scope.get_row = function() {
        $scope.data = sharing; // sharing $scope.data.sharingRows btw controllers
    //    $scope.data.sharingRows = dataFactory.getData();      
        dataFactory.getData()        
            .then(function(promise){
                $scope.data.sharingRows=promise.data;  
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

    $scope.add_row = function(row) {
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
        $scope.actionForBox = 'Add a row';
    }
    /** function to delete row from list of row referencing php **/

    $scope.delete_row = function(index) { 
        if (confirm("Are you sure to delete the row?") === true){ 
            dataFactory.deleteRow(index)      
                .success(function (data, status, headers, config) {    
                   $scope.get_row();
            })
            .error(function(data, status, headers, config){
               
            });
        }    
    };     
        
    vm.showPopup = function(email){
        vm.isPopupVisible = true;
        vm.selectedEmail = email;
    };

    vm.sendEmail = function(){
        alert('sent');
    };
   
/*
    $scope.sendMail = function(){        
        var link = "mailto:mark.huang@ca-sec.come"
             + "?cc=giraftw2002@gmail.com"
             + "&subject=" + escape("This is my subject")
             + "&body=" + escape(document.getElementById('myText').value);

    window.location.href = link;
}
    }
*/
    /** fucntion to edit row details from list of row referencing php **/

    $scope.edit_row = function(index) {
       $scope.showAddBtn = false;
       $scope.actionForBox = 'Edit the row';  
        //$scope.update_prod = true;
        //$scope.add_prod = false;
        dataFactory.editRow(index)     
        .then(function(promise) {    
            //alert(data[0]["prod_name"]);
            // 2-way data binding
            $scope.row = promise.data;
            /*
            $scope.row.id = data[0];
            $scope.row.inn_name = data[1];
            $scope.row.tel = data[2];
            $scope.row.fax = data[3];
            $scope.row.addr = data[4];           
            */
        },
        function(error){ 
            console.log('fail to edit row' + error);
        });
    };

    /** function to update row details after edit from list of rows referencing php **/

    $scope.update_row = function(row) {
        if (confirm("Are you sure to update the row?") === true){
            $scope.showAddBtn=true;
            $scope.actionForBox = 'Add a row';
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

    }]); // end of Crmcontroller

    
  
    // export controller
    app.controller('ExportController', function($scope, sharing){
        $scope.data = sharing; // sharing $scope.data.sharingRows btw controllers
    });
})();