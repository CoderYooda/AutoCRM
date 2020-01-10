import { Contextual , ContextualItem } from "../Contentual";

class storePage{

    constructor(){
        console.log('страница склада инициализировано');
        this.active = true;
        this.active_tab = this.getCurrentActiveTab();
        this.category_id = window.helper.findGetParameter('category_id');
        this.page = 1;
        this.search = 'null';
        this.tableContextual = null;
        this.selectedData = null;
        this.root_category = 2;
        this.dates_range = ['null', 'null'];
        this.date_start = 'null';
        this.date_end = 'null';
        this.categoryContextual = null;
        this.table = null;
        this.init();

    }
    loadBreadcrumbs(category_id, root_category){

        let object = this;
        window.isXHRloading = true;
        // window.helper.insertParamUrl('category_id', category_id);
        // window.helper.insertParamUrl('search', 'null');
        object.category_id = category_id;
        //document.getElementById("search").value = '';;
        //object.table.setData('/tableproductdata', object.prepareDataForTable());
        let data = {};
        data.category_id = category_id;
        data.root_category = root_category;
        data.search = object.search;
        window.axios({
            async:true,
            method: 'post',
            url: '/category/breadcrumbs',
            data: data
        }).then(function (resp) {
            document.getElementById('breadcrumbs-nav').innerHTML = resp.data.html;
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            window.isXHRloading = false;
        });
    }

    loadCategory(category_id, clean_search = null, update_data = null){
        let object = this;
        if(clean_search != null && clean_search){
            document.getElementById("search").value = '';
            object.search = '';
            window.helper.insertParamUrl('search', '');
        }

        window.isXHRloading = true;
        window.helper.insertParamUrl('category_id', category_id);

        object.category_id = category_id;

        let data = {};
        data.category_id = category_id;
        data.search = object.search;
        window.axios({
            method: 'post',
            url: '/category/loadview',
            data: data
        }).then(function (resp) {
            document.getElementById('category-nav').innerHTML = resp.data.html;
            object.loadBreadcrumbs(category_id, object.root_category);
            if(update_data != null && update_data){
                object.table.setData('/' + object.active_tab + '/tabledata', object.prepareDataForTable());
            }
            object.initCategoryContextual();
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            window.isXHRloading = false;
        });
    }

    initCategoryContextual(){
        let object = this;
        let elems = document.getElementById('category-block').querySelectorAll('.category-item');
        [].forEach.call(elems, function(elem){
            let items = [
                new ContextualItem({label:'Редактировать', onClick: () => {openDialog('categoryDialog', '&category_id=' + elem.dataset.id)}, shortcut:'Что то' }),
                new ContextualItem({type:'seperator'}),
                new ContextualItem({label:'Удалить', onClick: () => {window.entity.remove('category', elem.dataset.id, null)}, shortcut:'Ctrl+A' }),
            ];
            elem.addEventListener('contextmenu',function(e){
                e.preventDefault();
                new Contextual({
                    isSticky: false,
                    items:items,
                });
            });
        });

    }
    getCurrentActiveTab(){
        var active_tab = window.helper.findGetParameter('active_tab');

        if(active_tab == null || active_tab == 'null'){
            active_tab = 'store';
        }
        return active_tab;
    }

    generateColumns(){
        let object = this;
        let columns = [];

        if(object.active_tab === 'store') {
            columns = [
                {formatter:"rowSelection", width:34, titleFormatter:"rowSelection", align:"center", headerSort:false, cellClick:function(e, cell){
                        cell.getRow().toggleSelect();
                    }},
                {title:"ID", field:"id", width:80},
                {title:"Модель", field:"name"},
                {title:"Артикул", field:"article", width:150, align:"left"},
                {title:"Бренд", field:"supplier", width:150, align:"left"},
                {title:"Наличие", field:"isset", width:130, align:"left"},
                {title:"Цена (Ррозница)", field:"price", width:160, align:"left"},
            ];
        } else if(object.active_tab === 'provider_orders'){
            columns = [
                {formatter:"rowSelection", width:34, titleFormatter:"rowSelection", align:"center", headerSort:false, cellClick:function(e, cell){
                        cell.getRow().toggleSelect();
                    }},
                {title:"№", field:"id", width:80},
                {title:"Дата", field:"created_at"},
                {title:"Поставщик", field:"partner", width:150, align:"left"},
                {title:"Сумма", field:"price", width:150, align:"left"},
                {title:"Скидка", field:"discount", width:130, align:"left"},
                {title:"Итого", field:"total", width:160, align:"left"},
            ];
        } else if(object.active_tab === 'entrance'){
            columns = [
                {formatter:"rowSelection", width:34, titleFormatter:"rowSelection", align:"center", headerSort:false, cellClick:function(e, cell){
                        cell.getRow().toggleSelect();
                    }},
                {title:"№", field:"id", width:80},
                {title:"Заявка", field:"order_id"},
                {title:"Дата", field:"created_at"},
                {title:"Поставщик", field:"partner", width:150, align:"left"},
                {title:"Принимающий", field:"partner_id", width:150, align:"left"},
                {title:"Комментарий", field:"comment", width:150, align:"left"},
            ];
        } else if(object.active_tab === 'shipments'){
            columns = [
                {formatter:"rowSelection", width:34, titleFormatter:"rowSelection", align:"center", headerSort:false, cellClick:function(e, cell){
                        cell.getRow().toggleSelect();
                    }},
                {title:"№", field:"id", width:80},
                {title:"Дата", field:"created_at"},
                {title:"Покупатель", field:"partner", width:150, align:"left"},
                {title:"Сумма", field:"price", width:150, align:"left"},
                {title:"Скидка", field:"discount", width:130, align:"left"},
                {title:"Итого", field:"total", width:160, align:"left"},
            ];
        } else if(object.active_tab === 'client_orders'){
            columns = [
                {formatter:"rowSelection", width:34, titleFormatter:"rowSelection", align:"center", headerSort:false, cellClick:function(e, cell){
                        cell.getRow().toggleSelect();
                    }},
                {title:"№", field:"id", width:80},
                {title:"Дата", field:"created_at"},
                {title:"Покупатель", field:"partner", width:150, align:"left"},
                {title:"Сумма", field:"price", width:150, align:"left"},
                {title:"Скидка", field:"discount", width:130, align:"left"},
                {title:"Итого", field:"total", width:160, align:"left"},
            ];
        } else if(object.active_tab === 'adjustment'){
            columns = [
                {formatter:"rowSelection", width:34, titleFormatter:"rowSelection", align:"center", headerSort:false, cellClick:function(e, cell){
                        cell.getRow().toggleSelect();
                    }},
                {title:"№", field:"id", width:80},
                {title:"Дата", field:"created_at"},
                {title:"Ответственный", field:"partner", width:150},
                {title:"Магазин ", field:"store", width:150, align:"left"},
                {title:"Комментарий", field:"comment", width:130, align:"left"},
            ];
        }
        return columns;
    }
    generateContexes(){

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
        object.table = new Tabulator("#" + this.getCurrentActiveTab() + "-table", {
            locale:true,
            langs:{
                "ru":{
                    "ajax":{
                        "loading":"Загрузка", //ajax loader text
                        "error":"Ошибка", //ajax error text
                    },
                    "pagination":{
                        "page_size":"Кол-во элементов", //label for the page size select element
                        "first":"Первая", //text for the first page button
                        "first_title":"Первая страница", //tooltip text for the first page button
                        "last":"Последняя",
                        "last_title":"Последняя страница",
                        "prev":"Предыдущая",
                        "prev_title":"Предыдущая страница",
                        "next":"Следующая",
                        "next_title":"Следующая страница",
                        "show_page":"След.",
                    },
                    "headerFilters":{
                        "default":"filter column...", //default header filter placeholder text
                        "columns":{
                            "name":"filter name...", //replace default header filter text for column name
                        }
                    }
                }
            },
            //resizableRows:false,
            resizableColumns:false,
            height:height-15,
            //maxHeight:'100%',
            pagination:"remote",
            layout:"fitColumns",
            ajaxSorting:true,
            ajaxURL:'/' + object.active_tab + '/tabledata',
            ajaxRequesting:function(url, params){
                window.isXHRloading = true;
                document.body.classList.add('loading');
            },
            ajaxResponse:function(url, params, response){
                window.isXHRloading = false;
                document.body.classList.remove('loading');
                return response;
            },
            ajaxParams:object.prepareDataForTable(),//object.prepareUrlForTable(), //ajax parameters
            // ajaxProgressiveLoad:"scroll",
            paginationSize:Math.floor(elements),
            placeholder:"По данным критериям ничего нет",
            columns: object.generateColumns(),
            rowContext:function(e, row){
                e.preventDefault();
                object.selectedData = object.table.getSelectedData();
                let items = [
                    new ContextualItem({label:'Редактировать', onClick: () => {openDialog('productDialog', '&product_id=' + row.getData().id)}, shortcut:'Что то' }),
                    new ContextualItem({type:'seperator'}),
                    new ContextualItem({label:'Удалить', onClick: () => {window.entity.remove('product', row.getData().id, object)}, shortcut:'Ctrl+A' }),
                ];
                if(object.selectedData.length > 0){
                    items.push(new ContextualItem({label:'Удалить выделенные', onClick: () => {window.entity.remove('product', window.helper.pluck(object.selectedData, 'id'), object)}, shortcut:'Ctrl+A' }));
                }
                object.tableContextual = null;
                object.tableContextual = new Contextual({
                    isSticky: false,
                    items:items,
                });
            },

            tableBuilt:function(){
                console.log('Таблица готова');
                // let table_holder = document.getElementsByClassName('tabulator-table');
                // table_holder[0].addEventListener('contextmenu', event => {
                //     event.preventDefault();
                //     //Add contextual menu here
                //     object.tableContextual = new Contextual({
                //         isSticky: false,
                //         items:[
                //             new ContextualItem({label:'Редактировать', onClick: () => {
                //                 openDialog('productDialog', '&product_id=30136')
                //                 }, shortcut:'Что то' }),
                //             new ContextualItem({label:'Еще что то', shortcut:'Ctrl+B' }),
                //             new ContextualItem({label:'Еще что то', shortcut:'Ctrl+B' }),
                //             new ContextualItem({label:'Еще что то', shortcut:'Ctrl+B' }),
                //             new ContextualItem({type:'seperator'}),
                //             new ContextualItem({label:'Удалить', shortcut:'Ctrl+A' }),
                //         ]
                //     });
                // });
            },
            //
            // ajaxResponse:function(url, params, response){
            //     let rows = object.table.getRows();
            //     console.log(rows);
            //     [].forEach.call(rows, function(elem){
            //         console.log(elem.getElement());
            //         elem.getElement().addEventListener('contextmenu', event => {
            //             event.preventDefault();
            //             //Add contextual menu here
            //             new Contextual({
            //                 isSticky: false,
            //                 items:[
            //                     new ContextualItem({label:'Item 1', onClick: () => {console.log('Item 1 clicked')}, shortcut:'Ctrl+A' }),
            //                     new ContextualItem({label:'Item 2', shortcut:'Ctrl+B' }),
            //                     new ContextualItem({type:'seperator'}),
            //                     new ContextualItem({label:'Item 3', shortcut:'Ctrl+A' }),
            //                 ]
            //             });
            //         });
            //     });
            //
            //     return response; //return the response data to tabulator
            // },
            rowClick:function(e, row){ //trigger an alert message when the row is clicked
                row.toggleSelect();
            },
        });
    }

    prepareDataForTable(){
        let object = this;
        let data = {};
        data.view_as = "json";
        data.target = "ajax-table-store";

        if(object.category_id !== null){
            data.category_id = object.category_id.toString();
        }
        if(object.search && object.search !== 'null' || object.search !== null){
            data.search = object.search.toString();
        }
        return data;
    }

    init(){
        let object = this;
        object.linked();

        if(object.active_tab == 'store'){
            object.loadCategory(this.root_category, true, true);
        }

        //object.contextListItems();
        // document.addEventListener('ajaxLoaded', function(e){
        //     object.checkActive();
        //     object.linked();
        //     object.load();
        // });
        //object.checkActive();
        //object.load();
        document.addEventListener('ProductStored', function(e){
            object.prepareParams();
            object.reload();
        });
        document.addEventListener('clientOrderStored', function(e){
            if(object.active){
                object.prepareParams();
                object.reload();
            }
        });
        document.addEventListener('providerOrderStored', function(e){
            object.prepareParams();
            object.reload();
        });
        document.addEventListener('EntranceStored', function(e){
            object.prepareParams();
            object.reload();
        });
        document.addEventListener('AdjustmentStored', function(e){
            object.prepareParams();
            object.reload();
        });
        document.addEventListener('ShipmentStored', function(e){
            object.prepareParams();
            object.reload();
        });
        document.addEventListener('CategoryStored', function(e){
            object.loadCategory(object.category_id);
            // object.prepareParams();
            // object.reload();
        });
        object.initDatesFilter();
    }

    load(){

        //this.initTableData();

        this.active_tab = this.getCurrentActiveTab();

        if(window.helper.findGetParameter('page') !== null){
            this.page = window.helper.findGetParameter('page');
        } else { this.page = 1}
        if(window.helper.findGetParameter('search') !== null){
            this.search = window.helper.findGetParameter('search');
        } else { this.search = ''}

        let date_start = window.helper.findGetParameter('date_start');
        let date_end = window.helper.findGetParameter('date_end');
        if(date_start !== null && date_end !== null){
            this.date_start = date_start;
            this.date_end = date_end;
            this.dates_range = [this.date_start, this.date_end];
        }
        this.searchInit();
        this.initShipmentDates();
    }

    linked(){ //Состояние Linked - когда экземпляр класса уже был загружен, и находится в памяти. (Возвращение на страницу)
        this.contextListItems();
        this.active_tab = this.getCurrentActiveTab();
        this.category_id = window.helper.findGetParameter('category_id');
        this.page = window.helper.findGetParameter('page');
        this.search = window.helper.findGetParameter('search');
        this.dates_range = ['null', 'null'];
        this.date_start = 'null';
        this.date_end = 'null';
        window.helper.debugBar(this);

        console.warn(this.active_tab);
        this.initTableData();
        this.searchInit();
    }

    contextListItems(){
        let list_elems = document.getElementsByClassName('product_list_context');
        [].forEach.call(list_elems, function(elem){
            elem.addEventListener('contextmenu', event => {
                event.preventDefault();
                //Add contextual menu here
                new Contextual({
                    isSticky: false,
                    items:[
                        new ContextualItem({label:'Item 1', onClick: () => {console.log('Item 1 clicked')}, shortcut:'Ctrl+A' }),
                        new ContextualItem({label:'Item 2', shortcut:'Ctrl+B' }),
                        new ContextualItem({type:'seperator'}),
                        new ContextualItem({label:'Item 3', shortcut:'Ctrl+A' }),
                    ]
                });
            });
        });
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
        if(this.date_start === null || this.date_start === 'null'){
            this.date_start = '';
        }
        if(this.date_end === null || this.date_end === 'null'){
            this.date_end = '';
        }
    }

    checkActive(){
        let className = window.location.pathname.substring(1);
        let link = document.getElementById('store_link');
        if(className === 'store'){
            link.classList.add('active');
            this.active = true;
        } else {
            link.classList.remove('active');
            this.active = false;
        }
    }

    searchInit(){
        var object = this;
        var search;
        var searchFn;
        if(document.getElementById("search")){
            search = document.getElementById("search");
            searchFn = window.helper.debounce(function(e) {
                object.search = search.value;
                window.helper.insertParamUrl('search', search.value);
                object.category_id = null;
                if(object.search == ''){
                    object.category_id = object.root_category;
                }
                window.helper.insertParamUrl('category_id', 'null');
                object.table.setData('/' + object.active_tab + '/tabledata', object.prepareDataForTable());
                object.loadCategory(object.category_id);

                //object.page = 1;
                //object.reload(e);
            }, 400);
            search.addEventListener("keydown", searchFn);
            search.addEventListener("paste", searchFn);
            search.addEventListener("delete", searchFn);
        }
        // else
        // if(document.getElementById("search_partner")){
        //     search = document.getElementById("search_partner");
        //     searchFn = window.helper.debounce(function(e) {
        //         object.search = search.value;
        //         object.reload(e);
        //     }, 400);
        //     search.addEventListener("keydown", searchFn);
        //     search.addEventListener("paste", searchFn);
        //     search.addEventListener("delete", searchFn);
        // }
    }

    resetDate(){
        if(this.dates !== null){
            this.dates.clear();
        }
        this.dates_range = ['null', 'null'];
        this.date_start = 'null';
        this.date_end = 'null';
        this.page = 1;
        this.reload();
    }

    resetSearch(){
        document.getElementById('search').value = '';
        this.search = '';
        this.page = 1;
        this.reload();
    }

    checkTrinity(search_str){
        window.isXHRloading = true;

        let data = {};
        data.search = search_str;
        window.axios({
            method: 'post',
            url: '/providers/trinity/search_brands',
            data: data
        }).then(function (resp) {
            var badge = '<b class="badge badge-sm badge-pill warn">' + resp.data.brands.count + '</b>';
            let providertab = document.querySelector('#provider-tab .nav-badge');
            if(providertab){
                providertab.innerHTML = badge;
            }
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    }

    getUrlString(type = null){


        let url = '?view_as=json';

        url += '&target=ajax-table-' + this.active_tab;

        if(type != null){
            url += '&type=' + type;
        }
        if(this.category_id !== null){
            url += '&category_id=';
            url += this.category_id;
        }
        if(this.search && this.search !== 'null' || this.search !== null){
            url += '&search=';
            url += this.search;
        }
        if(this.active_tab !== null || this.active_tab !== 'null'){
            url += '&active_tab=';
            url += this.active_tab;
        }
        if(this.page !== null || this.page !== 'null'){
            url += '&page=';
            url += this.page;
        }
        if(this.date_start !== null || this.date_start !== 'null' || this.date_start !== ''){
            url += '&date_start=';
            url += this.date_start;
        }
        if(this.date_end !== null || this.date_end !== 'null' || this.date_end !== ''){
            url += '&date_end=';
            url += this.date_end;
        }

        return url;
    }

    initDatesFilter(){
        let object = this;
        let startDateArray = [];

        if(object.dates_range[0] !== 'null' && object.dates_range[1] !== 'null'){
            startDateArray = object.dates_range;
        }
        this.dates = window.flatpickr(".date_filter", {
            mode: "range",
            defaultDate: startDateArray,
            dateFormat: "d.m.Y",
            onClose: function(selectedDates, dateStr, instance) {
                object.dates_range = selectedDates;
                object.page = 1;
                if(selectedDates.length > 1){
                    object.date_start = window.flatpickr.formatDate(selectedDates[0], "d.m.Y");
                    object.date_end = window.flatpickr.formatDate(selectedDates[1], "d.m.Y");
                } else {
                    object.date_start = 'null';
                    object.date_end = 'null';
                }
                object.table.setData('/' + object.active_tab + '/tabledata', object.prepareDataForTable());
            }
        });
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
            window.helper.insertParamUrl('active_tab', object.active_tab);
            window.helper.insertParamUrl('date_start', object.date_start);
            window.helper.insertParamUrl('date_end', object.date_end);
            window.helper.insertParamUrl('page', object.page);
            window.rebuildLinks();
            object.load();
            // if(object.search && object.search !== 'null') {
            //     window.helper.insertParamUrl('search', object.search);
            // }
            // window.helper.insertParamUrl('category_id', object.category_id);
            // window.helper.insertParamUrl('active_tab', object.active_tab);
            // window.helper.insertParamUrl('page', object.page);


            window.rebuildLinks();
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    }

}
export default storePage;
