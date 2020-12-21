class Product {

    constructor() {

        let description_element = document.querySelector('.description');

        if(description_element) {

            let target_element = description_element.querySelector('.param_desc');

            if(target_element && target_element.style.height < 140) {
                description_element.querySelector('.show').classList.add('d-none');
            }
        }

        let specifications_element = document.querySelector('.specifications');

        if(specifications_element) {

            let target_element = specifications_element.querySelector('.specifications_table');

            if(target_element && target_element.style.height < 140) {
                specifications_element.querySelector('.show').classList.add('d-none');
            }
        }

        this.loadProviderOffers();
    }

    loadProviderOffers() {

        let product_element = document.querySelector('[name="product_id"]');

        if(!product_element) return;

        let analogues_element = document.querySelector('.analogue_list');

        helper.togglePreloader(analogues_element, true);

         axios.post('/products/' + product_element.value + '/analogues')
            .then(response => {

                let data = response.data;

                analogues_element.innerHTML = data.html;

                cart.providers = data.providers;
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                helper.togglePreloader(analogues_element, false);
            });
    }

    getInfo(product_id) {

        event.preventDefault();

        axios.get('/products/' + product_id + '/info')
            .then(response => {

                console.log(response);
                window.createModal('Информация о продукте', response.data.html);

            }).catch(error => {
                console.log(error);
            });
    }

    showFullText(element) {
        let target_element = element.closest('div');
        target_element.classList.add('is-full');

        let callback = (event) => {
            target_element.classList.remove('is-full');
            target_element.removeEventListener('mouseleave', callback);
        };

        target_element.addEventListener('mouseleave', callback);
    }

    sortBy(element, type, field) {

        if(window.isXHRloading) return;
        window.isXHRloading = true;

        let target_element = element.querySelector('i');

        target_element.classList.toggle('fa-caret-down');
        target_element.classList.toggle('fa-caret-up');
        target_element.classList.add('active');

        let table_element = element.closest('.table');
        let body_element = table_element.querySelector('.body.' + type);
        let header_element = element.closest('.header');

        helper.togglePreloader(body_element, true);

        let i_elements = header_element.querySelectorAll('i');

        i_elements.forEach(i_element => {
            if(target_element == i_element) return;
            i_element.classList.remove('fa-caret-down');
            i_element.classList.add('fa-caret-up');
            i_element.classList.remove('active');
        });

        let manufacturer_element = document.querySelector('[name="manufacturer"]');
        let article_element = document.querySelector('[name="article"]');

        let is_desc = target_element.classList.contains('fa-caret-down');

        let service_name = table_element.dataset.service;

        let data = {
            manufacturer: manufacturer_element.value,
            article: article_element.value,
            selected_service: service_name,
            type: type,
            field: field,
            is_desc: is_desc
        };

        axios.post('/search/provider_offers/filter', data)
            .then(response => {

                let data = response.data;

                body_element.outerHTML = data.html;

                cart.providers[service_name] = data.orders;
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                helper.togglePreloader(body_element, false);
                window.isXHRloading = false;
            });
    }
}

export default Product;
