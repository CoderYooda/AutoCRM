//import Sortable from "sortablejs";

class usereditPage{

    constructor(){
        console.log('страница редактирования профиля инициализировано');
        this.bithdayMask = null;
        this.init();
    }

    init(){
        let object = this;
        this.addPhoneMask();
        this.initMasks();
    }

    linked(){
        this.init();
    }

    save(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(e){
            window.goto('/user?id=' + e.data.id, function(){}, true);
        });
    }

    itemIncome(evt){
        var itemEl = evt.item;
        let inputs = itemEl.querySelectorAll('.index_need');
        [].forEach.call(inputs, function(elem){

            let name = elem.getAttribute('name');

            elem.setAttribute('name', name.replace('convert', evt.newIndex + 1));
        });
    }

    initMasks(){
        let date = document.querySelector('input[name=birthday]');
        this.bithdayMask = window.IMask(date, {
                mask: Date,
                min: new Date(1910, 0, 1),
                max: new Date(2090, 0, 1),
                lazy: false
            }
        );
    }

    addPhone(element){
        var div = document.getElementById('phones');
        var count = div.getElementsByClassName('phone').length;
        var node = helper.createElementFromHTML('' +
            '<div class="input-group mb-10 phone slim">' +
            '<input type="text" name="phones[num'+ (count + 1) +'][number]" class="form-control slim phone_input" placeholder="Номер телефона">' +
            '<span class="input-group-append checkbox_append" title="Активный номер">' +
            '<div class="input-group-text border-left-0">' +
            '<label class="ui-check" style="margin-bottom: 0;margin-top: 1px;">' +
            '<input type="radio" name="phones_main" value="num'+ (count + 1) +'">' +
            '<i class="dark-white"></i>' +
            '</label>' +
            '</div>' +
            '</span>' +
            '<span class="input-group-append" title="Удалить номер">' +
            '<button onclick="window.useredit.deletePhone(this)" class="input-group-text butt_del_append" type="button" style="height: auto">' +
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

    deletePhone(elem){

        var div = document.getElementById('phones');
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

    canRemovePhone(div){
        var elems = div.getElementsByClassName('phone');
        if(elems.length < 2){
            notification.notify( 'error', 'Нельзя удалить единственный номер');
            return false;
        } else {
            return true;
        }
    }

    addPhoneMask(){
        var elements = document.querySelectorAll('.phone_input');
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

    canAddMorePhone(div){
        var elems = div.getElementsByClassName('phone');
        if(elems.length > 4){
            notification.notify( 'error', 'Максимальное кол-во номеров - 5');
            return false;
        } else {
            return true;
        }
    }

    initSchema(){
        let object = this;
        let list = document.querySelector('#shema_stored');
        new Sortable(list, {
            group: 'shared',
            animation: 0,
            ghostClass: 'blue-background-class',
            direction: 'vertical',
            filter: ".js-remove, .js-edit",
            onFilter: function (evt) {
                var item = evt.item,
                    ctrl = evt.target;

                if (Sortable.utils.is(ctrl, ".js-remove")) {  // Click on remove button
                    item.parentNode.removeChild(item); // remove sortable item
                    //console.log(123123);
                }
                else if (Sortable.utils.is(ctrl, ".js-edit")) {  // Click on edit link
                    // ...
                }
            },
            onAdd: function(evt){
                object.itemIncome(evt)
            },
        });
        let available_list = document.querySelector('#available_list');
        new Sortable(available_list, {
            group: {
                name: 'shared',
                put: 'false'
            },
            sort: false,
            animation: 0,
            ghostClass: 'blue-background-class'
        });
    }

    // linked(){ //Состояние Linked - когда экземпляр класса уже был загружен, и находится в памяти. (Возвращение на страницу)
    //     this.active_tab = window.helper.findGetParameter('active_tab');
    // }

}
export default usereditPage;
