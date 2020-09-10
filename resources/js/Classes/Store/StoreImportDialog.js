import Modal from "../Modal/Modal";

class storeImportDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно импорта товаров инициализировано');
        this.init();
    }

    init() {
        let element = this.current_dialog.querySelector('img');

        let desc = '1. Название: Строка или пустое поле.<br> \
            2. Производитель: Строка *.<br>\
            3. Артикул: Строка *.<br> \
            4. Категории: Пустота или названия через запятую.<br> \
            5. Расположение товара на складе(Зона хранения, Номер стеллажа, Номер вертикальной секции \
            стеллажа, Номер полки): Пустота или через запятую значения с длиной до 2-ух символов.<br>\
            6. Количество: Пустота или число.<br>\
            7. Средняя цена: Пустота или число.<br>\
            8. Штрих-код производителя: Пустота или строка.<br>\
            9. Штрих-код на складе: Пустота или строка.';

        tippy(element, {
            content: desc,
            placement: 'bottom',
            theme: 'light'
        });
    }

    incrementImportPercent(percent) {
        console.log('percent', percent);

        let element_text = this.current_dialog.querySelector('#info-text');
        element_text.innerText = 'Обработано на ' + percent + '%';

        let progressbar_element = this.current_dialog.querySelector('#progressbar');
        progressbar_element.value = percent;
    }

    finishUpload(info, response_html) {

        console.log('info', info);

        let progressbar_element = this.current_dialog.querySelector('#progressbar');
        progressbar_element.parentElement.classList.add('d-none');

        let result_element = this.current_dialog.querySelector('#result-inputs');
        result_element.classList.remove('d-none');

        //Дубликаты
        let html = '';

        info.duplicates.forEach(item => {
            html += '<div class="d-flex">';
            html += '   <div style="width: 100px;">' + item.line + '</div>';
            html += '   <div class="ml-15">' + item.article + '</div>';
            html += '</div>';
        });

        let duplicate_list = this.current_dialog.querySelector('#duplicate-list');

        duplicate_list.innerHTML = html;

        //Ошибки

        html = '';

        info.errors.forEach(item => {
            html += '<div class="d-flex">';
            html += '   <div style="width: 100px;">' + item.line + '</div>';
            html += '   <div class="ml-15">' + item.article + '</div>';
            html += '</div>';
        });

        let error_list = this.current_dialog.querySelector('#error-list');

        error_list.innerHTML = html;

        document.getElementById('ajax-table-imports').innerHTML = response_html;
    }

    openFileSelector() {

        event.preventDefault();

        let file_input = this.current_dialog.querySelector('[name=file]');
        let name_input = this.current_dialog.querySelector('#file-name');

        file_input.click();
        name_input.value = 'Название файла';
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

    save(save_element) {

        event.preventDefault();

        save_element.disabled = true;

        let element = this.current_dialog.querySelector('#form-import');

        let formData = new FormData(element);

        const config = {
            onUploadProgress: progressEvent => this.uploadProgress(progressEvent)
        };

        let elements = this.current_dialog.querySelector('#post-inputs');
        elements.classList.add('d-none');

        let progressbar_element = this.current_dialog.querySelector('#progressbar');
        progressbar_element.parentElement.classList.remove('d-none');

        axios.post( '/store/import', formData, config)
        .then(response => {
            console.log('file upload success');

            let element = this.current_dialog.querySelector('#progressbar');
            element.value = 0;

            let element_text = this.current_dialog.querySelector('#info-text');
            element_text.innerText = 'Обработано на 0%';
        })
        .catch(response => {
            elements.classList.remove('d-none');
            save_element.disabled = false;
        })
        .then(() => {

        });
    }

    uploadProgress(event) {

        let percent = (event.total / event.loaded) * 100;

        console.log('upload', percent);

        let element = this.current_dialog.querySelector('#progressbar');
        element.value = percent;

        let element_text = this.current_dialog.querySelector('#info-text');
        element_text.innerText = 'Загружено на ' + percent + '%';
    }

    showInfoList(element) {

        let element_list = element.closest('.form-group').querySelector('.list');

        element_list.classList.toggle('d-none');
    }


}
export default storeImportDialog;
