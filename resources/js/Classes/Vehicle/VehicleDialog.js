import Modal from "../Modal/Modal";

class vehicleDialog extends Modal {

    constructor(dialog) {
        super(dialog);

        this.mark_choices = null;
        this.model_choices = null;
        this.modify_choices = null;
        this.refer = document.getElementById('refer').value;
        this.init();
    }

    init() {

        let config = {
            loadingText: 'Загрузка...',
            noResultsText: 'Совпадений не найдено',
            noChoicesText: 'Нет вариантов для выбора',
            itemSelectText: 'Нажмите для выбора',
        };

        let mark_element = document.getElementById('mark');
        this.mark_choices = new window.choices(mark_element, config);

        let model_element = document.getElementById('model');
        this.model_choices = new window.choices(model_element, config);

        let modify_element = document.getElementById('modify');
        this.modify_choices = new window.choices(modify_element, config);
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

                let vehicle_element =  document.getElementById('vehicle_item_' + data.vehicle.id);

                if (typeof(vehicle_element) != 'undefined' && vehicle_element != null) vehicle_element.outerHTML = data.html;
                else document.getElementById('vehicle_item_create').before(helper.createElementFromHTML(data.html));

                this.finitaLaComedia(true);
            });
        }
    }

}
export default vehicleDialog;
