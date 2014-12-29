(function(){
	var app = angular.module('myFactory', []);

    app.factory('sharing', function(){
        return {sharingRows: []};    //also binding btw controllers
    });

	app.factory('dataFactory', ['$http', '$q', function($http, $q){
        // import csv file
        var factory = {};   
        
        // read CRM table from asiayo database
        factory.getData = function(){
            /*
            var defer = $q.defer();
            $http.get("./php/db.php?action=get_data").success(function(data){
                alert(data);  
                //$scope.data.sharingRows=data; 
                defer.resolve(data);  
                //console.log(data);          
            })
            .error(function(error){                
                console.log('faile to read from db' + error.message);
            });
            return defer.promise;
            */  
            //var deferred = $q.defer();  // $q service contains the promise we'll return
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

        factory.importCsv = function(fileName, city){
            console.log('called factory.importcsv');
            var fileToUpload = '../test.csv';   // relative to db.php's path
            return $http.post('./php/db.php?action=importCsv', 
                    {filename: fileToUpload,
                     city: city});               
        };

        return factory; // return an object
    }]);

})();

