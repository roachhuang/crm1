(function(){
	var app = angular.module('MyFactory', []);

    app.factory('sharing', function(){
        return {sharingRows: []};    //also binding btw controllers
    });

	app.factory('dataFactory', ['$http', function($http){
        // import csv file
        var factory = {};   
        
        // read CRM table from asiayo database
        factory.getData = function(){
            return $http.get("./php/db.php?action=get_data");            
        };

        factory.deleteRow = function(index){
            return $http.post('./php/db.php?action=delete_row', {'prod_index': index });
        };

        factory.editRow = function(index){
            return $http.post('./php/db.php?action=edit_row', {'prod_index': index});      
        };

        factory.updateRow = function(row){   
            return $http.post('./php/db.php?action=update_row', 
                    {
                     id: row.prod_id,
                     prod_name: row.prod_name,
                     prod_desc: row.prod_desc, 
                     prod_price: row.prod_price,
                     prod_quantity: row.prod_quantity
                    }
                  );
        };  

        factory.submit = function(row){
            return $http.post('./php/db.php?action=add_row', 
                {
                prod_name: row.prod_name,
                prod_desc: row.prod_desc, 
                prod_price: row.prod_price,
                prod_quantity: row.prod_quantity
                }
            );
        };

        factory.importCsv = function(){
            console.log('called factory.importcsv');
            var fileToUpload = '../test.csv';   // relative to db.php's path
            return $http.post('./php/db.php?action=importCsv', {filename: fileToUpload});               
        };

        return factory; // return an object
    }]);

})();

