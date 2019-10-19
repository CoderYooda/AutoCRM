
class CategoryDialog{

    constructor(dialog){

        console.log('Окно создания категории инициализировано');
        this.root_dialog = dialog;
        this.init();
        //console.log(dialog.querySelector("#refer").value);
        //this.refer = dialog.querySelector("#refer").value;
        // this.search_obj = dialog.querySelector("#product_search");
        // this.store_obj = dialog.querySelector("#product_search_store");
        // this.results_obj = dialog.querySelector("#search_product_results");
        // this.refer = dialog.querySelector("#refer").value;
        //this.searchInit();
    }

    init(){
        let object = this;
        document.addEventListener("PartnerSelected", function(){
            object.finitaLaComedia();
        });
    }


    finitaLaComedia(){
        closeDialog(null, this.root_dialog.id);
        delete window[this.root_dialog.id];
    }

    openSelectCategoryDialog(category_selected = null){
        window.openDialog('selectCategory', '&refer=' + this.root_dialog.id + '&category_selected=' + category_selected);
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
