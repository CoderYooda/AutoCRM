import Sortable from "sortablejs";
import Modal from "../Modal/Modal";

class adjustmentDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно Корректировки инициализировано');
        this.store_id = null;
        this.items = [];
        this.init();
    }

    checkInStock(){
        console.log('Проверка наличия');
        let object = this;

        object.store_id = parseInt(object.root_dialog.querySelector('select[name=store_id]').value);


        let items = [];
        [].forEach.call(object.items, function(elem){
            items.push(elem.id)
        });

        let data = {};
        data.store_id = object.store_id;
        data.ids = items;

        window.axios({
            method: 'post',
            url: 'store/checkstock',
            data: data,
        }).then(response => {

            for(var index in response.data.items) {
               let item = response.data.items[index];
                document.getElementById('uc_' + item.id).value = item.count;
            }

            // response.data.items.forEach.call(response.data.items, function(elem){
            //     console.log(elem);
            // });

            // console.log(response);
            // this.data = response.data;
            // this.data.forEach((item) => {
            //     document.getElementById('uc_' + item.id).value = item.count;
            // });
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            //callback();
        });
    }

    init(){
        let object = this;

        object.root_dialog.getElementsByTagName('form')[0].addEventListener('keydown',  function(e){
            if (e.which == 13) {
                e.preventDefault();
                object.saveAndClose(object.root_dialog.getElementsByTagName('form')[0]);
            }
        });
    }

    save(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(resp){
            let root_id = object.root_dialog.id;
            object.root_dialog.querySelector('input[name=id]').value = resp.data.id;
            object.root_dialog.setAttribute('id', 'adjustmentDialog' + resp.data.id);
            object.root_dialog.setAttribute('data-id', resp.data.id);
            object.freshContent(resp.data.id, function(){
                delete window[root_id];
                let drag_dialog = window.dialogs[root_id];
                delete window.dialogs[root_id];
                window.dialogs['adjustmentDialog' + resp.data.id] = drag_dialog;
                drag_dialog.tag = 'adjustmentDialog' + resp.data.id;
                window.helper.initDialogMethods();
            });



            // let dialog = document.getElementById('clientorderDialog' + resp.data.id);
            // console.log(dialog);
            // window['clientorderDialog' + resp.data.id] = new clientorderDialog(dialog);

        });
    }

    saveAndClose(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(resp){
            object.finitaLaComedia(true);
        });
    }

    recalculate(){

    };

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
            url: 'adjustment/' + id + '/fresh',
            data: data,
        }).then(function (resp) {
            document.getElementById(resp.data.target).innerHTML = resp.data.html;
            //object.addPhoneMask();
            console.log('Вставили html');
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            callback();
        });
    }

    scanOperation(product_id){
        this.addProduct(product_id);
    }

    addProduct(elem_or_id, refer = null){
        let object = this;
        window.entity.addProductToList(elem_or_id, this, 'adjustment');
        if(refer != null){
            object.refer = refer;
        }
    };

    openProductmodal(){
        let store_id = this.root_dialog.querySelector('select[name=store_id]').value;
        window.openDialog('selectProduct', '&refer=' + this.root_dialog.id + '&store_id=' + store_id);
    }

    addItem(elem, tag){
        let object = this;
        let product_list = this.root_dialog.querySelector('.product_list');
        this.items.push(elem);

        try{
            window.selectProductDialog.markAsAdded();
        }catch (e) {
            console.log(e);
        }

        product_list.insertAdjacentHTML('afterbegin', elem.html);

        window.notification.notify( 'success', 'Товар добавлен к списку');
        let item = this.root_dialog.querySelector('#product_selected_' + tag);
        let inputs = item.getElementsByTagName('input');

        [].forEach.call(inputs, function(elem){
            var fn = window.helper.debounce(function(e) {
                object.recalculate(e);
            }, 50);
            elem.addEventListener("keydown", fn);
            elem.addEventListener("paste", fn);
            elem.addEventListener("delete", fn);
        });
        this.checkInStock();
        this.recalculate();
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

    initLists(){
        let available_list = document.querySelector('#available_list');
        new Sortable(available_list, {
            group: {
                name: 'shared',
                put: 'false'
            },
            sort: false,
            animation: 0,
            ghostClass: 'blue-background-class'
        });
    }

}
export default adjustmentDialog;
