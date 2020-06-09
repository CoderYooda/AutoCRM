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

        let config = {
            loadingText: 'Загрузка...',
            noResultsText: 'Совпадений не найдено',
            noChoicesText: 'Нет вариантов для выбора',
            itemSelectText: 'Нажмите для выбора',
            placeholder: true,
        };

        let mark_element = this.current_dialog.querySelector('#mark');
        this.mark_choices = new window.choices(mark_element, config);

        let model_element = this.current_dialog.querySelector('#model');
        this.model_choices = new window.choices(model_element, config);

        let modify_element = this.current_dialog.querySelector('#modify');
        this.modify_choices = new window.choices(modify_element, config);

        let vin_element = this.current_dialog.querySelector('#vin_code');

        IMask(vin_element, {
            mask: '*****************',
            maxLength: 17,
            lazy: false,
            placeholderChar: '_'
        });

        let year_element = this.current_dialog.querySelector('#year');

        IMask(year_element, {
            mask: Number,
            min: 1950,
            max: 2030,
        });

        let numberplate_element = this.current_dialog.querySelector('#numberplate');

        IMask(numberplate_element, {
            mask: 'a000aa00[0]',
            maxLength: 9,
            lazy: false,
            placeholderChar: '_'
        });
    }

    parserVinCode() {
        let vin_code = this.current_dialog.querySelector('#vin_code').value;


    }

    changeMark() {

        let mark_element = this.current_dialog.querySelector('#mark');

        let mark_id = mark_element.options[mark_element.selectedIndex].value;

        this.current_dialog.querySelector('#mark_id').value = mark_id;

        this.model_choices.clearChoices();
        this.modify_choices.clearChoices();

        //Список моделей
        window.axios({
            method: 'get',
            url: '/models/' + mark_id + '/list',
        })
            .then(response => {
                this.model_choices.setChoices(response.data);
            });
    }

    changeModel() {

        let mark_element = this.current_dialog.querySelector('#mark');
        let mark_id = mark_element.options[mark_element.selectedIndex].value;

        let model_element = this.current_dialog.querySelector('#model');
        let model_id = model_element.options[model_element.selectedIndex].value;

        this.current_dialog.querySelector('#model_id').value = model_id;

        this.modify_choices.clearChoices();

        window.axios({
            method: 'get',
            url: '/modifies/' + mark_id + '/' + model_id + '/list',
        })
            .then(response => {
                this.modify_choices.setChoices(response.data);
            });
    }

    changeModify() {
        let modify_element = this.current_dialog.querySelector('#modify');
        let modify_id = modify_element.options[modify_element.selectedIndex].value;

        this.current_dialog.querySelector('#modify_id').value = modify_id;
    }

    save(elem){

        event.preventDefault();

        if(!window.isXHRloading){

            window.axform.send(elem, response => {
                let data = response.data;
                let vehicle_element =  this.current_dialog.querySelector('#vehicle_item_' + data.vehicle.id);

                this.finitaLaComedia(true);

                if (typeof(vehicle_element) != 'undefined' && vehicle_element != null) vehicle_element.outerHTML = data.html;
                else this.current_dialog.querySelector('#vehicle_item_create').before(helper.createElementFromHTML(data.html));
            });
        }
    }

}
export default vehicleDialog;
