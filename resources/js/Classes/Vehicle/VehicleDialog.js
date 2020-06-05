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
        };

        //TODO rewrite document to current_dialog
        let mark_element = this.current_dialog.querySelector('#mark');
        this.mark_choices = new window.choices(mark_element, config);

        let model_element = document.getElementById('model');
        this.model_choices = new window.choices(model_element, config);

        let modify_element = document.getElementById('modify');
        this.modify_choices = new window.choices(modify_element, config);

        let vin_element = document.getElementById('vin_code');

        IMask(vin_element, {
            mask: '*****************',
            maxLength: 17,
            lazy: false,
            placeholderChar: '_'
        });

        let year_element = document.getElementById('year');

        IMask(year_element, {
            mask: Number,
            min: 1950,
            max: 2030,
        });

        let numberplate_element = document.getElementById('numberplate');

        IMask(numberplate_element, {
            mask: 'a000aa00[0]',
            maxLength: 9,
            lazy: false,
            placeholderChar: '_'
        });

        //^[A-HJ-NPR-Z\\d]{8}[\\dX][A-HJ-NPR-Z\\d]{2}\\d{6}$
    }

    parserVinCode() {
        let vin_code = document.getElementById('vin_code').value;


    }

    changeMark() {

        let mark_element = document.getElementById('mark');
        let model_element = document.getElementById('model');

        let mark_id = mark_element.options[mark_element.selectedIndex].value;
        let model_id = model_element.options[model_element.selectedIndex].value;

        document.getElementsByName('mark_id')[0].value = mark_id;

        //Список моделей
        window.axios({
            method: 'get',
            url: '/models/' + mark_id + '/list',
        })
            .then(response => {

                let data = response.data;

                this.model_choices.clearChoices();
                this.model_choices.setChoices(data);

                model_id = data[0].value;

                this.model_choices.setChoiceByValue(model_id);
                this.changeModel();
            });
    }

    changeModel(model_id = null) {
        let model_element = document.getElementById('model');

        if(model_id == null) {
            model_id = model_element.options[model_element.selectedIndex].value;
        }

        document.getElementsByName('model_id')[0].value = model_id;

        //Обновление списка модификаций

        let mark_element = document.getElementById('mark');
        let mark_id = mark_element.options[mark_element.selectedIndex].value;

        //Список модификаций
        window.axios({
            method: 'get',
            url: '/modifies/' + mark_id + '/' + model_id + '/list',
        })
            .then(response => {

                let data = response.data;

                this.modify_choices.clearChoices();
                this.modify_choices.setChoices(data);

                let modify_id = data[0].value;

                this.modify_choices.setChoiceByValue(modify_id);

                this.changeModify();
            });
    }

    changeModify(modify_id = null) {
        let modify_element = document.getElementById('modify');

        if(modify_id == null) {
            modify_id = modify_element.options[modify_element.selectedIndex].value;
        }

        document.getElementsByName('modify_id')[0].value = modify_id;
    }

    save(elem){

        event.preventDefault();

        if(!window.isXHRloading){

            window.axform.send(elem, response => {
                let data = response.data;
                this.finitaLaComedia(true);

                let vehicle_element =  document.getElementById('vehicle_item_' + data.vehicle.id);
                if (typeof(vehicle_element) != 'undefined' && vehicle_element != null) vehicle_element.outerHTML = data.html;
                else document.getElementById('vehicle_item_create').before(helper.createElementFromHTML(data.html));
            });
        }
    }

}
export default vehicleDialog;
