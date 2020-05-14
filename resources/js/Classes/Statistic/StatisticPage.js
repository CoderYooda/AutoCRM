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

            options: {}
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

            //Удаляем даты
            this.chart.data.labels.length = 0;

            //Обновляем даты на графике
            let data = response.data.entities;

            let desc = response.data.desc;

            let desc_element = document.getElementById('desc');

            desc_element.innerText = desc;

            let ul = document.getElementById('statistic-list');

            ul.innerHTML = '';

            Object.keys(data).map((key) => {
                let value = data[key];

                this.chart.data.labels.push(key);

                let li = document.createElement('li');
                ul.appendChild(li);
                li.innerHTML = key + ': ' + value;
            });

            //Вставляем новые данные
            this.chart.data.datasets.push({
                label: 'Общая сумма',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: Object.values(data)
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
}

export default statisticPage;
