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
        // document.addEventListener('ajaxLoaded', function(e){
        //     object.checkActive();
        // });
        //object.checkActive();
        let form = null;
        try {
            let form = object.root.getElementsByTagName('form');
        } catch (e) {

        }
        document.addEventListener('RoleAssigned', function(e){
            object.reload();
        });
        document.addEventListener('RoleStored', function(e){
            object.reload();
        });
        document.addEventListener('CashboxStored', function(e){
            object.reload();
        });
        document.addEventListener('StoreStored', function(e){
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
    }

    getSmsPayment(){
        let amount_input = document.getElementById('amount');
        let amount = 0;
        if(amount_input){
            amount = amount_input.value;
        }

        let data = {tariff_id: 1, amount:amount};
        axios({
            method: 'POST',
            url: '/tariff/get_payment',
            data: data
        }).then(function (response){
            if(response.data.redirect){
                window.location.href = response.data.redirect;
            }
        }).catch(function(response){

        }).finally(function () {
            window.isXHRloading = false;
        });
    }

    checkSmsPayments(){
        axios({
            method: 'POST',
            url: '/tariff/check_sms_payment',
        }).then(function (response){
            let sms_balance_inner = document.getElementById('sms_balance');
            if(sms_balance_inner){
                sms_balance_inner.innerText = response.data.sms_balance;
            }

        }).catch(function(response){
            dd(response);
        }).finally(function () {
            window.isXHRloading = false;
        });
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
        let data = {};
        data.id = id;
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

    setRoleToUser(user_id, role_id){
        window.axios({
            method: 'post',
            url: '/roles/assign',
            data: {user_id:user_id, role_id:role_id}
        }).then(function (resp) {
            dd(resp.data);
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    }

    reload(){
        let object = this;
        if (isXHRloading) { return; } window.isXHRloading = true;

        console.log(object.getUrlString());

        window.axios({
            method: 'get',
            url: object.getUrlString(),
        }).then(function (resp) {
            dd(resp.data.target);
            var results_container = document.getElementById(resp.data.target);
            results_container.innerHTML = resp.data.html;
            window.helper.insertParamUrl('active_tab', object.active_tab);
            window.rebuildLinks();
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    }

}
export default settingsPage;
