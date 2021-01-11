class Cart {

    constructor() {
        this.debounceSave = window.helper.debounce((product_id, count) => this.save(product_id, count), 200);

        // $('select').select2();

        this.providers = {};

        let data_element = document.querySelector('.body');

        if(data_element) {

            let product = data_element.dataset.product;

            if(product) this.product = JSON.parse(data_element.dataset.product);

            data_element.removeAttribute('data-product');
        }
    }

    add(element, hash) {

        let input_element = element.closest('.shipping-container').querySelector('input');

        if(input_element.value < 1) input_element.value = 1;

        let count = parseInt(input_element.value);

        // let max_count = input_element.dataset.max;
        //
        // if(count > max_count) {
        //     window.notification.notify('error', 'Доступное кол-во: ' + max_count + ' шт.');
        //     return;
        // }

        if(element.classList.contains('incart')) return;
        element.classList.add('incart');

        let product_element = element.closest('.element');
        let store_id = product_element.dataset.store_id;

        let type = product_element.dataset.type;

        let order = this.getOrderByHash(hash, type);

        console.log(order);

        if(this.product) order.product_id = this.product.id;

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

                this.recalculate();

                if(cart_elements.length == 0) this.clear(true);
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

        // let max_count = count_element.dataset.max;
        //
        // if((count - 1) >= max_count) {
        //     window.notification.notify('error', 'Доступное кол-во: ' + max_count + ' шт.');
        //     return;
        // }

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

    clear(only_html = false) {

        let elements = document.querySelectorAll('.cart_element');
        elements.forEach(element => element.classList.add('d-none'));

        let empty_element = document.querySelector('.empty_table');
        empty_element.classList.remove('d-none');

        let hide_classes = [
            'cart_stores',
            'cart_table',
            'cart_actions',
            'order_types',
            'order_register'
        ];

        hide_classes.forEach(class_name => {
            let class_element = document.querySelector('.' + class_name);
            if(class_element) class_element.classList.add('d-none');
        });

        if(!only_html) {

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
                });
        }
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

            let target_element = document.querySelector('.order_register');

            let top = $(".order_register").offset().top;
            $("html, body").animate({ scrollTop: top }, 1000);

            let phone_element = target_element.querySelector('[name="basePhone"]');
            phone_element.focus();

        }
    }

    changeDeliveryType(element) {

        let pickup_element = document.querySelector('[name="pickup_id"]');

        let pickup_group = pickup_element.closest('.form-group-flex');

        pickup_group.classList.toggle('d-none');

        let delivery_element = document.querySelector('[name="delivery_id"]');

        if(!delivery_element) {
            delivery_element = document.querySelector('[name="delivery_address"]');
        }

        let delivery_group = delivery_element.closest('.form-group-flex');
        delivery_group.classList.toggle('d-none');
    }

    getOrderByHash(hash, type) {

        let order = {};

        console.log(this.providers);

        Object.values(this.providers).forEach(orders => {

            ['originals', 'analogues'].forEach(type => {

                Object.values(orders[type]).forEach(element => {

                    if(element.hash == hash) order = element;
                });

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

        elements.forEach(element => {

            let store_id = element.dataset.store_id;

            let count_element = element.querySelector('.counter');

            let count = parseInt(count_element.value);
            let price = parseFloat(element.querySelector('.current_price span').innerHTML.replace(' ', ''));

            // let max_count = count_element.dataset.max;
            //
            // if(count > max_count) {
            //     count = max_count;
            //     count_element.value = max_count;
            //     window.notification.notify('error', 'Доступное кол-во: ' + max_count + ' шт.');
            // }

            let total = count * price;

            total_price += total;

            element.querySelector('.total_price span').innerHTML = total.toFixed(2);
        });

        let total_element = document.getElementById('count');

        if(total_element) total_element.innerHTML = total_price.toFixed(2);
    }
}

export default Cart;
