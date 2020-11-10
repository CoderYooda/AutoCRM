import Modal from "../Modal/Modal";
import Tabs from "../../Tools/Tabs";
import BBlist from "../BBitems";

class orderDialog extends Modal {

    constructor(dialog) {
        super(dialog);
        console.log('Диалог заказа инициализирован');

        this.init();
    }

    init() {
        new Tabs('order_tabs', false);

        let header = [
            {min_with: 80, width: 100, name: 'Источник', table_name: 'source', type: 'hidden-text'},
            {min_with: 100, width: 140, name: 'Наименование', table_name: 'name', type: 'hidden-text'},
            {min_with: 100, width: 100, name: 'Артикул', table_name: 'article', type: 'hidden-text'},
            {min_with: 100, width: 100, name: 'Производитель', table_name: 'manufacturer', type: 'hidden-text'},
            {min_with: 65, width: 65, name: 'Кол-во', table_name: 'count', type: 'counter'},
            {min_with: 80, width: 80, name: 'Цена', table_name: 'price', type: 'price'},
            {min_with: 80, width: 80, name: 'Всего', table_name: 'total', type: 'passive'},
        ];
        this.items = new BBlist(this, 'order_list', 'products', header);

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
                        let number = (dynamicMasked.value + appended).replace(/\D/g, '');

                        return dynamicMasked.compiledMasks.find(function (m) {
                            return number.indexOf(m.startsWith) === 0;
                        });
                    }
                }
            )
        });
    }

    openProductmodal() {
        window.openDialog('selectProduct', '&refer=' + this.root_dialog.id);
    }

    addProduct(elem_or_id, refer = null) {
        window.entity.addProductToList(elem_or_id, this, 'order', this.root_dialog.id);
    }

    acceptOrder(element) {
        this.save(element, 'accept');
    }

    cancelOrder(element) {
        this.save(element, 'cancel');
    }

    save(element, status) {

        let dataset = {
            status: status
        }

        axform.send(element, response => {
            if (response.status == 200) {
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
