import Modal from "../Modal/Modal";

class clientorderDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно штрихкода инициализировано');
        this.items = [];
        this.nds = true;
        this.totalPrice = 0.0;
        this.itogo = 0.0;
        this.id = this.root_dialog.querySelector('input[name=id]').value;
        this.phoneMask = null;
        this.phone_field = this.root_dialog.querySelector('#client-phone');
        this.init();
    }

    init(){
        let object = this;
        helper.initTabs('cl_tabs');
        var fn = window.helper.debounce(function(e) {object.recalculate(e);}, 500);

        ///Вешаем обрабочик на поле скидки/////////////
        let discount = object.root_dialog.querySelector('input[name=discount]');
        discount.addEventListener("keydown", fn);
        discount.addEventListener("paste", fn);
        discount.addEventListener("delete", fn);
        ////////////////////////////////////////////////

        ///Вешаем обработчик на чекбокс/////////////////
        let inpercents = object.root_dialog.querySelector('input[name=inpercents]');
        inpercents.addEventListener("change", fn);
        ////////////////////////////////////////////////


        object.root_dialog.getElementsByTagName('form')[0].addEventListener('keydown',  function(e){
            if (e.which == 13) {
                e.preventDefault();
                if(e.target.id == 'sms_field'){
                    object.sendSMS();
                } else {
                    object.saveAndClose(object.root_dialog.getElementsByTagName('form')[0]);
                }

            }
        });

        // document.addEventListener('ShipmentStored', function(e){
        //     object.finitaLaComedia();
        // });

        object.root_dialog.getElementsByTagName('form')[0].addEventListener('WarrantStored',  function(){
            let id = object.root_dialog.querySelector('input[name=id]').value;
            if(id !== null){
                let root_id = object.root_dialog.id;
                object.freshContent(id,function(){
                    delete window[root_id];
                    window.helper.initDialogMethods();
                });
            }
        });

        object.root_dialog.getElementsByTagName('form')[0].addEventListener('ShipmentStored',  function(){
            let id = object.root_dialog.querySelector('input[name=id]').value;
            if(id !== null){
                let root_id = object.root_dialog.id;
                object.freshContent(id,function(){
                    delete window[root_id];
                    window.helper.initDialogMethods();
                });
            }
        });

        object.root_dialog.getElementsByTagName('form')[0].addEventListener('clientOrderSMS',  function(){
            let id = object.root_dialog.querySelector('input[name=id]').value;
            if(id !== null){
                let root_id = object.root_dialog.id;
                object.freshContent(id,function(){
                    delete window[root_id];
                    window.helper.initDialogMethods();
                });
            }
        });

        object.root_dialog.getElementsByTagName('form')[0].addEventListener('EntranceStored',  function(){
            let id = object.root_dialog.querySelector('input[name=id]').value;
            if(id !== null){
                let root_id = object.root_dialog.id;
                object.freshContent(id,function(){
                    delete window[root_id];
                    window.helper.initDialogMethods();
                });
            }
        });

        // object.root_dialog.getElementsByTagName('form')[0].addEventListener('clientOrderStored',  function(){
        //     let root_id = object.root_dialog.id;
        //     object.freshContent(root_id,function(){
        //         delete window[root_id];
        //         delete window.dialogs[root_id];
        //         window.helper.initDialogMethods();
        //     });
        // });
        this.addPhoneMask();

        this.loadItemsIfExists();

        // let focused = document.getElementById('clientorder_dialog_focused');
        // if(focused){
        //     focused.focus();
        // }
    }

    scanOperation(product_id){
        this.addProduct(product_id);
    }

    addProduct(elem_or_id, refer = null){
        let object = this;
        window.entity.addProductToList(elem_or_id, this, 'clientOrder');
        if(refer != null){
            object.refer = refer;
        }
    };

    freshContent(id, callback = null){
        let object = this;

        //var store_id = this.store_obj.value;

        let data = {};
        //data.store_id = store_id;
        if(object.refer){
            data.refer = object.refer;
        }

        window.axios({
            method: 'post',
            url: 'clientorder/' + id + '/fresh',
            data: data,
        }).then(function (resp) {
            document.getElementById(resp.data.target).innerHTML = resp.data.html;
            object.addPhoneMask();
            console.log('Вставили html');
        }).catch(function (error) {
            console.log(error);w
        }).then(function () {
            callback();
        });
    }

    sendSMS(){
        let message_field = this.root_dialog.querySelector('#sms_field');

        //console.log(field.value);

        let data = {};
        //data.store_id = store_id;
        data.message = message_field.value;
        data.phone = this.phone_field.value;
        data.type = 'clientOrder';
        data.id = this.root_dialog.querySelector('input[name=id]').value;

        window.axios({
            method: 'post',
            url: 'sms/send',
            data: data,
        }).then(function (resp) {

        }).catch(function (error) {
            if(error.response && error.response.data.message){
                window.notification.notify( 'error', error.response.data.message);
            }
        }).then(function () {
        });

    }

    save(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(resp){
            if(resp.status === 200) {
                let root_id = object.root_dialog.id;
                object.root_dialog.querySelector('input[name=id]').value = resp.data.id;
                object.root_dialog.setAttribute('id', 'clientorderDialog' + resp.data.id);
                object.root_dialog.setAttribute('data-id', resp.data.id);
                object.freshContent(resp.data.id, function () {
                    delete window[root_id];
                    let drag_dialog = window.dialogs[root_id];
                    delete window.dialogs[root_id];
                    window.dialogs['clientorderDialog' + resp.data.id] = drag_dialog;
                    drag_dialog.tag = 'clientorderDialog' + resp.data.id;
                    window.helper.initDialogMethods();
                });
            }
        });
    }

    saveAndClose(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(resp){
            if(resp.status === 200) object.finitaLaComedia(true);
        });
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

    getPayment(){
        let warrant_type = 'sale_of_goods';
        let partner = this.root_dialog.querySelector('input[name=partner_id]').value;
        let itogo = this.root_dialog.querySelector('input[name=itogo]').value;
        let ostatok = this.root_dialog.querySelector('input[name=ostatok]').value;
        let id = this.root_dialog.querySelector('input[name=id]').value;
        let refer = 'ClientOrder';
        let refer_id = this.root_dialog.querySelector('input[name=id]').value;
        partner = parseInt(partner);
        //console.log(partner);
        var params = '';
        if(partner !== null){
            params += '&partner_id='+partner;
        }
        if(partner !== null){
            params += '&entity_id='+id;
        }
        if(warrant_type != null){
            params += '&warrant_type='+warrant_type;
        }
        if(itogo != null){
            params += '&itogo='+itogo;
        }
        if(id != null){
            let reason = 'Реализация заказа №' + id;
            params += '&reason='+reason;
        }
        if(refer != null){
            params += '&refer='+refer;
        }
        if(ostatok != null){
            params += '&ostatok='+ostatok;
        }
        if(refer_id != null){
            params += '&refer_id='+refer_id;
        }

        openDialog('warrantDialog', '&isIncoming=1'+params);
    }

    getBackPayment(){
        let warrant_type = 'sale_of_goods';
        let partner = this.root_dialog.querySelector('input[name=partner_id]').value;
        let itogo = this.root_dialog.querySelector('input[name=itogo]').value;
        let ostatok = this.root_dialog.querySelector('input[name=ostatok]').value;
        let id = this.root_dialog.querySelector('input[name=id]').value;
        let refer = 'ClientOrder';
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
            let reason = 'Возврат средств по заказу №' + id;
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

    loadItemsIfExists(){
        window.entity.loadItemsToList(this, 'clientorder');
    }

    setTotalPrice(count){
        let container = this.root_dialog.querySelector('#total_price');
        container.innerHTML = Number(count).toFixed(2);
    }

    setItogo(count){
        let itogo_prices = this.root_dialog.querySelectorAll('.itogo_price');
        [].forEach.call(itogo_prices, function(itogo_price){
            itogo_price.innerHTML = Number(count).toFixed(2);
        });
    }

    setDiscount(count){
        let container = this.root_dialog.querySelector('#percents_price');
        container.innerHTML = count;
    }

    addItem(elem, tag){
        let object = this;
        let product_list = this.root_dialog.querySelector('.product_list');
        this.items.push(elem);

        try{
            window.selectProductDialog.markAsAdded();
        }catch (e) {
            console.log(e);
        }

        product_list.insertAdjacentHTML('afterbegin', elem.html);

        window.notification.notify( 'success', 'Товар добавлен к списку');
        let item = this.root_dialog.querySelector('#product_selected_' + tag);
        let inputs = item.getElementsByTagName('input');

        inputs.forEach(input => {

            let fn = window.helper.debounce(function(e) {
                object.recalculate(e);
            }, 500);

            input.addEventListener("keydown", fn);
            input.addEventListener("paste", fn);
            input.addEventListener("delete", fn);

            if(input.name == 'products[' + input.id + '][count]') {

                let getPriceFromServer = window.helper.debounce(e => this.getPriceFromServer(elem.id, input), 300);

                input.addEventListener("keydown", getPriceFromServer);
                input.addEventListener("paste", getPriceFromServer);
                input.addEventListener("delete", getPriceFromServer);
            }

        });
        this.recalculate();
    }

    removeItem(id, tag = null){

        let object = this;
        [].forEach.call(object.items, function(item){
            if(item.id === id){
                object.items.splice(
                    object.items.indexOf(item), 1
                );
            }
        });
        if(tag !== null){
            id = id + '_' + tag;
        }
        let product = this.root_dialog.querySelector('#product_selected_' + id).remove();
        object.recalculate();
    }

    // addProduct(elem){
    //     window.entity.addProductToList(elem, this, 'clientOrder');
    // };

    addQuickProduct(){
        var object = this;
        window.axios({
            method: 'post',
            url: 'product/addtolist',
            data: {
                refer:this.root_dialog.id,
                article_id: object.items.length + 1,
                type:'clientOrder_quick',
                count:1,
            }
        }).then(function (resp) {
            object.addItem({
                id:resp.data.product.id,
                // store_id:'new',
                count:resp.data.product.count,
                price:resp.data.product.price,
                total:resp.data.product.total,
                html:resp.data.html
            }, resp.data.product.id + '_new');

        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    };

    selectNumber(elem) {
        this.phoneMask.value = elem.dataset.number;
        if(elem !== null){
            elem.closest('.dropdown').classList.remove('show');
        }
        // this.root_dialog.querySelector('#client-phone').value = elem.dataset.number;
        // this.addPhoneMask();
    }

    addPhoneMask(){
        let object = this;
        this.phoneMask = window.IMask(object.phone_field, {
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
                var number = (dynamicMasked.value + appended).replace(/\D/g,'');

                return dynamicMasked.compiledMasks.find(function (m) {
                    return number.indexOf(m.startsWith) === 0;
                });
            }
        });
    }

    selectPartner(id){
        var object = this;
        window.axios({
            method: 'post',
            url: 'partner/'+ id +'/select',
            data: {refer:this.root_dialog.id}
        }).then(function (resp) {
            object.touch();
            let select = object.root_dialog.querySelector('button[name=partner_id]');
            let input = object.root_dialog.querySelector('input[name=partner_id]');
            //let str = '<option selected value="' + resp.data.id + '">' + resp.data.name + '</option>';

            let phones_list = object.root_dialog.querySelector('#phones-list');
            object.root_dialog.querySelector('#client-phone').value = '';
            let phones_html = '';
            if(resp.data.phones.length > 0) {
                [].forEach.call(resp.data.phones, function (elem) {
                    if(elem.main){
                        object.root_dialog.querySelector('#client-phone').value = elem.number;
                    }
                    phones_html += '<span onclick="' + object.root_dialog.id + '.selectNumber(this)" data-number="' + elem.number + '" class="element">' + elem.number + '</span>';
                });
            } else {
                phones_html = '<span class="element"><div class="text-center">Номеров нет</div></span>';
            }
            phones_list.innerHTML = phones_html;
            //let phone_str = '<a onclick="{{ $class }}.selectNumber(this)" data-number="{{ $phone->number }}" class="dropdown-item pointer">{{ $phone->number }}</a>';

            let str = resp.data.name;
            input.value = resp.data.id;
            select.innerHTML = str;
            window.notification.notify( 'success', 'Контакт выбран');
            document.dispatchEvent(new Event('PartnerSelected', {bubbles: true}));
            console.log("Событие PartnerSelected вызвано");
            //closeDialog(event);
            object.phoneMask.value = resp.data.phone;
            object.phoneMask.updateControl();
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    };

    openProductmodal(){
        window.openDialog('selectProduct', '&refer=' + this.root_dialog.id);
    }

    openShipmentModal(){
        window.openDialog('shipmentDialog', '&refer=shipmentDialog' + '&clientorder_id=' + this.id);
    }

    openSelectPartnermodal(){
        window.openDialog('selectPartner', '&only_current_category=1&refer=' + this.root_dialog.id + '&category_id=7');
    }

    recalculate(){
        var object = this;
        this.items.forEach(function(elem){
            object.recalculateItem(elem.id);
        });
        var total_price = object.totalPrice;
        var itogo = object.itogo;
        var inpercents = object.root_dialog.querySelector('input[name=inpercents]');
        var discount = object.root_dialog.querySelector('input[name=discount]');


        object.items.map(function(e){
            total_price = total_price + Number(e.total);
        });

        if(inpercents.value == 1){
            itogo = total_price - (total_price / 100 * Number(discount.value).toFixed(2));
        } else {
            itogo = total_price - Number(discount.value).toFixed(2);
        }

        var discount_val;

        if(inpercents.value == 1){
            discount_val = discount.value + ' %';
        } else {
            discount_val = discount.value + ' р';
        }


        object.setTotalPrice(total_price);
        object.setItogo(itogo);
        object.setDiscount(discount_val);
    }

    changeOrderStatus(element) {

        let target_element = this.current_dialog.querySelector('#return_money');

        console.log(element.options[element.selectedIndex].value);

        if(element.options[element.selectedIndex].value == 'canceled') {
            target_element.classList.remove('d-none');
        }
        else {
            target_element.classList.add('d-none');
        }
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

        total_element.value = total;
        price_element.value = price;

        this.items.map(function (e) {
            if (e.id === id) {
                e.total = total;
                e.count = count;
                e.price = price;
            }
        });
    }
}
export default clientorderDialog;
