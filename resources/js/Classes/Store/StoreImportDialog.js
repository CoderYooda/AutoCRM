import Modal from "../Modal/Modal";

class storeImportDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно импорта товаров инициализировано');
        this.init();
    }

    init() {

    }

    save() {

        let element = this.current_dialog.querySelector('#form-import');

        console.log(element);

        event.preventDefault();

        let formData = new FormData(element);

        axios({
            url: '/store/import',
            method: 'post',
            data: formData
        })
            .then(response => {
                console.log(response);
            });
    }
}
export default storeImportDialog;
