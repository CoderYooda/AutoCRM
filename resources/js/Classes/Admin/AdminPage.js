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

        this.linked();
    }

    linked(){

        this.active_tab = this.getCurrentActiveTab();

        this.url_search = '/admin/' + this.active_tab + '/tabledata';

        console.log(this.active_tab, this.url_search);

        this.initTableData();
    }

    sendSystemMessage()
    {
        let data = {};
        data.user_id = document.getElementById('message_to').value;
        data.message = document.getElementById('message').value;

        window.axios({
            method: 'post',
            url: 'system_message/send',
            data: data
        }).then(function (resp) {
            console.log(resp);
        }).catch(function (error) {
            console.log(error);
        });
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
                //
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

