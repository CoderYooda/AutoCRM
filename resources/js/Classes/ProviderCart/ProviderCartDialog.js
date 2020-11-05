import Modal from "../Modal/Modal";

class providerCartDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно оформления заявок поставщикам инициализировано');
        this.init();
    }

    init(){
        this.initInputsMask();
    }

    initInputsMask()
    {
        let input_elements = this.current_dialog.querySelectorAll('input');

        input_elements.forEach(input => {

            let fn = window.helper.debounce(e => this.recalculate(e), 300);

            input.addEventListener("keyup", fn);
            input.addEventListener("change", fn);
            input.addEventListener("paste", fn);
            input.addEventListener("delete", fn);

            this.addInputPriceMask(input);
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

            if(target_element) {
                if (selected_index == 0) target_element.classList.remove('d-none');
                else target_element.classList.add('d-none');
            }

        }, 100);
    }

    changeDeliveryType(element) {

        setTimeout(() => {

            let selected_index = element.selectedIndex; // 0 - Самовывоз, 1 - доставка

            console.log(selected_index);

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

        window.axform.send(form_element, (response) => {
            if(response.status === 200) {
                this.finitaLaComedia(true);
            }
        });
    }
}
export default providerCartDialog;
