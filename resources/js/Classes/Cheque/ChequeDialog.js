import Modal from "../Modal/Modal";

class chequeDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно печати ценников инициализировано');

        this.init();
    }

    init(){

    }

    printCheque(elem) {

        let data = {};

        let product_elements = this.current_dialog.querySelectorAll('[name="products[]"]');

        let ids = [];

        product_elements.forEach(input => ids.push(input.value) );

        let count_type = this.current_dialog.querySelector('[name="count_type"]:checked');
        let count = this.current_dialog.querySelector('[name="count"]');
        let cheque_type = this.current_dialog.querySelector('[name="cheque_type"]:checked');
        // let price_source = this.current_dialog.querySelector('[name="price_source"]');

        data.ids = ids;
        data.count_type = count_type.value;
        data.count = count.value;
        // data.price_source = price_source.value;

        helper.printCheque(cheque_type.value, data);
    }
}
export default chequeDialog;
