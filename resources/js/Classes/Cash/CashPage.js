import {Contextual, ContextualItem} from "../Contentual";
import {Table, TableItem} from "../BBTable";
import Page from "../Page/Page";

class cashPage extends Page{

    constructor(){
        super();
        console.log('страница денег инициализировано');
        this.active = true;
        this.active_tab = window.helper.findGetParameter('active_tab');
        this.root_id = 'cash_index_page';
        this.page = 1;
        this.search = 'null';
        this.dates_range = null;
        this.date_start = 'null';
        this.date_end = 'null';
        this.isIncoming = null;
        this.dates = null;
        this.partner = [];
        this.any = [];
        this.chartCircle = null;
        this.init(); // Первый запуск
    }

    linked(){ //Состояние Linked - когда экземпляр класса уже был загружен, и находится в памяти. (Возвращение на страницу)
        this.active_tab = window.helper.findGetParameter('active_tab');
        //this.initTableData();
        this.initDatesFilter();
        this.checkActive();

        let container = 'ajax-table-' + this.active_tab;





        this.readData(container);
        this.table = new Table({
            container: this.active_tab,
            data: this.data,
            url: '/' + this.active_tab + '/tabledata',
            start_sort: 'DESC'
        });

        let header, context_menu, dbl_click, slug;

        if(this.active_tab === 'cashmove'){
            header = [
                {min_with: 90, width: 90, name: 'ID',table_name: 'id'},
                {min_with: 100, width: 150, name: 'Дата', table_name: 'date'},
                {min_with: 150, width: 'auto', name: 'Откуда', table_name: 'cin'},
                {min_with: 150, width: 'auto', name: 'Куда', table_name: 'cout'},
                {min_with: 150, width: 'auto', name: 'Ответственный', table_name: 'manager'},
                {min_with: 100, width: 200, name: 'Комментарий', table_name: 'comment'},
                {min_with: 100, width: 200, name: 'Сумма', table_name: 'summ'},
            ];
            context_menu = [
                {name:'Редактировать', action: function(data){openDialog('moneymoveDialog', '&moneymove_id=' + data.contexted.id)}},
                {name:'Открыть', action: function(data){openDialog('moneymoveDialog', '&moneymove_id=' + data.contexted.id)}},
                // {name:'Удалить', action: function(data){dd(data);}},
                // {name:'Удалить выделенные', action: function(data){dd(data);}, only_group:true},
            ];
            dbl_click = function(id){openDialog('moneymoveDialog', '&moneymove_id=' + id)};
            slug = 'cashmove';
        } else if(this.active_tab === 'salarypayments'){
            header = [
                {min_with: 100, width: 100, name: 'ID',table_name: 'id'},
                {min_with: 100, width: 'auto', name: 'Сотрудник', table_name: 'name'},
                {min_with: 100, width: 200, name: 'Начисление', table_name: 'summ'},
                {min_with: 100, width: 200, name: 'Дата', table_name: 'date'},
                {min_with: 100, width: 200, name: 'Комментарий', table_name: 'comment'},
            ];
            context_menu = [
                // {name:'Открыть', action: function(data){dd(data);}},
                // {name:'Открыть', action: function(data){dd(data);}},
                // {name:'Удалить', action: function(data){dd(data);}},
                // {name:'Удалить выделенные', action: function(data){dd(data);}, only_group:true},
            ];
            dbl_click = function(id){};
            slug = 'salarypayments';
        } else if(this.active_tab === 'warrant'){
            header = [
                {min_with: 100, width: 100, name: 'ID',table_name: 'id'},
                {min_with: 100, width: 200, name: 'Дата', table_name: 'date'},
                {min_with: 100, width: 200, name: 'Тип', table_name: 'type'},
                {min_with: 100, width: 'auto', name: 'Контакт', table_name: 'partner'},
                {min_with: 100, width: 200, name: 'Статья', table_name: 'dds'},
                {min_with: 100, width: 200, name: 'Касса', table_name: 'cashbox'},
                {min_with: 100, width: 200, name: 'Сумма', table_name: 'summ'},
            ];
            context_menu = [
                {name:'Редактировать', action: function(data){openDialog('warrantDialog', '&warrant_id=' + data.contexted.id)}},
                {name:'Открыть', action: function(data){openDialog('warrantDialog', '&warrant_id=' + data.contexted.id)}},
                {name:'Печать', action: function(data){helper.printDocument((data.contexted.type === 'Приходный ордер' ? 'in-warrant' : 'out-warrant'), data.contexted.id)}},
                // {name:'Удалить', action: function(data){dd(data);}},
                // {name:'Удалить выделенные', action: function(data){dd(data);}, only_group:true},
            ];
            dbl_click = function(id){openDialog('warrantDialog', '&warrant_id=' + id)};
            slug = 'warrant';
        }

        this.table.setHeader(header);
        this.table.setContextMenu(context_menu);
        this.table.setBblClick(dbl_click);
        this.table.setSlug(slug);

        this.table.draw(this.active_tab, this.data);
    }

    removePartner(id, type){
        this.table.removeFromRequest(type, id);
        document.getElementById(type + '_' + id).remove();
    }

    selectPartner(id, target){
        window.axios({
            method: 'post',
            url: 'partner/'+ id +'/select',
            data: {refer:null}
        }).then( (resp) => {
            let stored_partners = this.table.getRequest(target);


            if(stored_partners && Array.isArray(stored_partners) && this.table.getRequest(target).includes(resp.data.id)){
                window.notification.notify( 'error', 'Уже имеется в списке');
            } else {
                this.table.setRequest(target, resp.data.id, true, true);
                let stack = document.getElementById(target + '_stack');
                let node = helper.createElementFromHTML('' +
                    '<div id="' + target + '_' + resp.data.id + '" class="' + target + '_selected filter_element" >' +
                    '<span>' + resp.data.name + '</span>' +
                    '<button type="button" onclick="window.cash.removePartner(' + resp.data.id + ', \'' + target + '\')" class="right-remove"><i class="fa fa-remove"></i></button>' +
                    '</div>' +
                    '');
                stack.appendChild(node);
                window.notification.notify( 'success', 'Контакт выбран');
            }
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            window.isXHRloading = false;
        });
    };

    init(){
        this.initSearch();

        document.addEventListener('WarrantStored',(e)=>{
            this.table.freshData();
        });

        document.addEventListener('MoneymoveStored', (e) => {
            this.table.freshData();
        });

        this.linked();
    }

    clearList(type, container){
        this.table.setRequest(type, []);
        document.getElementById(container).innerHTML = '';
        window.notification.notify( 'success', 'Поле очищено');
    }



    /// Фильтр даты
    initDatesFilter(){
        let object = this;
        let startDateArray = [];
        this.dates = window.flatpickr(".date_filter", {
            mode: "range",
            defaultDate: startDateArray,
            dateFormat: "d.m.Y",
            onClose: (selectedDates, dateStr, instance) => {
                this.table.setRequest('page', 1, false);
                if(selectedDates.length > 1){
                    this.table.setRequest('dates_range', window.flatpickr.formatDate(selectedDates[0], "d.m.Y") + '|' + window.flatpickr.formatDate(selectedDates[1], "d.m.Y").toString());
                } else {
                    this.table.setRequest('dates_range', null);
                }
            }
        });
    }

    resetDate(){
        this.dates_range = null;
        this.table.setRequest('page', 1, false);
        this.table.setRequest('dates_range', null);
        this.dates.clear();
        window.notification.notify( 'success', 'Дата очищена');
    }
    ///


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

    setField(option, value = null, text, elem = null){
        this.table.setRequest(option, value, true);
        document.getElementById(option).value = text;
        if(elem !== null){
            elem.closest('.dropdown').classList.remove('show');
        }
        if(value == null){
            window.notification.notify( 'success', 'Поле очищено');
        }
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
        //reload
    }

    // load(){
    //     this.active_tab = window.helper.findGetParameter('active_tab');
    //
    //     if(window.helper.findGetParameter('page') !== null){
    //         this.page = window.helper.findGetParameter('page');
    //     } else { this.page = 1}
    //     if(window.helper.findGetParameter('search') !== null){
    //         this.search = window.helper.findGetParameter('search');
    //     } else { this.search = ''}
    //
    //     let date_start = window.helper.findGetParameter('date_start');
    //     let date_end = window.helper.findGetParameter('date_end');
    //
    //
    //     if(date_start !== null && date_end !== null){
    //         this.date_start = date_start;
    //         this.date_end = date_end;
    //         this.dates_range = [this.date_start, this.date_end];
    //     }
    //     this.searchInit();
    //     this.initDates();
    //     console.log('load');
    // }

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

    // searchInit(){
    //
    //     let object = this;
    //     let cont = document.getElementById(object.root_id);
    //     if(cont){
    //         let search = cont.querySelector("input[name=search]");
    //         if(search){
    //             let searchFn = window.helper.debounce(function(e) {
    //                 object.search = search.value;
    //                 object.page = 1;
    //                 object.reload();
    //             }, 400);
    //             search.addEventListener("keydown", searchFn);
    //             search.addEventListener("paste", searchFn);
    //             search.addEventListener("delete", searchFn);
    //             search.addEventListener("select", searchFn);
    //         }
    //         let isIncoming = cont.querySelector("select[name=warrant_isIncoming]");
    //         if(isIncoming){
    //             let searchFn = window.helper.debounce(function(e) {
    //                 object.isIncoming = isIncoming.value;
    //                 object.page = 1;
    //                 object.reload();
    //             }, 0);
    //             isIncoming.addEventListener("change", searchFn);
    //         }
    //     }
    // }


    getUrlString(){ //Берет параметры из get и пихает в модель
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
        if(this.isIncoming !== null){
            url += '&isIncoming=' + this.isIncoming;
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

}
export default cashPage;
