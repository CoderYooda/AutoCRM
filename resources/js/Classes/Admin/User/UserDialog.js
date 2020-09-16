import Modal from '../../Modal/Modal'
import Tabs from "../../../Tools/Tabs";

class UserDialog extends Modal {

    constructor(dialog, response) {

        super(dialog);

        this.user = response.user;

        console.log('страница админ пользователя иниц.');
        this.init();
    }

    init() {
        this.linked();
    }

    linked() {
        this.addPhoneMask();

        new Tabs('user_tabs');
    }

    sendMessage(element) {

        togglePreloader(element, true);

        let message_element = this.current_dialog.querySelector('[name="message"]');

        let data = {
            user_id: this.user.id,
            message: message_element.value
        };

        window.axios({
            method: 'post',
            url: '/admin/system_message/send',
            data: data
        }).then(resp => {
            //
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            togglePreloader(element, false);
            message_element.value = '';
        });
    }

    save(element) {
        if(window.isXHRloading) return;

        window.axform.send(element, e => {
            if(e.status === 200) this.finitaLaComedia(true);
        });
    }

    addPhoneMask(){
        let phone = document.querySelector('[name="phone"]');
        this.phoneMask = window.IMask(phone, {
                mask: '+{7}(000)000-00-00',
                lazy: false,
                placeholderChar: '_',
            }
        )
    }
}
export default UserDialog;

