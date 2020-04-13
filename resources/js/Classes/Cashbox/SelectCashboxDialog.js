import Modal from "../Modal/Modal";

class selectCashboxDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно штрихкода инициализировано');
        this.refer = null;
        this.type = null;
        this.active = true;
        this.init();
    }

    init(){
        let object = this;
        object.refer = object.root_dialog.querySelector("#refer").value;
        object.type = object.root_dialog.querySelector("input[name=type]").value;
        object.searchInit();
        document.addEventListener("CashboxSelected", function(){
            object.finitaLaComedia();
        });
        let focused = document.getElementById('select_cashbox_dialog_focused');
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
        let el = object.root_dialog.querySelector("#cashbox_search");
        let searchFn = window.helper.debounce(function(e) {
            object.search(el);
        }, 400);
        if(el){
            el.addEventListener("keydown", searchFn);
            el.addEventListener("paste", searchFn);
            el.addEventListener("delete", searchFn);}
        document.addEventListener("CashboxStored", searchFn);

        // let search = getQueryVar('search');
        // if(search === 'undefined'){
        //     search = '';
        // }
        // let update_link = document.getElementsByClassName('update_url');
        // [].forEach.call(update_link, function(elem){
        //     window.helper.insertParam(elem, 'search', search);
        // });
    }

    search(el){

        let object = this;
        var string = el.value;

        if (isXHRloading) { return; } window.isXHRloading = true;

        object.type = object.root_dialog.querySelector("input[name=type]").value;

        let data = {};
        data.string = string;
        if(object.refer){
            data.refer = object.refer;
        }
        if(object.type){
            data.type = object.type;
        }

        window.axios({
            method: 'post',
            url: 'cashbox/dialog/search',
            data: data,
        }).then(function (resp) {
            var results_container = document.querySelector('#search_cashbox_results');
            results_container.innerHTML = resp.data.html;

        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            window.isXHRloading = false;
        });
    }
}
export default selectCashboxDialog;
