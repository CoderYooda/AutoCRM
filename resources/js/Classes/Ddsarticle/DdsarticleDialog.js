import Modal from "../Modal/Modal";

class ddsarticleDialog extends Modal{

    constructor(dialog){
        super(dialog);
        this.init();
    }

    init(){
        let object = this;
        let focused = document.getElementById('ddsarticle_dialog_focused');
        if(focused){
            focused.focus();
        }
    }

    save(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(e){
            if(e.status == 200) object.finitaLaComedia(true);
        });
    }

    openSelectCategoryDialog(category_selected = null, root_category = null){
        let category_add = '';
        let root_add = '&root_category=4';
        if(category_selected){
            category_add = '&category_id=' + category_selected
        }
        if(root_category){
            root_add = '&root_category='+ root_category
        }
        window.openDialog('selectCategory', '&refer=' + this.root_dialog.id + category_add + root_add );
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
