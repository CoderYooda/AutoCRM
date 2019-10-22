class createEntrance{

    constructor(dialog){
        console.log('Окно поступления инициализировано');
        this.root_dialog = dialog;
        this.items = [];
        this.nds = true;
        this.nds_included = true;
        this.totalPrice = 0.0;
        this.init();
    }

    init(){
        let object = this;
        let event = '';
        if(object.root_dialog.dataset.id){
            event = 'EntranceStored' + object.root_dialog.dataset.id;
        } else {
            event = 'EntranceStored';
        }
        console.log(event);
        document.addEventListener(event, function(e){
            object.finitaLaComedia();
        });
        this.loadItemsIfExists();
        let focused = document.getElementById('employee_dialog_focused');
        if(focused){
            focused.focus();
        }
    }

    save(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(e){
            object.finitaLaComedia();
        });
    }

    loadItemsIfExists(){
        window.isXHRloading = true;
        let object = this;
        var entrance_id = this.root_dialog.dataset.id;
        if(entrance_id && entrance_id !== 'undefined') {

            window.axios({
                method: 'post',
                url: 'entrance/' + entrance_id + '/get_products',
                data: {},
            }).then(function (resp) {

                [].forEach.call(resp.data.products, function(elem){
                    object.items.push({id:elem.id, count:elem.pivot.count, price:elem.pivot.price, total:elem.pivot.total});

                    let item = object.root_dialog.querySelector('#product_selected_' + elem.id);
                    let inputs = item.getElementsByTagName('input');

                    [].forEach.call(inputs, function(elem){
                        var fn = window.helper.debounce(function(e) {
                            object.recalculate(e);
                        }, 50);
                        elem.addEventListener("keydown", fn);
                        elem.addEventListener("paste", fn);
                        elem.addEventListener("delete", fn);
                    });

                });

            }).catch(function (error) {
                console.log(error);
            }).finally(function () {
                object.setNDS();
                window.isXHRloading = false;
            });

        }



        // let list_elems = this.root_dialog.querySelector('.product_list_elem');
        // if(list_elems){
        //     [].forEach.call(list_elems, function(elem){
        //         object.addItem({id:resp.data.id, html:resp.data.html});
        //     });
        // }
    }

    setTotalPrice(count){
        let container = this.root_dialog.querySelector('#total_price');
        container.innerHTML = Number(count).toFixed(2);
    }

    addItem(elem){
        let object = this;
        let product_list = this.root_dialog.querySelector('.product_list');
        this.items.push(elem);

        try{
            window.selectProductDialog.markAsAdded();
        }catch (e) {
            console.log(e);
        }

        let tbody = document.createElement('tbody');
        tbody.innerHTML = elem.html;
        product_list.prepend(tbody.firstChild);
        window.notification.notify( 'success', 'Товар добавлен к списку');
        let item = this.root_dialog.querySelector('#product_selected_' + elem.id);
        let inputs = item.getElementsByTagName('input');

        [].forEach.call(inputs, function(elem){
            var fn = window.helper.debounce(function(e) {
                object.recalculate(e);
            }, 50);
            elem.addEventListener("keydown", fn);
            elem.addEventListener("paste", fn);
            elem.addEventListener("delete", fn);
        });
        this.recalculate();
    }

    finitaLaComedia(){
        closeDialog(null, this.root_dialog.id);
        delete window[this.root_dialog.id];
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

    addProduct(elem){
        var object = this;

        let article_id = elem.dataset.article_id;
        let count = elem.closest('div').querySelector('input[name="count"]').value

        window.axios({
            method: 'post',
            url: 'product/addtolist',
            data: {
                refer:this.root_dialog.id,
                article_id:article_id,
                count:count,
            }
        }).then(function (resp) {

            var isset = object.items.map(function(e){
                return e.id;
            }).indexOf(resp.data.product.id);

            if(isset < 0){
                object.addItem({id:resp.data.product.id, html:resp.data.html});
            } else {
                window.notification.notify('error', 'Товар уже в списке');
            }
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    };


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

    openProductmodal(){
        window.openDialog('selectProduct', '&refer=' + this.root_dialog.id);
    }

    openSelectPartnermodal(){
        window.openDialog('selectPartner', '&refer=' + this.root_dialog.id);
    }

    recalculate(){
        console.log("Пересчет...");
        var object = this;
        this.items.forEach(function(elem){
            object.recalculateItem(elem.id);
        });
        var total_price = object.totalPrice;

        object.items.map(function(e){
            total_price = total_price + Number(e.total);
        });
        object.setTotalPrice(total_price);
    }

    setNDS() {
        this.nds = this.root_dialog.querySelector('input[name=nds]').checked;
        this.nds_included = this.root_dialog.querySelector('input[name=nds_included]').checked;
        this.recalculate();
    }


    recalculateItem(id){
        let object = this;
        let item = this.root_dialog.querySelector('#product_selected_' + id);
        let total = item.querySelector("input[name='products[" + id + "][total_price]']");
        let count = item.querySelector("input[name='products[" + id + "][count]']");
        let price = item.querySelector("input[name='products[" + id + "][price]']");

        let nds_percent = item.querySelector("input[name='products[" + id + "][nds_percent]']");
        let nds = item.querySelector("input[name='products[" + id + "][nds]']");


        let vcount = Number(count.value);
        let vprice = Number(price.value);
        let vnds_percent = Number(nds_percent.value);
        let vnds = Number(nds.value);
        let vtotal = Number(total.value);

        if(object.nds && !object.nds_included){
            vnds_percent = 20;
            vtotal = vprice * vcount;
            vnds = vtotal / 100 * vnds_percent;
            vtotal = vnds + vtotal;
        } else if(object.nds && object.nds_included){
            vnds_percent = 20;
            vtotal = vprice * vcount;
            vnds = vtotal / ( 100 + vnds_percent ) * vnds_percent;
        } else {
            vtotal = vprice * vcount;
            vnds = 0.00;
            vnds_percent = 0;
        }

        nds_percent.value = vnds_percent.toFixed(2);
        nds.value = vnds.toFixed(2);
        total.value = vtotal.toFixed(2);

        // nds.value = Number(total.value).toFixed(2) * Number(nds_percent.value).toFixed(2);
        //
        // total.value = Number(total.value).toFixed(2) + Number(nds.value).toFixed(2);

        object.items.map(function(e){
            if(e.id === id){
                e.total = vtotal;
                e.count = vcount;
                e.price = vprice;
            }
        });
    }

}
export default createEntrance;
