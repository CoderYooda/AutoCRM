class storePage{

    constructor(){
        console.log('страница услуг инициализировано');
        this.active = true;
        this.init();
    }

    init(){
        let object = this;
        document.addEventListener('ajaxLoaded', function(e){
            object.checkActive();
        });
        object.checkActive();
    }

    checkActive(){
        let className = window.location.pathname.substring(1);
        let link = document.getElementById('services_link');
        if(className === 'services'){
            link.classList.add('active');
            this.active = true;
        } else {
            link.classList.remove('active');
            this.active = false;
        }

    }
}
export default storePage;
