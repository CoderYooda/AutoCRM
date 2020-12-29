import Modal from "../Modal/Modal";

class PriceDialog extends Modal {

    constructor(dialog){
        super(dialog);
        console.log('Окно наценки инициализировано');
        this.init();
    }

    init() {

    }

    addField(element) {

        let target_element = this.current_dialog.querySelector('.position').cloneNode(true);

        let body_element = this.current_dialog.querySelector('.body');

        body_element.append(target_element);

        this.recalculate();
    }

    removeField(element) {

        let positions = this.current_dialog.querySelectorAll('.position');

        if(positions.length < 2) {
            window.notification.notify('error', 'Должен быть минимум один диапазон.');
            return;
        }

        let target_element = element.closest('.position');

        target_element.remove();

        this.recalculate();
    }

    saveAndClose(element) {

        axform.send(element, response => {
            if(response.status == 200) {
                this.finitaLaComedia(true);
            }
        });
    }

    recalculate() {

        let names = [
            'from',
            'to',
            'percent'
        ];

        let positions = this.current_dialog.querySelectorAll('.position');

        positions.forEach((position, index) => {
            let input_elements = position.querySelectorAll('input');

            input_elements.forEach((input_element, input_index) => {
                input_element.name = 'prices[' + index + '][' + names[input_index] + ']';
            });
        });
    }
}
export default PriceDialog;
