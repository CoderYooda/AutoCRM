import Modal from "../Modal/Modal";

class moneymoveDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно штрихкода инициализировано');
        this.active = true;
        this.init();
    }

    init(){
        let object = this;
        let focused = document.getElementById('moneymove_dialog_focused');
        if(focused){
            focused.focus();
        }
    }

    save(elem){
        if(window.isXHRloading) return;

        window.axform.send(elem, (e) => {
            if(e.status === 200) this.finitaLaComedia(true);
        });
    }

    selectInCashbox(id, target){
        var object = this;
        window.axios({
            method: 'post',
            url: 'cashbox/'+ id +'/select',
            data: {refer:this.root_dialog.id}
        }).then(function (resp) {

            let select = object.root_dialog.querySelector('button[name=in_cashbox_id]');
            let input = object.root_dialog.querySelector('input[name=in_cashbox_id]');
            let str = resp.data.name;
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

            let select = object.root_dialog.querySelector('button[name=out_cashbox_id]');
            let input = object.root_dialog.querySelector('input[name=out_cashbox_id]');
            let str = resp.data.name;
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
