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
}

export default Product;
