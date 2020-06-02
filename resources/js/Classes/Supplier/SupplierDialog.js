import Modal from "../Modal/Modal";

class SupplierDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно штрихкода инициализировано');
        this.init();
    }

    init(){
        let object = this;
        let focused = document.getElementById('supplier_dialog_focused');
        if(focused){
            focused.focus();
        }
        object.root_dialog.getElementsByTagName('form')[0].addEventListener('keydown',  function(e){
            if (e.which == 13) {
                e.preventDefault();
                object.save(object.root_dialog.getElementsByTagName('form')[0]);
            }
        });
    }

    save(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(e){
            object.finitaLaComedia(true);
        });
    }

}
export default SupplierDialog;
