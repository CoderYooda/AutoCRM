class employeePage{

    constructor(){
        console.log('страница сотрудников инициализировано');
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
        let link = document.getElementById('employee_link');
        if(className === 'employee'){
            link.classList.add('active');
            this.active = true;
        } else {
            link.classList.remove('active');
            this.active = false;
        }

    }
}
export default employeePage;
