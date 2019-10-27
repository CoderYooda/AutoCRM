class selectPartnerDialog {
    constructor(dialog){
        console.log('Окно выбора контрагента инициализировано');
        this.root_dialog = dialog;
        this.refer = dialog.querySelector("#refer").value;
        this.search_obj = dialog.querySelector("#partner_search");
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

    finitaLaComedia(){
        closeDialog(null, this.root_dialog.id);
        delete window[this.root_dialog.id];
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
            el.addEventListener("delete", searchFn);}



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

    search(object){
        //var string = el.value;

        if (isXHRloading) { return; } window.isXHRloading = true;

        let data = {};
        data.string = object.search_obj.value;
        if(object.refer){
            data.refer = object.root_dialog.querySelector("#refer").value;
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
