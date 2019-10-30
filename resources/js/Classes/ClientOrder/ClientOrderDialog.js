class clientorderDialog{

    constructor(dialog){
        console.log('Окно Продажи Клиента инициализировано');
        this.root_dialog = dialog;
        this.items = [];
        this.nds = true;
        this.totalPrice = 0.0;
        this.itogo = 0.0;
        this.init();
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


        document.addEventListener('ShipmentStored', function(e){
            object.finitaLaComedia();
        });

        object.root_dialog.getElementsByTagName('form')[0].addEventListener('EntranceStored',  function(){
            let id = object.root_dialog.querySelector('input[name=id]').value;
            console.log(id);
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


        this.loadItemsIfExists();

        let focused = document.getElementById('clientorder_dialog_focused');
        if(focused){
            focused.focus();
        }
    }

    scanOperation(UPC){
        console.log(UPC);
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
            url: 'clientorder/' + id + '/fresh',
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

    save(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(resp){
            let root_id = object.root_dialog.id;
            object.root_dialog.querySelector('input[name=id]').value = resp.data.id;
            object.root_dialog.setAttribute('id', 'clientorderDialog' + resp.data.id);
            object.root_dialog.setAttribute('data-id', resp.data.id);
            object.freshContent(resp.data.id, function(){
                delete window[root_id];
                let drag_dialog = window.dialogs[root_id];
                delete window.dialogs[root_id];
                window.dialogs['clientorderDialog' + resp.data.id] = drag_dialog;
                drag_dialog.tag = 'clientorderDialog' + resp.data.id;
                window.helper.initDialogMethods();
            });



            // let dialog = document.getElementById('clientorderDialog' + resp.data.id);
            // console.log(dialog);
            // window['clientorderDialog' + resp.data.id] = new clientorderDialog(dialog);

        });
    }

    saveAndClose(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(resp){
            object.finitaLaComedia();
        });
    }

    getPayment(){

        let partner = this.root_dialog.querySelector('input[name=partner_id]').value;
        partner = parseInt(partner);
        //console.log(partner);
        var params = '';
        if(partner !== null){
            params += '&partner_id='+partner;
        }
        openDialog('warrantDialog', '&isIncoming=1&partner_id='+partner);
    }

    loadItemsIfExists(){
        console.log('Загружаем товары');
        window.isXHRloading = true;
        let object = this;
        var client_order_id = this.root_dialog.dataset.id;
        if(client_order_id && client_order_id !== 'undefined') {

            window.axios({
                method: 'post',
                url: 'clientorder/' + client_order_id + '/get_clientorders',
                data: {},
            }).then(function (resp) {
                [].forEach.call(resp.data.products, function(elem){
                    object.items.push({
                        id:elem.product.id,
                        count:elem.count,
                        price:elem.price,
                        total:elem.total,
                        store_id:elem.store_id,
                    });

                    let item = object.root_dialog.querySelector('#product_selected_' + elem.product.id + '_' + elem.store_id);

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
                object.recalculate();
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
        }

        let tbody = document.createElement('tbody');
        tbody.innerHTML = elem.html;
        product_list.prepend(tbody.firstChild);
        window.notification.notify( 'success', 'Товар добавлен к списку');
        let item = this.root_dialog.querySelector('#product_selected_' + elem.id + '_' + elem.store_id);
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

    removeItem(store_id, id){

        let object = this;
        [].forEach.call(object.items, function(item){

            if(item.id === id && item.store_id === store_id){
                object.items.splice(
                    object.items.indexOf(item), 1
                );
            }
        });
        this.root_dialog.querySelector('#product_selected_' + id + '_' + store_id).remove();
        object.recalculate();
    }

    addProduct(elem){
        var object = this;
        let store_id = elem.dataset.store_id;
        let article_id = elem.dataset.article_id;
        let count = elem.closest('tr').querySelector('input').value;
        window.axios({
            method: 'post',
            url: 'product/addtolist',
            data: {
                refer:this.root_dialog.id,
                type:'clientOrder',
                store_id:store_id,
                article_id:article_id,
                count:count,
            }
        }).then(function (resp) {

            let canAdd = true;
            [].forEach.call(object.items, function(item){
                if(item.store_id === parseInt(resp.data.product.store_id) && item.id === resp.data.product.product.id){
                    canAdd = false;
                }
            });
            if(canAdd){
                object.addItem({
                    id:resp.data.product.product.id,
                    store_id:parseInt(resp.data.product.store_id),
                    count:resp.data.product.count,
                    html:resp.data.html
                });
            } else {
                window.notification.notify('error', 'Товар уже в списке');
            }
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    };

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
                store_id:'new',
                count:resp.data.product.count,
                price:resp.data.product.price,
                total:resp.data.product.total,
                html:resp.data.html
            });

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
            object.recalculateItem(elem.store_id, elem.id);
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

    recalculateItem(store_id, id){

        let object = this;

        let item = this.root_dialog.querySelector('#product_selected_' + id + '_' + store_id);
        let total, count, price;
        if(item !== null && item !== 'undefined' && item !== 'null') {
            total = item.querySelector("input[name='products[" + store_id + "][" + id + "][total_price]']");
            count = item.querySelector("input[name='products[" + store_id + "][" + id + "][count]']");
            price = item.querySelector("input[name='products[" + store_id + "][" + id + "][price]']");
            let vcount = Number(count.value);
            let vprice = Number(price.value);
            let vtotal = Number(total.value);

            vtotal = vprice * vcount;
            total.value = vtotal.toFixed(2);

            object.items.map(function(e){
                if(e.id === id && e.store_id === store_id){
                    e.total = vtotal;
                    e.count = vcount;
                    e.price = vprice;
                }
            });
        } else {

        }







        // let object = this;
        // let item = this.root_dialog.querySelector('#product_selected_' + id);
        // let total = item.querySelector(".j_total_price");
        // let count = item.querySelector(".j_count");
        // let price = item.querySelector(".j_price");
        //
        // let vcount = Number(count.value);
        // let vprice = Number(price.value);
        // let vtotal = Number(total.value);
        //
        // vtotal = vprice * vcount;
        // total.value = vtotal.toFixed(2);
        //
        // object.items.map(function(e){
        //     if(e.id === id){
        //         e.total = vtotal;
        //         e.count = vcount;
        //         e.price = vprice;
        //     }
        // });
    }


}
export default clientorderDialog;
