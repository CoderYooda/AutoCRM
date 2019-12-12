class settingsPage{

    constructor(){
        console.log('страница настроек инициализировано');
        this.active = true;
        this.root = document.getElementById('baseSettings');
        this.init();
    }

    init(){
        let object = this;
        document.addEventListener('ajaxLoaded', function(e){
            object.checkActive();
        });
        object.checkActive();

        object.root.getElementsByTagName('form')[0].addEventListener('SettingsStored',  function(){
            let id = object.root.querySelector('input[name=id]').value;
            if(id !== null){
                //let root_id = object.root.id;
                object.freshContent(id,function(){
                    //delete window[root_id];
                    //window.helper.initDialogMethods();
                });
            }
        });

    }

    freshContent(id, callback = null){
        let object = this;

        //var store_id = this.store_obj.value;

        let data = {};
        data.id = id;
        // if(object.refer){
        //     data.refer = object.refer;
        // }

        window.axios({
            method: 'post',
            url: 'settings/base/fresh',
            data: data,
        }).then(function (resp) {
            document.getElementById(resp.data.target).innerHTML = resp.data.html;
            console.log('Вставили html');
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            callback();
        });
    }

    linked(){
        let object = this;
    }

    checkActive(){
        let className = window.location.pathname.substring(1);
        let link = document.getElementById('settings_link');
        if(className === 'settings'){
            link.classList.add('active');
            this.active = true;
        } else {
            link.classList.remove('active');
            this.active = false;
        }

    }

    saveBaseSettingsForm(elem, event){
        event.preventDefault();
        if(window.isXHRloading) return;
        //let object = this;
        window.axform.send(elem, function(resp){
            //let root_id = object.root_dialog.id;
            // object.root_dialog.querySelector('input[name=id]').value = resp.data.id;
            // object.root_dialog.setAttribute('id', 'entranceDialog' + resp.data.id);
            // object.root_dialog.setAttribute('data-id', resp.data.id);
            // object.freshContent(resp.data.id, function(){
            //     delete window[root_id];
            //     let drag_dialog = window.dialogs[root_id];
            //     delete window.dialogs[root_id];
            //     window.dialogs['entranceDialog' + resp.data.id] = drag_dialog;
            //     drag_dialog.tag = 'entranceDialog' + resp.data.id;
            //     window.helper.initDialogMethods();
            // });
        });
    }


}
export default settingsPage;
