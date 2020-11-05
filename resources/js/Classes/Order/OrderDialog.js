import Modal from "../Modal/Modal";
import Tabs from "../../Tools/Tabs";

class orderDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Диалог заказа инициализирован');

        this.items = [];

        this.init();
    }

    init() {
        new Tabs('order_tabs');

        this.loadItemsIfExists();
        this.addInputsMask();
        this.addPhoneMask();
    }

    addPhoneMask() {
        let elements = this.current_dialog.querySelectorAll('.phone_input');
        elements.forEach(element => {
            window.IMask(element, {
                    mask: [
                        {
                            mask: '+{7}(000)000-00-00',
                            startsWith: '7',
                            lazy: true,
                            country: 'Россия'
                        },
                        {
                            mask: '{8}(000)000-00-00',
                            startsWith: '8',
                            lazy: true,
                            country: 'Россия'
                        },
                        {
                            mask: '+{380}(000)000-00-00',
                            startsWith: '3',
                            lazy: true,
                            country: 'Украина'
                        },
                    ],
                    dispatch: function (appended, dynamicMasked) {
                        let number = (dynamicMasked.value + appended).replace(/\D/g,'');

                        return dynamicMasked.compiledMasks.find(function (m) {
                            return number.indexOf(m.startsWith) === 0;
                        });
                    }
                }
            )
        });
    }

    addInputsMask()
    {
        let inputs = this.current_dialog.querySelectorAll('.element-list input');

        inputs.forEach(element => {

            let fn = window.helper.debounce(e => this.recalculate(e), 300);

            element.addEventListener("keyup", fn);
            element.addEventListener("change", fn);
            element.addEventListener("paste", fn);
            element.addEventListener("delete", fn);

            this.addInputPriceMask(element);
        });
    }

    recalculate()
    {
        let full_totals = 0;

        this.items.forEach((item, index) => {

            let price_element = this.current_dialog.querySelector('input[name="products[' + item.id + '][price]"]');
            let count_element = this.current_dialog.querySelector('input[name="products[' + item.id + '][count]"]');

            let price = parseFloat(price_element.value);
            let count = parseInt(count_element.value);
            let total = parseFloat(price_element.value * count_element.value);

            this.items[index].price = price;
            this.items[index].count = count;
            this.items[index].total = total;

            full_totals += total;

            let total_element = price_element.closest('.element-item').querySelector('.total_elem');

            total_element.innerHTML = total.toFixed(2);
        });

        let total_element = this.current_dialog.querySelector('#total_price');

        total_element.innerHTML = full_totals.toFixed(2);
    }

    addInputPriceMask(element) {
        let options = {
            mask: Number,
            min: 0,
            max: 9999999,
            radix: '.'
        };

        IMask(element, options);
    }

    loadItemsIfExists(){

        let products = this.root_dialog.querySelectorAll('.element-item');

        products.forEach(product => {
            this.items.push({
                id: parseInt(product.dataset.id),
                count:product.dataset.count,
                price:product.dataset.price,
                total:product.dataset.count * product.dataset.price
            });
        });
    }

    openProductmodal(){
        window.openDialog('selectProduct', '&refer=' + this.root_dialog.id);
    }

    addProduct(elem_or_id, refer = null) {
        window.entity.addProductToList(elem_or_id, this, 'order', this.root_dialog.id);
    }

    addItem(data){
        let product_list = this.root_dialog.querySelector('.element-list');
        this.items.push(data);

        try {
            window.selectProductDialog.markAsAdded();
        }
        catch (e) {
            //console.log(e);
        }

        product_list.insertAdjacentHTML('afterbegin', data.html);

        this.addInputsMask();
        this.recalculate();

        window.notification.notify( 'success', 'Товар добавлен к списку');
    }

    removeProduct(element) {

        let target_element = element.closest('.element-item');

        let product_id = target_element.dataset.id;

        this.items.forEach((item, index) => {

            if(item.id == product_id) {
                this.items.splice(index, 1);
            }
        });

        target_element.remove();
    }

    acceptOrder(element) {
        this.save(element, 1);
    }

    cancelOrder(element) {
        this.save(element, 2);
    }

    save(element, status) {

        let dataset = {
            status: status
        };

        axform.send(element, response => {
            if(response.status == 200) {
                this.fresh();
            }
        }, null, dataset);
    }

    fresh() {

        let id = this.current_dialog.dataset.id;

        axios.get('/dialog_orderDialog_open', {
            params: {
                order_id: id,
                inner: 1
            }
        })
            .then(response => {
                this.current_dialog.innerHTML = response.data.html;
                this.init();
            })
            .catch(response => {

            });
    }
}
export default orderDialog;
