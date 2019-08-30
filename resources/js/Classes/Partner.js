class Partner{
    init() {
    };

    initDialog(){
        flatpickr(".date_picker", {
            dateFormat: "Y-m-d",
        });
        this.addPhoneMask();
        this.addPassportMask();
        this.searchInit();
        var mytooltip = document.getElementsByClassName('my-tooltip');
        if(mytooltip.length > 0){
            console.log('Инициализирует тултипы');
            [].forEach.call(mytooltip, function(elem){
                // new Tooltip(elem, {
                //     placement: 'top', // or bottom, left, right, and variations
                //     title: "Top"
                // });
            });

        }
    }

    pick(id, fio, event, referal = null){
        var selects;

        if(referal != null && document.getElementById(referal).length > 0){
            var cont = document.getElementById(referal);
            selects = cont.getElementsByClassName('partner_select');
        } else {
            selects = document.getElementsByClassName('partner_select');
        }

        [].forEach.call(selects, function(elem){
            elem.value = id;
            var str = '<option value="' + id + '">' + fio + '</option selected>';
            elem.innerHTML = str;
        });
        notification.notify( 'success', 'Контрагент выбран');
        closeDialog(event);
    };

    activateTab(tag){
        var container = document.getElementById('act_form_partner');
        var container_on;

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
            document.getElementById('isfl').click();
            activate = document.getElementsByClassName('fl_only');
            deactivate = document.getElementsByClassName('ul_only');
        }else if(tag === 'ul'){
            document.getElementById('isul').click();
            deactivate = document.getElementsByClassName('fl_only');
            activate = document.getElementsByClassName('ul_only');
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



        // var inputs = container.getElementsByTagName('input');
        // var textareas = container.getElementsByTagName('textarea');
        //
        // var inputs_on = container_on.getElementsByTagName('input');
        // var textareas_on = container_on.getElementsByTagName('textarea');
        //
        // [].forEach.call(inputs, function(elem){elem.disabled = true;});
        // [].forEach.call(textareas, function(elem){elem.disabled = true;});
        //
        // [].forEach.call(inputs_on, function(elem){elem.disabled = false;});
        // [].forEach.call(textareas_on, function(elem){elem.disabled = false;});
    }
    addPhoneMask(){
        var elements = document.getElementsByClassName('phone_input');
        [].forEach.call(elements, function(element){
            var dispatchMask = IMask(element, {
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
            '<button onclick="partner.deletePhone(this)" class="input-group-text btn btn-icon white" type="button" style="height: auto">' +
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
    searchInit(){
        var self = this;
        if(document.getElementById("partner_search")){
            var el = document.getElementById("partner_search");

            var searchFn = helper.debounce(function(e) {
                self.searchPartner(e);
            }, 400);
            el.addEventListener("keydown", searchFn);
            el.addEventListener("paste", searchFn);
            el.addEventListener("delete", searchFn);
            document.addEventListener("PartnerStored", searchFn);
        }
        var update_link = document.getElementsByClassName('update_url');
        var search = getQueryVar('search');
        if(search === 'undefined'){
            search = '';
        }
        [].forEach.call(update_link, function(elem){
            helper.insertParam(elem, 'search', search);
        });


    }
    searchPartner(e){

        var el = document.getElementById("partner_search");

        var string = el.value;
        console.log("1111");
        if (isXHRloading) { return; }
        isXHRloading = true;
        var dReq = new XMLHttpRequest();
        dReq.onreadystatechange = function (e) {
            if (dReq.readyState === 4) {
                var resp = JSON.parse(this.responseText);
                if(dReq.status === 200){
                    var element = document.getElementById('search_partner_results');
                    element.innerHTML = resp.html;
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
        dReq.open("post", 'partner/dialog/search?string='+string, true);
        //dReq.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        dReq.setRequestHeader('X-CSRF-TOKEN', token.content);
        dReq.send();
    }

}
export default Partner;
