import selectCompanyDialog from "../Company/SelectCompanyDialog";
import {Contextual, ContextualItem} from "../Contentual";

class adminPage{

    constructor(){
        console.log('страница Админки инициализировано');
        this.init();
    }

    init(){

        this.searchDebounce = window.helper.debounce(() => {
            this.search();
        }, 400);

        this.contextDop = null;
        this.parametr = null;

        this.filter_company_id = null;

        this.linked();
    }

    selectCompany(company) {

        document.dispatchEvent(new Event('CompanySelected', {bubbles: true}));

        let list_element = document.querySelector('#company_list');

        let filter_element = list_element.firstElementChild;

        filter_element.classList.remove('d-none');
        filter_element.querySelector('.name').innerText = company.name;

        this.filter_company_id = company.id;
        this.table.setData(this.url_search, this.prepareDataForTable());
    }

    removeCompany(element = null) {
        let list_element = document.querySelector('#company_list');

        let filter_element = list_element.firstElementChild;

        filter_element.classList.add('d-none');

        this.filter_company_id = null;
        this.table.setData(this.url_search, this.prepareDataForTable());
    }

    clearCompanyList() {
        this.removeCompany();
    }

    linked(){

        this.active_tab = this.getCurrentActiveTab();

        this.url_search = '/admin/' + this.active_tab + '/tabledata';

        console.log(this.active_tab, this.url_search);

        this.initTableData();
    }

    search() {
        this.table.setData(this.url_search, this.prepareDataForTable());
    }

    initTableData() {

        let object = this;
        let table_container = document.getElementById('table-container');

        let height = 500;

        let cleanHeight = height - 125;
        let tableHeight = height - 55;
        if(table_container) {
            height = table_container.offsetHeight;
            cleanHeight = height - 86;
            tableHeight = height;
        }
        let elements = cleanHeight / 44;

        object.table = new Tabulator("#" + this.active_tab + "-table", {
            locale: true,
            langs:{
                "ru":{
                    "ajax":{
                        "loading":"Загрузка", //ajax loader text
                        "error":"Ошибка", //ajax error text
                    },
                    "pagination":{
                        "page_size":"Кол-во элементов",
                        "first":"Первая",
                        "first_title":"Первая страница",
                        "last":"Последняя",
                        "last_title":"Последняя страница",
                        "prev":"Предыдущая",
                        "prev_title":"Предыдущая страница",
                        "next":"Следующая",
                        "next_title":"Следующая страница",
                        "show_page":"След.",
                    },
                    "headerFilters":{
                        "default":"filter column...",
                        "columns":{
                            "name":"filter name...",
                        }
                    }
                }
            },
            clipboard:true,
            selectable:true,
            selectableRangeMode:"click",
            resizableColumns:false,
            height:tableHeight,
            pagination:"remote",
            layout:"fitColumns",
            ajaxSorting:true,
            ajaxURL: this.url_search,
            ajaxRequesting:function(url, params){
                window.isXHRloading = true;
                document.body.classList.add('loading');
            },
            ajaxResponse: (url, params, response) => {
                window.isXHRloading = false;
                document.body.classList.remove('loading');

                return response.data;
            },
            ajaxParams:object.prepareDataForTable(),
            paginationSize: Math.floor(elements),
            placeholder:"По данным критериям ничего нет",
            columns: object.generateColumns(),
            renderComplete: () => {
                let title_elements = document.querySelectorAll('.tabulator-cell');

                title_elements.forEach(element => {
                    element.title = element.innerText;
                });
            },
            rowDblClick: (e, row) => {
                let id = row.getData().id;

                openDialog(this.contextDop + 'Dialog', '&' + this.parametr + '=' + id);
            },
            rowContext: (e, row) => {
                e.preventDefault();

                if(this.contextDop != 'user') return;

                let items = [];

                let id = row.getData().id;

                items.push(new ContextualItem({
                    label: 'Войти от имени пользователя', onClick: () => {
                        system.authByUser(id);
                    }, shortcut: 'Что то'
                }));

                new Contextual({
                    isSticky: false,
                    items:items,
                });
            },
            tableBuilt: () => {
                //
            },
            rowClick: (e, row) => {
                //
            },
        });
    }

    prepareDataForTable(){

        let data = {};

        data.view_as = "json";
        //data.target = "ajax-table-admin";
        data.page = 1;

        if(this.filter_company_id != null) data.company_id = this.filter_company_id;

        let search_element = document.querySelector('#search');
        data.search = search_element.value;

        return data;
    }

    generateColumns(){

        let columns = [];

        if(this.active_tab == 'companies') {

            this.contextDop = 'company';
            this.parametr = 'company_id';

            columns = [
                {title:"ID", field:"id", width:80, align: 'center'},
                {title:"Название", field:"name"},
                {title:"Оплачена до", field:"payed_days"},
                {title:"Дата регистрации", field:"created_at"}
            ];
        }
        else {

            this.contextDop = 'user';
            this.parametr = 'user_id';

            columns = [
                {title:"ID", field:"id", width:80, align: 'center'},
                {title:"Имя", field:"name"},
                {title:"Телефон", field:"phone"}
            ];
        }

        return columns;
    }

    getCurrentActiveTab(){

        let active_tab = window.helper.findGetParameter('active_tab');

        if(active_tab == null || active_tab == 'null'){
            active_tab = 'companies';
        }

        return active_tab;
    }
}
export default adminPage;

