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

