import Modal from "../Modal/Modal";

class vehicleDialog extends Modal {

    constructor(dialog) {
        super(dialog);

    }

    init() {
        let mark_element = document.getElementById('mark');
        let choices = new choices(mark_element);

        console.log(123);
    }

    linked() {

    }

    save() {

        event.preventDefault();

        let form_element = document.getElementById('save_vehicle_form');

        let data = new FormData(form_element);

        console.log(data);

        window.axios({
            method: 'post',
            url: '/vehicles',
            data: data
        })
            .then(response => {
                window.notification.notify( 'success', 'Транспорт был сохранён.');
            });
    }
}
export default vehicleDialog;
