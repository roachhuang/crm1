(function(){
	var app = angular.module('mainApp.Factories', []);
/*
    app.factory('sharing', function(){
        return {sharingRows: []};    //also binding btw controllers
    });
*/
    app.constant("dataUrl", "./php/db.php/?action=");
	app.factory('dataFactory', ['dataUrl', '$http', '$q', function(dataUrl, $http, $q){
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
            return $http.get(dataUrl + "get_data"); 
            /*
            var promise = $http.get("./php/db.php?action=get_data");
            promise.success(function (data){
                return data;        
            });
            */
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
    }]);

})();

