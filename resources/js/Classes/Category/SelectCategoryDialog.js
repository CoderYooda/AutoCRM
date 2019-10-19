
class selectCategoryDialog{

    constructor(dialog){

        console.log('Окно выбора категории инициализировано');
        this.root_dialog = dialog;
        this.refer = null;
        this.active = true;
        this.init();
    }

    init(){
        let object = this;
        object.refer = object.root_dialog.querySelector("#refer").value;
        document.addEventListener("CategorySelected", function(){
            object.finitaLaComedia();
        });
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

    select(id) {
        if (isXHRloading) { return; }
        let object = this;
        window.axios({
            method: 'get',
            url: 'categories/dialog/enter?category_selected=' + id + '&refer=' + object.refer,
        }).then(function (resp) {
            object.root_dialog.querySelector('#category_list').innerHTML = resp.data.html;
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });


        // var dReq = new XMLHttpRequest();
        // isXHRloading = true;
        // dReq.onload = function () {
        //     var resp = JSON.parse(this.responseText);
        //     document.getElementById('category_list').innerHTML = resp.html;
        //     isXHRloading = false;
        // };
        // dReq.onerror = function () {
        //     isXHRloading = false;
        // };
        //
        // dReq.open("get", 'categories/dialog/enter?category_id=' + id, true);
        // dReq.send();
    };

}
export default selectCategoryDialog;
