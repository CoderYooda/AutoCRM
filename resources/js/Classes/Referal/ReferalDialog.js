import Modal from '../Modal/Modal.js';
import Tabs from "../../Tools/Tabs";

class ReferalDialog extends Modal {

    constructor(dialog, response) {
        super(dialog);
        console.log('Окно создания Реферала инициализировано');
        this.init();
    }

    init() {
        this.linked();
    }


    linked()
    {
    }

    save(elem) {
        if (window.isXHRloading) return;

        window.axform.send(elem, (e) => {
            if (e.status === 200) this.finitaLaComedia(true);
        });
    }

}

export default ReferalDialog;
