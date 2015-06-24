    'use strict'
	angular
       .module('app.core')
	   .constant("dataUrl", "../php/db.php/?action=")
	   .factory('dataFactory', dataFactory);
       
    // seprate injection - clean code    
    dataFactory.$inject = ['dataUrl', '$http'];

    function dataFactory(dataUrl, $http) {        
        var factory = {
            // dataUrl: "../php/db.php/?action="
        };  // factory is an object 
        
        // read CRM table from asiayo database
        factory.getData = function(){ 
            return $http.get(dataUrl + "get_data"); 
        };

        factory.deleteRow = function(index){
            return $http.post(dataUrl + 'delete_row', {'index': index });
        };

        factory.editRow = function(index){
            return $http.post(dataUrl + 'edit_row', {'index': index});      
        };

        factory.updateRow = function(row){   
            return $http.post(dataUrl + 'update_row',  row);    
        };  

        factory.submit = function(row){
            return $http.post(dataUrl + 'add_row', 
                {
                prod_name: row.prod_name,
                prod_desc: row.prod_desc, 
                prod_price: row.prod_price,
                prod_quantity: row.prod_quantity
                }
            );
        };

        factory.importCsv = function(fileName, city){
            console.log('called factory.importcsv');
            var fileToUpload = '../test.tsv';   // relative to db.php's path
            // remember to change this after fixing fileanme issue
            return $http.post(dataUrl + 'importCsv', {filename: fileToUpload, city: city});               
        };
        return factory; // return an object
    };
