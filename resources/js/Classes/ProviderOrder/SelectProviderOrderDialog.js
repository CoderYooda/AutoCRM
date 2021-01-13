import Modal from "../Modal/Modal";

class selectProviderOrderDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно поиска заявок поставщику инициализировано');
        this.search_obj = this.root_dialog.querySelector("#selectproviderorder_search");
        this.order_id = null;
        this.refer = dialog.querySelector("#refer").value;
        this.articles_container = dialog.querySelector("#articles_container");
        this.results_obj = this.root_dialog.querySelector("#search_providerorder_results");
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
        this.searchInit();
    }

    searchInit(){
        let object = this;
        let searchFn = window.helper.debounce(function(e) {
            object.search(object);
        }, 400);
        if(object.search_obj){
            object.search_obj.addEventListener("keydown", searchFn);
            object.search_obj.addEventListener("paste", searchFn);
            object.search_obj.addEventListener("delete", searchFn);}
        object.root_dialog.addEventListener("ProviderOrderStored", function(){
            object.search(object);
        });
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
        let string = this.search_obj.value;
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

    pickProviderOrder(id){
        let object = this;
        window[object.refer].selectProviderOrder(id);
    }

}
export default selectProviderOrderDialog;
