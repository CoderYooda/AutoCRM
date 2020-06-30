class SettingMaster
{
    constructor()
    {
        this.init();
    }

    init()
    {
        this.addNumberMasks();
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


        let input_elements = document.querySelectorAll('input');

        input_elements.forEach(element => {

            if(element.parentElement.tagName === 'FORM') return;

            if(type === 'ul' && element.name === 'actual_address') {

            }

            element.disabled = true;
        });

        document.querySelector('#step_1 .tab.' + type).classList.add('active');

        let valid_inputs = document.querySelectorAll('#step_1 .tab.' + type + '.active input');

        valid_inputs.forEach(element => {
            element.disabled = false;
        })
    }

    wroteBik(element) {
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
            ogrn: '0000000000000',
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
