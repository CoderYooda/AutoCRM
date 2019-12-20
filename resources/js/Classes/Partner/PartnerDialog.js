class partnerDialog{

    constructor(dialog){
        console.log('Окно партнера инициализировано');
        this.root_dialog = dialog;
        this.active = true;
        this.init();
    }

    init(){
        let object = this;
        window.flatpickr(".date_picker", {
            dateFormat: "Y-m-d",
        });
        this.addPhoneMask();
        this.addPassportMask();
        let focused = document.getElementById('partner_dialog_focused');
        if(focused){
            focused.focus();
        }
        //elem.addEventListener("click", this.activateTab('fl'));
    }
    save(elem){
        let object = this;
        if(!window.isXHRloading){
            window.axform.send(elem, function(e){
                object.finitaLaComedia();
            });
        }
    }

    finitaLaComedia(){
        closeDialog(null, this.root_dialog.id);
        delete window[this.root_dialog.id];
    }

    openCategoryModal(category_selected = null){
        window.openDialog('categoryDialog', '&refer=' + this.root_dialog.id + '&category_selected=' + category_selected);
    }

    openSelectCategoryDialog(category_selected = null){
        window.openDialog('selectCategory', '&refer=' + this.root_dialog.id + '&category_selected=' + category_selected);
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
        console.log(123);
        let object = this;
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
            '<div class="input-group mb-2 phone">' +
            '<input type="text" name="phones[num'+ (count + 1) +'][number]" class="form-control phone_input" placeholder="Номер телефона">' +
            '<span class="input-group-append" title="Основной номер">' +
            '<div class="input-group-text border-left-0">' +
            '<label class="ui-check" style="margin-bottom: 0;margin-top: 1px;">' +
            '<input type="checkbox" name="phones[num'+ (count + 1) +'][main]" value="1">' +
            '<i class="dark-white"></i>' +
            '</label>' +
            '</div>' +
            '</span>' +
            '<span class="input-group-append" title="Удалить номер">' +
            '<button onclick="window.' + this.root_dialog.id + '.deletePhone(this)" class="input-group-text btn btn-icon white" type="button" style="height: auto">' +
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
        var account_datas = object.root_dialog.querySelectorAll('.account_data');
        console.log(account_datas);

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
        var div = elem.closest('.addable').querySelector('.phones');
        if(this.canRemovePhone(div)){
            elem.closest('.phone').remove();
        }
    }
}
export default partnerDialog;
