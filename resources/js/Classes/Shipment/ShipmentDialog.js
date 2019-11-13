class shipmentDialog{

    constructor(dialog){
        console.log('Окно Продажи инициализировано');
        this.root_dialog = dialog;
        this.items = [];
        this.nds = true;
        this.totalPrice = 0.0;
        this.itogo = 0.0;
        this.init();
    }

    getPayment(){
        let warrant_type = 'sale_of_goods';
        let partner = this.root_dialog.querySelector('input[name=partner_id]').value;
        let refer = 'shipment';
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
        if(warrant_type != null){
            params += '&warrant_type='+warrant_type;
        }
        if(itogo != null){
            params += '&itogo='+itogo;
        }
        if(ostatok != null){
            params += '&ostatok='+ostatok;
        }
        if(refer != null){
            params += '&refer='+refer;
        }
        if(refer_id != null){
            params += '&refer_id='+refer_id;
        }
        if(id != null){
            let reason = 'Реализация товара №' + id;
            params += '&reason='+reason;
        }

        openDialog('warrantDialog', '&isIncoming=1'+params);
    }

    init(){
        let object = this;

        var fn = window.helper.debounce(function(e) {object.recalculate(e);}, 50);
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

        // let event = '';
        // if(object.root_dialog.dataset.id){
        //     event = 'ShipmentStored' + object.root_dialog.dataset.id;
        // } else {
        //     event = 'ShipmentStored';
        // }
        // document.addEventListener(event, function(e){
        //     object.finitaLaComedia();
        // });
        this.loadItemsIfExists();
        let focused = document.getElementById('shipment_dialog_focused');
        if(focused){
            focused.focus();
        }
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
    }

    save(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(resp){
            let root_id = object.root_dialog.id;
            object.root_dialog.querySelector('input[name=id]').value = resp.data.id;
            object.root_dialog.setAttribute('id', 'shipmentDialog' + resp.data.id);
            object.root_dialog.setAttribute('data-id', resp.data.id);
            object.freshContent(resp.data.id, function(){
                delete window[root_id];
                let drag_dialog = window.dialogs[root_id];
                delete window.dialogs[root_id];
                window.dialogs['shipmentDialog' + resp.data.id] = drag_dialog;
                drag_dialog.tag = 'shipmentDialog' + resp.data.id;
                window.helper.initDialogMethods();
            });
        });
    }

    saveAndClose(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(resp){
            object.finitaLaComedia();
        });
    }

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
            url: 'shipment/' + id + '/fresh',
            data: data,
        }).then(function (resp) {
            document.getElementById(resp.data.target).innerHTML = resp.data.html;
            console.log('Вставили html');
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            callback();
        });
    }

    loadItemsIfExists(){
        window.isXHRloading = true;
        let object = this;
        var shipment_id = this.root_dialog.dataset.id;
        if(shipment_id && shipment_id !== 'undefined') {

            window.axios({
                method: 'post',
                url: 'shipment/' + shipment_id + '/get_products',
                data: {},
            }).then(function (resp) {
                [].forEach.call(resp.data.products, function(elem){
                    object.items.push({
                        id:elem.product.id,
                        count:elem.count,
                        price:elem.price,
                        total:elem.total,
                    });

                    let item = object.root_dialog.querySelector('#product_selected_' + elem.product.id);

                    let inputs = item.getElementsByTagName('input');

                    [].forEach.call(inputs, function(elem){
                        var fn = window.helper.debounce(function(e) {
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

        }



        // let list_elems = this.root_dialog.querySelector('.product_list_elem');
        // if(list_elems){
        //     [].forEach.call(list_elems, function(elem){
        //         object.addItem({id:resp.data.id, html:resp.data.html});
        //     });
        // }
    }

    setTotalPrice(count){
        let container = this.root_dialog.querySelector('#total_price');
        container.innerHTML = Number(count).toFixed(2);
    }

    setItogo(count){
        let container = this.root_dialog.querySelector('#itogo_price');
        container.innerHTML = Number(count).toFixed(2);
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
            console.log(e);
        }

        product_list.insertAdjacentHTML('afterbegin', elem.html);

        window.notification.notify( 'success', 'Товар добавлен к списку');
        let item = this.root_dialog.querySelector('#product_selected_' + elem.id);
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

    finitaLaComedia(){
        closeDialog(null, this.root_dialog.id);
        delete window[this.root_dialog.id];
    }

    removeItem(id){
        this.items.splice(
            this.items.map(function(e){
                return e.id
            }).indexOf(id), 1
        );
        this.root_dialog.querySelector('#product_selected_' + id).remove();
        this.recalculate();
    }

    addProduct(elem){

        let article_id = elem.dataset.article_id;
        let count = elem.closest('div').querySelector('input[name="count"]').value;

        var object = this;
        window.axios({
            method: 'post',
            url: 'product/addtolist',
            data: {
                refer:this.root_dialog.id,
                type:'shipment',
                article_id:article_id,
                count:count,
            }
        }).then(function (resp) {

            var isset = object.items.map(function(e){
                return e.id;
            }).indexOf(resp.data.product.id);

            if(isset < 0){
                object.addItem({id:resp.data.product.id, html:resp.data.html});
            } else {
                window.notification.notify('error', 'Товар уже в списке');
            }


            // let canAdd = true;
            // [].forEach.call(object.items, function(item){
            //     if(item.store_id === parseInt(resp.data.product.store_id) && item.id === resp.data.product.product.id){
            //         canAdd = false;
            //     }
            // });
            //
            // console.log(canAdd);
            // if(canAdd){
            //     object.addItem({
            //         id:resp.data.product.product.id,
            //         store_id:parseInt(resp.data.product.store_id),
            //         count:resp.data.product.count,
            //         html:resp.data.html
            //     });
            // } else {
            //     window.notification.notify('error', 'Товар уже в списке');
            // }
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    };

    selectPartner(id){
        var object = this;
        window.axios({
            method: 'post',
            url: 'partner/'+ id +'/select',
            data: {refer:this.root_dialog.id}
        }).then(function (resp) {

            let select = object.root_dialog.querySelector('select[name=partner_id]');
            let input = object.root_dialog.querySelector('input[name=partner_id]');
            let str = '<option selected value="' + resp.data.id + '">' + resp.data.name + '</option>';
            input.value = resp.data.id;
            select.innerHTML = str;
            window.notification.notify( 'success', 'Контрагент выбран');
            document.dispatchEvent(new Event('PartnerSelected', {bubbles: true}));
            console.log("Событие PartnerSelected вызвано");
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
        window.openDialog('selectPartner', '&refer=' + this.root_dialog.id);
    }

    recalculate(){
        console.log("Пересчет...");
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

        if(inpercents.checked){
            itogo = total_price - (total_price / 100 * Number(discount.value).toFixed(2));
        } else {
            itogo = total_price - Number(discount.value).toFixed(2);
        }

        var discount_val;

        if(inpercents.checked){
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
        let total = item.querySelector("input[name='products[" + id + "][total_price]']");
        let count = item.querySelector("input[name='products[" + id + "][count]']");
        let price = item.querySelector("input[name='products[" + id + "][price]']");

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
    }


}
export default shipmentDialog;
