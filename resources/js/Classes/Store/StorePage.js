import { Contextual , ContextualItem } from "../Contentual";

class storePage{

    constructor(){
        console.log('страница склада инициализировано');
        this.active = true;
        this.active_tab = window.helper.findGetParameter('active_tab');
        this.category_id = 2;
        this.page = 1;
        this.search = 'null';

        this.root_category = 2;
        this.dates_range = ['null', 'null'];
        this.date_start = 'null';
        this.date_end = 'null';

        this.table = null;

        this.init();
        this.linked();


    }

    initTableData(){
        let object = this;
        console.log(object.prepareUrlForTable());
        object.table = new Tabulator("#example-table", {
            height:'100%',
            //maxHeight:'100%',
            pagination:"remote",
            layout:"fitColumns",
            ajaxSorting:true,
            ajaxURL:'/tableproductdata',
            ajaxParams:object.prepareUrlForTable(),//object.prepareUrlForTable(), //ajax parameters
            // ajaxProgressiveLoad:"scroll",
            paginationSize:20,
            placeholder:"По данным критериям ничего нет",
            columns:[ //Define Table Columns
                {formatter:"rowSelection", width:40, titleFormatter:"rowSelection", align:"center", headerSort:false, cellClick:function(e, cell){
                        cell.getRow().toggleSelect();
                    }},
                {title:"ID", field:"id", width:80},
                {title:"Модель", field:"name", width:250},
                {title:"Артикул", field:"article", align:"left"},
                {title:"Производитель", field:"supplier"},
                {title:"Наличие", field:"isset", align:"center"},
                {title:"Цена (Ррозница)", field:"price", align:"center"},
            ],
            tableBuilt:function(){
                let table_holder = document.getElementsByClassName('tabulator-table');
                table_holder[0].addEventListener('contextmenu', event => {
                    event.preventDefault();
                    //Add contextual menu here
                    new Contextual({
                        isSticky: false,
                        items:[
                            new ContextualItem({label:'Редактировать', onClick: () => {console.log('Item 1 clicked')}, shortcut:'Что то' }),
                            new ContextualItem({label:'Еще что то', shortcut:'Ctrl+B' }),
                            new ContextualItem({label:'Еще что то', shortcut:'Ctrl+B' }),
                            new ContextualItem({label:'Еще что то', shortcut:'Ctrl+B' }),
                            new ContextualItem({type:'seperator'}),
                            new ContextualItem({label:'Удалить', shortcut:'Ctrl+A' }),
                        ]
                    });
                });
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

    prepareUrlForTable(){
        let object = this;
        // let url = '/tableproductdata?viewas=json';
        //
        // if(object.category_id !== null){
        //     url += '&category_id=';
        //     url += object.category_id;
        // }
        // if(object.search && object.search !== 'null' || object.search !== null){
        //     url += '&search=';
        //     url += object.search;
        // }
        // return url;

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
        object.contextListItems();
        document.addEventListener('ajaxLoaded', function(e){
            object.checkActive();
            object.linked();
            object.load();
        });
        object.checkActive();
        object.load();
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
            object.prepareParams();
            object.reload();
        });
        object.initShipmentDates();
    }

    load(){

        //this.initTableData();

        this.active_tab = window.helper.findGetParameter('active_tab');

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
        this.active_tab = window.helper.findGetParameter('active_tab');
        this.category_id = window.helper.findGetParameter('category_id');
        this.page = window.helper.findGetParameter('page');
        this.search = window.helper.findGetParameter('search');
        this.dates_range = ['null', 'null'];
        this.date_start = 'null';
        this.date_end = 'null';
        window.helper.debugBar(this);
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
                object.table.setData('/tableproductdata', object.prepareUrlForTable());
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

    initShipmentDates(){
        let object = this;
        let startDateArray = [];

        if(object.dates_range[0] !== 'null' && object.dates_range[1] !== 'null'){
            startDateArray = object.dates_range;
        }
        this.dates = window.flatpickr(".shipment_date_start", {
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
                object.reload();
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
