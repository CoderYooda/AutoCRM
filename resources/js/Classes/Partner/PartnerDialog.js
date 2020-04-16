import Modal from "../Modal/Modal";

class partnerDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно штрихкода инициализировано');
        this.root_category = 3;
        this.active = true;
        this.bithdayFlatpkr = null;
        this.issuedDateFlatpkr = null;
        this.bithdayMask = null;
        this.phoneLoginMask = null;
        this.issuedDateMask = null;
        this.init();
    }

    init(){
        let object = this;
        this.initDatePicker();

        this.addPhoneMask();
        this.addPassportMask();
        let focused = document.getElementById('partner_dialog_focused');
        if(focused){
            focused.focus();
        }
        this.addLoginPhoneMask();
        object.root_dialog.getElementsByTagName('form')[0].addEventListener('keydown',  function(e){
            if (e.which == 13) {
                object.bithdayFlatpkr.close();
                object.issuedDateFlatpkr.close();
                e.preventDefault();
                object.save(object.root_dialog.getElementsByTagName('form')[0]);
            }
        });
        //elem.addEventListener("click", this.activateTab('fl'));
    }

    initDatePicker(){
        let date = this.root_dialog.querySelector('input[name=birthday]');
        this.bithdayFlatpkr = window.flatpickr(date, {
            allowInput: true,
            dateFormat: "d.m.Y",
        });
        this.bithdayMask = window.IMask(date, {
                mask: Date,
                min: new Date(1910, 0, 1),
                max: new Date(2090, 0, 1),
                lazy: false
            }
        );
        let date2 = this.root_dialog.querySelector('input[name=issued_date]');
        this.issuedDateFlatpkr = window.flatpickr(date2, {
            allowInput: true,
            dateFormat: "d.m.Y",
        });
        this.issuedDateMask = window.IMask(date2, {
                mask: Date,
                //pattern: 'd-m-Y',
                min: new Date(1910, 0, 1),
                max: new Date(2090, 0, 1),
                lazy: false
            }
        );
    }

    save(elem){
        let object = this;
        if(!window.isXHRloading){
            window.axform.send(elem, function(e){
                object.finitaLaComedia(true);
            });
        }
    }

    openCategoryModal(category_selected = null){
        window.openDialog('categoryDialog', '&refer=' + this.root_dialog.id + '&category_selected=' + category_selected);
    }

    openSelectCategoryDialog(category_selected = null){
        window.openDialog('selectCategory', '&refer=' + this.root_dialog.id + '&category_id=' + category_selected + '&root_category=' + this.root_category);
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
        var elements = this.root_dialog.querySelectorAll('.phone_input');
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

    activateTab(tag){
        let object = this;
        console.log(1);
        var container = this.root_dialog.querySelector('#act_form_partner');

        var links = container.getElementsByClassName('nav-link');

        [].forEach.call(links, function(elem){
            if(elem.classList.contains('main_tab')){
                elem.classList.remove('active');
                elem.classList.add('active');
            } else {
                elem.classList.remove('active');
            }
        });
        var tabs = container.getElementsByClassName('tab-pane');

        [].forEach.call(tabs, function(elem){
            if(elem.classList.contains('main_tab')){
                elem.classList.remove('active');
                elem.classList.add('active');
            } else {
                elem.classList.remove('active');
            }
        });

        var activate;
        var deactivate;

        if(tag === 'fl'){
            object.root_dialog.querySelector('#isfl').click();
            activate = object.root_dialog.querySelectorAll('.fl_only');
            deactivate = object.root_dialog.querySelectorAll('.ul_only');
        }else if(tag === 'ul'){
            this.root_dialog.querySelector('#isul').click();
            deactivate = object.root_dialog.querySelectorAll('.fl_only');
            activate = object.root_dialog.querySelectorAll('.ul_only');
        }
        [].forEach.call(activate, function(elem){
            elem.classList.remove('d-none-f');
            [].forEach.call(elem.getElementsByClassName('entrance'), function(elem){
                elem.disabled = false;
            });
        });
        [].forEach.call(deactivate, function(elem){
            elem.classList.add('d-none-f');
            [].forEach.call(elem.getElementsByClassName('entrance'), function(elem){
                elem.disabled = true;
            });
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
            '<button onclick="window.' + this.root_dialog.id + '.deletePhone(this)" class="input-group-text butt_del_append" type="button" style="height: auto">' +
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

    toggleAccess(elem){
        let object = this;
        var account_datas = object.root_dialog.querySelectorAll('.account_data');;
        if(account_datas){
            if(elem.value == 1){
                [].forEach.call(account_datas, function(elem){
                    elem.classList.remove('hide');
                });
            } else {
                [].forEach.call(account_datas, function(elem){
                    elem.classList.add('hide');
                });
            }
        }

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
