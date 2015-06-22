(function(){
    var app = angular.module('app.core');
    // Constrcutor

    var BaseModal = function($modal){ 
        this.modal = $modal;
        this.options = {
            backdrop: 'static', // true, false, static
            keyboard: true,
            size: 'lg',
            animation: false, 
            templateUrl: './templates/modal.html'
        };
    }

    BaseModal.$inject = ['$modal'];
   
    BaseModal.prototype = {
        constructor: BaseModal,       
        showModal: function(){
            return this.modal.open(this.options).result;
        }
    };
    
    var SmallModal = function($modal) {
        // inherit properties
        BaseModal.call(this, $modal);  
        this.options.size = 'sm';

        //this.options.backdrop = false;        
        //BaseModal.call(this);
    }; // constructor   
    //SmallModal.$inject = ['$modal'];
    SmallModal.prototype = new BaseModal();
    SmallModal.prototype.constructor = SmallModal;
    // SmallModal.prototype.options.size = 'sm';

    //BaseModal.$inject = ['$modal'];
    /*    
    var MyModal = function() {}; // constructor
    MyModal.prototype = Object.create(BaseModal.prototype);
    MyModal.prototype.constructor = MyModal;   
    */
    // here modalService = new smallModal();
    app.service('modalService', SmallModal);  

})();
