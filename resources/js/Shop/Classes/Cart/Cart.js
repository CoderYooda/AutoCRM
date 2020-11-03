import Tabs from "../../../Tools/Tabs";

class Cart {

    constructor() {
        this.debounceSave = window.helper.debounce((product_id, count) => this.save(product_id, count), 400);

        $(document).ready(() => {
            $('select').select2();
        });

        this.providers = {};

        let data_element = document.querySelector('.body');

        if(data_element) {

            let providers = data_element.dataset.providers;
            let product = data_element.dataset.product;

            if(providers) this.providers = JSON.parse(providers);
            if(product) this.product = JSON.parse(data_element.dataset.product);

            data_element.removeAttribute('data-data');
            data_element.removeAttribute('data-product');
        }
    }

    add(element, hash) {

        if(element.classList.contains('incart')) return;
        element.classList.add('incart');

        let input_element = element.closest('.shipping-container').querySelector('input');

        if(input_element.value < 1) input_element.value = 1;

        let count = input_element.value;

        let order = this.getOrderByHash(hash);

        order.product_id = this.product.id;

        let product_element = element.closest('.element');
        let store_id = product_element.dataset.store_id;

        if(store_id) order.store_id = store_id;

        let data = {
            hash: hash,
            order: order,
            count: count
        };

        axios.post('/cart', data)
            .then(response => {

                let data = response.data;

                let counter_element = document.querySelector('#cart_count');

                counter_element.innerHTML = data.total;

                window.notification.notify(data.type, data.message);
            })
            .catch(response => {
                console.log(response);

                element.classList.remove('incart');
            });
    }

    remove(element, hash) {

        let target_element = element.closest('.cart_element');

        target_element.classList.add('d-none');

        let data = {
            hash: hash
        };

        axios.post('/cart/delete', data)
            .then(response => {

                let data = response.data;

                let counter_element = document.querySelector('#cart_count');

                counter_element.innerHTML = data.total;

                window.notification.notify(data.type, data.message);

                target_element.remove();


                let cart_elements = document.querySelectorAll('.cart_element');

                if(cart_elements.length == 0) this.clear();
            })
            .catch(response => {
                console.log(response);
                target_element.classList.remove('d-none');
            });

    }

    increment(element, hash) {

        let target_element = element.closest('.counter-container');
        let count_element = target_element.querySelector('.counter');
        let count = parseInt(count_element.value) + 1;

        if(count >= 99) return;

        count_element.value = count;

        this.debounceSave(hash, count);
    }

    decrement(element, hash) {

        let target_element = element.closest('.counter-container');
        let count_element = target_element.querySelector('.counter');
        let count = parseInt(count_element.value) - 1;

        if(count < 1) return;

        count_element.value = count;

        this.debounceSave(hash, count);
    }

    clear() {
        let elements = document.querySelectorAll('.cart_element');

        elements.forEach(element => element.classList.add('d-none'));

        let empty_element = document.querySelector('.empty_table');
        empty_element.classList.remove('d-none');

        let content_element = document.querySelector('.in-category');
        content_element.classList.add('d-none');

        axios.post('/cart/clear')
            .then(response => {

                let data = response.data;

                window.notification.notify(data.type, data.message);

                elements.forEach(element => element.remove());

                let count_element = document.querySelector('#cart_count');

                count_element.innerHTML = 0;
            })
            .catch(response => {
                console.log(response);

                elements.forEach(element => element.classList.remove('d-none'));

                empty_element.classList.add('d-none');
                content_element.classList.remove('d-none');
            })
    }

    save(hash, count) {

        if(!this.isProductInCart(hash)) return;

        let data = {
            hash: hash,
            count: count
        };

        let product_element = document.getElementById('product_' + hash);

        if(product_element) product_element.querySelector('.count span').innerHTML = count;

        this.recalculate();

        axios.post('/cart/save', data)
            .then(response => {
                let data = response.data;

                let counter_element = document.querySelector('#cart_count');

                counter_element.innerHTML = data.total;
            })
            .catch(response => {
                console.log(response);
            });
    }

    changeRegisterType(type) {
        document.querySelector('[name="register_type"]').value = type;
    }

    toggleFields(type) {

        if(type == 'anonymous') {
            let target_element = document.querySelector('.order_register');
            target_element.classList.remove('d-none');

            let password_element = target_element.querySelector('input[name="password"]');
            password_element.disabled = true;

            let group_element = password_element.closest('.form-group-flex');
            group_element.classList.add('d-none');
        }
        else if(type == 'auth') {
            auth.form();
        }
        else {
            let target_element = document.querySelector('.order_register');
            target_element.classList.remove('d-none');

            let register_element = document.querySelector('[name="register"]');
            register_element.value = '1';
        }

        if(type != 'auth') {
            let buttons_element = document.querySelector('.order_types');
            buttons_element.classList.add('d-none');
        }
    }

    changeDeliveryType(element) {

        let pickup_element = document.querySelector('[name="pickup_id"]');

        let pickup_group = pickup_element.closest('.form-group-flex');
        pickup_group.classList.toggle('d-none');

        let delivery_element = document.querySelector('[name="delivery_id"]');

        let delivery_group = delivery_element.closest('.form-group-flex');
        delivery_group.classList.toggle('d-none');
    }

    getOrderByHash(hash) {

        let order = {};

        Object.values(this.providers).forEach(orders => {

            Object.values(orders).forEach(element => {
                if(element.hash == hash) order = element;
            });

        });

        return order;
    }

    isProductInCart(hash) {

        let product_element = document.querySelector('#product_' + hash);
        let button_element = product_element.querySelector('.cart-button');

        return button_element.classList.contains('incart');
    }

    recalculate()
    {
        let elements = document.querySelectorAll('.cart_element');

        let total_price = 0;

        let total_stores = {};

        elements.forEach(element => {

            let store_id = element.dataset.store_id;

            let count = parseInt(element.querySelector('.counter').value);
            let price = parseFloat(element.querySelector('.current_price span').innerHTML.replace(' ', ''));

            let total = count * price;

            total_price += total;

            element.querySelector('.total_price span').innerHTML = total.toFixed(2);

            if(store_id) {
                if(isNaN(total_stores[store_id])) total_stores[store_id] = 0;
                total_stores[store_id] += total;
            }

        });

        Object.keys(total_stores).forEach(store_id => {
             let value = total_stores[store_id];

             document.getElementById('total_store_' + store_id).innerHTML = value.toFixed(2);
        });

        let total_element = document.getElementById('count');

        if(total_element) total_element.innerHTML = total_price.toFixed(2);
    }
}

export default Cart;
