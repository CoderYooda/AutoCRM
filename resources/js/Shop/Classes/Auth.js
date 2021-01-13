import Tab from "../Classes/Tab";
import Tabs from "../../Tools/Tabs";
import IMask from 'imask';

class Auth {

    constructor() {
        let register_tabs = document.querySelector('#register-tabs');

        if(register_tabs) {
            new Tabs('register-tabs');
        }


        let code_element = document.querySelector('[name="code"]');

        if(code_element) {
            IMask(code_element, {
                    mask: '0000',
                    lazy: true
                }
            );
        }
    }


    form() {

        event.preventDefault();

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

    restoreCode(element) {

        event.preventDefault();

        if(element.disabled) return;

        element.disabled = true;

        let phone_element = document.querySelector('[name="phone"]');

        let data = {
            phone: phone_element.value
        };

        helper.removeClassesByClass('is-invalid');

        axios.post('/restore', data)
            .then(response => {

                let timer_element = document.querySelector('.timer');
                timer_element.classList.remove('d-none');

                let resend_element = document.querySelector('.resend');
                resend_element.classList.add('d-none');

                let seconds_element = document.getElementById('seconds');

                this.restore_seconds = 30;

                let timer = setInterval(() => {

                    seconds_element.innerHTML = this.restore_seconds;

                    this.restore_seconds--;

                    if(this.restore_seconds == 0) {
                        clearInterval(timer);

                        timer_element.classList.add('d-none');
                        resend_element.classList.remove('d-none');
                    }

                }, 1000);
            })
            .catch(error => {
                helper.showFormErrors(error);
            })
            .finally(() => {
                element.disabled = false;
            });
    }

    confirmCode(element) {

        if(element.disabled) return;

        element.disabled = true;

        let password_element = document.querySelector('[name="password"]');
        let code_element = document.querySelector('[name="code"]');

        let data = {
            code: code_element.value,
            password: password_element.value
        };

        helper.removeClassesByClass('is-invalid');

        axios.post('/restore/code', data)
            .then(response => {

                window.notification.notify('success', 'Пароль успешно восстановлен');

                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            })
            .catch(error => {
                helper.showFormErrors(error);
            })
            .finally(() => {
                element.disabled = false;
            });
    }
}
export default Auth;
