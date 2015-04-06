(function(){
    var app = angular.module('mainApp.Services', ['ui.bootstrap']);
    // Constrcutor
    var BaseModal = function($modal){
        this.ml = $modal;
        //this.modalOptions.size = size;              
    };    

    BaseModal.prototype = {
        constructor: BaseModal,
        modalDefaults: {
            backdrop: true,
            keyboard: true,
            //modalFade: true,
            templateUrl: './templates/modal.html'
        },

        modalOptions: {
            closeButtonText: 'Close',
            actionButtonText: 'OK',
            headerText: 'Proceed?',
            bodyText: 'Perform this action?'
        },

        showModal:function (customModalDefaults, customModalOptions) {
            if (!customModalDefaults) customModalDefaults = {};
            customModalDefaults.backdrop = 'static';
            return this.show(customModalDefaults, customModalOptions);
        },
        show:function (customModalDefaults, customModalOptions, $modal) {
            //Create temp objects to work with since we're in a singleton service
            var tempModalDefaults = {};
            var tempModalOptions = {};

            //Map angular-ui modal custom defaults to modal defaults defined in service
            angular.extend(tempModalDefaults, this.modalDefaults, customModalDefaults);
            //Map modal.html $scope custom properties to defaults defined in service
            angular.extend(tempModalOptions, this.modalOptions, customModalOptions);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = function ($scope, $modalInstance) {
                    $scope.modalOptions = tempModalOptions;
                    $scope.modalOptions.ok = function (result) {                            
                        // this will invoke promise and return result to then()
                        $modalInstance.close(result);   
                    };
                    $scope.modalOptions.close = function (result) {
                        $modalInstance.dismiss('cancel');
                    };
                }                   
            }
                    // displaying the modal dialog
                    // the result is the para of modal.clos(para)
            return this.ml.open(tempModalDefaults).result;
        }
    };

    BaseModal.$inject = ['$modal'];
    /*    
    var MyModal = function() {}; // constructor
    MyModal.prototype = Object.create(BaseModal.prototype);
    MyModal.prototype.constructor = MyModal;

    MyModal.prototype.backdrop=false;    
    */
    // here modalService = new MyModal;
    app.service('modalService', BaseModal);

    app.controller('CustomerEditController', ['$scope', '$location', '$routeParams', '$timeout', 'config', 'dataService', 'modalService',
        function ($scope, $location, $routeParams, $timeout, config, dataService, modalService) {
            $scope.deleteCustomer = function () {

                var custName = $scope.customer.firstName + ' ' + $scope.customer.lastName;

                var modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Delete Customer',
                    headerText: 'Delete ' + custName + '?',
                    bodyText: 'Are you sure you want to delete this customer?'
                };

                modalService.showModal({}, modalOptions).then(function (result) {
                    if (result === 'ok') {
                        dataService.deleteCustomer($scope.customer.id).then(function () {
                            onRouteChangeOff(); //Stop listening for location changes
                            $location.path('/customers');
                        }, processError);
                    }
                });
                    
            }   // deleteCustomer
        } // function    
    ]);

})();
