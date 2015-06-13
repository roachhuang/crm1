(function(){     
    // moudle name in camel case
    var app = angular.module('app',
                    [
                       
                        /* 
                         * Everybody has access to these.
                        */    
                        'app.directives',
                        'app.core',

                        'app.services',

                        'angularUtils.directives.dirPagination', 'ngCsv',
                        'ngAnimate',

                       //'ui.bootstrap',                       
                    ]);    

    /* variable app is  a variable which used to control the array values to show the data to show in view  using the module name 'app' with arguments as an array */

    /* Initialize the controller by name 'PhoneListCtrl' holds the information of phone in form of array with keys name, snipper, price , quantity */

    /* $scope argument passed in function is a key arguments should be passed with exactly the same name */
    

    
})();
