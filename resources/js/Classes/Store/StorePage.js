import { Contextual , ContextualItem } from "../Contentual";

class storePage{

    constructor(){
        console.log('страница склада инициализировано');
        this.init();

    }

    baseParams(){
        this.active = true;
        this.active_tab = this.getCurrentActiveTab();
        this.category_id = window.helper.findGetParameter('category_id');
        this.page = 1;
        this.search = 'null';
        this.tableContextual = null;
        this.selectedData = null;
        this.root_category = 2;
        this.categoryContextual = null;
        this.table = null;
        this.dates = null;
        //filter parametrs
        this.pay_status = null;
        this.entrance_status = null;
        this.clientorder_status = null;
        this.provider = [];
        this.accountable = [];
        this.dates_range = null;
        //Context
        this.tabledata = {};
        this.contextDop = null;
        this.parametr = null;
    }

    openSelectPartnerModal(target){
        window.openDialog('selectPartner', '&refer=' + 'store&target=' + target);
    }

    setField(option, value = null, text, elem = null){
        let object = this;
        object[option] = value;
        document.getElementById(option).value = text;
        if(elem !== null){
            elem.closest('.dropdown').classList.remove('show');
        }

        if(value == null){
            window.notification.notify( 'success', 'Поле очищено');
        }

        object.table.setData('/' + object.active_tab + '/tabledata', object.prepareDataForTable());
    }

    clearList(type, container){
        this[type] = [];
        document.getElementById(container).innerHTML = '';
        this.table.setData('/' + this.active_tab + '/tabledata', this.prepareDataForTable());
        window.notification.notify( 'success', 'Поле очищено');
    }

    selectPartner(id, target){
        let object = this;
        window.axios({
            method: 'post',
            url: 'partner/'+ id +'/select',
            data: {refer:null}
        }).then(function (resp) {

            if(object[target].includes(resp.data.id)){
                window.notification.notify( 'error', 'Уже имеется в списке');
            } else {
                object[target].push(resp.data.id);
                //let input = document.getElementById(target);
                //input.value = resp.data.name;
                let stack = document.getElementById(target + '_stack');
                var node = helper.createElementFromHTML('' +
                    '<div id="' + target + '_' + resp.data.id + '" class="' + target + '_selected filter_element" >' +
                    '<span>' + resp.data.name + '</span>' +
                    '<button type="button" onclick="store.removePartner(' + resp.data.id + ', \'' + target + '\')" class="right-remove"><i class="fa fa-remove"></i></button>' +
                    '</div>' +
                    '');
                stack.appendChild(node);
                //object.reload();
                object.table.setData('/' + object.active_tab + '/tabledata', object.prepareDataForTable());
                window.notification.notify( 'success', 'Контрагент выбран');
            }
            //document.dispatchEvent(new Event('PartnerSelected', {bubbles: true}));
            //console.log("Событие PartnerSelected вызвано");
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            window.isXHRloading = false;
        });
    };

    removePartner(id, type){
        let object = this;
        object[type].remove(id);
        document.getElementById(type + '_' + id).remove();
        object.table.setData('/' + object.active_tab + '/tabledata', object.prepareDataForTable());
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
        data.class = 'store';
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
            object.contextDop = 'product';
            object.parametr = 'product';
            var priceFormatter = function(cell, formatterParams, onRendered){
                onRendered(function(){
                    //console.log(cell.getValue());
                    cell.getElement().innerHTML = '<input disabled class="table_input" id="price_'+ cell.getData().id +'" type="text" value="'+ cell.getValue() +'"/>';
                    window.IMask(document.getElementById('price_' + cell.getData().id),   {
                            mask: 'N 2',
                            blocks: {
                                N: {
                                    mask: Number,
                                    signed: true,
                                    thousandsSeparator: ' '
                                }
                            }
                        }
                    );
                });
            };
            columns = [
                {formatter:"rowSelection", width:34, titleFormatter:"rowSelection", align:"center", headerSort:false, cellClick:function(e, cell){
                        cell.getRow().toggleSelect();
                    }},
                {title:"ID", field:"id", width:80},
                {title:"Модель", field:"name"},
                {title:"Артикул", field:"article", width:150, align:"left"},
                {title:"Бренд", field:"supplier", width:150, align:"left"},
                {title:"Наличие", field:"isset", width:130, align:"left"},
                {title:"Цена (Ррозница)", field:"price", width:160, align:"left", formatter:priceFormatter},
            ];
        } else if(object.active_tab === 'provider_orders'){
            object.contextDop = 'providerorder';
            object.parametr = 'provider_order';
            var iconFormatter = function(cell, formatterParams, onRendered){
                onRendered(function(){
                    cell.getElement().innerHTML = '<div class="ic-' + cell.getValue() + '"><div>';
                });
            };

            columns = [
                {formatter:"rowSelection", width:34, titleFormatter:"rowSelection", align:"center", headerSort:false, cellClick:function(e, cell){
                        cell.getRow().toggleSelect();
                    }},
                {title:"№", field:"id", width:50},
                {title:"Оплата", field:"pays", width:80, formatter:iconFormatter},
                {title:"Поступление", field:"incomes",align:"left", width:130, formatter:iconFormatter},
                {title:"Дата", field:"date", width:150},
                {title:"Поставщик", field:"name", align:"left"},
                {title:"Ответственный", field:"manager", align:"left"},
                {title:"Сумма", field:"itogo", width:90, align:"left"},
            ];
        } else if(object.active_tab === 'entrance'){
            object.contextDop = 'entrance';
            object.parametr = 'entrance';
            columns = [
                {formatter:"rowSelection", width:34, titleFormatter:"rowSelection", align:"center", headerSort:false, cellClick:function(e, cell){
                        cell.getRow().toggleSelect();
                    }},
                {title:"№", field:"id", width:80},
                {title:"Заявка", field:"ordid", width:100},
                {title:"Дата", field:"date", width:150},
                {title:"Поставщик", field:"partner", align:"left"},
                {title:"Принимающий", field:"manager", align:"left"},
                {title:"Комментарий", field:"comment", width:150, align:"left"},
            ];
        } else if(object.active_tab === 'shipments'){
            object.contextDop = 'shipment';
            object.parametr = 'shipment';
            columns = [
                {formatter:"rowSelection", width:34, titleFormatter:"rowSelection", align:"center", headerSort:false, cellClick:function(e, cell){
                        cell.getRow().toggleSelect();
                    }},
                {title:"№", field:"id", width:80},
                {title:"Дата", field:"date", width:150},
                {title:"Покупатель", field:"partner", align:"left"},
                {title:"Сумма", field:"price", width:90, align:"left"},
                {title:"Скидка", field:"discount", width:90, align:"left"},
                {title:"Итого", field:"total", width:90, align:"left"},
            ];
        } else if(object.active_tab === 'client_orders'){
            object.contextDop = 'clientorder';
            object.parametr = 'client_order';
            columns = [
                {formatter:"rowSelection", width:34, titleFormatter:"rowSelection", align:"center", headerSort:false, cellClick:function(e, cell){
                        cell.getRow().toggleSelect();
                    }},
                {title:"№", field:"coid", width:80},
                {title:"Статус", field:"status_formatted", width:150},
                {title:"Дата", field:"date", width:150},
                {title:"Покупатель", field:"partner", align:"left"},
                {title:"Сумма", field:"summ", width:90, align:"left"},
                {title:"Скидка", field:"discount_formatted", width:90, align:"left"},
                {title:"Итого", field:"itogo", width:90, align:"left"},
            ];
        } else if(object.active_tab === 'adjustment'){
            object.contextDop = 'adjustment';
            object.parametr = 'adjustment';
            columns = [
                {formatter:"rowSelection", width:34, titleFormatter:"rowSelection", align:"center", headerSort:false, cellClick:function(e, cell){
                        cell.getRow().toggleSelect();
                    }},
                {title:"№", field:"id", width:80},
                {title:"Дата", field:"date", width:150},
                {title:"Ответственный", field:"partner"},
                {title:"Магазин ", field:"store", align:"left"},
                {title:"Комментарий", field:"comment", width:150, align:"left"},
            ];
        }
        return columns;
    }

    cleanSearch(){
        this.search = null;
        document.getElementById("search").value = null;
        this.table.setData('/' + this.active_tab + '/tabledata', this.prepareDataForTable());
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
            ajaxParams:object.prepareDataForTable(),//object.prepareUrlForTable(), //ajax parametersвфеу
            paginationSize:Math.floor(elements),
            placeholder:"По данным критериям ничего нет",
            columns: object.generateColumns(),
            rowContext:function(e, row){
                e.preventDefault();
                object.selectedData = object.table.getSelectedData();
                let items = [];
                // if(object.contextDop == 'providerorder'){
                //     items.push(new ContextualItem({label:'Оплатить', onClick: () => {window.providerorderDialog8.getPayment()} }));
                // }

                items.push(new ContextualItem({label:'Редактировать', onClick: () => {openDialog(object.contextDop + 'Dialog', '&' + object.parametr + '_id=' + row.getData().id)}, shortcut:'Что то' }));
                items.push(new ContextualItem({type:'seperator'}));
                items.push(new ContextualItem({label:'Удалить', onClick: () => {window.entity.remove(object.contextDop, row.getData().id, object)}, shortcut:'Ctrl+A' }));

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

    prepareDataForTable(){
        let object = this;
        let data = {};
        data.view_as = "json";
        data.target = "ajax-table-store";
        data.page = 1;

        if(object.category_id !== null){data.category_id = object.category_id.toString();}

        if(object.accountable !== null){data.accountable = object.accountable;}
        if(object.pay_status !== null){data.pay_status = object.pay_status;}
        if(object.entrance_status !== null){data.entrance_status = object.entrance_status;}
        if(object.clientorder_status !== null){data.clientorder_status = object.clientorder_status;}
        if(object.provider !== []){data.provider = object.provider;}
        if(object.dates_range !== null){data.dates_range = object.dates_range;}

        if(object.search && object.search !== 'null' || object.search !== null){data.search = object.search.toString();}
        return data;
    }

    init(){
        let object = this;
        object.linked();

        if(object.active_tab == 'store'){
            object.loadCategory(this.root_category, true, true);
        }

        document.addEventListener('ProductStored', function(e){
            object.prepareParams();
            object.reload();
        });
        document.addEventListener('ClientOrderStored', function(e){
            if(object.active){
                object.prepareParams();
                object.reload();
            }
        });
        document.addEventListener('ProviderOrderStored', function(e){
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
        document.addEventListener('WarratnStored', function(e){
            object.prepareParams();
            object.reload();
        });
        document.addEventListener('CategoryStored', function(e){
            object.loadCategory(object.category_id);
            // object.prepareParams();
            // object.reload();
        });
    }

    load(){

        this.active_tab = this.getCurrentActiveTab();

        if(window.helper.findGetParameter('page') !== null){
            this.page = window.helper.findGetParameter('page');
        } else { this.page = 1}
        if(window.helper.findGetParameter('search') !== null){
            this.search = window.helper.findGetParameter('search');
        } else { this.search = ''}

        this.searchInit();
    }

    linked(){
        this.baseParams();
        this.contextListItems();
        this.active_tab = this.getCurrentActiveTab();
        this.category_id = window.helper.findGetParameter('category_id');
        this.page = window.helper.findGetParameter('page');
        this.search = window.helper.findGetParameter('search');
        this.date_start = 'null';
        this.date_end = 'null';
        window.helper.debugBar(this);

        //console.warn(this.active_tab);
        this.initTableData();
        this.searchInit();
        this.initDatesFilter();
        this.checkActive();
    }

    contextListItems(){
        let list_elems = document.getElementsByClassName('product_list_context');
        [].forEach.call(list_elems, function(elem){
            elem.addEventListener('contextmenu', event => {
                event.preventDefault();
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
    }

    resetDate(){
        this.dates_range = null;
        this.page = 1;
        this.table.setData('/' + this.active_tab + '/tabledata', this.prepareDataForTable());
        this.dates.clear();
        window.notification.notify( 'success', 'Дата очищена');
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
        this.dates = window.flatpickr(".date_filter", {
            mode: "range",
            defaultDate: startDateArray,
            dateFormat: "d.m.Y",
            onClose: function(selectedDates, dateStr, instance) {
                object.page = 1;
                if(selectedDates.length > 1){
                    object.dates_range = window.flatpickr.formatDate(selectedDates[0], "d.m.Y") + '|' + window.flatpickr.formatDate(selectedDates[1], "d.m.Y").toString();
                } else {
                    object.dates_range = null;
                }
                //object.reload();
                object.table.setData('/' + object.active_tab + '/tabledata', object.prepareDataForTable());
            }
        });
    }

    reload(){
        let object = this;
        object.table.setData('/' + object.active_tab + '/tabledata', object.prepareDataForTable());
    }

}
export default storePage;
