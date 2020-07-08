import Modal from "../Modal/Modal";

import IMask from 'imask';

class vehicleDialog extends Modal {

    constructor(dialog) {
        super(dialog);

        this.mark_choices = null;
        this.model_choices = null;
        this.modify_choices = null;
        this.refer = dialog.querySelector('#refer').value;

        this.init();
    }

    init() {

        this.config = {
            loadingText: 'Загрузка...',
            noResultsText: 'Совпадений не найдено',
            noChoicesText: 'Нет вариантов для выбора',
            itemSelectText: 'Нажмите для выбора',
            placeholder: true,
        };

        let mark_element = this.current_dialog.querySelector('#mark');
        this.mark_choices = new window.choices(mark_element, this.config);

        let model_element = this.current_dialog.querySelector('#model');
        this.model_choices = new window.choices(model_element, this.config);

        let modify_element = this.current_dialog.querySelector('#modify');
        this.modify_choices = new window.choices(modify_element, this.config);

        let vin_element = this.current_dialog.querySelector('#vin_code');

        IMask(vin_element, {
            mask: '*****************',
            maxLength: 17,
            prepare: function (str) {
                return str.toUpperCase();
            },
            // lazy: true,
            // placeholderChar: '_'
        });

        let year_element = this.current_dialog.querySelector('#year');

        IMask(year_element, {
            mask: Number,
            min: 1950,
            max: 2030,
        });

        // let numberplate_element = this.current_dialog.querySelector('#numberplate');
        //
        // IMask(numberplate_element, {
        //     mask: 'a000aa00[0]',
        //     maxLength: 9,
        //     lazy: true,
        //     placeholderChar: '_'
        // });

        this.current_dialog.querySelector('#vin_code').focus();
    }

    changeMark() {

        let mark_element = this.current_dialog.querySelector('#mark');

        let mark_id = mark_element.options[mark_element.selectedIndex].value;

        this.current_dialog.querySelector('#mark_id').value = mark_id;

        this.clearModel();
        this.clearModify();

        //Список моделей
        window.axios({
            method: 'get',
            url: '/models/' + mark_id + '/list',
        })
            .then(response => {
                this.model_choices.setChoices(response.data);
            });
    }

    clearModel() {

        this.model_choices.destroy();

        let model_element = this.current_dialog.querySelector('#model');
        this.model_choices = new window.choices(model_element, this.config);
    }

    changeModel() {

        let mark_element = this.current_dialog.querySelector('#mark');
        let mark_id = mark_element.options[mark_element.selectedIndex].value;

        let model_element = this.current_dialog.querySelector('#model');
        let model_id = model_element.options[model_element.selectedIndex].value;

        this.current_dialog.querySelector('#model_id').value = model_id;

        this.clearModify();

        window.axios({
            method: 'get',
            url: '/modifies/' + mark_id + '/' + model_id + '/list',
        })
            .then(response => {
                this.modify_choices.setChoices(response.data);
            });
    }

    clearModify() {
        this.modify_choices.destroy();

        let modify_element = this.current_dialog.querySelector('#modify');
        this.modify_choices = new window.choices(modify_element, this.config);
    }

    changeModify() {
        let modify_element = this.current_dialog.querySelector('#modify');
        let modify_id = modify_element.options[modify_element.selectedIndex].value;

        this.current_dialog.querySelector('#modify_id').value = modify_id;
    }

    save(elem){

        event.preventDefault();

        if(!window.isXHRloading) {
            window.axform.send(elem, event => {
                if(event.status == 200) {
                    let data = event.data;
                    if (this.refer === 'userPage') {
                        document.querySelector('#ajax-user-vehicles').innerHTML = data.html;
                    } else {
                        let refer_dialog = document.querySelector('#' + this.refer);
                        refer_dialog.querySelector('#ajax-partner-vehicles').innerHTML = data.html;
                    }

                    this.finitaLaComedia(true);
                }
            });
        }
    }

}
export default vehicleDialog;
