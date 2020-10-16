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

        new Tabs('adjustment_tabs');
    }

    showEntrances(element, article_id) {

        let position_element = element.closest('.position');
        let i_element = element.querySelector('i');
        let entrance_element = position_element.querySelector('.entrances');

        entrance_element.classList.toggle('d-none');
        position_element.classList.toggle('showed');
        i_element.classList.toggle('fa-angle-down');
        i_element.classList.toggle('fa-angle-up');

        let list_element = this.current_dialog.querySelector('#table-list');

        list_element.querySelectorAll('.position').forEach(item => {

            if(item != position_element) {

                let i_target = item.querySelector('i');
                i_target.classList.add('fa-angle-down');
                i_target.classList.remove('fa-angle-up');

                let entrance_target = item.querySelector('.entrances');
                entrance_target.classList.add('d-none');

                item.classList.remove('showed');
            }
        });
    }

    addField(element, product_id) {

        let target_element = this.current_dialog.querySelector('#new_correct_' + product_id);

        target_element.classList.remove('d-none');

        target_element.querySelectorAll('input').forEach(input => input.disabled = false);

        element.classList.add('d-none');
    }

    removeField(element) {

        let target_element = element.closest('.children_element');

        target_element.classList.add('d-none');

        let target_body = element.closest('.children_body');

        let button_element = target_body.querySelector('.children_button');

        button_element.classList.remove('d-none');
    }

    removeProduct(product_id) {
        let target_element = this.current_dialog.querySelector('#article_' + product_id);
        target_element.remove();

        product_id = parseInt(product_id);

        this.items.forEach((item, index) => {
            if(item.id == product_id) delete this.items[index];
        });

        window.notification.notify( 'success', 'Продукт успешно удалён.');
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

                    let list_element = this.current_dialog.querySelector('#product-list');

                    let html = helper.createElementFromHTML(data.html);

                    list_element.appendChild(html);

                    window.notification.notify( 'success', 'Продукт успешно добавлен.');
                })
                .catch(response => console.log(response));
        }
        else {
            this.removeProduct(product_id);
        }
    }

    save(element) {

        let form_element = this.current_dialog.querySelector('form');

        axform.send(form_element, response => {
            if(response.status === 200) {
                this.fresh(response.data.id);

                window.notification.notify( 'success', 'Корректировка была сохранена.');
            }
        });
    }

    saveAndClose(element) {

        let form_element = this.current_dialog.querySelector('form');

        axform.send(form_element, response => {
            if(response.status == 200) {
                window.notification.notify( 'success', 'Корректировка была сохранена.');

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
