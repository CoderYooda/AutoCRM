class Search {

    showProviderBrands(element) {

        let search_element = document.querySelector('[name="article"]');

        let result_element = document.querySelector('.result');

        helper.togglePreloader(result_element, true);

        let data = {
            search: search_element.value
        };

        axios.post('/search/provider_brands', data)
            .then(response => {
                let data = response.data;

                result_element.innerHTML = data.html;

                cart.providers = [];
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                helper.togglePreloader(result_element, false);
            });
    }

    showProvidersOffers(element, manufacturer, article) {

        let result_element = document.querySelector('.result');

        helper.togglePreloader(result_element, true);

        let data = {
            manufacturer: manufacturer,
            article: article
        };

        axios.post('/search/provider_offers', data)
            .then(response => {
                let data = response.data;

                result_element.innerHTML = data.html;

                cart.providers = data.providers;
                cart.product = data.product;
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                helper.togglePreloader(result_element, false);
            });
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
export default Search;
