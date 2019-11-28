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
        console.log('linked');
    }

    init(){
        let object = this;
        object.initSearch();
        document.addEventListener('ajaxLoaded', function(e){
            //object.checkActive();
            //object.chartInit();
            //object.load();
        });
        object.checkActive();
        object.load();
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
