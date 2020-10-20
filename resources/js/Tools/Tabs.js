class Tabs {

    constructor(element_name) {

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
            this.tab_elements.push(tab);
        }
    }

    clickEvent(element) {
        element.addEventListener('click', event => {

            //Удаляем активность у всех элементов с тэгом 'A'
            this.a_elements.forEach(a_element => a_element.classList.remove('active'));

            //Ставим активность на кликнутый элемент
            element.classList.add('active');

            this.tab_elements.forEach(tab_element => {

                //Удаляем активность у всех табов
                tab_element.classList.remove('active');

                //Ставим активность на таб
                if(tab_element.id === element.dataset.target) {
                    tab_element.classList.add('active');
                }
            });
        });
    }
}

export default Tabs;
