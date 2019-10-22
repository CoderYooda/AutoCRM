
class selectCategoryDialog{

    constructor(dialog){

        console.log('Окно выбора категории инициализировано');
        this.root_dialog = dialog;
        this.refer = dialog.querySelector("#refer").value;
        this.root = dialog.querySelector("#root").value;
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

    openCategoryDialog(){
        window.openDialog('categoryDialog', '&refer=' + this.root_dialog.id);
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
