class Product {

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
