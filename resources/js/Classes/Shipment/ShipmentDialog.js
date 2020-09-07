import Modal from "../Modal/Modal";
import Helper from "../Helper";

class shipmentDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно штрихкода инициализировано');
        this.items = [];
        this.nds = true;
        this.totalPrice = 0.0;
        this.itogo = 0.0;
        this.refer = null;

        this.init();
    }

    scanOperation(product_id){
        this.addProduct(product_id);
    }

    addProduct(elem_or_id, refer = null){
        let object = this;
        window.entity.addProductToList(elem_or_id, this, 'shipment');
        if(refer != null){
            object.refer = refer;
        }
    };

    printScore() {
        let id = this.root_dialog.querySelector('input[name=id]').value;

        window.helper.printDocument('shipment-score', id);
    }

    printUpd() {
        let id = this.root_dialog.querySelector('input[name=id]').value;

        window.helper.printDocument('shipment-upd', id);
    }

    getPayment(){
        let warrant_type = 'sale_of_goods';
        let partner = this.root_dialog.querySelector('input[name=partner_id]').value;
        let refer = 'Shipment';
        let refer_id = this.root_dialog.querySelector('input[name=id]').value;
        let itogo = this.root_dialog.querySelector('input[name=itogo]').value;
        let ostatok = this.root_dialog.querySelector('input[name=ostatok]').value;
        let id = this.root_dialog.querySelector('input[name=id]').value;
        partner = parseInt(partner);
        //console.log(partner);
        var params = '';
        if(partner !== null){
            params += '&partner_id='+partner;
        }
            params += '&warrant_type='+warrant_type;

        if(itogo != null){
            params += '&itogo='+itogo;
        }
        if(ostatok != null){
            params += '&ostatok='+ostatok;
        }

        params += '&refer='+refer;

        if(refer_id != null){
            params += '&refer_id='+refer_id;
        }
        if(id != null){
            let reason = 'Реализация товара №' + id;
            params += '&reason='+reason;
        }

        openDialog('warrantDialog', '&isIncoming=1'+params);
    }

    getBackPayment(){
        let warrant_type = 'sale_of_goods';
        let partner = this.root_dialog.querySelector('input[name=partner_id]').value;
        let itogo = this.root_dialog.querySelector('input[name=itogo]').value;
        let ostatok = this.root_dialog.querySelector('input[name=ostatok]').value;
        let id = this.root_dialog.querySelector('input[name=id]').value;
        let refer = 'shipment';
        let refer_id = this.root_dialog.querySelector('input[name=id]').value;
        partner = parseInt(partner);
        var params = '';

        if(partner !== null){
            params += '&partner_id='+partner;
        }
        if(warrant_type != null){
            params += '&warrant_type='+warrant_type;
        }
        if(itogo != null){
            params += '&itogo='+itogo;
        }
        if(id != null){
            let reason = 'Возврат средств по продаже №' + id;
            params += '&reason='+reason;
        }
        if(refer != null){
            params += '&refer='+refer;
        }
        if(ostatok != null){
            params += '&ostatok='+Math.abs(ostatok);
        }
        if(refer_id != null){
            params += '&refer_id='+refer_id;
        }
        openDialog('warrantDialog', '&isIncoming=0'+params);
    }

    init(){
        let object = this;

        let fn = window.helper.debounce(e => this.recalculate(e), 300);
        ///Вешаем обрабочик на поле скидки/////////////
        let discount = object.root_dialog.querySelector('input[name=discount]');
        discount.addEventListener("keyup", fn);
        discount.addEventListener("paste", fn);
        discount.addEventListener("delete", fn);
        ////////////////////////////////////////////////

        ///Вешаем обработчик на чекбокс/////////////////
        let inpercents = object.root_dialog.querySelector('input[name=inpercents]');
        inpercents.addEventListener("change", fn);
        ////////////////////////////////////////////////

        this.loadItemsIfExists();

        object.root_dialog.querySelector('form').addEventListener('keyup',  function(e){
            if (e.which == 13) {
                e.preventDefault();
                object.save(object.root_dialog.getElementsByTagName('form')[0]);
            }
        });

        object.root_dialog.querySelector('form').addEventListener('WarrantStored',  function(){
            let id = object.root_dialog.querySelector('input[name=id]').value;
            if(id !== null){
                let root_id = object.root_dialog.id;
                object.freshContent(id,function(){
                    delete window[root_id];
                    window.helper.initDialogMethods();
                });
            }
        });

        object.root_dialog.querySelector('form').addEventListener('ShipmentStored',  function(){
            let id = object.root_dialog.querySelector('input[name=id]').value;
            if(id !== null){
                let root_id = object.root_dialog.id;
                object.freshContent(id,function(){
                    delete window[root_id];
                    window.helper.initDialogMethods();
                });
            }
        });

        // object.root_dialog.querySelector('form').addEventListener('PartnerSelected',  function(){
        //
        // });
    }

    save(elem){
        window.event.preventDefault();
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, (resp) => {
            if(resp.status == 200) {
                let root_id = this.root_dialog.id;
                this.root_dialog.querySelector('input[name=id]').value = resp.data.id;
                this.root_dialog.setAttribute('id', 'shipmentDialog' + resp.data.id);
                this.root_dialog.setAttribute('data-id', resp.data.id);
                this.freshContent(resp.data.id, function () {
                    delete window[root_id];
                    let drag_dialog = window.dialogs[root_id];
                    delete window.dialogs[root_id];
                    window.dialogs['shipmentDialog' + resp.data.id] = drag_dialog;
                    drag_dialog.tag = 'shipmentDialog' + resp.data.id;
                    window.helper.initDialogMethods();
                    // this.finitaLaComedia(true);
                    // this.getPayment();
                });
            }
        });
    }

    saveAndClose(elem){
        if(window.isXHRloading) return;

        window.axform.send(elem, (resp) => {
            if(resp.status == 200) object.finitaLaComedia(true);
        });
    }

    freshContent(id, callback = null){
        let object = this;

        let data = {};

        if(object.refer){
            data.refer = object.refer;
        }

        window.axios({
            method: 'post',
            url: 'shipment/' + id + '/fresh',
            data: data,
        }).then(function (resp) {
            document.getElementById(resp.data.target).innerHTML = resp.data.html;
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            callback();
        });
    }

    loadItemsIfExists(){

        let products = this.root_dialog.querySelectorAll('.product_list_elem');

        [].forEach.call(products, product => {
                this.items.push({
                    id:product.dataset.id,
                    count:product.dataset.count,
                    price:product.dataset.price,
                    total:product.dataset.total,
                });

                let inputs = product.querySelectorAll('input');

                [].forEach.call(inputs, elem => {

                    let fn = window.helper.debounce(e => this.recalculate(e), 300);

                    elem.addEventListener("keyup", fn);
                    elem.addEventListener("change", fn);
                    elem.addEventListener("paste", fn);
                    elem.addEventListener("delete", fn);

                    this.addInputPriceMask(elem);
                });
        });

        this.recalculate();
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

    setTotalPrice(count){
        let container = this.root_dialog.querySelector('#total_price');
        container.innerHTML = Number(count).toFixed(2);
    }

    setItogo(count){
        let container = this.root_dialog.querySelector('#itogo_price');
        let container2 = this.root_dialog.querySelector('#payed_price');
        container.innerHTML = Number(count).toFixed(2);
        if(container2){
            container2.innerHTML = Number(count).toFixed(2);
        }
    }

    setDiscount(count){
        let container = this.root_dialog.querySelector('#percents_price');
        container.innerHTML = count;
    }

    addItem(elem){
        let object = this;
        let product_list = this.root_dialog.querySelector('.product_list');
        this.items.push(elem);

        try{
            window.selectProductDialog.markAsAdded();
        }catch (e) {
            //console.log(e);
        }

        product_list.insertAdjacentHTML('afterbegin', elem.html);

        window.notification.notify( 'success', 'Товар добавлен к списку');
        let item = this.root_dialog.querySelector('#product_selected_' + elem.id);
        let inputs = item.getElementsByTagName('input');

        [].forEach.call(inputs, input => {

            let fn = window.helper.debounce(e => object.recalculate(e), 300);

            input.addEventListener("keyup", fn);
            input.addEventListener("paste", fn);
            input.addEventListener("delete", fn);

            this.addInputPriceMask(input);

            if(input.name == 'products[' + elem.id + '][count]') {

                let getPriceFromServer = window.helper.debounce(e => this.getPriceFromServer(elem.id, input), 300);

                input.addEventListener("keyup", getPriceFromServer);
                input.addEventListener("paste", getPriceFromServer);
                input.addEventListener("delete", getPriceFromServer);
            }
        });
        this.recalculate();
    }

    anonymousBuyerToggle(element) {

        let select_element = document.querySelector('button[name="partner_id"]');

        select_element.disabled = element.checked;

        if(element.checked) {
            this.current_dialog.querySelector('input[name="partner_id"]').value = '';
            this.current_dialog.querySelector('button[name="partner_id"]').innerText = 'Нажмите для выбора';
        }

        element.blur(); //fix barcode
    }

    getPriceFromServer(id, input) {

        axios.post('/product/' + id + '/price', {
            count: input.value
        })
        .then(response => {

            if(Number(response.data.price)) {
                this.current_dialog.querySelector('[name="products[' + id + '][price]"').value = response.data.price;
                this.recalculateItem(id);
            }
        })
        .catch(response => {
            console.log(response);
        });
    }

    removeItem(id){
        this.items.splice(
            this.items.map(function(e){
                return e.id
            }).indexOf(id), 1
        );
        this.recalculate(id);
        this.root_dialog.querySelector('#product_selected_' + id).remove();
    }

    setField(type, value, text, elem = null){
        let object = this;
        if(elem !== null){
            elem.closest('.dropdown').classList.remove('show');
        }
        object.root_dialog.querySelector('#' + type).value = value;
        object.root_dialog.querySelector('#' + type + '_text').innerHTML = text;
        object.recalculate();
    }

    selectPartner(id){
        var object = this;
        window.axios({
            method: 'post',
            url: 'partner/'+ id +'/select',
            data: {refer:this.root_dialog.id}
        }).then(function (resp) {

            let select = object.root_dialog.querySelector('button[name=partner_id]');
            let input = object.root_dialog.querySelector('input[name=partner_id]');
            let balance = object.root_dialog.querySelector('#balance');
            let str = resp.data.name;
            input.value = resp.data.id;
            select.innerHTML = str;
            window.notification.notify( 'success', 'Контакт выбран');
            document.dispatchEvent(new Event('PartnerSelected', {bubbles: true}));
            console.log("Событие PartnerSelected вызвано");
            balance.innerHTML = resp.data.balance + ' р';
            //closeDialog(event);

        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    };

    openProductmodal(){
        window.openDialog('selectProduct', '&refer=' + this.root_dialog.id);
    }

    openSelectPartnermodal(){
        window.openDialog('selectPartner', '&only_current_category=1&refer=' + this.root_dialog.id + '&category_id=7');
    }

    recalculate() {

        this.items.forEach(elem => {
            this.recalculateItem(elem.id);
        });
        let total_price = this.totalPrice;
        let itogo = 0;
        let inpercents = this.root_dialog.querySelector('input[name=inpercents]');
        let discount = this.root_dialog.querySelector('input[name=discount]');

        this.items.map(function(e){
            total_price = total_price + Number(e.total);
        });

        if(inpercents.value == 1){
            itogo = total_price - (total_price / 100 * Number(discount.value).toFixed(2));
        } else {
            itogo = total_price - Number(discount.value).toFixed(2);
        }

        let discount_val = discount.value + (inpercents.value == 1 ? ' %' : ' р');

        this.setTotalPrice(total_price);
        this.setItogo(itogo);
        this.setDiscount(discount_val);
    }

    recalculateItem(id){

        let price_element = this.root_dialog.querySelector("input[name='products[" + id + "][price]']");
        let count_element = this.root_dialog.querySelector("input[name='products[" + id + "][count]']");
        let total_element = this.root_dialog.querySelector("input[name='products[" + id + "][total_price]']");

        let price = Number(price_element.value);
        let count = Number(count_element.value);

        this.setItemPrice(id, price_element, total_element, price, count);
    }

    setItemPrice(id, price_element, total_element, price, count) {

        let total = (price * count);

        total_element.value = total.toFixed(2);
        // price_element.value = price.toFixed(2);

        this.items.map(function (e) {
            if (e.id === id) {
                e.total = total;
                e.count = count;
                e.price = price;
            }
        });
    }

}
export default shipmentDialog;
