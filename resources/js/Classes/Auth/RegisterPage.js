class registerPage{

    constructor(){
        console.log('страница Регистрации инициализировано');
        this.active = true;
        this.form = document.getElementById('registerForm');
        this.smsBox = document.getElementById('sms-box');
        this.phoneMask = null;
        this.info = document.getElementById('info');
        this.sms_phone = document.getElementById('sms_phone');
        this.init();
    }

    init(){
        this.addPhoneMask()
        this.sms_id = null;
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
                        object.smsBox.classList.add('hide');
                        object.form.submit();
                    } else {
                        object.smsBox.classList.add('unvalid');
                    }
                }).catch(function (error) {
                    //console.log(error);
                }).finally(function () {
                });
            }
        }, 100);

    }

    linked(){

    }

    sendSMSAgain(){

        let data = {
            sms_id: this.sms_id
        };

        window.axios({
            method: 'post',
            url: '/sms_retry',
            data: data,
        }).then(function (resp) {
            console.log(resp);
        });
    }

    submitForm(form, event){
        let object = this;
        event.preventDefault();
        let data = new FormData(form);
        window.axios({
            method: 'post',
            url: '/register',
            data: data,
        }).then(function (resp) {

            object.sms_id = resp.data.sms.sms_id;

            if(resp.data && resp.data.sms !== 'undefined' && resp.data.sms.status === 'OK') {

                object.smsBox.classList.remove('hide');
                object.smsBox.querySelector('input').focus();

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
            } else if(error.response && error.response.data.service_message){
                document.getElementById('info').innerHTML = error.response.data.service_message;
                document.getElementById('info').classList.remove('hide');
            }
        }).finally(function () {
        });
    }

    changeCountry(elem){
        let object = this;

        object.phoneMask.updateOptions({
            mask: '+{' + elem.value + '}(000)000-00-00'
        });
        object.phoneMask.value = '';
    }

    addPhoneMask(){
        var phone = document.querySelector('#phone_input');
        this.phoneMask = window.IMask(phone, {

                mask: '+{7}(000)000-00-00',
                lazy: false,
                placeholderChar: '_',


                dispatch: function (appended, dynamicMasked) {
                    var number = (dynamicMasked.value + appended).replace(/\D/g,'');

                    return dynamicMasked.compiledMasks.find(function (m) {
                        return number.indexOf(m.startsWith) === 0;
                    });
                }

                // dispatch: function (appended, dynamicMasked) {
                //     var number = (dynamicMasked.value + appended).replace(/\D/g,'');
                //
                //     return dynamicMasked.compiledMasks.find(function (m) {
                //         return number.indexOf(m.startsWith) === 0;
                //     });
                // }
            }
        )
    }
}
export default registerPage;

