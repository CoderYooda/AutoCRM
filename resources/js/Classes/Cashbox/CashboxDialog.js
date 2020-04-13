import Modal from "../Modal/Modal";

class cashboxDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно штрихкода инициализировано');
        this.active = true;
        this.init();

    }

    init(){
        let object = this;
        document.addEventListener("CashboxStored", function(){
            object.finitaLaComedia();
        });
        let focused = document.getElementById('cashbox_dialog_focused');
        if(focused){
            focused.focus();
        }
    }

    save(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(e){
            object.finitaLaComedia();
        });
    }

}
export default cashboxDialog;
