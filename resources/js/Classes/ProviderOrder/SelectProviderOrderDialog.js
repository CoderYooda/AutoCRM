
class selectProviderOrderDialog{

    constructor(dialog){

        console.log('Окно поиска заявки инициализировано');
        this.root_dialog = dialog;
        this.search_obj = null;//dialog.querySelector("#providerorder_search");
        //this.store_obj = dialog.querySelector("#product_search_store");
        //this.results_obj = dialog.querySelector("#search_providerorder_results");
        this.refer = dialog.querySelector("#refer").value;

        this.articles_container = dialog.querySelector("#articles_container");
        //this.searchInit();
        //this.markAsAdded();
        this.init();

    }

    init(){
        let object = this;
        let focused = document.getElementById('select_provider_order_dialog_focused');

        document.addEventListener("ProviderOrderSelected", function(){
            object.finitaLaComedia();
        });

        if(focused){
            focused.focus();
        }
    }

    finitaLaComedia(){
        closeDialog(null, this.root_dialog.id);
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

            let button = elem.querySelector('.select_btn');
            if(items_in_refer.includes(parseInt(button.dataset.id))){
                button.classList.add('already_selected');
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
            url: 'providerorder/dialog/search',
            data: data,
        }).then(function (resp) {
            object.results_obj.innerHTML = resp.data.html;
            object.markAsAdded();
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
        });
    }

    addProductsToList(){
        let object = this;

        let form = document.querySelector("#provider_order_form");
        console.log(form.serializeArray() );
        var data = new FormData(form);

        window[object.refer].addProductsToList();

    }

    pickProviderOrder(id){
        let object = this;
        //var string = this.search_obj.value;
        //var store_id = this.store_obj.value;

        let data = {};
        //data.string = string;
        //data.store_id = store_id;
        // if(object.refer){
        //     data.refer = object.refer;
        // }
        window.axios({
            method: 'post',
            url: 'providerorder/' + id + '/loaditems',
            data: data,
        }).then(function (resp) {
            object.articles_container.innerHTML = resp.data.html;
            //object.markAsAdded();
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
        });
    }

}
export default selectProviderOrderDialog;
