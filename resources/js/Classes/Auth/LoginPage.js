class registerPage{

    constructor(){
        console.log('страница Авторизации инициализировано');
        this.active = true;
        this.form = document.getElementById('loginForm');
        this.phoneMask = null;
        this.init();
    }

    init(){
        this.addPhoneMask()
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

