class Partner{
    init() {
    };

    initDialog(){
        flatpickr(".date_picker", {
            dateFormat: "Y-m-d",
        });
        this.addPhoneMask();
        this.addPasportMask();
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

    addPasportMask(){

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
}
export default Partner;
