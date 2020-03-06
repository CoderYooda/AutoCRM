class settingsPage{

    constructor(){
        console.log('страница настроек инициализировано');
        this.active = true;
        this.root = document.getElementById('baseSettings');
        this.active_tab = this.getCurrentActiveTab();
        this.init();
    }

    init(){
        let object = this;
        document.addEventListener('ajaxLoaded', function(e){
            object.checkActive();
        });
        object.checkActive();
        let form = null;

        try {
            let form = object.root.getElementsByTagName('form');
        } catch (e) {

        }

        document.addEventListener('CashboxStored', function(e){
            object.reload();
        });

        if(form != null){
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


        // object.root_dialog.getElementsById('CashboxSettings')[0].addEventListener('WarrantStored',  function(){
        //     let id = object.root_dialog.querySelector('input[name=id]').value;
        //     if(id !== null){
        //         let root_id = object.root_dialog.id;
        //         object.freshContent(id,function(){
        //             delete window[root_id];
        //             window.helper.initDialogMethods();
        //         });
        //     }
        // });

    }


    getUrlString(){
        let url = '?view_as=json';
        url += '&target=ajax-table-' + this.active_tab;
        if(this.active_tab !== null || this.active_tab !== 'null'){
            url += '&active_tab=';
            url += this.active_tab;
        }
        return url;
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
        this.active_tab = this.getCurrentActiveTab();
    }


    getCurrentActiveTab(){
        var active_tab = window.helper.findGetParameter('active_tab');

        if(active_tab == null || active_tab == 'null'){
            active_tab = 'index';
        }
        return active_tab;
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

    reload(){
        let object = this;
        if (isXHRloading) { return; } window.isXHRloading = true;
        window.axios({
            method: 'get',
            url: object.getUrlString(),
        }).then(function (resp) {
            var results_container = document.getElementById(resp.data.target);
            results_container.innerHTML = resp.data.html;
            window.helper.insertParamUrl('active_tab', object.active_tab);
            window.rebuildLinks();
            // object.load();
            // window.rebuildLinks();
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    }

}
export default settingsPage;
