import Modal from "../Modal/Modal";

class providerCartDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно оформления заявок поставщикам инициализировано');
        this.phoneMask = null;
        this.phone_field = this.root_dialog.querySelector('#client-phone');
        this.init();
    }

    init(){
        this.initInputsMask();
        this.addPhoneMask();
    }

    initInputsMask()
    {
        let input_elements = this.current_dialog.querySelectorAll('input:not(#client-phone,#client_order_status)');

        input_elements.forEach(input => {

            let fn = window.helper.debounce(e => this.recalculate(e), 300);

            input.addEventListener("keyup", fn);
            input.addEventListener("change", fn);
            input.addEventListener("paste", fn);
            input.addEventListener("delete", fn);

            this.addInputPriceMask(input);
        });
    }

    addPhoneMask(){
        let object = this;
        this.phoneMask = window.IMask(object.phone_field, {
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
        });
    }


    recalculate() {

        let position_elements = this.current_dialog.querySelectorAll('.table-position');

        let positions = {};
        let total_prices = {};

        position_elements.forEach(element => {

            let provider_key = element.closest('.provider').id;

            let price_element = element.querySelector('.price_elem');
            let count_element = element.querySelector('.count_elem');
            let total_element = element.querySelector('.total_elem');

            let step = count_element.step;

            let price = parseFloat(price_element.innerText.replace(' ', ''));
            let count = parseInt(count_element.value);

            if(count % step != 0 || count <= 0) {
                count = step;
                count_element.value = step;
            }

            let total = price * count;

            total_element.innerHTML = total.toFixed(2);

            if(isNaN(positions[provider_key])) positions[provider_key] = 0;
            positions[provider_key]++;

            if(isNaN(total_prices[provider_key])) total_prices[provider_key] = 0;
            total_prices[provider_key] += total;
        });

        Object.keys(positions).forEach(provider_key => {
            let count = positions[provider_key];
            let total = total_prices[provider_key];

            let target_element = this.current_dialog.querySelector('#' + provider_key);

            target_element.querySelector('#provider_positions_count').innerHTML = count;
            target_element.querySelector('#provider_total_price').innerHTML = total.toFixed(2);
        });

        this.current_dialog.querySelector('#positions_count').innerHTML = helper.objectSum(positions).toFixed(0);
        this.current_dialog.querySelector('#total_price').innerHTML = helper.objectSum(total_prices).toFixed(2);
    }

    removeProviderOrders(element, provider_key) {
        let target_element = element.closest('.provider');

        let data = {
            provider_key: provider_key
        };

        axios.post('/provider_stores/cart/provider/delete', data)
            .then(response => {
                let data = response.data;
                window.notification.notify(data.type, data.message);
            })
            .catch(response => {
                console.log(response);
            })

        target_element.remove();

        this.recalculate();
    }

    removeProduct(element, order_id) {
        let target_element = element.closest('.table-position');

        let data = {
            id: order_id
        };

        axios.post('/provider_stores/cart/delete', data)
            .then(response => {
                let data = response.data;
                window.notification.notify(data.type, data.message);
            })
            .catch(response => {
                dd(response);
            });

        target_element.remove();

        this.recalculate();
    }

    addInputPriceMask(element) {
        let options = {
            mask: Number,
            min: 0,
            max: 9999999,
            radix: '.'
        };

        IMask(element, options);
    }

    changeDeliveryAddress(element) {

        setTimeout(() => {

            let selected_index = element.selectedIndex;

            let target_element = element.closest('.provider').querySelector('.pickup_address_id');

            // if(target_element) {
            //     if (selected_index == 0) target_element.classList.remove('d-none');
            //     else target_element.classList.add('d-none');
            // }

        }, 100);
    }

    changeDeliveryType(element) {

        setTimeout(() => {

            let selected_index = element.selectedIndex; // 0 - Самовывоз, 1 - доставка

            let pickup_element = element.closest('.provider').querySelector('.pickup_address_id');
            let delivery_element = element.closest('.provider').querySelector('.delivery_address_id');

            if(pickup_element) {
                let classList = pickup_element.classList;
                selected_index != 0 ? classList.add('d-none') : classList.remove('d-none');
            }

            if(delivery_element) {
                let classList = delivery_element.classList;
                selected_index == 0 ? classList.add('d-none') : classList.remove('d-none');
            }

        }, 100);
    }

    togglePosition(element) {
        let elements = this.current_dialog.querySelectorAll('.provider');

        let target_element = element.closest('.provider');

        elements.forEach(provider_element => {

            if(target_element == provider_element) return ;

            provider_element.classList.remove('showed');

            let i_element = provider_element.querySelector('i');

            i_element.classList.add('fa-angle-down');
            i_element.classList.remove('fa-angle-up');
        });

        let i_element = element.querySelector('i');

        if(target_element.classList.contains('showed')) {
            target_element.classList.remove('showed');

            i_element.classList.add('fa-angle-down');
            i_element.classList.remove('fa-angle-up');
        }
        else {
            target_element.classList.add('showed');

            i_element.classList.remove('fa-angle-down');
            i_element.classList.add('fa-angle-up');
        }
    }

    clearCart(element) {
        let provider_elements = this.current_dialog.querySelectorAll('.provider');

        if(provider_elements.length == 0) {
            return window.notification.notify('error', 'Корзина уже пуста.');
        }

        axios.post('/provider_stores/cart/reset')
            .then(response => {
                let data = response.data;
                window.notification.notify(data.type, data.message);
            })
            .catch(response => {
                dd(response);
            });

        provider_elements.forEach(element => element.remove());

        this.recalculate();
    }

    send(element) {

        let form_element = this.current_dialog.querySelector('form');

        window.axform.send(form_element, ({response}) => {
            if(response.status === 200) this.finitaLaComedia(true);
            else window.notification.notify('error', response.data.message);
        });
    }

    activateTab(elem, type) {
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

        // let category_id = this.current_dialog.querySelector('[name="category_id"]').value;
        // if(category_id != 7) this.current_dialog.querySelector('#vehicle_tab').classList.add('d-none');
        //
        // let field_elements = this.current_dialog.querySelectorAll('.tab-content .form-group');
        //
        // field_elements.forEach(element => {
        //
        //     element.classList.add('d-none');
        //
        //     if(element.classList.contains(type)) {
        //         element.classList.remove('d-none');
        //     }
        //
        //     let input = element.querySelector('input');
        //     if(input) input.disabled = element.classList.contains('d-none') || element.closest('.form-group').classList.contains('hide');
        // });
        //
        // let input = this.current_dialog.querySelector('.active .form-group input[type="text"]:not([disabled])');
        // if(input) input.focus();
    }

    openSelectPartnermodal(){
        window.openDialog('selectPartner', '&only_current_category=1&refer=' + this.root_dialog.id + '&category_id=7');
    }

    selectPartner(id){
        var object = this;
        window.axios({
            method: 'post',
            url: '/partner/'+ id +'/select',
            data: {refer:this.root_dialog.id}
        }).then(function (resp) {
            object.touch();
            let select = object.root_dialog.querySelector('button[name=partner_id]');
            let input = object.root_dialog.querySelector('input[name=partner_id]');
            //let str = '<option selected value="' + resp.data.id + '">' + resp.data.name + '</option>';

            let phones_list = object.root_dialog.querySelector('#phones-list');
            object.root_dialog.querySelector('#client-phone').value = '';
            let phones_html = '';
            if(resp.data.phones.length > 0) {
                [].forEach.call(resp.data.phones, function (elem) {
                    if(elem.main){
                        object.root_dialog.querySelector('#client-phone').value = elem.number;
                    }
                    phones_html += '<span onclick="' + object.root_dialog.id + '.selectNumber(this)" data-number="' + elem.number + '" class="element">' + elem.number + '</span>';
                });
            } else {
                phones_html = '<span class="element"><div class="text-center">Номеров нет</div></span>';
            }
            phones_list.innerHTML = phones_html;
            //let phone_str = '<a onclick="{{ $class }}.selectNumber(this)" data-number="{{ $phone->number }}" class="dropdown-item pointer">{{ $phone->number }}</a>';

            let str = resp.data.name;
            input.value = resp.data.id;
            select.innerHTML = str;
            window.notification.notify( 'success', 'Контакт выбран');
            document.dispatchEvent(new Event('PartnerSelected', {bubbles: true}));
            console.log("Событие PartnerSelected вызвано");
            //closeDialog(event);
            object.phoneMask.value = resp.data.phone;
            object.phoneMask.updateControl();
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    }

    selectNumber(elem) {
        this.phoneMask.value = elem.dataset.number;
        if(elem !== null){
            elem.closest('.dropdown').classList.remove('show');
        }
        // this.root_dialog.querySelector('#client-phone').value = elem.dataset.number;
        // this.addPhoneMask();
    }

    activateClientOrder(elem) {
        let data = this.current_dialog.querySelector('#client_order_data');
        if(data.classList.contains('disabled')){
            data.classList.remove('disabled')
            elem.value = true;
        } else {
            data.classList.add('disabled')
            elem.value = false;
        }
    }

    setField(type, value, text, elem = null){
        let object = this;
        if(elem !== null){
            elem.closest('.dropdown').classList.remove('show');
        }
        let input = object.current_dialog.querySelector('#' + type);
        input.value = value;
        event = document.createEvent("HTMLEvents");
        event.initEvent("change", true, true);
        input.dispatchEvent(event);
        object.current_dialog.querySelector('#' + type + '_text').innerHTML = text;
    }
}
export default providerCartDialog;
