import Modal from "../Modal/Modal";

class vehicleDialog extends Modal {

    constructor(dialog) {
        super(dialog);

        this.mark_choices = null;
        this.model_choices = null;
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

        let mark_element = document.getElementById('mark');
        this.mark_choices = new window.choices(mark_element, config);

        let model_element = document.getElementById('model');
        this.model_choices = new window.choices(model_element, config);
    }

    changeMark() {

        let mark_element = document.getElementById('mark');
        let model_element = document.getElementById('model');

        let mark_id = mark_element.options[mark_element.selectedIndex].value;

        document.getElementsByName('mark_id')[0].value = mark_id;

        window.axios({
            method: 'get',
            url: '/models/' + mark_id + '/list',
        })
            .then(response => {

                let data = response.data;

                this.model_choices.clearChoices();
                this.model_choices.setChoices(data);

                let model_id = data[0].value;

                this.model_choices.setChoiceByValue(model_id);
                this.changeModel();
            });
    }

    changeModel() {
        let model_element = document.getElementById('model');

        let model_id = model_element.options[model_element.selectedIndex].value;

        document.getElementsByName('model_id')[0].value = model_id;
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
