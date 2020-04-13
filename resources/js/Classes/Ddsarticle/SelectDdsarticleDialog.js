import Modal from "../Modal/Modal";

class selectDdsarticleDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно штрихкода инициализировано');
        this.refer = dialog.querySelector("#refer").value;
        this.active = true;
        this.init();
    }

    init(){
        let object = this;
        object.searchInit();
        document.addEventListener("DdsarticleSelected", function(){
            object.finitaLaComedia();
        });
        let focused = document.getElementById('select_ddsarticle_dialog_focused');
        if(focused){
            focused.focus();
        }
    }

    save(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(e){
            object.finitaLaComedia();
        });
    }

    searchInit(){
        let object = this;
        let el = object.root_dialog.querySelector("#ddsarticle_search");
        let searchFn = window.helper.debounce(function(e) {
            object.search(el);
        }, 400);
        if(el){
            el.addEventListener("keydown", searchFn);
            el.addEventListener("paste", searchFn);
            el.addEventListener("delete", searchFn);}
        document.addEventListener("DdsarticleStored", searchFn);

        // let search = getQueryVar('search');
        // if(search === 'undefined'){
        //     search = '';
        // }
        // let update_link = document.getElementsByClassName('update_url');
        // [].forEach.call(update_link, function(elem){
        //     window.helper.insertParam(elem, 'search', search);
        // });
    }

    loadCategory(category_id, clean_search = null, update_data = null){
        let object = this;
        if(clean_search != null && clean_search){
            object.root_dialog.querySelector('#ddsarticle_search').value = '';  //document.getElementById("search").value = '';
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
            url: 'ddsarticle/dialog/search',
            data: data
        }).then(function (resp) {
            var results_container = document.querySelector('#search_ddsarticle_results');
            results_container.innerHTML = resp.data.html;
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            window.isXHRloading = false;
        });
    }


    search(el){
        let object = this;
        var string = el.value;

        if (isXHRloading) { return; } window.isXHRloading = true;

        let data = {};
        data.string = string;
        data.inner = true;
        if(object.refer){
            data.refer = object.refer;
        }

        window.axios({
            method: 'post',
            url: 'ddsarticle/dialog/search',
            data: data,
        }).then(function (resp) {

            var results_container = document.querySelector('#search_ddsarticle_results');
            results_container.innerHTML = resp.data.html;

        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    }
}
export default selectDdsarticleDialog;
