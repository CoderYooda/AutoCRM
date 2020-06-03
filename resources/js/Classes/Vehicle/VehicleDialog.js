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

        let mark_element = document.getElementById('mark');
        this.mark_choices = new window.choices(mark_element);

        let model_element = document.getElementById('model');
        this.model_choices = new window.choices(model_element);

        console.log(this.refer);
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

    save() {

        event.preventDefault();

        let form_element = document.getElementById('save_vehicle_form');

        let data = new FormData(form_element);

        window.axios({
            method: 'post',
            url: '/vehicles',
            data: data
        })
            .then(response => {

                let data = response.data;

                //window.notification.notify( 'success', 'Транспорт был сохранён.');

                console.log(data.partner_id);

                if(data.partner_id === undefined) {
                    window[this.refer].vehicles.push(data.id);
                }

                this.finitaLaComedia();
            });
    }
}
export default vehicleDialog;
