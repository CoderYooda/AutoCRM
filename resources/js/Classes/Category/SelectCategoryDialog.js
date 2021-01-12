import Modal from "../Modal/Modal";

class selectCategoryDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно выбора категории инициализировано');
        this.refer = dialog.querySelector("#refer").value;
        //this.root = dialog.querySelector("#root").value;
        this.search_obj = dialog.querySelector("#category_search");
        this.results_obj = dialog.querySelector("#search_category_results");
        this.active = true;
        this.searchInit();
        this.init();
    }

    init(){
        let object = this;
        //object.refer = object.root_dialog.querySelector("#refer").value;
        document.addEventListener("CategorySelected", function(){
            object.finitaLaComedia();
        });
        let focused = document.getElementById('select_category_dialog_focused');
        if(focused){
            focused.focus();
        }

        this.category_id = 2;
    }

    searchInit(){
        let object = this;
        var searchFn = window.helper.debounce(function(e) {
            object.search(e);
        }, 400);
        this.search_obj.addEventListener("keydown", searchFn);
        this.search_obj.addEventListener("paste", searchFn);
        this.search_obj.addEventListener("delete", searchFn);
        document.addEventListener("CategoryStored", searchFn);
    }

    save(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(e){
            object.finitaLaComedia(true);
        });
    }

    openCategoryDialog(){
        window.openDialog('categoryDialog', '&refer=' + this.root_dialog.id);
    }

    loadCategory(category_id, clean_search = null, update_data = null){
        let object = this;
        if(clean_search != null && clean_search){
            object.root_dialog.querySelector('#category_search').value = '';
            object.search_str = '';
            //window.helper.insertParamUrl('search', '');
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
            url: 'category/dialog/search',
            data: data
        }).then(function (resp) {
            var results_container = document.querySelector('#search_category_results');
            results_container.innerHTML = resp.data.html;
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            window.isXHRloading = false;
        });
    }

    select(id) {
        if (isXHRloading) { return; }
        let object = this;
        window.axios({
            method: 'get',
            url: 'categories/dialog/enter?category_selected=' + id + '&refer=' + object.refer,
        }).then(function (resp) {
            object.results_obj.innerHTML = resp.data.html;
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    };

    search(){
        let object = this;
        var string = this.search_obj.value;

        let data = {};
        data.string = string;
        data.inner = true;
        data.category_id = object.category_id;
        if(object.root){
            data.root = object.root;
        }
        if(object.refer){
            data.refer = object.refer;
        }

        window.axios({
            method: 'post',
            url: 'category/dialog/search',
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
export default selectCategoryDialog;
