import Tabs from "../../Tools/Tabs";

class settingsPage{

    constructor() {
        console.log('страница настроек инициализирована');
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
        document.addEventListener('CashboxFresh', function(e){
            object.reload();
        });
        document.addEventListener('StoreStored', function(e){
            object.reload();
        });

        if(form != null){
            object.root.getElementsByTagName('form')[0].addEventListener('SettingsStored',function() {
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

        this.addNumberMasks();

        this.linked();
    }

    initServiceProviderModal() {

        let modal_element = document.getElementById('settings_provider_dialog');

        this.modal = new bootstrap.Modal(modal_element, {
            backdrop: true,
            keyboard: true
        });

        modal_element.addEventListener('hide.bs.modal', function (event) {
            event.preventDefault();
        }, false);
    }

    toggleProviderOrder(element, service_id) {

        event.preventDefault();

        axios.get('/services/' + service_id)
            .then(response => {

                this.modal.setContent(response.data.html);

                this.modal.show();
            })
            .catch(response => {
                console.log(response);
            });
    }

    changeValue(input) {
        let url = document.getElementById('url').innerText;

        if(url == 'armtek.ru' && input.name.includes('password')) {

            let select_element = document.querySelector('[name="fields[sales_organization]"]');

            select_element.innerHTML = '';

            let login = document.querySelector('[name="fields[login]"]');
            let password = input.value;

            axios.get('/provider_stores/armtek/sales_organization', {
                    login: login,
                    password: password
                })
                .then(response => {

                    let data = response.data;

                    Object.keys(data).forEach(key => {

                        let value = data[key];

                        let option_element = document.createElement('option');
                        option_element.value = value.VKORG;
                        option_element.innerText = value.PROGRAM_NAME;

                        select_element.add(option_element);
                    });
                })
                .catch(response => {
                    console.log(response);
                });
        }
    }

    toggleService(button_element, service_id) {

        togglePreloader(button_element, true);

        let enabled_input = document.querySelector('[name="enabled"]');

        let field_inputs = document.querySelectorAll('.form-control');

        let data = {
            enabled: Number(enabled_input.value),
            fields: {}
        };

        field_inputs.forEach(input => {

            let correct_name = input.name.match(/\[(.+?)\]/)[1];

            console.log(correct_name);

            data['fields'][correct_name] = input.value;
        });

        axios.post('/services/' + service_id + '/toggle', data)
        .then(response => {
            let enabled = response.data.enabled;

            button_element.innerText = enabled ? 'Деактивировать' : 'Активировать';
            enabled_input.value = enabled;

            let input = document.getElementById('service_' + service_id);
            input.checked = enabled;
        })
        .catch(response => {
            console.log(response);
        })
        .then(() => {
            togglePreloader(button_element, false);
        });
    }

    saveService(button_element) {
        window.axform.send(button_element, response => {
            //
        });
    }

    writingInn(element) {

        if(element.value.length < 10) return;

        axios({
            url: '/api/inn/' + element.value,
            method: 'GET'
        })
        .then(response => {

            let data = response.data;

            let name_element = document.querySelector('.active input[name="name"]');
            if(name_element && data.name) name_element.value = data.name;

            let opf_element = document.querySelector('.active input[name="opf"]');
            if(opf_element && data.opf.short) opf_element.value = data.opf.short;

            let ogrn_element = document.querySelector('.active input[name="ogrn"]');
            if(ogrn_element && data.ogrn) ogrn_element.value = data.ogrn;

            let kpp_element = document.querySelector('.active input[name="kpp"]');
            if(kpp_element && data.kpp) kpp_element.value = data.kpp;
        });
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

    freshStoreContent(id, callback = null){
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

        if(this.active_tab === 'services') {
            this.initServiceProviderModal();

            new Tabs('settings_services_tabs');
        }
        else if(this.active_tab === 'requisites') {
            let button_element = document.querySelector('#ajax-tab-content button[class~="active"]');

            setTimeout(() => {
                button_element.click();
            }, 300)
        }
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

        if(window.isXHRloading) return;

        window.axform.send(elem, function(resp){
            //
        });
    }

    setRoleToUser(element, user_id, role_id){
        window.axios({
            method: 'post',
            url: '/roles/assign',
            data: {user_id:user_id, role_id:role_id}
        }).then(function (resp) {
            // console.log(resp);
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

    backImportChanges(id) {

        axios({
            url: '/store/imports/' + id,
            method: 'post'
        })
            .then(response => {
                let data = response.data;

                document.getElementById('ajax-table-imports').innerHTML = data.html;

                notification.notify( 'success', 'Откат изменений был успешно выполнен.');
            })
            .catch(response => {
                console.log(response);
            });
    }

    activeTab(button_element, type) {

        event.preventDefault();

        document.querySelector('[name="is_company"]').value = type === 'fl' ? 0 : 1;

        let button_elements = document.querySelectorAll('.d-flex > button');
        button_elements.forEach(element => {
            element.classList.remove('active');
        });

        button_element.classList.add('active');

        let tab_elements = document.querySelectorAll('form .tab');

        tab_elements.forEach(element => {
            element.classList.remove('active');
        });

        let input_elements = document.querySelectorAll('input');

        input_elements.forEach(element => {

            if(element.parentElement.tagName === 'FORM') return;

            element.disabled = true;
        });

        document.querySelector('div.tab.' + type).classList.add('active');

        let valid_inputs = document.querySelectorAll('div.tab.' + type + '.active input');

        valid_inputs.forEach(element => {
            element.disabled = false;

            if(type === 'ul' && element.name === 'actual_address') {
                element.disabled = document.querySelector('[type=checkbox]').checked;
            }
        })
    }

    saveRequisites(form_element) {

        event.preventDefault();

        window.axform.send(form_element, function(e){
            //
        });
    }

    writingBik(element) {
        if(element.value.length !== 9) return;

        window.axios({
            method: 'get',
            url: '/api/bik/' + element.value,
        }).then(response => {

            let data = response.data;

            if(Object.keys(data).length < 2) return ;

            document.querySelector('.active input[name=cs]').value = data.ks;
            document.querySelector('.active input[name=bank]').value = data.name.split('&quot;').join('"');
        });
    }

    addNumberMasks() {

        let inputs = {
            cs: '00000000000000000000',
            rs: '00000000000000000000',
            bik: '000000000',
            inn: '0000000000000',
            ogrn: '0000000000000000',
            kpp: '000000000'
        };

        Object.keys(inputs).forEach(name => {

            let elements = document.getElementsByName(name);

            elements.forEach(element => {
                window.IMask(element, {
                    mask: inputs[name],
                    lazy: true
                });
            });
        });
    }

    similarCompanyAddress(checkbox_element) {
        let input_address = document.querySelector('[name=actual_address]');

        input_address.disabled = checkbox_element.checked;
    }
}
export default settingsPage;
