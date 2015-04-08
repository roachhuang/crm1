(function(){
    var app = angular.module('mainApp.Services', ['ui.bootstrap']);
    // Constrcutor
    
    var BaseModal = function($modal){ 
        this.modal = $modal;
    };    
    BaseModal.$inject = ['$modal'];
   
    BaseModal.prototype = {
        constructor: BaseModal,
        options: {        
            backdrop: true,
            keyboard: true,           
            templateUrl: './templates/modal.html'
        },
        showModal: function(){
            return this.modal.open(this.options).result;
        }
    };
    
    var LgModal = function($modal) {
        this.modal = $modal;        
        this.options.backdrop = false;        
        //BaseModal.call(this);
    }; // constructor   
    LgModal.$inject = ['$modal'];
    LgModal.prototype = new BaseModal();
    LgModal.prototype.constructor = LgModal;
    LgModal.prototype.options.size = 'sm';

    //BaseModal.$inject = ['$modal'];
    /*    
    var MyModal = function() {}; // constructor
    MyModal.prototype = Object.create(BaseModal.prototype);
    MyModal.prototype.constructor = MyModal;   
    */
    // here modalService = new MyModal();
    app.service('modalService', LgModal);   

})();
