import {Contextual, ContextualItem} from "../Contentual";

class partnerPage{

    constructor(){
        console.log('страница партнера инициализировано');
        this.active = true;
        this.root_id = 'partner_index_page';
        this.root_category = 3;
        this.category_id = null;//window.helper.findGetParameter('category_id');
        this.page = window.helper.findGetParameter('page');
        this.search = null;
        this.search_obj = document.querySelector("#partner_search");
        this.init();
    }

    init(){
        let object = this;
        document.addEventListener('ajaxLoaded', function(e){
            object.checkActive();
            object.load();
        });
        object.checkActive();
        object.searchInit();
        document.addEventListener('PartnerStored', function(e){
            object.reloadPage();
        });
        document.addEventListener('PartnerRemoved', function(e){
            object.reloadPage();
        });
        document.addEventListener('CategoryStored', function(e){
            object.prepareParams();
            object.reload();
        });
        object.linked();
    }

    reloadPage(){
        let cat_string;
        if(this.category_id === null){
            cat_string = 'category_id=';
        } else {
            cat_string = 'category_id=' + this.category_id;
        }
        let search_string;
        if(this.search === null){
            search_string = '&search=';
        } else {
            search_string = '&search=' + this.search;
        }
        let page_string;
        if(this.page === null){
            page_string = '&page=';
        } else {
            page_string = '&page=' + this.page;
        }
        window.goto(window.helper.getBaseUrl() + '?' + cat_string + search_string + page_string);
    }

    load(){
        this.category_id = window.helper.findGetParameter('category_id');
        if(window.helper.findGetParameter('page') !== null){
            this.page = window.helper.findGetParameter('page');
        } else { this.page = 1}
        if(window.helper.findGetParameter('search') !== null){
            this.search = window.helper.findGetParameter('search');
        } else { this.search = ''}
        this.searchInit();this.searchInit();
    }

    linked(){ //Состояние Linked - когда экземпляр класса уже был загружен, и находится в памяти. (Возвращение на страницу)
        this.category_id = window.helper.findGetParameter('category_id');
        this.page = window.helper.findGetParameter('page');
        this.search = window.helper.findGetParameter('search');
        this.searchInit();
        this.initTableData();
    }

    checkActive(){
        let className = window.location.pathname.substring(1);
        let link = document.getElementById('partner_link');
        if(className === 'partner'){
            link.classList.add('active');
            this.active = true;
        } else {
            link.classList.remove('active');
            this.active = false;
        }
    }

    searchInit(){
        let object = this;
        let el = document.getElementById(object.root_id);
        if(el){
            let search = el.querySelector("input[name=search]");
            if(search){
                let searchFn = window.helper.debounce(function(e) {
                    object.search = search.value;
                    object.page = 1;
                    object.reload();
                }, 400);
                search.addEventListener("keydown", searchFn);
                search.addEventListener("paste", searchFn);
                search.addEventListener("delete", searchFn);
                //document.addEventListener("PartnerStored", searchFn);
            }
        }
    }

    prepareParams(){
        if(this.category_id === null){
            this.category_id = '';
        }
        if(!this.search || this.search === 'null' || this.search === null){
            this.search = '';
        } else {
            this.category_id = this.root_category;
        }
        if(this.page === null || this.page === 'null'){
            this.page = 1;
        }
    }

    getUrlString(){
        let url = '?view_as=json';
        url += '&target=ajax-table-partner';
        if(this.category_id !== null){
            url += '&category_id=';
            url += this.category_id;
        }
        if(this.search && this.search !== 'null' && this.search !== '' && this.search !== null){
            url += '&search=';
            url += this.search;
        }
        if(this.page !== null || this.page !== 'null'){
            url += '&page=';
            url += this.page;
        }
        return url;
    }

    searchFn(){
        let object = this;
        object.prepareParams();
        if (isXHRloading) { return; } window.isXHRloading = true;
        window.axios({
            method: 'get',
            url: object.getUrlString(),
        }).then(function (resp) {
            var results_container = document.getElementById(resp.data.target);
            results_container.innerHTML = resp.data.html;

            window.helper.insertParamUrl('search', object.search);

            let root = document.getElementById(object.root_id)
            let category_header = root.querySelector("#category_header");
            let category_list = root.querySelector("#category_list_aside");
            category_header.innerHTML = 'Поиск';

            let list =
            '<li class="d-flex flex category-aside">'+
            '<a href="partner" class="ajax-nav d-flex text-ellipsis" style="flex: auto;">'+
            '<span class="nav-text text-ellipsis"><i class="fa fa-chevron-left"></i> К категориям</span>'+
            '</a>'+
            '</li>';
            category_list.innerHTML = list;
            window.rebuildLinks();
            object.load();

        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
        // console.log(111);
        //goto('/partner/search?view_as=json&search=' + string);
    }

    initTableData(){
        let object = this;
        let table_container = document.getElementById('table-container');
        let height = 500;

        if(table_container){
            height = table_container.offsetHeight;
        }
        let cleanHeight = height - 110;
        let elements = cleanHeight / 44;

        object.table = new Tabulator("#partner-table", {
            locale:true,
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
            height:height-15,
            pagination:"remote",
            layout:"fitColumns",
            ajaxSorting:true,
            ajaxURL:'/partner/tabledata',
            ajaxRequesting:function(url, params){
                window.isXHRloading = true;
                document.body.classList.add('loading');
            },
            ajaxResponse:function(url, params, response){
                window.isXHRloading = false;
                document.body.classList.remove('loading');
                return response;
            },
            ajaxParams:object.prepareDataForTable(),//object.prepareUrlForTable(), //ajax parametersвфеу
            paginationSize:Math.floor(elements),
            placeholder:"По данным критериям ничего нет",
            columns: object.generateColumns(),
            rowContext:function(e, row){
                e.preventDefault();
                object.selectedData = object.table.getSelectedData();
                let items = [
                    new ContextualItem({label:'Редактировать', onClick: () => {openDialog(object.contextDop + 'Dialog', '&' + object.parametr + '_id=' + row.getData().id)}, shortcut:'Что то' }),
                    new ContextualItem({type:'seperator'}),
                    new ContextualItem({label:'Удалить', onClick: () => {window.entity.remove(object.contextDop, row.getData().id, object)}, shortcut:'Ctrl+A' }),
                ];
                if(object.selectedData.length > 0){
                    items.push(new ContextualItem({label:'Удалить выделенные', onClick: () => {window.entity.remove(object.contextDop, window.helper.pluck(object.selectedData, 'id'), object)}, shortcut:'Ctrl+A' }));
                }
                object.tableContextual = null;
                object.tableContextual = new Contextual({
                    isSticky: false,
                    items:items,
                });
            },
            tableBuilt:function(){
                console.log('Таблица готова');
            },
            rowClick:function(e, row){
                if(object.active_tab != 'store'){
                    console.log('Загружаем инфо');
                    let data = {};
                    data.id = row.getData().id;
                    window.axios({
                        method: 'post',
                        url: '/' + object.active_tab + '/side_info',
                        data: data
                    }).then(function (resp) {
                        document.getElementById('contact_block').innerHTML = resp.data.info;
                        document.getElementById('comment_block').innerHTML = resp.data.comment;
                        //console.log(resp);
                    }).catch(function (error) {
                        console.log(error);
                    }).finally(function () {
                        window.isXHRloading = false;
                    });
                }
            },
        });
    }

    generateColumns(){
        let object = this;
        object.contextDop = 'partner';
        object.parametr = 'partner';
        let columns = [
            {formatter:"rowSelection", width:34, titleFormatter:"rowSelection", align:"center", headerSort:false, cellClick:function(e, cell){
                    cell.getRow().toggleSelect();
                }},
            {title:"ID", field:"id", width:80},
            {title:"Фио", field:"name", align:"left"},
            {title:"Контрагент", field:"partner", align:"left"},
            {title:"Баланс", field:"balance", width:130, align:"left"},
        ];
        return columns;
    }

    prepareDataForTable(){
        let object = this;
        let data = {};
        data.view_as = "json";
        data.target = "ajax-table-partner";
        data.page = 1;

        if(object.partner !== []){data.partner = object.partner;}
        if(object.dates_range !== null){data.dates_range = object.dates_range;}
        if(object.search && object.search !== 'null' || object.search !== null){data.search = object.search.toString();}
        return data;
    }

    reload(){
        let object = this;
        object.prepareParams();
        if (isXHRloading) { return; } window.isXHRloading = true;
        window.axios({
            method: 'get',
            url: object.getUrlString(),
        }).then(function (resp) {
            var results_container = document.getElementById(resp.data.target);
            results_container.innerHTML = resp.data.html;
            window.helper.insertParamUrl('search', object.search);
            window.helper.insertParamUrl('category_id', object.category_id);
            window.helper.insertParamUrl('page', object.page);

            if(object.search.length > 0){
                let root = document.getElementById(object.root_id)
                let category_header = root.querySelector("#category_header");
                let category_list = root.querySelector("#category_list_aside");
                category_header.innerHTML = 'Поиск';

                let list =
                    '<li class="d-flex flex category-aside">'+
                    '<a href="partner" class="ajax-nav d-flex text-ellipsis" style="flex: auto;">'+
                    '<span class="nav-text text-ellipsis"><i class="fa fa-chevron-left"></i> К категориям</span>'+
                    '</a>'+
                    '</li>';
                category_list.innerHTML = list;
            }


            window.rebuildLinks();
            object.load();
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    }
}
export default partnerPage;
