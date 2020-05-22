import Modal from "../Modal/Modal";

class selectPartnerDialog  extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно выбора партнера инициализировано');
        this.refer = dialog.querySelector("#refer").value;
        if(dialog.querySelector("#target")){
            this.target = dialog.querySelector("#target").value;
        } else {
            this.target = null;
        }
        this.new_btn = dialog.querySelector("#new_btn");
        this.root_category = 3;
        this.search_obj = dialog.querySelector("#partner_search");
        this.search_str = null;
        let cat_input = dialog.querySelector("#category_id");
        if(cat_input){
            this.category_id = cat_input.value;
        } else {
            this.category_id = null;
        }

        this.active = true;
        this.init();
        //PartnerStored
    }

    init(){
        let object = this;
        this.searchInit();
        document.addEventListener("PartnerSelected", function(){
            object.finitaLaComedia();
        });

        let focused = document.getElementById('select_partner_dialog_focused');
        if(focused){
            focused.focus();
        }
    }

    searchInit(){
        let object = this;
        let el = object.root_dialog.querySelector("#partner_search");
        let searchFn = window.helper.debounce(function(e) {
            object.search(object);
        }, 400);
        if(el){
            el.addEventListener("keydown", searchFn);
            el.addEventListener("paste", searchFn);
            el.addEventListener("delete", searchFn);
        }



        object.root_dialog.addEventListener("PartnerStored", function(){
            object.search(object);
        });

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
            object.root_dialog.querySelector('#partner_search').value = '';  //document.getElementById("search").value = '';
            object.search_str = '';
            window.helper.insertParamUrl('search', '');
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
        data.class = 'store';


        window.axios({
            method: 'post',
            url: 'partner/dialog/search',
            data: data
        }).then(function (resp) {
            var results_container = document.querySelector('#search_partner_results');
            results_container.innerHTML = resp.data.html;
            if(object.new_btn){
                object.new_btn.setAttribute('onclick','openDialog(\'partnerDialog\', \'&category_select=' + category_id + '\')');
            }
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            window.isXHRloading = false;
        });
    }

    openPartnerModal(category_id = null)
    {
        let cat_id = this.root_category;
        if(category_id != null){
            cat_id = this.category_id;
        }
        window.openDialog('partnerDialog', '&category_select=' + cat_id);
    }

    search(object){
        //var string = el.value;

        if (isXHRloading) { return; } window.isXHRloading = true;

        let data = {};
        data.inner = true;
        data.string = object.search_obj.value;
        data.category_id = object.category_id;
        if(object.refer){
            data.refer = object.root_dialog.querySelector("#refer").value;
        }
        if(object.target){
            data.target = object.root_dialog.querySelector("#target").value;
        }


        window.axios({
            method: 'post',
            url: 'partner/dialog/search',
            data: data,
        }).then(function (resp) {

            var results_container = document.querySelector('#search_partner_results');
            results_container.innerHTML = resp.data.html;

        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
            document.removeEventListener("PartnerStored", function(){
                console.warn(object.root_dialog.querySelector("#refer").value);
                object.search(object);
            });
        });
    }
}
export default selectPartnerDialog;
