import Modal from "../Modal/Modal";

class partnerDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Диалог партнёра инициализирован');
        this.root_category = 3;
        this.active = true;
        this.bithdayFlatpkr = null;
        this.issuedDateFlatpkr = null;
        this.phoneLoginMask = null;
        this.init();
    }

    init(){
        this.initDatePicker();
        this.addPhoneMask();
        this.addPassportMask();
        this.addNumberMasks();
        this.addLoginPhoneMask();

        this.current_dialog.getElementsByTagName('form')[0].addEventListener('keydown',  (e) => {
            if (e.which === 13) {
                this.bithdayFlatpkr.close();
                this.issuedDateFlatpkr.close();
                e.preventDefault();
                this.save(object.current_dialog.getElementsByTagName('form')[0]);
            }
        });

        helper.initTabs('partner_tabs');

        setTimeout(() => {
            let type = this.current_dialog.querySelector('[name="type"]').value;
            this.current_dialog.querySelectorAll('.nav-item a')[type].click();
        }, 50);

        let clipboard = new window.clipboardJS('.fa-clipboard');

        clipboard.on('success', (e) => {
            notification.notify('success', 'VIN успешно скопирован.');
        });
    }

    initDatePicker() {

        let birthday_input = this.current_dialog.querySelector('input[name=birthday]');

        this.bithdayFlatpkr = window.flatpickr(birthday_input, {
            allowInput: true,
            dateFormat: "d.m.Y",
        });

        window.IMask(birthday_input, {
                mask: Date,
                min: new Date(1910, 0, 1),
                max: new Date(2090, 0, 1),
                lazy: false
            }
        );

        let issued_input = this.current_dialog.querySelector('input[name=issued_date]');
        this.issuedDateFlatpkr = window.flatpickr(issued_input, {
            allowInput: true,
            dateFormat: "d.m.Y",
        });

        window.IMask(issued_input, {
                mask: Date,
                //pattern: 'd-m-Y',
                min: new Date(1910, 0, 1),
                max: new Date(2090, 0, 1),
                lazy: false
            }
        );
    }

    setRole(element, role_id) {
        this.current_dialog.querySelector('[name="role"]').value = element.innerText;
        this.current_dialog.querySelector('[name="role_id"]').value = role_id;
    }

    save(elem){

        if(!window.isXHRloading){
            window.axform.send(elem, e => {
                if(e.status === 200) this.finitaLaComedia(true);
            });
        }
    }

    deleteVehicle(vehicle_id) {

        event.preventDefault();

        window.axios({
            method: 'post',
            url: '/vehicles/'+ vehicle_id,
            data: {
                _method: 'DELETE'
            }
        }).then(response => {
            document.getElementById('vehicle_item_' + vehicle_id).remove();
        });
    }

    openCategoryModal(category_selected = null){
        window.openDialog('categoryDialog', '&refer=' + this.current_dialog.id + '&category_selected=' + category_selected);
    }

    openSelectCategoryDialog(category_selected = null){
        window.openDialog('selectCategory', '&refer=' + this.current_dialog.id + '&category_id=' + category_selected + '&root_category=' + this.root_category);
    }

    selectCategory(id){
        var object = this;
        window.axios({
            method: 'post',
            url: 'category/'+ id +'/select',
            data: {refer:this.current_dialog.id}
        }).then((resp) => {

            let select = this.current_dialog.querySelector('button[name=category_id]');
            let input = this.current_dialog.querySelector('input[name=category_id]');
            let str = resp.data.name;
            input.value = resp.data.id;
            select.innerHTML = str;

            //Показываем вкладку с транспортом
            if(resp.data.id === 7) {
                this.current_dialog.querySelector('#vehicle_tab').classList.remove('d-none');
            }
            else if(resp.data.id === 5) {
                this.current_dialog.querySelector('.role_select_cont').parentElement.classList.remove('hide');
            }
            else {
                this.current_dialog.querySelector('#vehicle_tab').classList.add('d-none');
                this.current_dialog.querySelector('.role_select_cont').parentElement.classList.add('hide');
            }

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

    changeCountry(elem){
        let object = this;

        object.phoneLoginMask.updateOptions({
            mask: '+{' + elem.value + '}(000)000-00-00'
        });
        object.phoneLoginMask.value = '';
    }

    addLoginPhoneMask(){
        var phone = document.querySelector('#phone_login_input');
        this.phoneLoginMask = window.IMask(phone, {

                mask: '+{7}(000)000-00-00',
                lazy: false,
                placeholderChar: '_',

                dispatch: function (appended, dynamicMasked) {
                    var number = (dynamicMasked.value + appended).replace(/\D/g,'');

                    return dynamicMasked.compiledMasks.find(function (m) {
                        return number.indexOf(m.startsWith) === 0;
                    });
                }
            }
        )
    }

    addPhoneMask(){
        var elements = this.current_dialog.querySelectorAll('.phone_input');
        [].forEach.call(elements, function(element){
            var dispatchMask = window.IMask(element, {
                    mask: [
                        {
                            mask: '+{7}(000)000-00-00',
                            startsWith: '7',
                            lazy: true,
                            country: 'Россия'
                        },
                        {
                            mask: '{8}(000)000-00-00',
                            startsWith: '8',
                            lazy: true,
                            country: 'Россия'
                        },
                        {
                            mask: '+{380}(000)000-00-00',
                            startsWith: '3',
                            lazy: true,
                            country: 'Украина'
                        },
                    ],
                    dispatch: function (appended, dynamicMasked) {
                        var number = (dynamicMasked.value + appended).replace(/\D/g,'');

                        return dynamicMasked.compiledMasks.find(function (m) {
                            return number.indexOf(m.startsWith) === 0;
                        });
                    }
                }
            )
        });
    }

    addPassportMask(){

        var elements = document.getElementsByClassName('pass_num_input');
        [].forEach.call(elements, function(element) {
            var maskOptions = {
                mask: '00 00 000000',
                placeholder: {
                    show: 'always'
                },
                placeholderChar: '#'
            };
            IMask(element, maskOptions);
        });
    }

    activateTab(elem, type) {

        let ids = {'fl': 0, 'ip': 1, 'ul': 2 };

        this.current_dialog.querySelector('[name="type"]').value = ids[type];

        let button_elements = this.current_dialog.querySelectorAll('.header_selects_navs a');

        button_elements.forEach(element => element.classList.remove('active'));
        elem.classList.add('active');

        let tab_elements = this.current_dialog.querySelectorAll('[role="tab"]');

        tab_elements.forEach(element => {
            element.classList.add('d-none');

            if(element.classList.contains(type)) {
                element.classList.remove('d-none');
            }
        });

        let category_id = this.current_dialog.querySelector('[name="category_id"]').value;
        if(category_id != 7) this.current_dialog.querySelector('#vehicle_tab').classList.add('d-none');

        let field_elements = this.current_dialog.querySelectorAll('.tab-content .form-group');

        field_elements.forEach(element => {

            element.classList.add('d-none');

            if(element.classList.contains(type)) {
                element.classList.remove('d-none');
            }

            let input = element.querySelector('input');
            if(input) input.disabled = element.classList.contains('d-none') || element.closest('.form-group').classList.contains('hide');
        });
    }

    writingInn(element) {

        if(element.value.length < 10) return;

        axios({
            url: '/api/inn/' + element.value,
            method: 'get'
        })
            .then(response => {

                let data = response.data;

                let type = this.current_dialog.querySelector('[name="type"]').value;

                let name_element = document.querySelector('input[name="' + (type != 2 ? 'name' : 'companyName') + '"]');
                if (name_element) name_element.value = data.name;

                let opf_element = document.querySelector('input[name="opf"]');
                if(opf_element) opf_element.value = data.opf.short;

                let types = ['fl', 'ip', 'ul'];

                let ogrn_element = document.querySelector('.' + types[type] + ' input[name="ogrn"]');
                if(ogrn_element) ogrn_element.value = data.ogrn;

                let kpp_element = document.querySelector('input[name="kpp"]');
                if(kpp_element && data.kpp) kpp_element.value = data.kpp;
            });
    }

    addPhone(element){
        var div = element.closest('.addable').querySelector('.phones');
        var count = div.getElementsByClassName('phone').length;
        var node = helper.createElementFromHTML('' +
            '<div class="input-group mb-10 phone">' +
            '<input type="text" name="phones[num'+ (count + 1) +'][number]" class="form-control phone_input" placeholder="Номер телефона">' +
            '<span class="input-group-append checkbox_append" title="Активный номер">' +
            '<div class="input-group-text border-left-0">' +
            '<label class="ui-check" style="margin-bottom: 0;margin-top: 1px;">' +
            '<input type="radio" name="phones_main" value="num'+ (count + 1) +'">' +
            '<i class="dark-white"></i>' +
            '</label>' +
            '</div>' +
            '</span>' +
            '<span class="input-group-append" title="Удалить номер">' +
            '<button onclick="window.' + this.current_dialog.id + '.deletePhone(this)" class="input-group-text butt_del_append" type="button" style="height: auto">' +
            '<i class="fa fa-trash"></i>' +
            '</button>' +
            '</span>' +
            '</div>' +
            '');
        if(this.canAddMorePhone(div)){
            div.appendChild(node);
        }
        this.addPhoneMask();
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

            let element = document.getElementsByName(name)[0];

            window.IMask(element, {
                mask: inputs[name],
                lazy: true
            });
        });
    }

    writingPhone(element) {

        if(this.phoneLoginMask.unmaskedValue.length !== 11) return;

        axios({
            url: '/partner/check-phone',
            method: 'POST',
            data: {
                phone: this.phoneLoginMask.unmaskedValue
            }
        })
            .then(response => {

                let data = response.data;

                let code_element = this.current_dialog.querySelector('[name="code"]');

                if(data.phone_exists) {
                    code_element.parentElement.classList.remove('hide');
                    code_element.disabled = false;
                }
                else {
                    code_element.parentElement.classList.add('hide');
                    code_element.disabled = true;
                }
            })
            .catch(response => {
                console.log(response);
            });
    }

    showField(element, input_name) {

        element.style.display = 'none';

        let input = this.current_dialog.querySelector('[name=' + input_name + ']');

        input.classList.remove('hide');
        input.parentElement.classList.remove('mb-0');
        input.parentElement.classList.remove('hide');
        input.focus();
    }

    writingBik(element) {
        if(element.value.length !== 9) return;

        window.axios({
            method: 'get',
            url: '/api/bik/' + element.value,
        }).then(response => {

            console.log(response);

            let data = response.data;

            if(!Object.keys(data).length) return ;

            this.current_dialog.querySelector('input[name=cs]').value = data.ks;
            // this.current_dialog.querySelector('input[name=ur_address]').value = data.city + ', ' + data.address; Это адрес банка
            this.current_dialog.querySelector('input[name=bank]').value = data.name.split('&quot;').join('"');
        });
    }

    toggleAccess(elem) {
        let account_data = this.current_dialog.querySelector('.account_data');
        account_data.classList.toggle('hide');

        let inputs = account_data.querySelectorAll('input');

        inputs.forEach(element => {
            element.disabled = account_data.classList.contains('hide');
        });
    }

    canAddMorePhone(div){
        var elems = div.getElementsByClassName('phone');
        if(elems.length > 4){
            notification.notify( 'error', 'Максимальное кол-во номеров - 5');
            return false;
        } else {
            return true;
        }
    }

    canRemovePhone(div){
        var elems = div.getElementsByClassName('phone');
        if(elems.length < 2){
            notification.notify( 'error', 'Нельзя удалить единственный номер');
            return false;
        } else {
            return true;
        }
    }

    deletePhone(elem){

        var div = elem.closest('.addable').querySelector('.phones');
        if(this.canRemovePhone(div)){

            var id = elem.closest('.phone').dataset.id;
            if(id != undefined){
                if (isXHRloading) { return; }
                isXHRloading = true;
                var dReq = new XMLHttpRequest();
                dReq.onreadystatechange = function (e) {
                    if (dReq.readyState === 4) {
                        var resp = JSON.parse(this.responseText);
                        if(dReq.status === 200){
                            //var element = document.getElementById('product_'+resp.product_id);
                            notification.notify( 'success', resp.message);
                        }else{
                            notification.notify( 'error', resp.message);
                        }
                    }
                };
                dReq.onerror = function () {
                    var resp = JSON.parse(this.responseText);
                    isXHRloading = false;
                };
                dReq.onload = function () {
                    var resp = JSON.parse(this.responseText);
                    //document.getElementById('category_list').innerHTML = resp.html;
                    isXHRloading = false;
                };

                dReq.open("post", 'phone/'+id+'/delete', true);
                dReq.setRequestHeader('X-CSRF-TOKEN', token.content);
                dReq.send();
            }
            elem.closest('.phone').remove();

        }
    }
}
export default partnerDialog;
