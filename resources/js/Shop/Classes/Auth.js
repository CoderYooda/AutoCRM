import Tab from "../Classes/Tab";
import Tabs from "../../Tools/Tabs";

class Auth {

    form() {

        axios({
            method: 'GET',
            url: '/user/login'
        }).then(function (response) {
            createModal(response.data.html);
            let auth_tab_container = document.getElementById('auth-tabs');
            window.auth_tab = new Tab(auth_tab_container);

            let elements = auth_tab_container.querySelectorAll('.phone');

            elements.forEach(element => window.phoneMask(element));

            new Tabs('register_tabs');

        }).catch(function (error) {
            console.log(error)
        });
    }

    login(element) {

        axform.send(element, response => {
            console.log(response);
        });

    }

    register(element) {

        event.preventDefault();

        if(element.tagName.toLowerCase() != 'form') {
            element = element.closest('form');
        }

        let data = new FormData(element);

        axios.post('/user/register', data)
            .then(response => {
                console.log(response);
            })
            .catch(error => {

                let data = error.response.data;

                Object.keys(data.messages).forEach(message => {
                    let input_element = element.querySelector('[name="' + message + '"]');
                    input_element.classList.add('is-invalid');

                    let span_element = input_element.closest('.form-group').querySelector('span');
                    span_element.classList.remove('d-none');
                    span_element.innerHTML = data.messages[message][0];
                });
            });
    }

    changeRegisterType(type) {
        let target_element = document.querySelector('[name="register_type"]');
        target_element.value = type;
    }
}
export default Auth;
