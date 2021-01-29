import Modal from "../Modal/Modal";

class ProviderDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно провайдера инициализировано');
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
    }

    save(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(e){
            if(e.status == 200) object.finitaLaComedia(true);
        });
    }

}
export default ProviderDialog;
