import Modal from "../Modal/Modal";

class providerCartDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно штрихкода инициализировано');
        this.init();
    }

    init(){

    }

    send(element) {

        // let form_element = this.current_dialog.querySelector('form');

        window.axform.send(element, (response) => {
            if(response.status === 200) {
                //
            }
        });
    }
}
export default providerCartDialog;
