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

        let tr_elements = this.current_dialog.querySelectorAll('tbody tr');

        let total_price = 0;

        tr_elements.forEach(element => {
            let price_element = element.querySelector('.price_elem');
            let count_element = element.querySelector('.count_elem');
            let total_element = element.querySelector('.total_elem');

            let price = parseFloat(price_element.innerText);
            let count = parseInt(count_element.value);
            let total = price * count;

            total_element.innerHTML = total.toFixed(2);

            total_price += total;
        });

        this.current_dialog.querySelector('#total_price').innerHTML = total_price.toFixed(2);
    }

    removeProduct(element, order_id) {
        let target_element = element.closest('tr');

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

            let selected_id = parseInt(element.value);

            let target_element = this.current_dialog.querySelector('[name="pickup_address_id"]').closest('.form-group');

            if(target_element) {

                let classList = target_element.classList;

                selected_id != 0 ? classList.add('d-none') : classList.remove('d-none');
            }

        }, 100);
    }

    clearCart(element) {
        let tr_elements = this.current_dialog.querySelectorAll('tbody tr');

        if(tr_elements.length == 0) {
            return window.notification.notify('error', 'Корзина уже пуста.');
        }

        axios.post('/provider_stores/cart/reset')
            .then(response => {
                window.notification.notify(data.type, data.message);
            })
            .catch(response => {
                dd(response);
            });

        tr_elements.forEach(element => element.remove());
    }

    send(element) {

        window.axform.send(element, (response) => {
            if(response.status === 200) {
                this.finitaLaComedia(true);
            }
        });
    }
}
export default providerCartDialog;
