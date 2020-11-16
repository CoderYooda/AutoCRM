import Modal from "../Modal/Modal";

class SelectProductDialog extends Modal{

    constructor(dialog, resp){
        super(dialog);
        console.log('Окно штрихкода инициализировано');
        this.search_obj = dialog.querySelector("#product_search");
        //this.store_obj = dialog.querySelector("#product_search_store");
        this.results_obj = dialog.querySelector("#search_product_results");
        this.products = resp.products;


        this.refer = dialog.querySelector("#refer").value;
        this.new_btn = dialog.querySelector("#new_btn");
        let cat_input = dialog.querySelector("#category_id");
        if(cat_input){
            this.category_id = cat_input.value;
        } else {
            this.category_id = null;
        }
        this.searchInit();
        this.markAsAdded();
        this.init();
    }

    getProductDataById(article_id){

        let product = null;

        Object.values(this.products).forEach(item => {
            if(item.id == article_id) product = item;
        });

        return product;
    }

    loadCategory(category_id, clean_search = null, update_data = null){
        let object = this;
        if(clean_search != null && clean_search){
            object.root_dialog.querySelector('#product_search').value = '';  //document.getElementById("search").value = '';
            object.search_str = '';
        }

        window.isXHRloading = true;
        object.category_id = category_id;

        let data = {};

        data.string = object.search_str;
        data.inner = true;
        if(object.refer){
            data.refer = object.root_dialog.querySelector("#refer").value;
        }
        if(object.target){
            data.target = object.root_dialog.querySelector("#target").value;
        }
        data.category_id = category_id;
        window.axios({
            method: 'post',
            url: 'product/dialog/search',
            data: data
        }).then((resp) => {
            this.products = resp.data.products;
            var results_container = document.querySelector('#search_product_results');
            results_container.innerHTML = resp.data.html;
            if(object.new_btn){
                object.new_btn.setAttribute('onclick','openDialog(\'productDialog\', \'&category_select=' + category_id + '\')');
            }
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            window.isXHRloading = false;
        });
    }

    init(){
        // let focused = document.getElementById('select_product_dialog_focused');
        // if(focused){
        //     focused.focus();
        // }

        document.addEventListener('ProductsSelected', event => {
            this.finitaLaComedia(true);
        });
    }

    searchInit()
    {
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

    markAsAdded()
    {
        let items_in_refer = [];
        // dd(window[this.refer], window[this.refer].items);
        [].forEach.call(window[this.refer].items, function(elem){
            items_in_refer.push(elem.id);
        });

        let items_in_selector = this.results_obj.querySelectorAll('.list-item');
        [].forEach.call(items_in_selector, function(elem){

            if(items_in_refer.includes(parseInt(elem.dataset.article_id))){
                elem.classList.add('already_selected');
            }
        });
    }

    search(){
        let object = this;
        var string = this.search_obj.value;
        //var store_id = this.store_obj.value;

        let data = {};
        data.string = string;
        data.inner = true;
        data.category_id = object.category_id;
        //data.store_id = store_id;
        if(object.refer){
            data.refer = object.refer;
        }
        window.axios({
            method: 'post',
            url: 'product/dialog/search',
            data: data,
        }).then((resp) => {
            this.products = resp.data.products;
            object.results_obj.innerHTML = resp.data.html;
            object.markAsAdded();
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
        });
    }


}
export default SelectProductDialog;
