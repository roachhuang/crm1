(function(){
	var app = angular.module('MyFactory', []);

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
            return $http.get("./db.php?action=get_data");            
        };

        factory.deleteRow = function(index){
            return $http.post('./db.php?action=delete_row', {'prod_index': index });
        };

        factory.editRow = function(index){
            return $http.post('./db.php?action=edit_row', {'prod_index': index});      
        };

        factory.updateRow = function(row){   
            return $http.post('./db.php?action=update_row', 
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
            return $http.post('db.php?action=add_row', 
                {
                prod_name: row.prod_name,
                prod_desc: row.prod_desc, 
                prod_price: row.prod_price,
                prod_quantity: row.prod_quantity
                }
            );
        };                

        return factory; // return an object
    }]);
})();

/* to be move to app.js for animation*/
app.run(function ($rootScope) {
  $rootScope.$on('$routeChangeSuccess', function(e, current, previous) {
    var direction = current && previous && current.depth < previous.depth;

    $rootScope.viewSlideAnimation = {
      enter: direction ? 'slide-left-enter' : 'slide-right-enter',
      leave: direction ? 'slide-right-leave' : 'slide-left-leave'
    }
  });
});