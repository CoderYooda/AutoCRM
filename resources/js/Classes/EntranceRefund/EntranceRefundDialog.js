import Modal from "../Modal/Modal";

class entranceRefundDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно возврата поступления инициализировано');

        this.items = [];
        this.itogo = 0;
        this.totalPrice = 0.0;

        this.init();
    }

    init(){

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
                    total: elem.pivot.total
                });

                let item = object.root_dialog.querySelector('#product_selected_' + elem.id);
                let inputs = item.getElementsByTagName('input');

                [].forEach.call(inputs, function (elem) {
                    let fn = window.helper.debounce(function (e) {
                        object.recalculate(e);
                    }, 50);
                    elem.addEventListener("keydown", fn);
                    elem.addEventListener("paste", fn);
                    elem.addEventListener("delete", fn);
                });

                object.recalculate();
            });
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    }

    recalculate() {

        var object = this;
        this.items.forEach(function(elem){
            object.recalculateItem(elem.id);
        });
        var total_price = object.totalPrice;
        var itogo = object.itogo;

        object.items.map(function(e){
            total_price = total_price + Number(e.total);
        });

        itogo = total_price;

        object.setTotalPrice(total_price);
        object.setItogo(itogo);
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

    setTotalPrice(count){
        let container = this.root_dialog.querySelector('#total_price');
        container.innerHTML = Number(count).toFixed(2);
    }

    setItogo(count){
        let itogo_prices = this.root_dialog.querySelectorAll('.itogo_price');
        [].forEach.call(itogo_prices, function(itogo_price){
            itogo_price.innerHTML = Number(count).toFixed(2);
        });
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

    freshContent(id, callback = null){
        let object = this;

        let data = {};
        if(object.refer){
            data.refer = object.refer;
        }

        window.axios({
            method: 'post',
            url: '/entrance_refunds/' + id + '/fresh',
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

    save(elem){
        if(window.isXHRloading) return;
        let object = this;

        console.log(this.items);

        window.axform.send(elem, function(resp){
            if(resp.status === 200) {
                let root_id = object.root_dialog.id;
                object.root_dialog.querySelector('input[name=id]').value = resp.data.id;
                object.root_dialog.setAttribute('id', 'entranceRefundDialog' + resp.data.id);
                object.root_dialog.setAttribute('data-id', resp.data.id);
                object.freshContent(resp.data.id, function () {
                    delete window[root_id];
                    let drag_dialog = window.dialogs[root_id];
                    delete window.dialogs[root_id];
                    window.dialogs['entranceRefundDialog' + resp.data.id] = drag_dialog;
                    drag_dialog.tag = 'entranceRefundDialog' + resp.data.id;
                    window.helper.initDialogMethods();
                });
            }
        });
    }

    saveAndClose(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(resp){
            if(resp.status === 200) object.finitaLaComedia(true);
        });
    }
}
export default entranceRefundDialog;
