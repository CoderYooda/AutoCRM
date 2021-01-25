import Modal from "../Modal/Modal";

class Items {

    constructor(obj){
        this.obj = obj;
        this.items = obj.items;
    }

    add(elemWithData, refer){

        let cell_item = window[refer].getProductDataById(elemWithData.dataset.article_id);

        elemWithData.classList.add('already_selected');

        this.obj.addProduct(cell_item.id);
    }
}

class documentDialog extends Modal {

    constructor(dialog, response) {

        super(dialog);
        console.log('Окно документа инициализировано');

        this.documents = response.documents;

        console.log(this.documents);

        this.init();
    }

    init() {

        this.items = new Items(this);
        this.itemses = [];

        console.log(this.items);

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

        let document = this.documents[Number.parseInt(input_element.value)];

        let params = '&refer=' + this.current_dialog.id;

        params += '&isIncoming=' + (document.print == 'in-warrant' ? 1 : 0);

        this.itemses = [];

        openDialog(document.dialog, params);
    }

    selectShipment(shipment_id) {
        this.create(shipment_id, 'ShipmentSelected');
    }

    selectClientOrder(clientorder_id) {
        this.create(clientorder_id, 'ClientOrderSelected');
    }

    selectWarrant(warrant_id) {
        this.create(warrant_id, 'WarrantSelected');
    }

    addProduct(pid) {

        let product_id = pid;

        let isset = this.itemses.map(function (e) {
            return e.id;
        }).indexOf(pid);

        if(isset >= 0){
            window.notification.notify('error', 'Товар уже в списке');
        } else {
            axios.get('/adjustments/search', {
                params: {
                    product_id: product_id,
                    refer: this.current_dialog.id
                }
            })
                .then(response => {

                    this.itemses.push(product_id);

                    window.notification.notify( 'success', 'Продукт успешно добавлен.');
                })
                .catch(response => console.log(response));
        }
    }

    acceptProducts() {
        this.create(-1, 'ProductsSelected');
    }

    create(entity_id, event_name) {
        let id = this.current_dialog.querySelector('.selected input').value;

        let data = {
            id: entity_id,
            doc: this.documents[id].print,
            data: this.itemses
        };

        axios.post('/document', data)
            .then(response => {
                let document = response.data.document;

                helper.openDocument(document.id);
            })
            .catch(error => console.log(error));

        this.finitaLaComedia(true);

        document.dispatchEvent(new Event(event_name, {bubbles: true}));
    }
}

export default documentDialog;
