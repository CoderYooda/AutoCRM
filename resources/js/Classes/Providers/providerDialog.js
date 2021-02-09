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
    activateTab(elem, type) {

        let ids = {'fl': 0, 'ip': 1, 'ul': 2 };

        this.current_dialog.querySelector('[name="type"]').value = ids[type];

        let button_elements = this.current_dialog.querySelectorAll('.header_selects_navs a');

        button_elements.forEach(element => element.classList.remove('active'));
        elem.classList.add('active');

        let tab_elements = this.current_dialog.querySelectorAll('[role="tab"]');

        tab_elements.forEach(element => {
            element.classList.add('d-none');

            if(element.classList.contains(type)) {
                element.classList.remove('d-none');
            }
        });

        let category_id = this.current_dialog.querySelector('[name="category_id"]').value;
        if(category_id != 7) this.current_dialog.querySelector('#vehicle_tab').classList.add('d-none');

        let field_elements = this.current_dialog.querySelectorAll('.tab-content .form-group');

        field_elements.forEach(element => {

            element.classList.add('d-none');

            if(element.classList.contains(type)) {
                element.classList.remove('d-none');
            }

            let input = element.querySelector('input');
            if(input) input.disabled = element.classList.contains('d-none') || element.closest('.form-group').classList.contains('hide');
        });

        let input = this.current_dialog.querySelector('.active .form-group input[type="text"]:not([disabled])');
        if(input) input.focus();
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
