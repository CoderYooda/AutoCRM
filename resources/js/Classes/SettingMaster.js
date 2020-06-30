class SettingMaster
{
    constructor()
    {
        this.init();
    }

    init()
    {

    }

    activeTab(button_element, type) {

        event.preventDefault();

        let button_elements = document.querySelectorAll('.d-flex > button');
        button_elements.forEach(element => {
            element.classList.remove('active');
        });

        button_element.classList.add('active');

        let tab_elements = document.querySelectorAll('form .tab');

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

        document.querySelector('div.tab.' + type).classList.add('active');

        let valid_inputs = document.querySelectorAll('div.tab.' + type + '.active input');

        valid_inputs.forEach(element => {
            element.disabled = false;
        })
    }

}
export default SettingMaster
