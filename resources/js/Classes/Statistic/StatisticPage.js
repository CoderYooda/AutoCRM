class statisticPage {

    constructor() {
        console.log('страница статистики инициализировано');

        this.chart = null;

        this.start_date = new Date();
        this.start_date.setDate(this.start_date.getDate() - 30); // На 30 дней назад

        this.end_date = new Date();

        this.init();
    }

    linked() {
        this.init();
    }

    init() {

        let ctx = document.getElementById('statistic-chart').getContext('2d');

        this.chart = new chartjs(ctx, {
            type: 'bar',

            data: {
                labels: [],
                datasets: []
            },

            options: {
                maintainAspectRatio: false,
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                responsive: true,
                scales: {
                    xAxes: [{ stacked: true }],
                    yAxes: [{ stacked: true }]
                }
            }
        });

        this.initRangeSelector();

        this.showResults();
    }

    showResults() {

        window.axios({
            method: 'post',
            url: '/statistic',
            data: {
                refer: 'statistic',
                manager_id: Number(document.querySelector("input[name=manager_id]").value),
                partner_id: Number(document.querySelector("input[name=partner_id]").value),
                begin_date: document.querySelector("input[name=begin_date]").value,
                final_date: document.querySelector("input[name=final_date]").value,
                entity: this.getSelectValues(document.getElementById("entity"))
            }
        })
        .then(response => {

            //Удаляем данные с графика
            this.chart.data.datasets.length = 0;

            let dates = response.data.dates;
            let desc = response.data.desc;
            let list = response.data.list;

            let desc_element = document.getElementById('desc');
            desc_element.innerHTML = desc;

            let list_element = document.getElementById('statistic-list');
            list_element.innerHTML = list;

            //Обновляем даты
            this.chart.data.labels = Object.keys(dates);

            let datasets = {};

            let colors = [
                'rgb(0, 167, 142)',
                'rgb(44, 159, 69)',
                'rgb(255, 79, 129)',
                'rgb(251, 176, 52)',
                'rgb(184, 69, 146)',
                'rgb(1, 205, 116)',
                'rgb(234, 128, 237)',
                'rgb(137, 186, 22)'
            ];

            //Получаем названия сущностей
            let first_entities = Object.values(dates)[0];

            Object.keys(first_entities).map(entity => {
                datasets[entity] = [];
            });

            //Формируем порядковый массив для сущностей
            Object.keys(dates).map(date => {
                let entities = dates[date];

                Object.keys(entities).map(entity => {
                    let ids = entities[entity];

                    let day_amount = 0;

                    Object.keys(ids).map(id => {
                        day_amount += ids[id].amount;
                    });

                    datasets[entity].push(day_amount);
                });
            });

            //Выводим информацию
            Object.keys(datasets).map((name, index) => {

                this.chart.data.datasets.push({
                    label: name,
                    backgroundColor: colors[index],
                    borderColor: 'rgb(0,0,0)',
                    data: datasets[name]
                });
            });

            this.chart.update();
        })
        .catch(response => {
            console.log(response);
        });
    }

    openSelectManagerModal() {
        window.openDialog('selectPartner', '&refer=statistic&category_id=5&target=manager');
    }

    openSelectPartnerModal() {
        window.openDialog('selectPartner', '&refer=statistic&category_id=7&target=partner');
    }

    selectPartner(id, type) {

        window.axios({
            method: 'post',
            url: 'partner/' + id + '/select',
            data: {refer: 'statistic'}
        }).then((resp) => {
            document.querySelector('input[name=' + type + '_id]').value = resp.data.id;
            document.getElementById(type + '_name').innerHTML = resp.data.name;

            window.notification.notify('success', 'Контакт выбран');
            document.dispatchEvent(new Event('PartnerSelected', {bubbles: true}));

        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    }

    initRangeSelector(){
        let object = this;
        let start_date = document.querySelector('input[name=begin_date]');
        let end_date = document.querySelector('input[name=final_date]');
        start_date.value = this.start_date.getDate() + '.' + (this.start_date.getMonth() + 1) + '.' + this.start_date.getFullYear();
        end_date.value = this.end_date.getDate() + '.' + ( this.end_date.getMonth() + 1 ) + '.' + this.end_date.getFullYear();

        object.start_date_flatpkr = window.flatpickr("input[name=begin_date]", {
            allowInput: true,
            dateFormat: "d.m.Y",
        });
        object.end_date_flatpkr = window.flatpickr("input[name=final_date]", {
            allowInput: true,
            dateFormat: "d.m.Y",
        });

        object.start_date_mask = window.IMask(start_date, {
                mask: Date,
                min: new Date(1990, 0, 1),
                max: new Date(2030, 0, 1),
                lazy: false
            }
        );
        object.end_date_mask = window.IMask(end_date, {
                mask: Date,
                min: new Date(1990, 0, 1),
                max: new Date(2030, 0, 1),
                lazy: false
            }
        )
    }

    getSelectValues(select) {
        var result = [];
        var options = select && select.options;
        var opt;

        for (var i=0, iLen=options.length; i<iLen; i++) {
            opt = options[i];

            if (opt.selected) {
                result.push(opt.value || opt.text);
            }
        }
        return result;
    }
    
    printStatistic(){
        window.helper.printDocument('statistic-result', null, {
            st:{
                options: 'awdawd'
            }
        });
    }
}

export default statisticPage;
