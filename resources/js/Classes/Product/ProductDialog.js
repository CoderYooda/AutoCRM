
class ProductDialog{

    constructor(dialog){

        console.log('Окно создания товара инициализировано');
        this.root_dialog = dialog;
        // this.search_obj = dialog.querySelector("#product_search");
        // this.store_obj = dialog.querySelector("#product_search_store");
        // this.results_obj = dialog.querySelector("#search_product_results");
        // this.refer = dialog.querySelector("#refer").value;
        //this.searchInit();
        this.init();
    }

    init(){
        let object = this;
        // document.addEventListener("ProductStored", function(){
        //     object.finitaLaComedia();
        // });
        let focused = document.getElementById('product_dialog_focused');
        if(focused){
            focused.focus();
        }
    }

    finitaLaComedia(){
        closeDialog(null, this.root_dialog.id);
        delete window[this.root_dialog.id];
    }

    save(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(e){
            object.finitaLaComedia();
        });
    }

    openSelectCategoryDialog(category_selected = null){
        window.openDialog('selectCategory', '&refer=' + this.root_dialog.id + '&category_selected=' + category_selected);
    }

    openSelectSupplierDialog(){
        window.openDialog('selectSupplier', '&refer=' + this.root_dialog.id);
    }

    selectCategory(id){
        var object = this;
        window.axios({
            method: 'post',
            url: 'category/'+ id +'/select',
            data: {refer:this.root_dialog.id}
        }).then(function (resp) {

            let select = object.root_dialog.querySelector('button[name=category_id]');
            let input = object.root_dialog.querySelector('input[name=category_id]');
            let str = resp.data.name;
            input.value = resp.data.id;
            select.innerHTML = str;
            window.notification.notify( 'success', 'Категория выбрана');
            document.dispatchEvent(new Event('CategorySelected', {bubbles: true}));
            console.log("Событие CategorySelected вызвано");
            //closeDialog(event);

        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    };

    selectSupplier(id){
        var object = this;
        window.axios({
            method: 'post',
            url: 'suppliers/'+ id +'/select',
            data: {refer:this.root_dialog.id}
        }).then(function (resp) {
            let select = object.root_dialog.querySelector('button[name=supplier_id]');
            let input = object.root_dialog.querySelector('input[name=supplier_id]');
            let str = resp.data.name;
            input.value = resp.data.id;
            select.innerHTML = str;
            window.notification.notify( 'success', 'Производитель выбран');
            document.dispatchEvent(new Event('SupplierSelected', {bubbles: true}));
            console.log("Событие SupplierSelected вызвано");
            //closeDialog(event);

        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    };

    openCategoryModal(category_selected = null){
        window.openDialog('Dialog', '&refer=' + this.root_dialog.id + '&category_selected=' + category_selected);
    }

}
export default ProductDialog;
