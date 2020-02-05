class ddsarticleDialog{

    constructor(dialog){
        console.log('Окно статьи дохода инициализировано');
        this.root_dialog = dialog;
        this.active = true;
        this.init();
    }

    init(){
        let object = this;
        document.addEventListener("DdsarticleStored", function(){
            object.finitaLaComedia();
        });
        let focused = document.getElementById('ddsarticle_dialog_focused');
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

    openSelectCategoryDialog(category_selected = null){
        window.openDialog('selectCategory', '&refer=' + this.root_dialog.id + '&category_selected=' + category_selected);
    }

    finitaLaComedia(){
        closeDialog(null, this.root_dialog.id);
        delete window[this.root_dialog.id];
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
            let str = resp.data.name;
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
export default ddsarticleDialog;
