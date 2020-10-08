import Modal from "../Modal/Modal";
import Tabs from "../../Tools/Tabs";

class providerOrderDialog extends Modal{

    constructor(dialog, response){
        super(dialog);
        console.log('Окно штрихкода инициализировано');
        this.items = [];
        this.nds = true;
        this.nds_included = true;
        this.refer = null;

        if(response.products != undefined) {
            Object.values(response.products).forEach(product_id => {
                window.entity.addProductToList(product_id.id, this, 'providerOrder');
            });
        }

        this.init();
    }

    init(){

        var fn = window.helper.debounce(e => this.recalculate(e), 50);

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
                this.saveAndClose(object.root_dialog.getElementsByTagName('form')[0]);
            }
        });

        this.root_dialog.getElementsByTagName('form')[0].addEventListener('WarrantStored',  () => {
            let id = this.root_dialog.querySelector('input[name=id]').value;
            if(id !== null){
                let root_id = this.root_dialog.id;
                this.freshContent(id,function(){
                    delete window[root_id];
                    window.helper.initDialogMethods();
                });
            }
        });

        this.loadItemsIfExists();

        this.linked();
    }

    linked() {
        new Tabs('provider_orders-tabs');
    }

    scanOperation(product_id){
        this.addProduct(product_id);
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

    loadItemsIfExists(){

        this.addInputsMask();

        let product_elements = this.current_dialog.querySelectorAll('.element-item')

        product_elements.forEach(element => {

            let id = parseInt(element.querySelector('.id_elem').value);

            let count = parseInt(element.querySelector(".count_elem"));
            let price = parseFloat(element.querySelector(".price_elem"));

            this.items.push({
                id: id,
                count: count,
                price: price,
                total: count * price
            });

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

    removeItem(id){
        this.items.splice(
            this.items.map(function(e){
                return e.id
            }).indexOf(id), 1
        );
        this.root_dialog.querySelector('#product_selected_' + id).remove();
        this.recalculate();
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

    recalculate(){
        console.log("Пересчет...");

        let product_elements = this.current_dialog.querySelectorAll('.element-item')

        let total_price = 0;

        product_elements.forEach((element, index) => {
            let id = element.querySelector('.id_elem');
            let price = element.querySelector(".price_elem");
            let count = element.querySelector(".count_elem");
            let total = element.querySelector(".total_elem");
            let pivot_id = element.querySelector('.pivot_id_elem');

            id.name = 'products[' + index + '][id]';
            price.name = 'products[' + index + '][price]';
            count.name = 'products[' + index + '][count]';
            if(pivot_id) pivot_id.name = 'products[' + index + '][pivot_id]';

            let nds_percent = element.querySelector(".nds_percent_elem");
            let nds = element.querySelector(".nds_elem");

            let vcount = Number(count.value);
            let vprice = Number(price.value);
            let vnds_percent = Number(nds_percent.value);
            let vnds = Number(nds.value);
            let vtotal = Number(total.value);

            vnds_percent = 20;
            vtotal = vprice * vcount;
            vnds = (vtotal / 100) * vnds_percent;

            if(this.nds){
                if(!this.nds_included) vtotal += vnds;
            } else {
                vnds = 0.00;
                vnds_percent = 0;
            }

            nds_percent.value = vnds_percent.toFixed(2);
            nds.value = vnds.toFixed(2);
            total.value = vtotal.toFixed(2);

            total_price += vtotal;
        });

        this.setTotalPrice(total_price);
    }

    setNDS() {
        this.nds = this.root_dialog.querySelector('input[name=nds]').checked;
        this.nds_included = this.root_dialog.querySelector('input[name=nds_included]').checked;
        this.recalculate();
    }
}
export default providerOrderDialog;
