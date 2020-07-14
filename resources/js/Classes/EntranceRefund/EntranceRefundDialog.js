import Modal from "../Modal/Modal";

class entranceRefundDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно возврата поступления инициализировано');

        this.items = [];

        this.init();
    }

    init(){
        this.root_dialog.getElementsByTagName('form')[0].addEventListener('WarrantStored', () => {
            let id = this.root_dialog.querySelector('input[name=id]').value;
            if(id !== null) this.fresh(id);
        });
    }

    openSelectEntranceRefundModal() {
        window.openDialog('selectEntranceDialog', '&refer=' + this.root_dialog.id);
    }

    selectEntrance(id) {
        var object = this;
        window.axios({
            method: 'post',
            url: 'entrance/'+ id +'/select',
            data: {
                refer: this.root_dialog.id
            }
        }).then(resp => {

            object.touch();
            let select = object.root_dialog.querySelector('button[name=entrance_id]');
            let partner_butt = object.root_dialog.querySelector('#partner_butt');
            let input = object.root_dialog.querySelector('input[name=entrance_id]');
            //let str = '<option selected value="' + resp.data.id + '">' + resp.data.name + '</option>';
            let balance = object.root_dialog.querySelector('#balance');
            let str = resp.data.name;
            input.value = id;
            partner_butt.value = resp.data.partner;
            select.innerHTML = str;

            object.current_dialog.querySelector('input[name="partner_id"]').value = resp.data.partner_id;

            window.notification.notify( 'success', 'Поступление выбрано');
            document.dispatchEvent(new Event('EntranceSelected', {bubbles: true}));
            console.log("Событие EntranceSelected вызвано");
            object.root_dialog.querySelector('.product_list').innerHTML = resp.data.items_html;
            balance.innerHTML = resp.data.balance + ' р';

            [].forEach.call(resp.data.items, function (elem) {
                object.items.push({
                    id: elem.id,
                    count: elem.pivot.count,
                    price: elem.pivot.price,
                    total: elem.pivot.count * elem.pivot.price
                });

                let item = object.root_dialog.querySelector('#product_selected_' + elem.id);

                if(item) {
                    let inputs = item.getElementsByTagName('input');

                    [].forEach.call(inputs, function (elem) {
                        let fn = window.helper.debounce(function (e) {
                            object.recalculate(e);
                        }, 50);
                        elem.addEventListener("keydown", fn);
                        elem.addEventListener("paste", fn);
                        elem.addEventListener("delete", fn);
                    });
                }

                object.recalculate();
            });
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    }

    getBackPayment() {
        let warrant_type = 'receipt_of_funds';
        let partner = this.root_dialog.querySelector('input[name=partner_id]').value;
        let refer = 'EntranceRefund';
        let refer_id = this.root_dialog.querySelector('input[name=id]').value;
        let itogo = this.root_dialog.querySelector('input[name=itogo]').value;
        let ostatok = this.root_dialog.querySelector('input[name=ostatok]').value;
        let id = this.root_dialog.querySelector('input[name=id]').value;
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
        if(ostatok != null){
            params += '&ostatok='+ostatok;
        }
        if(refer != null){
            params += '&refer='+refer;
        }
        if(refer_id != null){
            params += '&refer_id='+refer_id;
        }
        if(id != null){
            let reason = 'Возврат товаров по поступлению №' + id;
            params += '&reason='+reason;
        }

        openDialog('warrantDialog', '&isIncoming=1'+params);
    }

    recalculate() {

        let object = this;
        this.items.forEach(function(elem){
            object.recalculateItem(elem.id);
        });
    }

    removeItem(id, tag = null){

        let object = this;
        [].forEach.call(object.items, function(item){

            if(item.id === id){
                object.items.splice(
                    object.items.indexOf(item), 1
                );
            }
        });
        if(tag !== null){
            id = id + '_' + tag;
        }
        let product = this.root_dialog.querySelector('#product_selected_' + id).remove();
        object.recalculate();
    }

    recalculateItem(id){

        let object = this;

        let item = this.root_dialog.querySelector('#product_selected_' + id);
        let total, count, price;
        if(item !== null && item !== 'undefined' && item !== 'null') {
            total = item.querySelector("input[name='products[" + id + "][total_price]']");
            count = item.querySelector("input[name='products[" + id + "][count]']");
            price = item.querySelector("input[name='products[" + id + "][price]']");
            let vcount = Number(count.value);
            let vprice = Number(price.value);
            let vtotal = Number(total.value);

            vtotal = vprice * vcount;
            total.value = vtotal.toFixed(2);

            object.items.map(function(e){
                if(e.id === id){
                    e.total = vtotal;
                    e.count = vcount;
                    e.price = vprice;
                }
            });
        } else {

        }
    }

    save(elem){

        event.preventDefault();
        if(window.isXHRloading) return;
        window.axform.send(elem, (response) => {
            if(response.status === 200) {
                this.fresh(response.data.id);
            }
        });
    }

    fresh(id) {
        let root_id = this.root_dialog.id;

        this.root_dialog.querySelector('input[name=id]').value = id;
        this.root_dialog.setAttribute('id', 'entranceRefundDialog' + id);
        this.root_dialog.setAttribute('data-id', id);

        axios.get('/dialog_entranceRefundDialog_open?inner=1&entrance_refund_id=' + id)
            .then(response => {
                this.current_dialog.innerHTML = response.data.html;
                delete window[root_id];
                let drag_dialog = window.dialogs[root_id];
                delete window.dialogs[root_id];
                window.dialogs['entranceRefundDialog' + id] = drag_dialog;
                drag_dialog.tag = 'entranceRefundDialog' + id;
                window.helper.initDialogMethods();
            })
            .catch(response => {
                console.log(response);
            });
    }

    saveAndClose(elem){

        event.preventDefault();

        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(resp){
            if(resp.status === 200) object.finitaLaComedia(true);
        });
    }
}
export default entranceRefundDialog;
