class registerPage{

    constructor(){
        console.log('страница Регистрации инициализировано');
        this.active = true;
        this.form = document.getElementById('registerForm');
        this.smsBox = document.getElementById('sms-box');
        this.phoneMask = null;
        this.info = document.getElementById('info');
        this.init();
    }

    init(){
        this.addPhoneMask()
    }

    save(){
        window.axform.send(elem, function(e){
            object.finitaLaComedia();
        });
    }

    typeSms(elem){
        let object = this;
        setTimeout(function (e) {
            if(elem.value.length === 5){
                window.axios({
                    method: 'post',
                    url: '/sms/confirm',
                    data: {
                        code: elem.value,
                        phone: document.querySelector('#phone_input').value
                    },
                }).then(function (resp) {
                    if(resp.data.status === 'success'){
                        object.smsBox.classList.remove('d-block');
                        object.form.submit();
                    }
                }).catch(function (error) {
                    console.log(error);
                }).finally(function () {
                });
            }
        }, 100);

    }

    submitForm(form, event){
        let object = this;
        event.preventDefault();
        let data = new FormData(form);
        window.axios({
            method: 'post',
            url: '/register',
            data: data,
            // data: {
            //     phone:object.phoneMask._unmaskedValue
            // }
        }).then(function (resp) {
            console.log(resp.data.sms);
            if(resp.data && resp.data.sms !== 'undefined' && resp.data.sms.status === 'OK') {

                object.smsBox.classList.add('d-block');

            } else  if(resp.data && resp.data.sms !== 'undefined' && resp.data.sms.status === 'ERROR'){

                object.info.classList.remove('hide');
                object.info.querySelector('.box-body').innerHTML = resp.data.sms.status_text;

            } else if(resp.data && resp.data.redirect !== 'undefined' && resp.data.redirect !== null){
                window.location.replace(resp.data.redirect);
            } else {
                console.log(11);
            }
        }).catch(function (error) {



            window.helper.removeElementsByClass('nv-helper');
            window.helper.removeClassesByClass('is-invalid');

            if(error.response && error.response.data.messages){
                for(let error_stack in error.response.data.messages){
                    let error_stack_arr = error_stack.split('.');

                    let iteration = 0;
                    let error_prepared = '';
                    Array.prototype.forEach.call(error_stack_arr, function(el) {
                        if(iteration > 0){
                            el = '[' + el + ']';
                            error_prepared += el;
                        } else {
                            error_prepared = el;
                        }
                        iteration++;
                    });

                    var el = object.form.querySelector('[name="'+error_prepared+'"]:not([type="hidden"])');

                    if(el.getAttribute('type') !== 'hidden'){
                        el.classList.add('is-invalid');
                        var node = window.helper.createElementFromHTML('<small class="nv-helper form-text text-muted">' + error.response.data.messages[error_stack] + '</small>');
                        el.parentNode.appendChild(node);
                    }

                }
            }



        }).finally(function () {
        });
    }


    addPhoneMask(){
        var phone = document.querySelector('#phone_input');
        this.phoneMask = window.IMask(phone, {
                mask: [
                    {
                        mask: '+{7} (000) 000-00-00',
                        startsWith: '7',
                        lazy: false,
                        country: 'Россия'
                    },
                    {
                        mask: '{8} (000) 000-00-00',
                        startsWith: '8',
                        lazy: false,
                        country: 'Россия'
                    }
                ],
                dispatch: function (appended, dynamicMasked) {
                    var number = (dynamicMasked.value + appended).replace(/\D/g,'');

                    return dynamicMasked.compiledMasks.find(function (m) {
                        return number.indexOf(m.startsWith) === 0;
                    });
                }
            }
        )
    }
}
export default registerPage;

