
class CategoryDialog{

    constructor(dialog){

        console.log('Окно создания категории инициализировано');
        this.root_dialog = dialog;
        console.log(dialog.querySelector("#refer").value);
        //this.refer = dialog.querySelector("#refer").value;
        // this.search_obj = dialog.querySelector("#product_search");
        // this.store_obj = dialog.querySelector("#product_search_store");
        // this.results_obj = dialog.querySelector("#search_product_results");
        // this.refer = dialog.querySelector("#refer").value;
        //this.searchInit();
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

}
export default CategoryDialog;
