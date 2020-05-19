class statisticPage {

    constructor() {
        console.log('страница статистики инициализировано');

        this.chart = null;

        this.init();
    }

    init() {
        this.linked();

        let ctx = document.getElementById('statistic-chart').getContext('2d');

        this.chart = new chartjs(ctx, {
            // The type of chart we want to create
            type: 'bar',


            // The data for our dataset
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'My First dataset',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [0, 10, 5, 2, 20, 30, 45]
                }]
            },

            options: {
                maintainAspectRatio: false,
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                responsive: true,
                scales: {
                    xAxes: [{
                        stacked: true,
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        });
    }

    linked() {
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
                        datasets[entity].push(entities[entity]);
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
}

export default statisticPage;
