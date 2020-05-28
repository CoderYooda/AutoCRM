import {Contextual, ContextualItem} from "../Contentual";

class cashPage{

    constructor(){
        console.log('страница денег инициализировано');
        this.active = true;
        this.active_tab = window.helper.findGetParameter('active_tab');
        this.root_id = 'cash_index_page';
        this.page = 1;
        this.search = 'null';
        this.dates_range = null;
        this.date_start = 'null';
        this.date_end = 'null';
        this.isIncoming = 'null';
        this.dates = null;
        this.partner = [];
        this.any = [];
        this.chartCircle = null;
        this.init(); // Первый запуск
    }

    linked(){ //Состояние Linked - когда экземпляр класса уже был загружен, и находится в памяти. (Возвращение на страницу)
        this.active_tab = window.helper.findGetParameter('active_tab');
        this.initTableData();
        this.initDatesFilter();
        this.checkActive();
    }

    removePartner(id, type){
        let object = this;
        object[type].remove(id);
        document.getElementById(type + '_' + id).remove();
        object.table.setData('/' + object.active_tab + '/tabledata', object.prepareDataForTable());
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
                let stack = document.getElementById(target + '_stack');
                var node = helper.createElementFromHTML('' +
                    '<div id="' + target + '_' + resp.data.id + '" class="' + target + '_selected filter_element" >' +
                    '<span>' + resp.data.name + '</span>' +
                    '<button type="button" onclick="window.cash.removePartner(' + resp.data.id + ', \'' + target + '\')" class="right-remove"><i class="fa fa-remove"></i></button>' +
                    '</div>' +
                    '');
                stack.appendChild(node);
                //object.reload();
                object.table.setData('/' + object.active_tab + '/tabledata', object.prepareDataForTable());
                window.notification.notify( 'success', 'Контакт выбран');
            }
            //document.dispatchEvent(new Event('PartnerSelected', {bubbles: true}));
            //console.log("Событие PartnerSelected вызвано");
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            window.isXHRloading = false;
        });
    };

    init(){
        let object = this;
        object.linked();

        object.initSearch();
        // document.addEventListener('ajaxLoaded', function(e){
        //     object.checkActive();
        //     //object.chartInit();
        //     object.load();
        // });

        //object.searchInit();
        //object.initDates();

        document.addEventListener('WarrantStored', function(e){
            object.prepareParams();
            object.reload();
        });

        document.addEventListener('MoneymoveStored', function(e){
            object.prepareParams();
            object.reload();
        });
    }

    clearList(type, container){
        this[type] = [];
        document.getElementById(container).innerHTML = '';
        this.table.setData('/' + this.active_tab + '/tabledata', this.prepareDataForTable());
        window.notification.notify( 'success', 'Поле очищено');
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

    resetDate(){
        this.dates_range = null;
        this.page = 1;
        this.table.setData('/' + this.active_tab + '/tabledata', this.prepareDataForTable());
        this.dates.clear();
        window.notification.notify( 'success', 'Дата очищена');
    }

    generateColumns(){
        let object = this;
        let columns = [];

        if(object.active_tab === 'warrant') {
            object.contextDop = 'warrant';
            object.parametr = 'warrant';
            var priceFormatter = function(cell, formatterParams, onRendered){
                onRendered(function(){
                    var formatter = new Intl.NumberFormat('ru-RU', {
                        style: 'currency',
                        currency: 'RUB',
                    });
                    cell.getElement().innerHTML = '<span class="table_input" id="price_'+ cell.getData().id +'" >'+ formatter.format(cell.getValue()) +'</span>';
                });
            };
            columns = [
                {formatter:"rowSelection", width:34, titleFormatter:"rowSelection", align:"center", headerSort:false, cellClick:function(e, cell){
                        cell.getRow().toggleSelect();
                    }},
                {title:"ID", field:"id", width:80},
                {title:"Дата", field:"date", width:150},
                {title:"Тип", field:"type", minWidth:150, align:"left"},
                {title:"Контакт", field:"partner", minWidth:150, align:"left"},
                {title:"Статья", field:"dds", width:130, align:"left"},
                {title:"Касса", field:"cashbox", width:130, align:"left"},
                {title:"Сумма", field:"summ", width:130, align:"left", formatter:priceFormatter},
            ];
        } else if(object.active_tab === 'cashmove'){
            object.contextDop = 'moneymove';
            object.parametr = 'moneymove';
            var iconFormatter = function(cell, formatterParams, onRendered){
                onRendered(function(){
                    cell.getElement().innerHTML = '<div class="ic-' + cell.getValue() + '"><div>';
                });
            };
            var priceFormatter = function(cell, formatterParams, onRendered){
                onRendered(function(){
                    var formatter = new Intl.NumberFormat('ru-RU', {
                        style: 'currency',
                        currency: 'RUB',
                    });
                    cell.getElement().innerHTML = '<span class="table_input" id="price_'+ cell.getData().id +'" >'+ formatter.format(cell.getValue()) +'</span>';
                });
            };
            columns = [
                {formatter:"rowSelection", width:34, titleFormatter:"rowSelection", align:"center", headerSort:false, cellClick:function(e, cell){
                        cell.getRow().toggleSelect();
                    }},
                {title:"№", field:"id", width:50},
                {title:"Дата", field:"date", width:150},
                {title:"Откуда", field:"cin", width:160, align:"left"},
                {title:"Куда", field:"cout", width:160, align:"left"},
                {title:"Ответственный", field:"manager", align:"left"},
                {title:"Комментарий", field:"comment", width:150, align:"left"},
                {title:"Сумма", field:"summ", width:130, align:"left", formatter:priceFormatter},
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
            ajaxResponse:function(url, params, response){
                window.isXHRloading = false;
                document.body.classList.remove('loading');
                return response;
            },
            ajaxParams:object.prepareDataForTable(),//object.prepareUrlForTable(), //ajax parametersвфеу
            paginationSize:Math.floor(elements),
            placeholder:"По данным критериям ничего нет",
            columns: object.generateColumns(),
            rowDblClick:function(e, row){
                openDialog(object.contextDop + 'Dialog', '&' + object.parametr + '_id=' + row.getData().id)
            },
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
                // console.log('Таблица готова');
            },
            rowClick:function(e, row){
                let addsCard = document.getElementById('adds-card');
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
                        if(addsCard){
                            addsCard.classList.remove('hide');
                        }
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

    openSelectPartnerModal(target){
        let cat_id = 3;
        if(target === 'provider'){
            cat_id = 6;
        }else if(target === 'partner'){
            cat_id = 5;
        }else if(target === 'client'){
            cat_id = 7;
        } else {
            cat_id = 3;
        }

        window.openDialog('selectPartner', '&refer=' + 'cash&category_id=' + cat_id + '&target=' + target);
    }

    prepareDataForTable(){
        let object = this;
        let data = {};
        data.view_as = "json";
        data.target = "ajax-table-warrant";
        data.page = 1;

        if(object.partner !== []){data.partner = object.partner;}
        if(object.any !== []){data.any = object.any;}
        if(object.dates_range !== null){data.dates_range = object.dates_range;}


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
        object.table.setData('/' + object.active_tab + '/tabledata', object.prepareDataForTable());
    }
}
export default cashPage;
