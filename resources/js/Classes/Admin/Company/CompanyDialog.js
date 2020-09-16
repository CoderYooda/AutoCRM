import Modal from '../../Modal/Modal'

class CompanyDialog extends Modal {

    constructor(dialog, response) {

        super(dialog);

        this.company = response.company;

        console.log('страница админ компании иниц.');
        this.init();
    }

    init() {
        this.linked();
    }

    linked() {
        this.addPhoneMask();
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
export default CompanyDialog;

