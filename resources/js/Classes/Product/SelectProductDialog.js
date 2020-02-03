
class SelectProductDialog{

    constructor(dialog){

        console.log('Окно поиска товара инициализировано');
        this.root_dialog = dialog;
        this.search_obj = dialog.querySelector("#product_search");
        //this.store_obj = dialog.querySelector("#product_search_store");
        this.results_obj = dialog.querySelector("#search_product_results");

        this.refer = dialog.querySelector("#refer").value;

        this.searchInit();
        this.markAsAdded();
        // this.init();
    }

    init(){
        // let focused = document.getElementById('select_product_dialog_focused');
        // if(focused){
        //     focused.focus();
        // }
    }

    finitaLaComedia(){
        closeDialog(event);
        delete window[this.root_dialog.id];
    }

    searchInit(){
        let object = this;
        var searchFn = window.helper.debounce(function(e) {
            object.search(e);
        }, 400);

        this.search_obj.addEventListener("keydown", searchFn);
        //this.store_obj.addEventListener("change", searchFn);
        this.search_obj.addEventListener("paste", searchFn);
        this.search_obj.addEventListener("delete", searchFn);
        document.addEventListener("ProductStored", searchFn);
    }

    markAsAdded(){
        let items_in_refer = [];

        [].forEach.call(window[this.refer].items, function(elem){
            items_in_refer.push(elem.id);
        });

        let items_in_selector = this.results_obj.querySelectorAll('.list-item');
        [].forEach.call(items_in_selector, function(elem){

            if(items_in_refer.includes(parseInt(elem.dataset.article_id))){
                elem.classList.add('already_selected');
            }
        });

        //console.log(items_in_refer);
    }

    search(){
        let object = this;
        var string = this.search_obj.value;
        //var store_id = this.store_obj.value;

        let data = {};
        data.string = string;
        //data.store_id = store_id;
        if(object.refer){
            data.refer = object.refer;
        }



        window.axios({
            method: 'post',
            url: 'product/dialog/search',
            data: data,
        }).then(function (resp) {
            object.results_obj.innerHTML = resp.data.html;
            object.markAsAdded();
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
        });
    }


}
export default SelectProductDialog;
