
class SelectSupplierDialog{

    constructor(dialog){

        console.log('Окно производителя инициализировано');
        this.root_dialog = dialog;
        this.search_obj = dialog.querySelector("#supplier_search");
        // this.store_obj = dialog.querySelector("#product_search_store");
        this.results_obj = dialog.querySelector("#search_supplier_results");
        this.refer = dialog.querySelector("#refer").value;
        this.searchInit();
        this.init();
    }

    init(){
        let object = this;
        document.addEventListener("SupplierSelected", function(){
            object.finitaLaComedia();
        });
        let focused = document.getElementById('select_supplier_dialog_focused');
        if(focused){
            focused.focus();
        }
    }

    searchInit(){
        let object = this;
        var searchFn = window.helper.debounce(function(e) {
            object.search(e);
        }, 400);
        this.search_obj.addEventListener("keydown", searchFn);
        this.search_obj.addEventListener("paste", searchFn);
        this.search_obj.addEventListener("delete", searchFn);
        document.addEventListener("SupplierStored", searchFn);
    }

    finitaLaComedia(){
        closeDialog(null, this.root_dialog.id);
        delete window[this.root_dialog.id];
    }

    openSupplierDialog(){
        window.openDialog('supplierDialog', '&refer=' + this.root_dialog.id);
    }

    save(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(e){
            object.finitaLaComedia();
        });
    }

    search(){
        let object = this;
        var string = this.search_obj.value;

        let data = {};
        data.string = string;
        data.searching = false;
        if(object.refer){
            data.refer = object.refer;
        }

        window.axios({
            method: 'post',
            url: 'suppliers/dialog/search',
            data: data,
        }).then(function (resp) {
            object.results_obj.innerHTML = resp.data.html;
            //object.markAsAdded();
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
        });
    }

}
export default SelectSupplierDialog;
