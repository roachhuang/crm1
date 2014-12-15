(function(){
	var app = angular.module('MyFactory', []);

    app.factory('sharing', function(){
        return {sharingRows: []};    //also binding btw controllers
    });

	app.factory('dataFactory', ['$http', function($http){
        // import csv file
        var factory = {};       
        // "this" equal to the runtime factory
        factory.getCsv = function(path){
            var url=path;
            $http.get(url).then(function(response){
                return csvParser(response.data);
            });     
        };
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

        factory.csv = function(csvObj){
            return $http.post('./php/db.php?action=csv2json', {csv:csvObj});
        }; 

        factory.importCsv = function(){
            var Url = './csv/1.csv';
            $http.get(Url).then(function(response){
                return csvParser(response.data);
            });               
        };

        return factory; // return an object
    }]);

})();

