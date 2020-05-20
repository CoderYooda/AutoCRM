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

        let entity_element = document.getElementById("entity");

        window.axios({
            method: 'post',
            url: '/statistic',
            data: {
                refer: 'statistic',
                manager_id: Number(document.querySelector("input[name=manager_id]").value),
                partner_id: Number(document.querySelector("input[name=partner_id]").value),
                begin_date: document.querySelector("input[name=begin_date]").value,
                final_date: document.querySelector("input[name=final_date]").value,
                entity: entity_element.options[entity_element.selectedIndex].value
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

            //Если полная статистика
            if(!Number.isInteger(Object.values(dates)[0])) {

                let datasets = {};

                //Получаем названия сущностей
                let first_entities = Object.values(dates)[0];

                Object.keys(first_entities).map(entity => {
                    datasets[entity] = [];
                });

                //Формируем порядковый массив для сущностей
                Object.keys(dates).map(date => {
                    let entities = dates[date];

                    Object.keys(entities).map(entity => {
                        datasets[entity].push(entities[entity].amount != null ? entities[entity].amount : 0);
                    });
                });

                //Выводим информацию
                Object.keys(datasets).map((name) => {
                    this.chart.data.datasets.push({
                        label: name,
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: datasets[name]
                    });
                });
            }
            //Если по определённой сущности
            else {
                this.chart.data.datasets.push({
                    label: 'Общая сумма',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: Object.values(dates)
                });
            }

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
}

export default statisticPage;
