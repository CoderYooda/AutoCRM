class selectCashboxDialog{
    constructor(dialog){
        console.log('Окно выбора кассового аппарата инициализировано');
        this.root_dialog = dialog;
        this.refer = null;
        this.type = null;
        this.active = true;
        this.init();
    }

    init(){
        let object = this;
        object.refer = object.root_dialog.querySelector("#refer").value;
        object.type = object.root_dialog.querySelector("#type").value;
        object.searchInit();
        document.addEventListener("CashboxSelected", function(){
            object.finitaLaComedia();
        });
    }

    save(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(e){
            object.finitaLaComedia();
        });
    }

    finitaLaComedia(){
        closeDialog(null, this.root_dialog.id);
        window[this.root_dialog.id] = null;
        delete window[this.root_dialog.id];
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
        }).finally(function () {
            window.isXHRloading = false;
        });
    }
}
export default selectCashboxDialog;
