class Feedback {

    save(element) {

        axform.send(element, response => {

            if(response && response.status == 200) {

                let form_element = element.closest('form');

                form_element.querySelector('[name="name"]').value = '';
                form_element.querySelector('[name="phone"]').value = '';
            }
        });
    };

}

export default Feedback;
