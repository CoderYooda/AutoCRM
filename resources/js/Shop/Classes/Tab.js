class Tab {
    constructor(container){
        this.container = container;
        this.tabs_buttons = container.querySelectorAll('.link-tab');
        this.tabs = container.querySelectorAll('.container-tab');
        console.log(this.tabs_buttons);
        this.tabs_buttons.forEach((item) => {
            item.addEventListener('click', ()=>{
                this.goto(item);
            });
        });

    }
    goto(elem){
        let link = elem.getAttribute('data-link');
        this.tabs_buttons.forEach((item) => {
            item.classList.remove('active');
        });
        this.tabs.forEach((item) => {
            item.classList.remove('active');
        });
        let target = this.container.querySelector('[data-link="'+ link +'"]');
        let target_tab = this.container.querySelector('[data-tag="'+ link +'"]');
        target.classList.add('active');
        target_tab.classList.add('active');
    }
}

export default Tab;
