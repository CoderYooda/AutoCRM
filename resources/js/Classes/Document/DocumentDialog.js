import Modal from "../Modal/Modal";

class documentDialog extends Modal{

    constructor(dialog, data){
        super(dialog);
        console.log('Окно документа инициализировано');

        this.documents = data.documents;

        this.init();
    }

    init(){
        let search_element = this.current_dialog.querySelector('[name="search"]');

        search_element.addEventListener('keyup',  (event) => {

            let input_element = this.current_dialog.querySelectorAll('.focuseable');

            let search_text = search_element.value.toLowerCase();

            input_element.forEach(element => {

                let text = element.querySelector('span').innerText.toLowerCase();

                if(text.indexOf(search_text) === -1 && search_text.length) {
                    element.classList.add('d-none');
                    element.classList.remove('selected');

                    element.querySelector('input').checked = false;
                }
                else {
                    element.classList.remove('d-none');
                }
            });
        });
    }

    select(element) {

        let block_element = this.current_dialog.querySelectorAll('.focuseable');

        block_element.forEach(block => {
            block.classList.remove('selected');
        });

        element.classList.add('selected');

        let input_element = element.querySelector('input');

        input_element.checked = true;

        let document = this.documents[input_element.value];

        openDialog(document.dialog, '&refer=' + this.current_dialog.id);
    }

    selectShipment(shipment_id) {

        let id = this.current_dialog.querySelector('.selected input').value;

        helper.printDocument(this.documents[id].print, shipment_id);

        window.selectShipmentDialog.finitaLaComedia(true);

        this.finitaLaComedia(true);
    }

    selectClientOrder(clientorder_id)
    {
        console.log(clientorder_id);
    }
}
export default documentDialog;
