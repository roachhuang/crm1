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
    
    var SmallModal = function($modal) {
        this.modal = $modal;        
        //this.options.backdrop = false;        
        //BaseModal.call(this);
    }; // constructor   
    SmallModal.$inject = ['$modal'];
    SmallModal.prototype = new BaseModal();
    SmallModal.prototype.constructor = SmallModal;
    SmallModal.prototype.options.size = 'sm';

    //BaseModal.$inject = ['$modal'];
    /*    
    var MyModal = function() {}; // constructor
    MyModal.prototype = Object.create(BaseModal.prototype);
    MyModal.prototype.constructor = MyModal;   
    */
    // here modalService = new MyModal();
    app.service('modalService', SmallModal);   

})();
