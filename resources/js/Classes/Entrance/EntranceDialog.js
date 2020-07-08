import Modal from "../Modal/Modal";

class createEntrance extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно штрихкода инициализировано');
        this.items = [];
        this.nds = true;
        this.nds_included = true;
        this.totalPrice = 0.0;
        this.init();
    }

    init(){
        let object = this;
        let event = '';
        if(object.root_dialog.dataset.id){
            event = 'EntranceStored' + object.root_dialog.dataset.id;
        } else {
            event = 'EntranceStored';
        }
        // console.log(event);
        // document.addEventListener(event, function(e){
        //     object.finitaLaComedia();
        // });
        this.loadItemsIfExists();
        let focused = document.getElementById('entrance_dialog_focused');
        if(focused){
            focused.focus();
        }

        object.root_dialog.getElementsByTagName('form')[0].addEventListener('keydown',  function(e){
            if (e.which == 13) {
                e.preventDefault();
                object.saveAndClose(object.root_dialog.getElementsByTagName('form')[0]);
            }
        });

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
<<<<<<< HEAD
            if(resp.status == 200) {
=======
            if(resp.status === 200) {
>>>>>>> 3cf89499cbf2f4d8143913d0d050bbac9f9ad065
                let root_id = object.root_dialog.id;
                object.root_dialog.querySelector('input[name=id]').value = resp.data.id;
                object.root_dialog.setAttribute('id', 'entranceDialog' + resp.data.id);
                object.root_dialog.setAttribute('data-id', resp.data.id);
                object.freshContent(resp.data.id, function () {
                    delete window[root_id];
                    let drag_dialog = window.dialogs[root_id];
                    delete window.dialogs[root_id];
                    window.dialogs['entranceDialog' + resp.data.id] = drag_dialog;
                    drag_dialog.tag = 'entranceDialog' + resp.data.id;
                    window.helper.initDialogMethods();
                });
            }
        });
    }

    saveAndClose(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(resp){
<<<<<<< HEAD
            if(resp.status == 200) object.finitaLaComedia(true);
=======
            if(resp.status === 200) object.finitaLaComedia(true);
>>>>>>> 3cf89499cbf2f4d8143913d0d050bbac9f9ad065
        });
    }

    loadItemsIfExists(){
        window.isXHRloading = true;
        let object = this;
        var entrance_id = this.root_dialog.dataset.id;
        if(entrance_id && entrance_id !== 'undefined') {

            window.axios({
                method: 'post',
                url: 'entrance/' + entrance_id + '/get_products',
                data: {},
            }).then(function (resp) {

                [].forEach.call(resp.data.products, function(elem){
                    object.items.push({id:elem.id, count:elem.pivot.count, price:elem.pivot.price, total:elem.pivot.total});

                    let item = object.root_dialog.querySelector('#product_selected_' + elem.id);
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
            url: 'entrance/' + id + '/fresh',
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
        window.entity.addProductToList(elem, this, 'entrance');
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
            window.notification.notify( 'success', 'Контакт выбран');
            document.dispatchEvent(new Event('PartnerSelected', {bubbles: true}));
            console.log("Событие PartnerSelected вызвано");
            //closeDialog(event);

        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    };

    selectProviderOrder(id){
        var object = this;
        window.axios({
            method: 'post',
            url: 'providerorder/'+ id +'/select',
            data: {refer:this.root_dialog.id}
        }).then(function (resp) {

            let info_container = object.root_dialog.querySelector('#entrance_info_block');
            if(info_container){
                info_container.innerHTML = resp.data.info;
            }

            let select = object.root_dialog.querySelector('button[name=providerorder_id]');
            let input = object.root_dialog.querySelector('input[name=providerorder_id]');
            let str = '<option selected value="' + resp.data.id + '">' + resp.data.name + '</option>';
            input.value = resp.data.id;
            select.innerHTML = str;
            window.notification.notify( 'success', 'Заявка выбрана');
            document.dispatchEvent(new Event('ProviderOrderSelected', {bubbles: true}));
            console.log("Событие ProviderOrderSelected вызвано");
            object.root_dialog.querySelector('.product_list').innerHTML = resp.data.items_html;

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

    openSelectProviderOrderModal(){
        window.openDialog('selectProviderOrderDialog', '&refer=' + this.root_dialog.id);
    }

    addProductsToList(providerorder_id, data){
        let object = this;

        window.axios({
            method: 'post',
            url: 'product/addtolist',
            data: {
                refer:object.root_dialog.id,
                type:'providerorder',
                providerorder_id: providerorder_id,
                data:data
            }
        }).then(function (resp) {

           // console.log(resp);

            // var isset = object.items.map(function(e){
            //     return e.id;
            // }).indexOf(resp.data.product.id);


            let product_list = object.root_dialog.querySelector('.product_list');

            let items = [];

            [].forEach.call(resp.data.products, function(elem){
                items.push({
                    'id': elem.id,
                    'count': elem.count,
                    'html': null,
                    'price': elem.pivot.price,
                    'total': 0,
                });
            });

            object.items = items;

            product_list.innerHTML = resp.data.html;

            window.notification.notify( 'success', 'Товары добавлены к списку');

            // [].forEach.call(resp.data.products, function(elem) {
            //     let item = object.root_dialog.querySelector('#product_selected_' + elem.id);
            //     let inputs = item.getElementsByTagName('input');
            //
            //     [].forEach.call(inputs, function(elem){
            //         var fn = window.helper.debounce(function(e) {
            //             object.recalculate(e);
            //         }, 50);
            //         elem.addEventListener("keydown", fn);
            //         elem.addEventListener("paste", fn);
            //         elem.addEventListener("delete", fn);
            //     });
            // });



            //object.recalculate();


        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            window.isXHRloading = false;
        });

        // [].forEach.call(data, function(elem){
        //     console.log(elem);
        // });
    }

    recalculate(){
        console.log("Пересчет...");
        var object = this;
        // this.items.forEach(function(elem){
        //     object.recalculateItem(elem.id);
        // });
        //var total_price = object.totalPrice;

        // object.items.map(function(e){
        //     total_price = total_price + Number(e.total);
        // });
        //object.setTotalPrice(total_price);
    }

    getPayment(){
        let warrant_type = 'receipt_of_goods';
        let partner = this.root_dialog.querySelector('input[name=partner_id]').value;
        let itogo = this.root_dialog.querySelector('input[name=itogo]').value;
        let ostatok = this.root_dialog.querySelector('input[name=ostatok]').value;
        let id = this.root_dialog.querySelector('input[name=id]').value;
        let refer = 'entrance';
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
            let reason = 'Оплата поступления №' + id;
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

        openDialog('warrantDialog', '&isIncoming=0'+params);
    }

    recalculateItem(id){
        let object = this;
        let item = this.root_dialog.querySelector('#product_selected_' + id);
        let total = item.querySelector("input[name='products[" + id + "][total_price]']");
        let count = item.querySelector("input[name='products[" + id + "][count]']");
        let price = item.querySelector("input[name='products[" + id + "][price]']");

        //let nds_percent = item.querySelector("input[name=nds_percent]");
        //let nds = item.querySelector("input[name=nds]");


        let vcount = Number(count.value);
        let vprice = Number(price.value);
        //let vnds_percent = Number(nds_percent.value);
        //let vnds = Number(nds.value);
        //let vtotal = Number(total.value);

        // if(object.nds && !object.nds_included){
        //     vnds_percent = 20;
        //     vtotal = vprice * vcount;
        //     vnds = vtotal / 100 * vnds_percent;
        //     vtotal = vnds + vtotal;
        // } else if(object.nds && object.nds_included){
        //     vnds_percent = 20;
        //     vtotal = vprice * vcount;
        //     vnds = vtotal / ( 100 + vnds_percent ) * vnds_percent;
        // } else {
        //     vtotal = vprice * vcount;
        //     vnds = 0.00;
        //     vnds_percent = 0;
        // }

        vtotal = vprice * vcount;
        vnds = 0.00;
        vnds_percent = 0;

        nds_percent.value = vnds_percent.toFixed(2);
        nds.value = vnds.toFixed(2);
        total.value = vtotal.toFixed(2);

        // nds.value = Number(total.value).toFixed(2) * Number(nds_percent.value).toFixed(2);
        //
        // total.value = Number(total.value).toFixed(2) + Number(nds.value).toFixed(2);

        object.items.map(function(e){
            if(e.id === id){
                e.total = vtotal;
                e.count = vcount;
                e.price = vprice;
            }
        });
    }

}
export default createEntrance;
