class SettingMaster
{
    constructor()
    {
        this.root_dialog = document.getElementById('settings_master');
        this.step = 1;
        this.steps = 3;
        this.init();
        this.steps_icon = {
            1:'current',
            2:'wait',
            3:'wait'
        }
    }

    close(){
        this.root_dialog.classList.add('hide');
    }

    init()
    {
        this.addNumberMasks();
        this.addPhoneMask();
    }

    nextStep(){
        this.goToStep(this.step + 1);
    }
    backStep(){
        this.goToStep(this.step - 1);
    }

    save(elem){
        window.event.preventDefault();
        let form = elem.closest("form");
        let data = new FormData(form);
        axios({
            method: form.getAttribute("method"),
            url: form.getAttribute("action"),
            data: data
        }).then(function (response) {

        });
        console.log(data);
    }

    addPhoneMask(){
        let elements = this.root_dialog.querySelectorAll('.phone_input');
        [].forEach.call(elements, function(element){
            var dispatchMask = window.IMask(element, {
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
        });
    }

    insertEmployee(){
        let count = this.root_dialog.querySelectorAll('#employees .unit_elem').length;
        var node = helper.createElementFromHTML('<div class="unit_elem mb-10 p-15">\n' +
            '<div class="form-group">\n' +
                '<label>ФИО</label>\n' +
                '<input type="text" name="employees[' + (count + 1) + '][fio]" id="fl_dialog_focused" value="" class="form-control entrance" placeholder="ФИО">\n' +
                '</div>\n' +
                '<div class="form-group">\n' +
                '<label>Номер телефона</label>\n' +
                '<input id="phone_login_input" type="text" name="employees[' + (count + 1) + '][phone]" class="form-control phone_input" value="" placeholder="Телефон">\n' +
                '</div>\n' +
                '<div class="form-group">\n' +
                    '<label>Доступ к системе</label>\n' +
                    '<select name="employees[' + (count + 1) + '][access]" class="form-control input-c">\n' +
                    '<option value="1">Разрешен</option>\n' +
                    '<option value="0" selected="">Запрещен</option>\n' +
                    '</select>\n' +
                '</div>\n' +
            '</div>');

        document.getElementById('employees').appendChild(node);
        this.addPhoneMask();
    }

    insertPartner(){
        let count = this.root_dialog.querySelectorAll('#partners .unit_elem').length;
        var node = helper.createElementFromHTML('                                <div class="unit_elem mb-10 p-15">\n' +
            '<div class="form-group">\n' +
            '<label>Названия организации</label>\n' +
            '<input type="text" name="partners[' + (count + 1) + '][companyName]" value="" class="form-control" placeholder="Названия организации">\n' +
            '</div>\n' +
            '<div class="form-group">\n' +
            '<label>Контактное лицо</label>\n' +
            '<input type="text" name="partners[' + (count + 1) + '][fio]" value="" class="form-control" placeholder="Контактное лицо">\n' +
            '</div>\n' +
            '<div class="form-group">\n' +
            '<label>Номер телефона</label>\n' +
            '<input type="text" name="partners[' + (count + 1) + '][phone]" class="form-control phone_input" value="" placeholder="Телефон">\n' +
            '</div>\n' +
            '</div>');

        document.getElementById('partners').appendChild(node);
        this.addPhoneMask();
    }

    goToStep(num) {
        if(num < 1){num = 1;}
        if(num > this.steps){num = this.steps;}

        for (const [key, value] of Object.entries(this.steps_icon)) {
            if(this.steps_icon[key] === 'current'){
                this.steps_icon[key] = 'wait';
            }
        }
        if(this.steps_icon[num] === 'wait'){
            this.steps_icon[num] = 'current';
        }
        let steps = this.root_dialog.querySelectorAll('.m_step');
        this.step = num;
        [].forEach.call(steps, function(elem){
            elem.classList.add('hide');
            elem.classList.remove('active');
        });

        let selected = this.root_dialog.querySelector('#step_' + num);
        selected.classList.add('active');
        selected.classList.remove('hide');
        this.checkButts();
    }

    checkButts(){

        for (const [key, value] of Object.entries(this.steps_icon)) {
            this.root_dialog.querySelector('#stepb_' + key).className = value;
        }

        if(this.step === this.steps){
            this.root_dialog.querySelector('#next_b').classList.add('hide');
            this.root_dialog.querySelector('#finish_b').classList.remove('hide');
        } else{
            this.root_dialog.querySelector('#next_b').classList.remove('hide');
            this.root_dialog.querySelector('#finish_b').classList.add('hide');
        }
    }

    activeTab(button_element, type) {

        event.preventDefault();

        let button_elements = document.querySelectorAll('.d-flex > button');
        button_elements.forEach(element => {
            element.classList.remove('active');
        });

        button_element.classList.add('active');

        let tab_elements = document.querySelectorAll('#settings_master #step_1 .tab');

        tab_elements.forEach(element => {
            element.classList.remove('active');
        });


        // let input_elements = document.querySelectorAll('input');

        // input_elements.forEach(element => {
        //
        //     if(element.parentElement.tagName === 'FORM') return;
        //
        //     if(type === 'ul' && element.name === 'actual_address') {
        //
        //     }
        //
        //     element.disabled = true;
        // });

        document.querySelector('#step_1 .tab.' + type).classList.add('active');

        // let valid_inputs = document.querySelectorAll('#step_1 .tab.' + type + '.active input');
        //
        // valid_inputs.forEach(element => {
        //     element.disabled = false;
        // })
    }

    writingBik(element) {
        if(element.value.length !== 9) return;

        window.axios({
            method: 'get',
            url: '/api/bik/' + element.value,
        }).then(response => {

            console.log(response);

            let data = response.data;

            if(!Object.keys(data).length) return ;

            document.querySelector('.tab.active input[name=cs]').value = data.ks;
            document.querySelector('.tab.active input[name=bank]').value = data.name.split('&quot;').join('"');
        });
    }

    addNumberMasks() {

        let inputs = {
            cs: '00000000000000000000',
            rs: '00000000000000000000',
            bik: '000000000',
            inn: '0000000000000',
            ogrn: '0000000000000000',
            kpp: '000000000'
        };

        Object.keys(inputs).forEach(name => {

            let element = document.getElementsByName(name)[0];

            window.IMask(element, {
                mask: inputs[name],
                lazy: true
            });
        });
    }

    similarCompanyAddress(checkbox_element) {
        let input_address = document.querySelector('[name=actual_address]');

        input_address.disabled = checkbox_element.checked;
    }

}
export default SettingMaster
