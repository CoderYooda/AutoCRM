class Cart {

    constructor() {
        this.debounceSave = window.helper.debounce((product_id, count) => this.save(product_id, count), 400);
    }

    add(element, product_id) {

        if(element.classList.contains('incart')) return;

        element.classList.add('incart');

        let data = {
            product_id: product_id
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
            });
    }

    increment(element, product_id) {
        let target_element = element.closest('.counter-container');
        let count_element = target_element.querySelector('.counter');
        let count = parseInt(count_element.value) + 1;

        if(count > 98) return;

        count_element.value = count;

        this.debounceSave(product_id, count);
    }

    decrement(element, product_id) {
        let target_element = element.closest('.counter-container');
        let count_element = target_element.querySelector('.counter');
        let count = parseInt(count_element.value) - 1;

        if(count < 1) return;

        count_element.value = count;

        this.debounceSave(product_id, count);
    }

    save(product_id, count) {

        let data = {
            product_id: product_id,
            count: count
        };

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
}

export default Cart;
