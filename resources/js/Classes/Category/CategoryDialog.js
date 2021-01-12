import Modal from "../Modal/Modal";

class CategoryDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно категории инициализировано');
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
        let focused = object.root_dialog.querySelector('#category_dialog_focused');
        if(focused){
            focused.focus();
            focused.select();
        }
        object.root_dialog.getElementsByTagName('form')[0].addEventListener('keydown',  function(e){
            if (e.which == 13) {
                e.preventDefault();
                object.save(object.root_dialog.getElementsByTagName('form')[0]);
            }
        });
    }

    openSelectCategoryDialog(category_selected = null){
        window.openDialog('selectCategory', '&refer=' + this.root_dialog.id + '&category_id=' + category_selected);
    }

    save(elem){
        if(window.isXHRloading) return;

        window.axform.send(elem, (e) => {
            if(e.status == 200) this.finitaLaComedia(true);
        });
    }

    selectCategory(id){
        var object = this;
        window.axios({
            method: 'post',
            url: 'category/'+ id +'/select',
            data: {refer:this.root_dialog.id}
        }).then(function (resp) {

            let select = object.root_dialog.querySelector('button[name=category_id]');
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
    }

    changeFile(input) {

        let data = new FormData();

        data.append('image[]', input.files[0]);
        data.append('refer', 'shop');

        let image_element = this.current_dialog.querySelector('.image');
        let image_input = this.current_dialog.querySelector('[name="image_id"]');
        let preloader_element = image_input.closest('div');

        togglePreloader(preloader_element, true);

        axios({
            method: 'POST',
            url: '/system/image_upload',
            data: data
        }).then((response) => {

            let image_id = response.data.images[0].id;
            let image_url = response.data.images[0].url;

            image_element.src = image_url;

            image_input.value = image_id;
        })
            .finally(() => {
                togglePreloader(preloader_element, false);
            });
    }
}
export default CategoryDialog;
