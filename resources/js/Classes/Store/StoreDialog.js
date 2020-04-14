import Modal from "../Modal/Modal";

class storeDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно штрихкода инициализировано');
        this.active = true;
        this.init();
    }

    init(){
        let object = this;
        document.addEventListener("StoreStored", function(){
            object.finitaLaComedia();
        });
        let focused = document.getElementById('store_dialog_focused');
        if(focused){
            focused.focus();
        }
    }

    save(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(e){
            object.finitaLaComedia(true);
        });
    }


}
export default storeDialog;
