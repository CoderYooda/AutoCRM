import Modal from "../Modal/Modal";
import BBlist from "../BBitems";

class shipmentDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно штрихкода инициализировано');
        this.items = [];
        this.nds = true;
        this.totalPrice = 0.0;
        this.itogo = 0.0;
        this.refer = null;
        this.inpercents = this.root_dialog.querySelector('input[name=inpercents]');
        this.discount = this.root_dialog.querySelector('input[name=discount]');
        this.init();
    }

    scanOperation(product_id){
        //this.addProduct(product_id); TODO
    }

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

        let id = this.current_dialog.dataset.id;
        let prefix = id ? id : '';

        this.tabs = window.helper.initTabs('shipment_tabs' + prefix);

        let header = [
            {min_with: 100, width: 'auto', name: 'Наименование',    table_name: 'name',     type:'text'},
            {min_with: 100, width: 100,    name: 'Артикул',         table_name: 'article',  type:'text'},
            {min_with: 100, width: 100,    name: 'Производитель',   table_name: 'supplier_name',  type:'text'},
            {min_with: 65, width: 65, name: 'Кол-во', table_name: 'count', type: 'counter',},
            {min_with: 90, width: 90, name: 'Доступно', table_name: 'available', type: 'text'},
            {min_with: 100, width: 100, name: 'Цена', table_name: 'price', type: 'price',},
            {min_with: 100, width: 100, name: 'Итого', table_name: 'total', type: 'passive',},
        ];

        this.items = new BBlist(this, 'shipment_list' + prefix, 'products', header);
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

    freshContent(id, callback = null)
    {
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
        if(container)
            container.innerHTML = Number(count).toFixed(2);
    }

    setDiscount(count){
        let container = this.root_dialog.querySelector('#percents_price');
        if(container)
            container.innerHTML = count;
    }

    setTotal(count){
        let container = this.root_dialog.querySelector('#itogo_price');
        let container2 = this.root_dialog.querySelector('#payed_price');
        if(container)
            container.innerHTML = Number(count).toFixed(2);
        if(container2)
            container2.innerHTML = Number(count).toFixed(2);
    }

    anonymousBuyerToggle(element)
    {
        let attribute = element.getAttribute('for');

        let anonymous = document.querySelector('input[name="' + attribute + '"]');

        let select_element = document.querySelector('button[name="partner_id"]');

        select_element.disabled = element.checked;

        if(element.checked) {
            this.current_dialog.querySelector('input[name="partner_id"]').value = '';
            this.current_dialog.querySelector('button[name="partner_id"]').innerText = 'Анонимный покупатель';

        } else {
            this.current_dialog.querySelector('button[name="partner_id"]').innerText = 'Нажмите для выбора';
        }

        element.blur(); //fix barcode
    }


    setField(type, value, text, elem = null){
        let object = this;
        if(elem !== null){
            elem.closest('.dropdown').classList.remove('show');
        }
        let input = object.root_dialog.querySelector('#' + type);
        input.value = value;
        event = document.createEvent("HTMLEvents");
        event.initEvent("change", true, true);
        input.dispatchEvent(event);
        object.root_dialog.querySelector('#' + type + '_text').innerHTML = text;
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

}
export default shipmentDialog;
