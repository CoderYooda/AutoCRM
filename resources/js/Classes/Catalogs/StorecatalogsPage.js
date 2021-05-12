import Page from "../Page/Page";

class storecatalogsPage extends Page{

    constructor(){
        super('ajax-table-catalog');
        console.log('страница каталогов инициализировано');
        this.active = true;
        this.active_tab = 'catalogue';
        this.init();
    }


    init(){
        let object = this;
        document.addEventListener('ajaxLoaded', function(e){
            //object.load();
        });


        object.linked();
    }

    linked(){ //Состояние Linked - когда экземпляр класса уже был загружен, и находится в памяти. (Возвращение на страницу)

    }
}
export default storecatalogsPage;
