class selectDdsarticleDialog{
    constructor(dialog){
        console.log('Окно выбора статьи дохода инициализировано');
        this.root_dialog = dialog;
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

    finitaLaComedia(){
        closeDialog(null, this.root_dialog.id);
        delete window[this.root_dialog.id];
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

    search(el){
        let object = this;
        var string = el.value;

        if (isXHRloading) { return; } window.isXHRloading = true;

        let data = {};
        data.string = string;
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
