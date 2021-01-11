class Favorite {

    toggleProduct(element, product_id) {

        event.preventDefault();

        element.classList.toggle('active');

        let data = {
            product_id: product_id
        };

        axios.post('/favorites', data)
            .then(response => {
                let data = response.data;

                document.getElementById('favorite_count').innerHTML = data.count;

                window.notification.notify(data.type, data.message);
            })
            .catch(response => {
                console.log(response);
            });
    }
}

export default Favorite;
