import Modal from "../Modal/Modal";
import BBlist from "../BBitems";

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

        let focused = document.getElementById('entrance_dialog_focused');
        if(focused) focused.focus();

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

        let id = this.current_dialog.dataset.id;
        let prefix = id ? id : '';

        this.tabs = window.helper.initTabs('entrance_tabs' + prefix);

        let header = [
            {min_with: NaN, width: NaN, name: '',    table_name: 'pivot_id',     type:'hidden'},
            {min_with: NaN, width: NaN, name: '',    table_name: 'product_id',     type:'hidden'},
            {min_with: 100, width: 'auto', name: 'Наименование',    table_name: 'name',     type:'text'},
            {min_with: 100, width: 100,    name: 'Артикул',         table_name: 'article',  type:'text'},
            {min_with: 65, width: 65, name: 'Кол-во', table_name: 'count', type: 'counter',},
            // {min_with: 150, width: 150, name: 'Поступило / Ожидается', table_name: 'count', type: 'text',},
            {min_with: 80, width: 80, name: 'Цена', table_name: 'price', type: 'passive',},
        ];

        this.items = new BBlist(this, 'entrance_list' + prefix, 'products', header);

    }

    save(elem){
        if(window.isXHRloading) return;

        window.axform.send(elem, (resp) => {

            if(resp.status === 200) {
                let root_id = this.root_dialog.id;
                this.root_dialog.querySelector('input[name=id]').value = resp.data.id;
                this.root_dialog.setAttribute('id', 'entranceDialog' + resp.data.id);
                this.root_dialog.setAttribute('data-id', resp.data.id);
                this.freshContent(resp.data.id, function () {
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

        window.axform.send(elem, (resp) => {
            if(resp.status === 200) this.finitaLaComedia(true);
        });
    }

    setTotalPrice(count){
        let container = this.root_dialog.querySelector('#total_price');
        if(container)
            container.innerHTML = Number(count).toFixed(2);
    }

    freshContent(id, callback = null){
        let object = this;
        let data = {};
        //data.store_id = store_id;
        if(object.refer){
            data.refer = object.refer;
            data.inner = 1;
        }

        window.axios({
            method: 'post',
            url: 'entrance/' + id + '/fresh',
            data: data,
        }).then(resp => {
            console.log(resp.data);
            this.current_dialog.innerHTML = resp.data.html;
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            callback();
        });
    }

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
        }).then((resp)=> {
            this.items.setItems(resp.data.items);

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

}
export default createEntrance;
