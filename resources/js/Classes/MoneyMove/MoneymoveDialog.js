class moneymoveDialog{

    constructor(dialog){
        console.log('Окно перемещения средств инициализировано');
        this.root_dialog = dialog;
        this.active = true;
        this.init();
    }

    init(){
        let object = this;
        document.addEventListener('MoneymoveStored', function(e){
            object.finitaLaComedia();
        });
    }

    save(elem){
        if(window.isXHRloading) return;
        let object = this;
        let form = this.root_dialog.getElementsByTagName('form')[0];
        window.axform.send(form, function(e){
            object.finitaLaComedia();
        });
    }

    finitaLaComedia(){
        closeDialog(null, this.root_dialog.id);
        delete window[this.root_dialog.id];
    }


    selectInCashbox(id, target){
        var object = this;
        window.axios({
            method: 'post',
            url: 'cashbox/'+ id +'/select',
            data: {refer:this.root_dialog.id}
        }).then(function (resp) {

            let select = object.root_dialog.querySelector('select[name=in_cashbox_id]');
            let input = object.root_dialog.querySelector('input[name=in_cashbox_id]');
            let str = '<option selected value="' + resp.data.id + '">' + resp.data.name + '</option>';
            input.value = resp.data.id;
            select.innerHTML = str;
            window.notification.notify( 'success', 'Кассовый аппарат-отправитель выбран');
            document.dispatchEvent(new Event('CashboxSelected', {bubbles: true}));
            console.log("Событие CashboxSelected вызвано");
            //closeDialog(event);

        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    };

    selectOutCashbox(id, target){
        var object = this;
        window.axios({
            method: 'post',
            url: 'cashbox/'+ id +'/select',
            data: {refer:this.root_dialog.id}
        }).then(function (resp) {

            let select = object.root_dialog.querySelector('select[name=out_cashbox_id]');
            let input = object.root_dialog.querySelector('input[name=out_cashbox_id]');
            let str = '<option selected value="' + resp.data.id + '">' + resp.data.name + '</option>';
            input.value = resp.data.id;
            select.innerHTML = str;
            window.notification.notify( 'success', 'Кассовый аппарат-отправитель выбран');
            document.dispatchEvent(new Event('CashboxSelected', {bubbles: true}));
            console.log("Событие CashboxSelected вызвано");
            //closeDialog(event);

        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    };

    openSelectCashboxModal(type){
        window.openDialog('selectCashbox', '&refer=' + this.root_dialog.id + '&type=' + type);
    }

}
export default moneymoveDialog;
