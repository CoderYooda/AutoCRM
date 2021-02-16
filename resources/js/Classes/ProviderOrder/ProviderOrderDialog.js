import Modal from "../Modal/Modal";
import Tabs from "../../Tools/Tabs";
import BBlist from "../BBitems";

class providerOrderDialog extends Modal{

    constructor(dialog, response){
        super(dialog);
        console.log('Окно заявки поставщику инициализировано');
        // this.items = [];
        this.nds = true;
        this.nds_included = true;
        this.refer = null;

        this.init();
        if(response && response.products) {
            Object.values(response.products).forEach(product_id => {
                this.items.insertProduct(product_id);
            });
        }
    }

    init(){

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

        this.root_dialog.getElementsByTagName('form')[0].addEventListener('keydown',  e => {
            if (e.which == 13) {
                e.preventDefault();
                this.saveAndClose(this.root_dialog.getElementsByTagName('form')[0]);
            }
        });

        this.root_dialog.addEventListener('WarrantStored',  () => {

            let id = this.root_dialog.querySelector('input[name=id]').value;
            if(id !== null) {
                let root_id = this.root_dialog.id;
                this.freshContent(id,() => {
                    delete window[root_id];
                    window.helper.initDialogMethods();
                });
            }
        });

        this.tabs = window.helper.initTabs('po_tabs');

        let header = [
            {min_with: NaN, width: NaN, name: 'pivot_id', table_name: 'pivot_id', type: 'hidden'},
            {min_with: NaN, width: NaN, name: 'product_id', table_name: 'product_id', type: 'hidden'},
            {min_with: 100, width: 'auto', name: 'Наименование',    table_name: 'name',     type:'text'},
            {min_with: 100, width: 100,    name: 'Артикул',         table_name: 'article',  type:'text'},
            {min_with: 65, width: 65, name: 'Кол-во', table_name: 'count', type: 'counter',},
            {min_with: 80, width: 80, name: 'Цена', table_name: 'price', type: 'price',},
            {min_with: 70, width: 70, name: 'НДС, %', table_name: 'nds_percent', type: 'passive',},
            {min_with: 70, width: 70, name: 'НДС', table_name: 'nds', type: 'passive',},
            {min_with: 100, width: 100, name: 'Итого', table_name: 'total', type: 'passive',},
        ];
        this.items = new BBlist(this, 'po_list', 'products', header);

    }

    scanOperation(id, product){
        this.items.addProduct(product, true);
    }

    freshContent(id, callback = null){
        let object = this;

        //var store_id = this.store_obj.value;

        let data = {};
        //data.store_id = store_id;
        if(object.refer){
            data.refer = object.refer;
            data.inner = 1;
        }

        window.axios({
            method: 'post',
            url: 'providerorder/' + id + '/fresh',
            data: data,
        }).then(resp => {
            this.current_dialog.innerHTML = resp.data.html;
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
        let refer = 'ProviderOrder';
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

        window.axform.send(elem, (resp) => {
            if(resp.status === 200) {
                let root_id = this.root_dialog.id;
                this.root_dialog.querySelector('input[name=id]').value = resp.data.id;
                this.root_dialog.setAttribute('id', 'providerorderDialog' + resp.data.id);
                this.root_dialog.setAttribute('data-id', resp.data.id);
                this.freshContent(resp.data.id, function () {
                    delete window[root_id];
                    let drag_dialog = window.dialogs[root_id];
                    delete window.dialogs[root_id];
                    window.dialogs['providerorderDialog' + resp.data.id] = drag_dialog;
                    drag_dialog.tag = 'providerorderDialog' + resp.data.id;
                    window.helper.initDialogMethods(resp);
                });
            }
        });
    }

    saveAndClose(elem){
        if(window.isXHRloading) return;

        window.axform.send(elem, (resp) => {
            if(resp.status === 200) this.finitaLaComedia(true);
        });
    }

    setTotalPrice(count){
        let container = this.root_dialog.querySelector('#total_price');
        container.innerHTML = Number(count).toFixed(2);
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

    addInputPriceMask(element) {
        let options = {
            mask: Number,
            min: 0,
            max: 9999999,
            radix: '.'
        };

        IMask(element, options);
    }


    addProduct(elem_or_id, refer = null) {
        window.entity.addProductToList(elem_or_id, this, 'providerOrder', this.root_dialog.id);
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
            let str =  resp.data.name;
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

    openProductmodal(){
        window.openDialog('selectProduct', '&refer=' + this.root_dialog.id + '&category_id=2');
    }

    openSelectPartnerModal(){
        window.openDialog('selectPartner', '&only_current_category=1&refer=' + this.root_dialog.id + '&category_id=6');
    }
}
export default providerOrderDialog;
