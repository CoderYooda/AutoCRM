import Tab from "../Classes/Tab";
import Tabs from "../../Tools/Tabs";

class Auth {

    constructor() {
        let register_tabs = document.querySelector('#register-tabs');

        if(register_tabs) {
            new Tabs('register-tabs');
        }
    }


    form() {

        axios({
            method: 'GET',
            url: '/user/login'
        }).then(function (response) {
            createModal('Авторизация', response.data.html);
            let auth_tab_container = document.getElementById('auth-tabs');
            window.auth_tab = new Tab(auth_tab_container);

            let elements = auth_tab_container.querySelectorAll('.phone');

            elements.forEach(element => window.phoneMask(element));

        }).catch(function (error) {
            console.log(error)
        });
    }

    login(element) {

        event.preventDefault();

        if(element.tagName.toLowerCase() != 'form') {
            element = element.closest('form');
        }

        let data = new FormData(element);

        helper.removeClassesByClass('is-invalid');

        axios.post('/user/login', data)
            .then(response => {
                window.location.href = '/';
            })
            .catch(error => {

                let data = error.response.data;

                if(data.type) {
                    window.notification.notify(data.type, data.message);
                }
                else {

                    Object.keys(data.messages).forEach(message => {

                        let group_element = element.querySelector('[name="' + message + '"]').closest('.form-group');
                        group_element.classList.add('is-invalid');

                        let span_element = group_element.querySelector('.error_text');
                        span_element.innerHTML = data.messages[message][0];
                    });
                }
            });

    }
}
export default Auth;
