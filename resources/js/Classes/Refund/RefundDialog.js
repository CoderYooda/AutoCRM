import Modal from "../Modal/Modal";

class refundDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно возвратов инициализировано');
        this.items = [];
        this.totalPrice = 0.0;
        this.itogo = 0.0;
        this.init();
    }

    init(){
        let object = this;

        object.root_dialog.getElementsByTagName('form')[0].addEventListener('keydown',  function(e){
            if (e.which == 13) {
                e.preventDefault();
                object.saveAndClose(object.root_dialog.getElementsByTagName('form')[0]);
            }
        });

        let focused = document.getElementById('refund_dialog_focused');
        if(focused){
            focused.focus();
        }
    }

    freshContent(id, callback = null){
        let object = this;

        //var store_id = this.store_obj.value;

        let data = {};
        //data.store_id = store_id;
        // if(object.refer){
        //     data.refer = object.refer;
        // }

        window.axios({
            method: 'post',
            url: 'refund/' + id + '/fresh',
            data: data,
        }).then(function (resp) {
            document.getElementById(resp.data.target).innerHTML = resp.data.html;
            console.log('Вставили html');
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            callback();
        });
    }

    save(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(resp){
            let root_id = object.root_dialog.id;
            object.root_dialog.querySelector('input[name=id]').value = resp.data.id;
            object.root_dialog.setAttribute('id', 'refundDialog' + resp.data.id);
            object.root_dialog.setAttribute('data-id', resp.data.id);
            object.freshContent(resp.data.id, function(){
                delete window[root_id];
                let drag_dialog = window.dialogs[root_id];
                delete window.dialogs[root_id];
                window.dialogs['refundDialog' + resp.data.id] = drag_dialog;
                drag_dialog.tag = 'refundDialog' + resp.data.id;
                window.helper.initDialogMethods();
            });
        });
    }

    saveAndClose(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(resp){
            object.finitaLaComedia(true);
        });
    }

    getPayment(){
        let warrant_type = 'sale_of_goods';
        let partner = this.root_dialog.querySelector('input[name=partner_id]').value;
        let itogo = this.root_dialog.querySelector('input[name=itogo]').value;
        let ostatok = this.root_dialog.querySelector('input[name=ostatok]').value;
        let id = this.root_dialog.querySelector('input[name=id]').value;
        let refer = 'client_order';
        let refer_id = this.root_dialog.querySelector('input[name=id]').value;
        partner = parseInt(partner);
        //console.log(partner);
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
        let refer = 'client_order';
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
        window.entity.loadItemsToList(this, 'refund');
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

        [].forEach.call(inputs, function(elem){
            var fn = window.helper.debounce(function(e) {
                object.recalculate(e);
            }, 50);
            elem.addEventListener("keydown", fn);
            elem.addEventListener("paste", fn);
            elem.addEventListener("delete", fn);
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

    addProduct(elem){
        window.entity.addProductToList(elem, this, 'refund');
    };

    addQuickProduct(){
        var object = this;
        window.axios({
            method: 'post',
            url: 'product/addtolist',
            data: {
                refer:this.root_dialog.id,
                article_id: object.items.length + 1,
                type:'refund_quick',
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

    selectShipment(id){
        var object = this;
        window.axios({
            method: 'post',
            url: 'shipment/'+ id +'/select',
            data: {refer:this.root_dialog.id}
        }).then(function (resp) {
            object.touch();
            let select = object.root_dialog.querySelector('button[name=shipment_id]');
            let partner_butt = object.root_dialog.querySelector('input[name=partner_id]');
            let input = object.root_dialog.querySelector('input[name=shipment_id]');
            //let str = '<option selected value="' + resp.data.id + '">' + resp.data.name + '</option>';

            let str = resp.data.name;
            input.value = resp.data.id;
            partner_butt.value = resp.data.partner;
            select.innerHTML = str;

            window.notification.notify( 'success', 'Продажа выбрана');
            document.dispatchEvent(new Event('ShipmentSelected', {bubbles: true}));
            console.log("Событие ShipmentSelected вызвано");
            object.root_dialog.querySelector('.product_list').innerHTML = resp.data.items_html;

            [].forEach.call(resp.data.items, function (elem) {
                object.items.push({
                    id: elem.id,
                    count: elem.pivot.count,
                    price: elem.pivot.price,
                    total: elem.pivot.total,
                });

                let item = object.root_dialog.querySelector('#product_selected_' + elem.id);
                let inputs = item.getElementsByTagName('input');

                [].forEach.call(inputs, function (elem) {
                    var fn = window.helper.debounce(function (e) {
                        object.recalculate(e);
                    }, 50);
                    elem.addEventListener("keydown", fn);
                    elem.addEventListener("paste", fn);
                    elem.addEventListener("delete", fn);
                });

            });

        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    };

    openProductmodal(){
        window.openDialog('selectProduct', '&refer=' + this.root_dialog.id);
    }

    openSelectShipmentModal(){
        window.openDialog('selectShipment', '&refer=' + this.root_dialog.id);
    }

    recalculate(){
        dd(1);
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

    recalculateItem(id){

        let object = this;

        let item = this.root_dialog.querySelector('#product_selected_' + id);
        let total, count, price;
        if(item !== null && item !== 'undefined' && item !== 'null') {
            total = item.querySelector("input[name='products[" + id + "][total_price]']");
            count = item.querySelector("input[name='products[" + id + "][count]']");
            price = item.querySelector("input[name='products[" + id + "][price]']");
            let vcount = Number(count.value);
            let vprice = Number(price.value);
            let vtotal = Number(total.value);

            vtotal = vprice * vcount;
            total.value = vtotal.toFixed(2);

            object.items.map(function(e){
                if(e.id === id){
                    e.total = vtotal;
                    e.count = vcount;
                    e.price = vprice;
                }
            });
        } else {

        }
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
}
export default refundDialog;
