import Modal from '../Modal/Modal.js';
import Tabs from "../../Tools/Tabs";

class ReferalDialog extends Modal {

    constructor(dialog, response) {
        super(dialog);
        console.log('Окно создания Реферала инициализировано');
        this.init();
    }

    init() {
        this.addPhoneMask();
        this.linked();
    }


    linked()
    {
    }

    addPhoneMask(){
        let phone = document.querySelector('#phone_input');
        this.phoneMask = window.IMask(phone, {

                mask: '+{7}(000)000-00-00',
                lazy: false,
                placeholderChar: '_',

                dispatch: function (appended, dynamicMasked) {
                    var number = (dynamicMasked.value + appended).replace(/\D/g,'');

                    return dynamicMasked.compiledMasks.find(function (m) {
                        return number.indexOf(m.startsWith) === 0;
                    });
                }
            }
        );
        document.getElementById('phone_input').focus();
    }

    save(elem) {
        if (window.isXHRloading) return;

        window.axform.send(elem, (e) => {
            if (e.status === 200) this.finitaLaComedia(true);
        });
    }

}

export default ReferalDialog;
