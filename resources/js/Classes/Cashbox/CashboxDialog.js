import Modal from "../Modal/Modal";

class cashboxDialog extends Modal{

    constructor(dialog){
        super(dialog);
        this.init();
    }

    init(){
        let object = this;
        object.root_dialog.getElementsByTagName('form')[0].addEventListener('keydown',  function(e){
            if (e.which == 13) {
                e.preventDefault();
                object.save(object.root_dialog.getElementsByTagName('form')[0]);
            }
        });
        let focused = document.getElementById('cashbox_dialog_focused');
        if(focused){
            focused.focus();
        }
    }

    save(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.event.preventDefault();
        dd(1);
        window.axform.send(elem, function(e){
            object.finitaLaComedia(true);
        });
    }

}
export default cashboxDialog;
