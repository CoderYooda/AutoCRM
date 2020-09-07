import Sortable from "sortablejs";
import Modal from "../Modal/Modal";
import Tabs from "../../Tools/Tabs";

class adjustmentDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно Корректировки инициализировано');
        this.init();
    }

    init() {
        this.items = [];

        this.linked();
    }

    linked() {
        new Tabs('adjustment_tabs');
    }

    showEntrances(element, article_id) {

        let i_element = element.querySelector('i');

        let target_element = this.current_dialog.querySelector('#product_selected_' + article_id);

        target_element.classList.toggle('d-none');
        i_element.classList.toggle('fa-angle-down');
        i_element.classList.toggle('fa-angle-up');

        let list_element = this.current_dialog.querySelector('#table-list');

        list_element.querySelectorAll('.element').forEach(item => {

            let target_item = item.lastElementChild;

            if(target_item != target_element) {

                let i_target = item.querySelector('.toggled').firstElementChild;

                target_item.classList.add('d-none');
                i_target.classList.add('fa-angle-down');
                i_target.classList.remove('fa-angle-up');
            }
        });
    }

    addField(element, product_id) {

        let target_element = this.current_dialog.querySelector('#new_correct_' + product_id);

        target_element.classList.remove('d-none');

        target_element.querySelectorAll('input').forEach(input => input.disabled = false);

        element.closest('tr').classList.add('d-none');


        // let body_element = element.closest('tbody');
        //
        // let tr_element = body_element.querySelector('tr');
        //
        // let tr_copy = tr_element.cloneNode(true);
        //
        // let product_name = 'products[new][' + product_id + ']';
        //
        // let current_count = body_element.querySelectorAll('[name^="' + product_name + '"]:not([disabled])').length;
        //
        // if(current_count >= 3) {
        //     window.notification.notify( 'error', 'Максимальное кол-во добавленных полей: 3.');
        //     return;
        // }
        //
        // let input_element = tr_copy.querySelector('input');
        //
        // input_element.name = product_name;
        // input_element.disabled = false;
        //
        // tr_copy.classList.remove('d-none');
        //
        // element.closest('tr').before(tr_copy);
    }

    removeField(element) {

        element.closest('tr').classList.add('d-none');

        let tbody_element = element.closest('tbody');

        tbody_element.lastElementChild.classList.remove('d-none');

        // element.closest('tr').remove();
    }

    removeProduct(product_id) {
        let target_element = this.current_dialog.querySelector('#article_' + product_id);
        target_element.remove();

        product_id = parseInt(product_id);

        this.items.forEach((item, index) => {
            if(item.id == product_id) delete this.items[index];
        });
    }

    selectProduct() {
        openDialog('selectProduct', '&refer=' + this.current_dialog.id);
    }

    addProduct(element) {

        let product_id = element.dataset.article_id;

        element.classList.toggle('already_selected');

        if(element.classList.contains('already_selected')) {

            window.selectProductDialog.markAsAdded();

            axios.get('/adjustments/search', {
                params: {
                    product_id: product_id,
                    refer: this.current_dialog.id
                }
            })
                .then(response => {

                    this.items.push({ id: parseInt(product_id) });

                    let data = response.data;

                    let list_element = this.current_dialog.querySelector('#table-list');

                    let html = helper.createElementFromHTML(data.html);

                    list_element.append(html);
                })
                .catch(response => console.log(response));
        }
        else {

            let target_element = this.current_dialog.querySelector('#article_' + product_id);
            target_element.remove();
        }
    }

    save(element) {

        window.axform.send(element, response => {
            if(response.status === 200) {
                this.fresh(response.data.id);
            }
        });
    }

    saveAndClose(element) {
        axform.send(element, response => {
            if(response.status == 200) {
                this.finitaLaComedia(true);
            }
        });
    }

    fresh(id) {
        let root_id = this.root_dialog.id;

        this.root_dialog.querySelector('input[name=id]').value = id;
        this.root_dialog.setAttribute('id', 'adjustmentDialog' + id);
        this.root_dialog.setAttribute('data-id', id);

        axios.get('/dialog_adjustmentDialog_open', {
            params: {
                adjustment_id: id,
                inner: 1
            }
        })
            .then(response => {
                this.current_dialog.innerHTML = response.data.html;
                delete window[root_id];
                let drag_dialog = window.dialogs[root_id];
                delete window.dialogs[root_id];
                window.dialogs['adjustmentDialog' + id] = drag_dialog;
                drag_dialog.tag = 'adjustmentDialog' + id;
                window.helper.initDialogMethods();
            })
            .catch(response => {
                console.log(response);
            });
    }
}
export default adjustmentDialog;
