class Tabs {

    constructor(element_name, disable_inputs = true) {

        this.disable_inputs = disable_inputs;

        this.ul_element = document.getElementById(element_name);

        this.a_elements = this.ul_element.querySelectorAll('[data-target]');
        this.tab_elements = [];

        let tabs_names = [];

        this.a_elements.forEach(element => {
            tabs_names.push(element.dataset.target);
            this.clickEvent(element);
        });

        for(let i = 0; i < tabs_names.length; i++) {
            let tab = document.getElementById(tabs_names[i]);
            if(tab) this.tab_elements.push(tab);
        }

        setTimeout(() => {

            let active_element = this.ul_element.querySelector('.active');

            if(active_element == null) {
                this.ul_element.querySelector('[data-target]').click();
            }
            else active_element.click();

        }, 200);
    }

    clickEvent(element) {

        element.addEventListener('click', event => {

            //Удаляем активность у всех элементов с тэгом 'A'
            this.a_elements.forEach(a_element => a_element.classList.remove('active'));

            //Ставим активность на кликнутый элемент
            element.classList.add('active');

            this.tab_elements.forEach(tab_element => {

                if(this.disable_inputs) {
                    let inputs = tab_element.querySelectorAll('input');
                    if (inputs) inputs.forEach(input => input.disabled = true);
                }

                //Удаляем активность у всех табов
                tab_element.classList.remove('active');

                //Ставим активность на таб
                if(tab_element.id === element.dataset.target) {
                    tab_element.classList.add('active');

                    if(this.disable_inputs && inputs) inputs.forEach(input => input.disabled = false);
                }
            });
        });
    }
}

export default Tabs;
