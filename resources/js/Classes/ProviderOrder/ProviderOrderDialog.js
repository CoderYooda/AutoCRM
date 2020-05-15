import Modal from "../Modal/Modal";

class providerOrderDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно штрихкода инициализировано');
        this.items = [];
        this.nds = true;
        this.nds_included = true;
        this.totalPrice = 0.0;
        this.itogo = 0.0;
        this.refer = null;
        this.focused = document.getElementById('providerorder_dialog_focused');
        this.init();
    }

    init(){
        let object = this;

        var fn = window.helper.debounce(function(e) {object.recalculate(e);}, 50);
        ///Вешаем обрабочик на поле скидки/////////////
        // let discount = object.root_dialog.querySelector('input[name=discount]');
        // discount.addEventListener("keydown", fn);
        // discount.addEventListener("paste", fn);
        // discount.addEventListener("delete", fn);
        ////////////////////////////////////////////////

        ///Вешаем обработчик на чекбокс/////////////////
        // let inpercents = object.root_dialog.querySelector('input[name=inpercents]');
        // inpercents.addEventListener("change", fn);
        ////////////////////////////////////////////////

        // let event = '';
        // if(object.root_dialog.dataset.id){
        //     event = 'ShipmentStored' + object.root_dialog.dataset.id;
        // } else {
        //     event = 'ShipmentStored';
        // }
        //
        // document.addEventListener(event, function(e){
        //     object.finitaLaComedia();
        // });


        object.root_dialog.getElementsByTagName('form')[0].addEventListener('keydown',  function(e){
            if (e.which == 13) {
                e.preventDefault();
                object.saveAndClose(object.root_dialog.getElementsByTagName('form')[0]);
            }
        });

        object.root_dialog.getElementsByTagName('form')[0].addEventListener('WarrantStored',  function(){
            console.warn("Warrant повесили");
            let id = object.root_dialog.querySelector('input[name=id]').value;
            if(id !== null){
                let root_id = object.root_dialog.id;
                object.freshContent(id,function(){
                    delete window[root_id];
                    window.helper.initDialogMethods();
                });
            }
        });

        this.loadItemsIfExists();
        if(object.focused){
            object.focused.focus();
        }
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
            url: 'providerorder/' + id + '/fresh',
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

    getPayment(){
        let warrant_type = 'pay_to_provider';
        let partner = this.root_dialog.querySelector('input[name=partner_id]').value;
        let itogo = this.root_dialog.querySelector('input[name=itogo]').value;
        let ostatok = this.root_dialog.querySelector('input[name=ostatok]').value;
        let id = this.root_dialog.querySelector('input[name=id]').value;
        let refer = 'providerorder';
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
            let reason = 'Оплата заказа №' + id;
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

    getBackPayment(){
        let warrant_type = 'pay_to_provider';
        let partner = this.root_dialog.querySelector('input[name=partner_id]').value;
        let itogo = this.root_dialog.querySelector('input[name=itogo]').value;
        let ostatok = this.root_dialog.querySelector('input[name=ostatok]').value;
        let id = this.root_dialog.querySelector('input[name=id]').value;
        let refer = 'providerorder';
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
        openDialog('warrantDialog', '&isIncoming=1'+params);
    }

    save(elem){
        window.event.preventDefault();
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(resp){
            let root_id = object.root_dialog.id;
            object.root_dialog.querySelector('input[name=id]').value = resp.data.id;
            object.root_dialog.setAttribute('id', 'providerorderDialog' + resp.data.id);
            object.root_dialog.setAttribute('data-id', resp.data.id);
            object.freshContent(resp.data.id, function(){
                delete window[root_id];
                let drag_dialog = window.dialogs[root_id];
                delete window.dialogs[root_id];
                window.dialogs['providerorderDialog' + resp.data.id] = drag_dialog;
                drag_dialog.tag = 'providerorderDialog' + resp.data.id;
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

    loadItemsIfExists(){
        window.entity.loadItemsToList(this, 'providerorder');
    }

    setTotalPrice(count){
        let container = this.root_dialog.querySelector('#total_price');
        container.innerHTML = Number(count).toFixed(2);
    }

    setItogo(count){
        // let container = this.root_dialog.querySelector('#itogo_price');
        // container.innerHTML = Number(count).toFixed(2);
    }

    setDiscount(count){
        let container = this.root_dialog.querySelector('#percents_price');
        container.innerHTML = count;
    }

    setNDS() {
        this.nds = this.root_dialog.querySelector('input[name=nds]').checked;
        this.nds_included = this.root_dialog.querySelector('input[name=nds_included]').checked;
        this.recalculate();
    }

    addItem(elem){
        let object = this;
        let product_list = this.root_dialog.querySelector('.product_list');
        this.items.push(elem);
        let tbody = document.createElement('tbody');
        tbody.innerHTML = elem.html;
        product_list.prepend(tbody.firstChild);
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
        if(this.refer != null){
            window[this.refer].markAsAdded();
        }
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

    addProduct(elem, refer = null){
        let object = this;
        window.entity.addProductToList(elem, this, 'providerOrder');
        if(refer != null){
            object.refer = refer;
        }
    };

    selectPartner(id){
        var object = this;
        window.axios({
            method: 'post',
            url: 'partner/'+ id +'/select',
            data: {refer:this.root_dialog.id}
        }).then(function (resp) {

            let select = object.root_dialog.querySelector('button[name=partner_id]');
            let input = object.root_dialog.querySelector('input[name=partner_id]');
            let str =  resp.data.name;
            input.value = resp.data.id;
            select.innerHTML = str;
            window.notification.notify( 'success', 'Контрагент выбран');
            document.dispatchEvent(new Event('PartnerSelected', {bubbles: true}));
            console.log("Событие PartnerSelected вызвано");
            //closeDialog(event);
            if(object.focused){
                object.focused.focus();
            }
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    };

    openProductmodal(){
        window.openDialog('selectProduct', '&refer=' + this.root_dialog.id + '&category_id=2');
    }

    openSelectPartnerModal(){
        window.openDialog('selectPartner', '&refer=' + this.root_dialog.id + '&category_id=6');
    }

    recalculate(){
        console.log("Пересчет...");
        var object = this;
        this.items.forEach(function(elem){
            object.recalculateItem(elem.id);
        });
        var total_price = object.totalPrice;
        var itogo = object.itogo;
        // var inpercents = object.root_dialog.querySelector('input[name=inpercents]');
        // var discount = object.root_dialog.querySelector('input[name=discount]');

        object.items.map(function(e){
            total_price = total_price + Number(e.total);
        });

        // if(inpercents.checked){
        //     itogo = total_price - (total_price / 100 * Number(discount.value).toFixed(2));
        // } else {
        //itogo = total_price - Number(discount.value).toFixed(2);
        // }

        // var discount_val;
        //
        // if(inpercents.checked){
        //     discount_val = discount.value + '%';
        // } else {
        //     discount_val = discount.value + 'р';
        // }


        object.setTotalPrice(total_price);
        object.setItogo(itogo);
        // object.setDiscount(discount_val);
    }

    recalculateItem(id){
        let object = this;
        let item = this.root_dialog.querySelector('#product_selected_' + id);
        let total = item.querySelector("input[name='products[" + id + "][total_price]']");
        let count = item.querySelector("input[name='products[" + id + "][count]']");
        let price = item.querySelector("input[name='products[" + id + "][price]']");

        let nds_percent = item.querySelector("input[name='products[" + id + "][nds_percent]']");
        let nds = item.querySelector("input[name='products[" + id + "][nds]']");

        let vcount = Number(count.value);
        let vprice = Number(price.value);
        let vnds_percent = Number(nds_percent.value);
        let vnds = Number(nds.value);
        let vtotal = Number(total.value);

        if(object.nds && !object.nds_included){
            vnds_percent = 20;
            vtotal = vprice * vcount;
            vnds = vtotal / 100 * vnds_percent;
            vtotal = vnds + vtotal;
        } else if(object.nds && object.nds_included){
            vnds_percent = 20;
            vtotal = vprice * vcount;
            vnds = vtotal / ( 100 + vnds_percent ) * vnds_percent;
        } else {
            vtotal = vprice * vcount;
            vnds = 0.00;
            vnds_percent = 0;
        }

        nds_percent.value = vnds_percent.toFixed(2);
        nds.value = vnds.toFixed(2);
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
export default providerOrderDialog;
