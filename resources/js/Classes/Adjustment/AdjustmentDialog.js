import Sortable from "sortablejs";
import Modal from "../Modal/Modal";

class adjustmentDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно Корректировки инициализировано');
        this.init();
    }

    init() {
        this.items = [];
    }

    selectProduct() {
        openDialog('selectProduct', '&refer=' + this.current_dialog.id);
    }

    addProduct(element, dialog) {

        let product_id = element.dataset.article_id;

        window[dialog].finitaLaComedia(true);

        axios.get('/adjustments/search', {
            params: {
                product_id: product_id
            }
        })
            .then(response => {
                let data = response.data;

                let button_element = this.current_dialog.querySelector('[name="product_id"]');

                button_element.innerText = '';

                let list_element = this.current_dialog.querySelector('#table-list');

                list_element.innerHTML = data.html;
            })
            .catch(response => console.log(response));
    }
}
export default adjustmentDialog;
