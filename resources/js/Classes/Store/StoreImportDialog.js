import Modal from "../Modal/Modal";

class storeImportDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно импорта товаров инициализировано');
        this.init();
    }

    init() {

    }

    openFileSelector() {

        event.preventDefault();

        let file_input = this.current_dialog.querySelector('[name=file]');
        let name_input = this.current_dialog.querySelector('#file-name');

        file_input.click();
        name_input.value = '';
    }

    changeFile(element) {

        let input = this.current_dialog.querySelector('#file-name');

        input.value = element.files[0].name;
    }

    selectStore(element, store_id) {
        let input_id = this.current_dialog.querySelector('[name=id]');

        input_id.value = store_id;

        let button_name = this.current_dialog.querySelector('#store-name');
        button_name.value = element.innerText;
    }

    save() {

        event.preventDefault();

        let element = this.current_dialog.querySelector('#form-import');

        let formData = new FormData(element);

        const config = {
            onUploadProgress: progressEvent => this.uploadProgress(progressEvent)
        };

        let elements = this.current_dialog.querySelector('#hide-inputs');
        elements.style.display = 'none';

        let progressbar_element = this.current_dialog.querySelector('#progressbar');
        progressbar_element.style.display = 'inline-block';

        axios.post( '/store/import', formData, config)
        .then(response => {

        })
        .catch(response => {
            elements.style.display = 'block';
        })
        .then(() => {
            progressbar_element.style.display = 'none';
        });
    }

    uploadProgress(event) {

        let percent = (event.total / event.loaded) * 100;

        let element = this.current_dialog.querySelector('#progressbar');

        element.value = percent;
    }
}
export default storeImportDialog;
