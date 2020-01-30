import {Contextual, ContextualItem} from "../Contentual";

class cashPage{

    constructor(){
        console.log('страница денег инициализировано');
        this.active = true;
        this.active_tab = window.helper.findGetParameter('active_tab');
        this.root_id = 'cash_index_page';
        this.page = 1;
        this.search = 'null';
        this.dates_range = ['null', 'null'];
        this.date_start = 'null';
        this.date_end = 'null';
        this.isIncoming = 'null';
        this.dates = null;
        this.chartCircle = null;
        this.init(); // Первый запуск
    }

    linked(){ //Состояние Linked - когда экземпляр класса уже был загружен, и находится в памяти. (Возвращение на страницу)
        //this.chartCircle.update();
        this.active_tab = window.helper.findGetParameter('active_tab');
        window.helper.debugBar(this);
        this.initTableData();
        console.log('linked');
    }

    init(){
        let object = this;
        object.linked();

        object.initSearch();
        document.addEventListener('ajaxLoaded', function(e){
            object.checkActive();
            //object.chartInit();
            object.load();
        });
        object.checkActive();
        // object.load();
        object.searchInit();
        object.initDates();



        document.addEventListener('WarrantStored', function(e){
            object.reload();
        });

        document.addEventListener('MoneymoveStored', function(e){
            object.reload();
        });

        window.helper.debugBar(object);
    }

    generateColumns(){
        let object = this;
        let columns = [];

        if(object.active_tab === 'warrant') {
            object.contextDop = 'warrant';
            object.parametr = 'warrant';
            columns = [
                {formatter:"rowSelection", width:34, titleFormatter:"rowSelection", align:"center", headerSort:false, cellClick:function(e, cell){
                        cell.getRow().toggleSelect();
                    }},
                {title:"ID", field:"id", width:80},
                {title:"Дата", field:"date"},
                {title:"Тип", field:"type", width:150, align:"left"},
                {title:"Контрагент", field:"partner", width:150, align:"left"},
                {title:"Статья", field:"dds", width:130, align:"left"},
                {title:"Касса", field:"cashbox", width:160, align:"left"},
                {title:"Сумма", field:"summ", width:160, align:"left"},
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
        }
        return columns;
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
            // ajaxResponse:function(url, params, response){
            //     window.isXHRloading = false;
            //     document.body.classList.remove('loading');
            //     return response;
            // },
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
            // tableBuilt:function(){
            //     console.log('Таблица готова');
            // },
            //
            // rowClick:function(e, row){
            //     if(object.active_tab != 'store'){
            //         console.log('Загружаем инфо');
            //         let data = {};
            //         data.id = row.getData().id;
            //         window.axios({
            //             method: 'post',
            //             url: '/' + object.active_tab + '/side_info',
            //             data: data
            //         }).then(function (resp) {
            //             document.getElementById('contact_block').innerHTML = resp.data.info;
            //             document.getElementById('comment_block').innerHTML = resp.data.comment;
            //             //console.log(resp);
            //         }).catch(function (error) {
            //             console.log(error);
            //         }).finally(function () {
            //             window.isXHRloading = false;
            //         });
            //     }
            // },
        });
    }

    prepareDataForTable(){
        let object = this;
        let data = {};
        data.view_as = "json";
        data.target = "ajax-table-warrant";
        data.page = 1;
        if(object.search && object.search !== 'null' || object.search !== null){data.search = object.search.toString();}
        return data;
    }

    getCurrentActiveTab(){
        var active_tab = window.helper.findGetParameter('active_tab');

        if(active_tab == null || active_tab == 'null'){
            active_tab = 'warrant';
        }
        return active_tab;
    }

    chartInit(){ //Радиальная диаграмма
        let object = this;
        let cont = document.getElementById(object.root_id);
        if(cont){
            let doughnut = cont.querySelector('#chart-doughnut');
            let options = {
                type: 'pie',
                data: {labels: ['Расход', 'Доход'],
                    datasets: [{
                        data: [
                            doughnut.dataset.outcome,
                            doughnut.dataset.income,
                        ],
                        borderColor: 'transparent',
                        backgroundColor: [
                            "#53a6fa",
                            "#22b66e",
                        ],
                        label: 'Trafic'
                    }]
                },
                options: {
                    legend: {position: 'center', labels:{boxWidth: 12}},
                    animation:{duration: 0},
                    cutoutPercentage: 75
                }
            };
            object.chartCircle = new chartjs(doughnut, options);
        }
    }

    initSearch(){
        if(window.helper.findGetParameter('search') !== null){
            this.search = window.helper.findGetParameter('search');
        }
        console.log('initSearch');
    }

    initDates(){
        let object = this;
        let startDateArray = [];

        if(object.dates_range[0] !== 'null' && object.dates_range[1] !== 'null'){
            startDateArray = object.dates_range;
        }
        this.dates = window.flatpickr(".warrant_date_start", {
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

    load(){
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
        this.initDates();
        console.log('load');
    }

    checkActive(){
        let className = window.location.pathname.substring(1);
        let link = document.getElementById('cash_link');
        if(className === 'cash'){
            link.classList.add('active');
            this.active = true;
        } else {
            link.classList.remove('active');
            this.active = false;
        }
    }

    searchInit(){

        let object = this;
        let cont = document.getElementById(object.root_id);
        if(cont){
            let search = cont.querySelector("input[name=search]");
            if(search){
                let searchFn = window.helper.debounce(function(e) {
                    object.search = search.value;
                    object.page = 1;
                    object.reload();
                }, 400);
                search.addEventListener("keydown", searchFn);
                search.addEventListener("paste", searchFn);
                search.addEventListener("delete", searchFn);
                search.addEventListener("select", searchFn);
            }
            let isIncoming = cont.querySelector("select[name=warrant_isIncoming]");
            if(isIncoming){
                let searchFn = window.helper.debounce(function(e) {
                    object.isIncoming = isIncoming.value;
                    object.page = 1;
                    object.reload();
                }, 0);
                isIncoming.addEventListener("change", searchFn);
            }
        }
    }

    prepareParams(){
        if(this.category_id === null){
            this.category_id = '';
        }
        if(!this.search || this.search === 'null' || this.search === null){
            this.search = '';
        }
        if(this.page === null || this.page === 'null'){
            this.page = 1;
        }
        if(this.isIncoming === null || this.isIncoming === 'null'){
            this.isIncoming = '';
        }
        if(this.date_start === null || this.date_start === 'null'){
            this.date_start = '';
        }
        if(this.date_end === null || this.date_end === 'null'){
            this.date_end = '';
        }
    }

    getUrlString(){
        let url = '?view_as=json';
        url += '&target=ajax-table-' + this.active_tab;
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
        if(this.isIncoming !== null || this.isIncoming !== 'null'){
            url += '&isIncoming=';
            url += this.isIncoming;
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
            window.helper.insertParamUrl('isIncoming', object.isIncoming);
            window.rebuildLinks();
            object.load();
            // object.chartCircle.options.animation.duration = 1000;
            // object.chartCircle.data.datasets[0].data[1] = resp.data.income;
            // object.chartCircle.data.datasets[0].data[0] = resp.data.outcome;
            // object.chartCircle.update();
            // object.chartCircle.options.animation.duration = 0;
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
        console.log('reload');
    }
}
export default cashPage;
