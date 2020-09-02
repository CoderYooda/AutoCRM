import Modal from "../Modal/Modal";

class documentDialog extends Modal {

    constructor(dialog, data) {
        super(dialog);
        console.log('Окно документа инициализировано');

        this.documents = data.documents;

        this.init();
    }

    init() {
        let search_element = this.current_dialog.querySelector('[name="search"]');

        search_element.addEventListener('keyup', (event) => {

            let input_element = this.current_dialog.querySelectorAll('.focuseable');

            let search_text = search_element.value.toLowerCase();

            input_element.forEach(element => {

                let text = element.querySelector('span').innerText.toLowerCase();

                if (text.indexOf(search_text) === -1 && search_text.length) {
                    element.classList.add('d-none');
                    element.classList.remove('selected');

                    element.querySelector('input').checked = false;
                } else {
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

        let params = '&refer=' + this.current_dialog.id;

        params += '&isIncoming=' + (document.print == 'in-warrant' ? 1 : 0);

        this.items = [];

        openDialog(document.dialog, params);
    }

    selectShipment(shipment_id) {
        this.print(shipment_id, 'ShipmentSelected');
    }

    selectClientOrder(clientorder_id) {
        this.print(clientorder_id, 'ClientOrderSelected');
    }

    selectWarrant(warrant_id) {
        this.print(warrant_id, 'WarrantSelected');
    }

    addProduct(element) {

        let product_id = element.dataset.article_id;

        let toggle = element.classList.toggle('already_selected');

        if (toggle) {
            this.items.push(product_id);
        } else {
            this.items.remove(product_id);
        }
    }

    acceptProducts() {
        this.print(-1, 'ProductsSelected');
    }

    print(entity_id, event_name) {
        let id = this.current_dialog.querySelector('.selected input').value;

        helper.printDocument(this.documents[id].print, entity_id, this.items);

        this.finitaLaComedia(true);

        document.dispatchEvent(new Event(event_name, {bubbles: true}));
    }
}

export default documentDialog;
