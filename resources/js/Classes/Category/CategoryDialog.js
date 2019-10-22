
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
        document.addEventListener("CategorySelected", function(){
           // object.finitaLaComedia();
        });
        let focused = document.getElementById('category_dialog_focused');
        if(focused){
            focused.focus();
        }
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
    selectCategory(id){
        var object = this;
        window.axios({
            method: 'post',
            url: 'category/'+ id +'/select',
            data: {refer:this.root_dialog.id}
        }).then(function (resp) {

            let select = object.root_dialog.querySelector('select[name=category_id]');
            let input = object.root_dialog.querySelector('input[name=category_id]');
            let str = '<option selected value="' + resp.data.id + '">' + resp.data.name + '</option>';
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

}
export default CategoryDialog;
