class schedulePage{

    constructor(){
        console.log('страница Планировщика инициализировано');
        this.active = true;
        this.root_id = 'calendar_index_page';
        this.save_butt = document.querySelector('#save_but');
        this.search = null;
        this.calendar = null;
        this.lastView = null;
        this.sources = [];
        this.action = "edit"; // [ edit , template]
        this.template = [{
            partner_id: null,
            dayType: "work",
            dayTypeId: 1,
            dayTypeText: "Больничный",
            date: null,
            start: "08:00",
            end: "17:00"
        }];
        this.templateText = 'Шаблон не выбран';
        this.cells_pressed = false;
        this.resource_data_temp = [];
        this.resource_data = [];
        this.loadSchedules();
        this.init();
        this.initRangeSelector();
        this.generateTemplateText();

        this.incomingWarrantSource = {
            url: '/employee/schedule',
            method: 'get',
            failure: this.sourceAddFailure(),
            textColor: 'white'
        };
        this.initScheduler();
    }

    loadSchedules(){
        let object = this;
        window.axios({
            method: 'get',
            url: '/schedules/get',
        }).then(function (resp) {
            object.resource_data = resp.data.schedules_date;
            object.resource_data_temp = JSON.parse(JSON.stringify(object.resource_data));
            for (var date in object.resource_data) {
                for (var resource_id in object.resource_data[date]) {
                    let schedules = object.resource_data[date][resource_id];
                    schedules.forEach(function(schedule, i, arr) {
                        object.addSchedule(schedule);
                    });
                }
            }
            object.canSave();
        });
    }

    insertDay(elem)
    {
        let object = this;
        elem.innerHTML = '';
        let id = elem.closest('td').id;
        let date = id.split('_')[1];
        let partner_id = id.split('_')[2];
        for (var period in object.template) {
            object.template[period].date = date;
            object.template[period].partner_id = parseInt(partner_id);
        }
        this.resource_data_temp[date][partner_id] = object.template;
        object.template.forEach(function(schedule) {
            let node = window.helper.createElementFromHTML('<span class="perod_date">' + schedule.start + ' - ' + schedule.end + '</span>');
            elem.appendChild(node);
        });
        object.canSave();

        // for (var schedule_index in object.template) {
        //     console.log(schedule_index);
        //     let schedule = object.template[schedule_index];
        //     var node = window.helper.createElementFromHTML('<span class="perod_date">' + schedule.start + ' - ' + schedule.end + '</span>');
        //     elem.appendChild(node);
        // }


        // if(object.template.dayType === 'work'){
        //     object.template.periods.forEach(function(period, i, arr) {
        //         var node = window.helper.createElementFromHTML('<span class="perod_date">' + period.start + ' - ' + period.end + '</span>');
        //         elem.appendChild(node);
        //     });
        //
        // }

    }

    initScheduler(){
        let table_height = document.querySelector('.sc').clientHeight;
        let dates_list_height = 28;
        let resources = null;
        let dates = [];
        let resources_count = 0;
        let days = 66;
        let dates_html = '';
        let m = 10;
        let d = new Date(2020, m, 1);

        const monthNames = ["янв", "фев", "март", "апр", "май", "июн",
            "июл", "авг", "сен", "окт", "ноя", "дек"
        ];

        const weekNames = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

        for (let i = 0; i < days; i++) {

            let day = new Date(2020, m, (d.getDate() + i));

            let month = null;
            let date = null;

            if(day.getDate().toString().length === 1){
                date = '0' + (day.getDate());
            } else {
                date = day.getDate();
            }
            if(day.getMonth().toString().length === 1){
                month = '0' + (day.getMonth() + 1)
            } else {
                month = day.getMonth() + 1
            }
            dates.push(day.getFullYear() + '-' + month + '-' + date);

            dates_html += '<th class="date_num header_item cell-width">' + weekNames[day.getDay()] + ", " + date + "." + month + '</th>';
        }
        dates_html += '<th class="date_num header_item cell-width"></th>';
        document.querySelector('#dates_list').style.height = dates_list_height + 'px';
        document.querySelector('#cell_grid').style.height = (table_height - dates_list_height) + 'px';
        document.querySelector('#resources_list').style.height = (table_height - dates_list_height) + 'px';
        document.querySelector('#entry_dates').querySelector('tbody').innerHTML = dates_html;
        document.querySelector('#cell_grid').onscroll = function() {
            document.querySelector('#dates_list_scroller').scrollLeft = this.scrollLeft;
            document.querySelector('#resources_list').scrollTop = this.scrollTop;
        };

        window.axios({
            method: 'get',
            url: '/employee/resources',
        }).then(function (resp) {
            resources = resp.data;
            resources_count = resources.length;
            let resources_html = '<tbody>';
            resources.forEach(function(item, i, arr) {
                resources_html += '<tr><td><div data-resource_id="' + item.id + '" class="cell-height">' + item.title + '</div></td></tr>';
            });
            resources_html += '</tbody>';
            document.querySelector('#resources_grid').innerHTML = resources_html;
            let cell_grid_html = '<table><tbody>';
            for (let i = 0; i < resources_count; i++) {
                cell_grid_html += '<tr data-resource-id="' + resources[i].id + '">';
                    for (let d = 0; d < days; d++) {
                        cell_grid_html += '<td id="cell_' +  dates[d] + '_' + resources[i].id + '" data-date="' + dates[d] + '" class="cell-width">' +
                            '<div onmouseenter="window.schedule.cellMouseEnter(this)" onmouseleave="window.schedule.cellMouseEnter(this)" class="cell-height cell">' +
                            '<div class="cell_buttons_container"><button>1</button></div>' +
                            '<div class="schedules" onclick="window.schedule.insertDay(this)">' +
                            '</div>' +
                            '</div></td>';
                    }
                cell_grid_html += '</tr>';
            }
            cell_grid_html += '</tbody></table>';
            document.querySelector('#cell_grid').innerHTML = cell_grid_html;
            window.isXHRloading = false;
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    }

    addSchedule(data){
        let cell = document.querySelector('#cell_' + data.date + '_' + data.partner_id);
        if(cell){
            //console.log(cell);
            var node = window.helper.createElementFromHTML('<span class="perod_date">' + data.start + ' - ' + data.end + '</span>');
            cell.querySelector('.schedules').appendChild(node);
        }
        // let date_new = {
        //     dayType: this.template.type,
        //     periods: this.template.periods
        // };
        // if(this.resource_data_temp[resourceId] == null){
        //     this.resource_data_temp[resourceId] = {}
        //     if(this.resource_data_temp[resourceId].dates == null){
        //         this.resource_data_temp[resourceId].dates = {}
        //     }
        // }
        // this.resource_data_temp[resourceId].resourceId = resourceId;
        // this.resource_data_temp[resourceId].dates[date.split('-').join("")].push(date_new);
    }

    mouseDown(){
        this.cells_pressed = true;
    }
    mouseUp(){
        this.cells_pressed = false;
        let object = this;
        var selected_cells = document.querySelectorAll('.cell.selected');
        [].forEach.call(selected_cells, function(elem){
            object.insertDay(elem.querySelector('.schedules'));
            elem.classList.remove('selected');
        });
    }

    canSave(){
        // if(this.resource_data_temp !== this.resource_data){
        //     this.save_butt.classList.remove('hide');
        //     return true;
        // } else {
        //     this.save_butt.classList.add('hide');
        //     return false;
        // }
    }

    cellMouseEnter(elem){
        if(this.cells_pressed){
            elem.classList.add('selected');
        }
    }
    generateTemplateText(){
        let object = this;
        if(this.template.type === 'work'){
            this.templateText = 'Рабочий день ';
            this.template.periods.forEach(function(item, i, arr) {
                object.templateText += 'c ';
                object.templateText += item.start + ' до ' + item.end;
            });

        } else {
            this.templateText = 'Не рабочий день ';
            this.templateText += '(' + this.template.freeDayTypeText + ')';
        }
        let template_text = document.querySelector('#template_text');
        template_text.innerText = this.templateText;
    }

    initRangeSelector(){
        var start_date = document.querySelector('.date_picker_start');
        var end_date = document.querySelector('.date_picker_end');

        window.flatpickr(".date_picker_start", {
            allowInput: true,
            dateFormat: "d.m.Y",
        });
        window.flatpickr(".date_picker_end", {
            allowInput: true,
            dateFormat: "d.m.Y",
        });
        window.IMask(start_date, {
                mask: Date,
                min: new Date(1990, 0, 1),
                max: new Date(2030, 0, 1),
                lazy: false
            }
        );
        window.IMask(end_date, {
                mask: Date,
                min: new Date(1990, 0, 1),
                max: new Date(2030, 0, 1),
                lazy: false
            }
        )
    }

    sourceAddFailure(){
        //console.log('there was an error while fetching events!');
    }

    init(){
        let object = this;
        //object.initCalendar();
        object.setAction(object.action);
        // this.calendar.addResource({
        //     id: '6',
        //     title: 'Room E'
        // });
    }

    setAction(type){
        this.action = type;
        let button = document.getElementById('action_'+type);
        var buttons = document.getElementsByClassName('action_button');
        [].forEach.call(buttons, function(elem){
            elem.classList.remove('active');
        });
        button.classList.add('active');
    }

    linked(){
        this.sources = [];
        //this.initCalendar();
        this.setAction(this.action);
        this.initRangeSelector();
        this.generateTemplateText();
        this.initScheduler();
    }

    toggleSource(elem){

        let object = this;
        if(!elem.checked){
            let eventSources = object.calendar.getEventSources();
            [].forEach.call(eventSources, function(source){
                if(source.internalEventSource.sourceId == object.sources[elem.dataset.source]){
                    source.remove();
                    object.sources[elem.dataset.source] = null;
                }
            });
        } else {
            if(object.sources[elem.dataset.source] != null){
                notification.notify( 'error', 'Схема уже была добавлена');
            } else {
                object.sources[elem.dataset.source] = object.calendar.addEventSource(object[elem.dataset.source]).internalEventSource.sourceId;
            }
        }
    }
}
export default schedulePage;
