class registerPage{

    constructor(){
        console.log('страница Регистрации инициализировано');
        this.active = true;
        this.form = document.getElementById('registerForm');
        this.phoneMask = null;
        this.init();
    }

    init(){
        this.addPhoneMask()
    }

    submitForm(event){
        let object = this;
        event.preventDefault();

        window.axios({
            method: 'post',
            url: '/sms/confirmate',
            data: {
                phone:object.phoneMask._unmaskedValue
            }
        }).then(function (resp) {
            console.log(resp);
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
        });
    }


    addPhoneMask(){
        var phone = document.querySelector('#phone_input');
        this.phoneMask = window.IMask(phone, {
                mask: [
                    {
                        mask: '+{7}(000)000-00-00',
                        startsWith: '7',
                        lazy: true,
                        country: 'Россия'
                    },
                    {
                        mask: '{8}(000)000-00-00',
                        startsWith: '8',
                        lazy: true,
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

