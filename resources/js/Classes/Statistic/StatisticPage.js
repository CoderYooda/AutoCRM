import Tagify from '@yaireo/tagify'

class statisticPage {

    constructor() {
        console.log('страница статистики инициализировано');

        this.chart = null;

        this.sections = [0, 1, 2, 3, 4, 5, 6, 7];

        this.graph_data = null;

        this.start_date = new Date();
        this.start_date.setDate(this.start_date.getDate() - 30); // На 30 дней назад

        this.end_date = new Date();

        this.tagify = null;

        this.whitelist = ["Заявки поставщикам", "Поступления", "Возвраты", "Продажи", "Заказы клиентов", "Приходные ордера", "Расходные ордера", "Перемещения"];

        this.init();
    }

    linked() {
        this.sections = [];

        this.init();
    }

    init() {
        //Chart.js

        this.checkActive();

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

        //Date selector

        this.initRangeSelector();

        //Chart result

        this.showResults();
    }

    initSections(){

        this.sections = [];

        let entities = ['partnerOrder', 'entrance', 'refund', 'shipment', 'clientOrder', 'inWarrant', 'outWarrant', 'cashMove'];

        entities.forEach((entity, index) => {
            if(document.getElementById(entity).checked){this.sections.push(index)};
        });
    }

    selectDdsarticle(id){
        var object = this;
        window.axios({
            method: 'post',
            url: 'ddsarticle/'+ id +'/select',
            data: {refer: 'statistic'}
        }).then(function (resp) {

            document.querySelector('input[name=dds_id]').value = resp.data.id;
            document.getElementById('dds_name').innerHTML = resp.data.name;

            window.notification.notify( 'success', 'Статья выбрана');
            document.dispatchEvent(new Event('DdsarticleSelected', {bubbles: true}));
            console.log("Событие DdsarticleSelected вызвано");
            //closeDialog(event);

        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    };

    clearDdsarticle() {
        document.querySelector('input[name=dds_id]').value = '';
        document.getElementById('dds_name').innerText = 'Не выбрано';
    }

    showResults() {
        this.initSections();

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

                let entity_index = this.whitelist.indexOf(name);

                if(this.sections.indexOf(entity_index) !== -1) {
                    this.chart.data.datasets.push({
                        label: name,
                        backgroundColor: colors[index],
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

    openSelectManagerModal() {
        window.openDialog('selectPartner', '&refer=statistic&category_id=5&target=manager');
    }

    openSelectPartnerModal() {
        window.openDialog('selectPartner', '&refer=statistic&category_id=7&target=partner');
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

    resetBeginDate() {
        this.start_date = new Date();
        this.start_date.setDate(this.start_date.getDate() - 30); // На 30 дней назад

        let start_date = document.querySelector('input[name=begin_date]');
        start_date.value = this.start_date.getDate().toString().padStart(2, "0") + '.' + (this.start_date.getMonth() + 1).toString().padStart(2, "0") + '.' + this.start_date.getFullYear();
    }

    resetFinalDate() {
        this.end_date = new Date();

        let end_date = document.querySelector('input[name=final_date]');
        end_date.value = this.end_date.getDate().toString().padStart(2, "0") + '.' + ( this.end_date.getMonth() + 1 ).toString().padStart(2, "0") + '.' + this.end_date.getFullYear();
    }

    clearManager() {
        document.querySelector('input[name=manager_id]').value = '';
        document.getElementById('manager_name').innerText = 'Не выбрано';
    }

    clearPartner() {
        document.querySelector('input[name=partner_id]').value = '';
        document.getElementById('partner_name').innerText = 'Не выбрано';
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

    print(){

        let element = document.getElementById('statistic-chart');

        this.graph_data.image = element.toDataURL('image/png');

        window.helper.printDocument('statistic-result', null, JSON.stringify(this.graph_data));
    }
}

export default statisticPage;
