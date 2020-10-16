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
    }


    getInfo(product_id) {

        event.preventDefault();

        axios.get('/products/' + product_id + '/info')
            .then(response => {

                console.log(response);
                window.createModal(response.data.html);

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
}

export default Product;
