class statisticshowPage {

    constructor() {
        console.log('страница демонстрации статистики инициализировано');

        this.chart = null;

        this.graph_data = null;

        this.entity_names = [
            'Заявки поставщикам',
            'Поступления',
            'Возвраты',
            'Продажи',
            'Заказы клиентов',
            'Приходные ордера',
            'Расходные ордера',
            'Перемещения'
        ];

        this.init();
    }

    linked() {
        this.sections = [];

        this.init();
    }

    init() {
        //Chart.js

        this.checkActive();

        this.initChart();

        //Chart result

        this.showResults();
    }

    initChart() {
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
                    intersect: false,
                    // Disable the on-canvas tooltip
                    enabled: false,

                    custom: function(tooltipModel) {
                        // Tooltip Element
                        var tooltipEl = document.getElementById('chartjs-tooltip');

                        // Create element on first render
                        if (!tooltipEl) {
                            tooltipEl = document.createElement('div');
                            tooltipEl.id = 'chartjs-tooltip';
                            tooltipEl.innerHTML = '<table></table>';
                            document.body.appendChild(tooltipEl);
                        }

                        // Hide if no tooltip
                        if (tooltipModel.opacity === 0) {
                            tooltipEl.style.opacity = 0;
                            return;
                        }

                        // Set caret Position
                        tooltipEl.classList.remove('above', 'below', 'no-transform');
                        if (tooltipModel.yAlign) {
                            tooltipEl.classList.add(tooltipModel.yAlign);
                        } else {
                            tooltipEl.classList.add('no-transform');
                        }

                        function getBody(bodyItem) {
                            return bodyItem.lines;
                        }

                        // Set Text
                        if (tooltipModel.body) {
                            var titleLines = tooltipModel.title || [];
                            var bodyLines = tooltipModel.body.map(getBody);

                            var innerHtml = '<thead>';

                            titleLines.forEach(function(title) {
                                innerHtml += '<tr><th>' + title + '</th></tr>';
                            });
                            innerHtml += '</thead><tbody>';

                            bodyLines.forEach(function(body, i) {


                                let number = new Intl.NumberFormat().format(parseInt(body[0].match(/\d+/)[0])) + ' ₽';
                                let text = body[0].replace(/[0-9]/g, '');

                                var colors = tooltipModel.labelColors[i];
                                var style = 'background:' + colors.backgroundColor;
                                style += '; border-color:' + colors.borderColor;
                                style += '; border-width: 2px';
                                var span = '<span style="' + style + '"></span>';

                                innerHtml += '<tr><td>' + span + text + number + '</td></tr>';
                            });
                            innerHtml += '</tbody>';

                            var tableRoot = tooltipEl.querySelector('table');
                            tableRoot.innerHTML = innerHtml;
                        }

                        // `this` will be the overall tooltip
                        var position = this._chart.canvas.getBoundingClientRect();

                        // Display, position, and set styles for font
                        tooltipEl.style.opacity = 1;
                        tooltipEl.style.background = 'rgba(45, 118, 168, 0.69)';
                        tooltipEl.style.borderRadius = '3px';
                        tooltipEl.style.border = '1px solid #2d76a8';
                        tooltipEl.style.color = '#fff';
                        tooltipEl.style.position = 'absolute';
                        tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                        tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                        tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
                        tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
                        tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
                        tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
                        tooltipEl.style.pointerEvents = 'none';
                    }
                },
                responsive: true,
                scales: {
                    xAxes: [{
                        stacked: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Дата'
                        },
                    }],
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            beginAtZero:false
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Сумма в рублях'
                        },
                        // afterTickToLabelConversion : function(q){
                        //     for(var tick in q.ticks){
                        //         q.ticks[tick] = new Intl.NumberFormat().format(q.ticks[tick]) + ' ₽';
                        //     }
                        // }
                    }]
                }
            }
        });
    }

    showResults() {

        window.axios({
            method: 'post',
            url: '/statistic',
            data: {
                refer: 'statistic',
                manager_id: Number(document.querySelector("input[name=manager_id]").value),
                partner_id: Number(document.querySelector("input[name=partner_id]").value),
                dds_id: Number(document.querySelector("input[name=dds_id]").value),
                begin_date: document.querySelector("input[name=begin_date]").value,
                final_date: document.querySelector("input[name=final_date]").value,
                entities: this.sections,
            }
        })
        .then(response => {

            console.log(response);

            //Удаляем данные с графика
            this.chart.data.datasets.length = 0;
            this.chart.data.labels.length = 0;

            let dates = response.data.dates;
            let list = response.data.list;

            let list_element = document.getElementById('statistic-list');
            list_element.innerHTML = list;

            this.graph_data = response.data.entities;

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
                'rgb(137, 186, 22)',

                'rgb(137, 186, 22)',
                'rgb(137, 186, 22)',
                'rgb(137, 186, 22)',
                'rgb(137, 186, 22)',
                'rgb(137, 186, 22)',
                'rgb(137, 186, 22)',
                'rgb(137, 186, 22)',
                'rgb(137, 186, 22)',
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
                        day_amount += Number(ids[id].amount);
                    });

                    datasets[entity].push(day_amount);
                });
            });

            //Выводим информацию
            Object.keys(datasets).map((name, index) => {

                let color_index = this.entity_names.indexOf(name);

                if(this.sections.indexOf(name) !== -1) {
                    this.chart.data.datasets.push({
                        label: name,
                        backgroundColor: colors[color_index === -1 ? 0 : color_index],
                        borderColor: 'rgb(0,0,0)',
                        data: datasets[name]
                    });
                }
            });

            this.chart.update();
        })
        .catch(response => {
            console.log(response);
        });
    }

    checkActive(){
        let className = window.location.pathname.substring(1);
        let link = document.getElementById('statistic_link');
        if(className === 'statistic'){
            link.classList.add('active');
            this.active = true;
        } else {
            link.classList.remove('active');
            this.active = false;
        }
    }

    print(){

        let element = document.getElementById('statistic-chart');

        this.graph_data.image = element.toDataURL('image/png');

        window.helper.printDocument('statistic-result', null, JSON.stringify(this.graph_data));
    }
}

export default statisticshowPage;
