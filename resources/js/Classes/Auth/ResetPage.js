class resetPage{

    constructor(){
        console.log('страница Регистрации инициализировано');
        this.active = true;
        this.form = document.getElementById('resetForm');
        this.smsBox = document.getElementById('sms-box');
        this.phoneMask = null;
        this.init();
    }

    init(){
        this.addPhoneMask();
        this.sms_id = null;
        this.sms_id_input = document.getElementById('sms_id');
        this.sms_hash = null;
        this.sms_hash_intput = document.getElementById('sms_hash');
        this.sms_box = document.getElementById('sms-box');

        this.send_sms_b = document.getElementById('send_sms');
        this.recover_b = document.getElementById('recover');

        this.sms_pass_input = document.getElementById('sms_pass_input');
        this.sms_pass_confirmation = document.getElementById('sms_pass_confirmation');
        this.sms_action = document.getElementById('action');
        this.sms_code = document.getElementById('sms_code');
        this.phone_input = document.getElementById('phone_input_c');

        this.login = document.getElementById('back_to_work');
        this.title = document.getElementById('title');
        this.create_acc = document.getElementById('create_acc');

        this.sms_confirmed = false;
        this.pass_changed = false;

        this.phone = null;
    }

    linked(){

    }

    sendSMS(){
        this.phone = document.querySelector('#phone_input').value;
        window.axios({
            method: 'post',
            url: '/password/reset/sendsms',
            data: { phone: this.phone}
        }).then(response => {
            this.sms_id = response.data.sms_id;
            this.sms_hash = response.data.hash;

            this.sms_id_input.value = response.data.sms_id;
            this.sms_hash_intput.value = response.data.hash;
            this.checkState();
        }).catch(error => {
            this.showErrors(error);
        });
    }

    showErrors(error){
        let messages = {};
        if(error.response && error.response.data){
            if(error.response.data.errors){
                messages = error.response.data.errors;
            }
        }
        for(var error_stack in messages){
            window.notification.notify( 'error', messages[error_stack][0]);
        }
    }

    confirmSMS(){
        this.phone = document.querySelector('#phone_input').value;
        window.axios({
            method: 'post',
            url: '/password/reset/confirmsms',
            data: {
                phone: this.phone,
                sms_id:this.sms_id,
                hash: this.sms_hash,
                sms_code: this.sms_code.value
            }
        }).then(response => {
            if(response.data.status == 'success'){
                this.sms_confirmed = true;
            }
            this.checkState();
        }).catch(error => {
            this.showErrors(error);
        });
    }

    changePass(){
        this.phone = document.querySelector('#phone_input').value;
        window.axios({
            method: 'post',
            url: '/password/reset',
            data: {
                phone: this.phone,
                sms_id:this.sms_id,
                hash: this.sms_hash,
                sms_code: this.sms_code.value,
                password: document.querySelector('#password').value,
                password_confirmation: document.querySelector('#password_confirmation').value
            }
        }).then(response => {
            if(response.data.status == 'success'){
                this.pass_changed = true;
            }
            this.checkState();
        }).catch(error =>{
            this.showErrors(error);
        });
    }

    gotoLogin(){
        window.location.href = '/login'
    }

    checkState(){
        if(this.sms_id){
            this.sms_box.classList.remove('hide');
            this.recover_b.classList.remove('hide');
            this.send_sms_b.classList.add('hide');
            this.phone_input.classList.add('hide');
            this.sms_box.querySelector('input').focus();
        } else {
            this.sms_box.classList.add('hide');
            this.recover_b.classList.add('hide');
            this.send_sms_b.classList.remove('hide');
        }

        if(this.sms_confirmed){
            this.sms_box.classList.add('hide');
            this.sms_pass_input.classList.remove('hide');
            this.sms_pass_confirmation.classList.remove('hide');
            this.sms_action.classList.remove('hide');
            this.recover_b.classList.add('hide');
            this.phone_input.classList.add('hide');
            this.send_sms_b.classList.add('hide');
        } else {
            this.sms_pass_input.classList.add('hide');
            this.sms_pass_confirmation.classList.add('hide');
            this.sms_action.classList.add('hide');
            this.send_sms_b.classList.add('hide');
        }

        if(this.pass_changed){
            this.phone_input.classList.add('hide');
            this.sms_box.classList.add('hide');
            this.sms_pass_input.classList.add('hide');
            this.sms_pass_confirmation.classList.add('hide');
            this.sms_action.classList.add('hide');
            this.recover_b.classList.add('hide');
            this.send_sms_b.classList.add('hide');
            this.login.classList.remove('hide');
            this.title.classList.add('hide');
            this.create_acc.classList.add('hide');
        } else {
            this.login.classList.add('hide');
            this.title.classList.remove('hide');
            this.create_acc.classList.remove('hide');
        }
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
            }
        )
    }
}
export default resetPage;

