import Modal from "../Modal/Modal";

class warrantDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно штрихкода инициализировано');
        this.active = true;
        this.init();
    }

    init(){
        let object = this;
        document.addEventListener('WarrantStored', function(e){
            object.finitaLaComedia(true);
        });
        let focused = document.getElementById('warrant_dialog_focused');
        if(focused) {
            focused.focus();
            focused.select();
        }
        //tippy('[data-tippy-content]');

        let entity_element = this.current_dialog.querySelector('[name="entity_id"]');
        if(entity_element) this.entity_id = Number.parseInt(entity_element.value);

        let ostatok_element = this.current_dialog.querySelector('[name="ostatok"]');
        if(ostatok_element) this.ostatok = Number.parseInt(ostatok_element.value);
    }

    save(elem){
        if(window.isXHRloading) return;
        let object = this;
        let form = this.root_dialog.getElementsByTagName('form')[0];
        window.axform.send(form, function(e){
<<<<<<< HEAD
            if(e.status == 200) object.finitaLaComedia(true);
=======
            if(e.status === 200) object.finitaLaComedia(true);
>>>>>>> origin/refactor
        });
    }

    selectPartner(id){
        var object = this;
        window.axios({
            method: 'post',
            url: 'partner/'+ id +'/select',
            data: {refer:this.root_dialog.id}
        }).then(function (resp) {

            let selector = object.root_dialog.querySelector('button[name=partner_id]');
            //let select = object.root_dialog.querySelector('select[name=partner_id]');
            let input = object.root_dialog.querySelector('input[name=partner_id]');
            let balance = object.root_dialog.querySelector('#balance');
            let partner_name = resp.data.name;

            selector.classList.remove('is-invalid');
            if(selector._tippy){
                selector._tippy.destroy();
            }

            input.value = resp.data.id;
            balance.innerHTML = resp.data.balance + ' р.';
            //select.innerHTML = str;
            selector.innerHTML = partner_name;
            window.notification.notify( 'success', 'Контактт выбран');
            document.dispatchEvent(new Event('PartnerSelected', {bubbles: true}));
            console.log("Событие PartnerSelected вызвано");
            //closeDialog(event);


        }).catch(function (error) {
            console.log(error);
        }).then(function () {
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

            let select = object.root_dialog.querySelector('button[name=cashbox_id]');
            let input = object.root_dialog.querySelector('input[name=cashbox_id]');
            let str = resp.data.name;
            input.value = resp.data.id;
            select.innerHTML = str;

            select.classList.remove('is-invalid');
            if(select._tippy){
                select._tippy.destroy();
            }

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

    writingSumm(element) {
        let refer = this.current_dialog.querySelector('input[name="refer"]').value;

        if(refer === 'ClientOrder') {
            let summ = Number.parseInt(element.value);

            let reason_element = this.current_dialog.querySelector('input[name="reason"]');

            reason_element.value = (summ >= this.ostatok) ? ('Реализация заказа №' + this.entity_id) : ('Предоплата по заказу №' + this.entity_id);
        }
    }

    selectDdsarticle(id){
        var object = this;
        window.axios({
            method: 'post',
            url: 'ddsarticle/'+ id +'/select',
            data: {refer:this.root_dialog.id}
        }).then(function (resp) {

            let select = object.root_dialog.querySelector('button[name=ddsarticle_id]');
            let input = object.root_dialog.querySelector('input[name=ddsarticle_id]');
            let str = resp.data.name;
            input.value = resp.data.id;
            select.innerHTML = str;

            select.classList.remove('is-invalid');
            if(select._tippy){
                select._tippy.destroy();
            }

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
        window.event.preventDefault();
        window.event.stopPropagation();
        window.openDialog('selectPartner', '&refer=' + this.root_dialog.id);
    }

    openSelectCashboxModal(){
        window.openDialog('selectCashbox', '&refer=' + this.root_dialog.id);
    }

    openSelectDdsarticleModal(incoming = null){
        let cat = 4;
        if(incoming){
            cat = 9;
        } else {
            cat = 8;
        }

        window.openDialog('selectDdsarticle', '&refer=' + this.root_dialog.id + '&category_id=' + cat);
    }

    setField(type, value, text, elem = null){
        let object = this;
        if(elem !== null){
            elem.closest('.dropdown').classList.remove('show');
        }
        object.root_dialog.querySelector('#' + type).value = value;
        object.root_dialog.querySelector('#' + type + '_text').innerHTML = text;
    }

}
export default warrantDialog;
