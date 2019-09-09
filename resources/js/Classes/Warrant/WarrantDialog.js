class warrantDialog{

    constructor(dialog){
        console.log('Окно кассовых операций инициализировано');
        this.root_dialog = dialog;
        this.active = true;
        this.init();
    }

    init(){
        let object = this;
        let event = '';
        if(object.root_dialog.dataset.id){
            event = 'WarrantStored' + object.root_dialog.dataset.id;
        } else {
            event = 'WarrantStored';
        }
        console.log(event);
        document.addEventListener(event, function(e){
            object.finitaLaComedia();
        });
    }

    save(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(e){
            object.finitaLaComedia();
        });
    }

    finitaLaComedia(){
        closeDialog(null, this.root_dialog.id);
        delete window[this.root_dialog.id];
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

    selectCashbox(id){
        var object = this;
        window.axios({
            method: 'post',
            url: 'cashbox/'+ id +'/select',
            data: {refer:this.root_dialog.id}
        }).then(function (resp) {

            let select = object.root_dialog.querySelector('select[name=cashbox_id]');
            let input = object.root_dialog.querySelector('input[name=cashbox_id]');
            let str = '<option selected value="' + resp.data.id + '">' + resp.data.name + '</option>';
            input.value = resp.data.id;
            select.innerHTML = str;
            window.notification.notify( 'success', 'Кассовый аппарат выбран');
            document.dispatchEvent(new Event('CashboxSelected', {bubbles: true}));
            console.log("Событие CashboxSelected вызвано");
            //closeDialog(event);

        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    };

    selectDdsarticle(id){
        var object = this;
        window.axios({
            method: 'post',
            url: 'ddsarticle/'+ id +'/select',
            data: {refer:this.root_dialog.id}
        }).then(function (resp) {

            let select = object.root_dialog.querySelector('select[name=ddsarticle_id]');
            let input = object.root_dialog.querySelector('input[name=ddsarticle_id]');
            let str = '<option selected value="' + resp.data.id + '">' + resp.data.name + '</option>';
            input.value = resp.data.id;
            select.innerHTML = str;
            window.notification.notify( 'success', 'Статья выбрана');
            document.dispatchEvent(new Event('DdsarticleSelected', {bubbles: true}));
            console.log("Событие DdsarticleSelected вызвано");
            //closeDialog(event);

        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    };

    openSelectPartnerModal(){
        window.openDialog('selectPartner', '&refer=' + this.root_dialog.id);
    }

    openSelectCashboxModal(){
        window.openDialog('selectCashbox', '&refer=' + this.root_dialog.id);
    }

    openSelectDdsarticleModal(){
        window.openDialog('selectDdsarticle', '&refer=' + this.root_dialog.id);
    }

}
export default warrantDialog;
