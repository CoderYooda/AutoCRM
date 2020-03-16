

import Selection from '@simonwep/selection-js';


class schedulePage{

    constructor(){
        console.log('страница Планировщика инициализировано');
        this.active = true;
        this.root_id = 'calendar_index_page';
        this.save_butt = document.getElementById('save_butt');
        this.template_container = document.getElementById('template_container');
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
        this.selection = null;
        this.square_select = document.getElementById('square_select'), this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0;
        this.templateText = 'Шаблон не выбран';
        this.cells_pressed = false;
        this.resource_data_temp = [];
        this.resource_data = [];
        this.loadSchedules();
        this.init();
        this.initRangeSelector();
        this.generateTemplateText();
        this.initScheduler();
    }

    init(){
        let object = this;
        this.selection = Selection.create({
            class: 'selection',
            selectables: ['#scroll_cell_grid .cell'],
            boundaries: ['#scroll_cell_grid'],
            singleClick: false,
            scrollSpeedDivider: 10,
            manualScrollSpeed: 750
        }).on('start', ({inst, selected, oe}) => {
            if (!oe.ctrlKey && !oe.metaKey) {
                for (const el of selected) {
                    el.classList.remove('selected');
                    inst.removeFromSelection(el);
                }
                inst.clearSelection();
            }
        }).on('move', ({changed: {removed, added}}) => {
            for (const el of added) {
                el.classList.add('selected');
            }
            for (const el of removed) {
                el.classList.remove('selected');
            }
        }).on('stop', ({inst}) => {
            inst.keepSelection();
            this.markSelected();
        });
        object.setAction(object.action);
    }

    markSelected(){
        let object = this;
        var selected_cells = document.querySelectorAll('.cell.selected');
        [].forEach.call(selected_cells, function(elem){
            object.insertDay(elem.querySelector('.schedules'));
            elem.classList.remove('selected');
        });
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

    wasEdited(){
        return JSON.stringify(this.resource_data) !== JSON.stringify(this.resource_data_temp)
    }

    insertDay(elem, day = null) {
        let object = this;

        if(this.action === 'edit'){
            console.log('EditDay');
        } else {
            elem.innerHTML = '';
            let id = elem.closest('td').id;
            let date = id.split('_')[1];
            let partner_id = id.split('_')[2];
            if(this.resource_data_temp[date] == null){
                this.resource_data_temp[date] = [];
            }
            this.resource_data_temp[date][partner_id] = object.template;

            if(object.template[0].dayType === 'work'){
                elem.closest('td').classList.remove('free_day');
                elem.closest('td').classList.add('work_day');
            } else {
                elem.closest('td').classList.remove('work_day');
                elem.closest('td').classList.add('free_day');
            }

            if(day === null){

                if(object.template[0].dayType === 'free') {
                    console.log(123);
                } else {
                    object.template.forEach(function (schedule) {
                        let node = window.helper.createElementFromHTML('<span class="perod_date">' + schedule.start + ' - ' + schedule.end + '</span>');
                        elem.appendChild(node);
                    });
                }

            } else {
                day.forEach(function(schedule) {
                    let node = window.helper.createElementFromHTML('<span class="perod_date">' + schedule.start + ' - ' + schedule.end + '</span>');
                    elem.appendChild(node);
                });
            }
            object.canSave();
        }
    }

    initScheduler(){
        let table_height = document.querySelector('.sc').clientHeight;
        let dates_list_height = 28;
        let resources = null;
        let dates = [];
        let resources_count = 0;
        let days = 28;
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
            let cell_grid_html = '<table><tbody class="sel_cont">';
            for (let i = 0; i < resources_count; i++) {
                cell_grid_html += '<tr data-resource-id="' + resources[i].id + '">';
                    for (let d = 0; d < days; d++) {
                        cell_grid_html += '<td id="cell_' +  dates[d] + '_' + resources[i].id + '" data-date="' + dates[d] + '" class="cell-width cell_selector">' +
                            '<div class="cell-height cell">' +
                            '<div class="cell_buttons_container">' +
                            '<button class="btn-icon" onclick="window.schedule.restoreDay(this)"><i class="fa fa-undo"></i></button>' +
                            '<button class="btn-icon" onclick="window.schedule.clearDay(this)"><i class="fa fa-trash"></i></button>' +
                            '</div>' +
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

    restoreDay(elem){
        let id = elem.closest('td').id;
        let date = id.split('_')[1];
        let partner_id = id.split('_')[2];
        let day = null;
        if(this.resource_data[date] !== null){
            day = this.resource_data[date][partner_id];
        }

        if(day){
            this.insertDay(elem.closest('.cell').querySelector('.schedules'), day);
        } else {
            this.clearDay(elem);
        }

    }

    clearDay(elem){
        let td = elem.closest('td');
        let id = td.id;
        let date = id.split('_')[1];
        let partner_id = id.split('_')[2];

        if(this.resource_data_temp[date] !== null){
            this.resource_data_temp[date][partner_id] = null;
            td.classList.remove('free_day');
            td.classList.remove('work_day');
            td.querySelector('.schedules').innerHTML = '';
        }
    }

    addSchedule(data){
        let cell = document.querySelector('#cell_' + data.date + '_' + data.partner_id);
        if(cell){
            if(data.dayType === 'work'){
                cell.classList.add('work_day');
            }
            if(data.dayType === 'free'){
                cell.classList.add('free_day');
            }
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

    canSave(){
        if(this.wasEdited()){
            this.save_butt.classList.remove('hide');
            return true;
        } else {
            this.save_butt.classList.add('hide');
            return false;
        }
    }

    generateTemplateText(){
        let object = this;
        if(this.template[0].dayType === 'work'){
            this.templateText = 'Рабочий день ';
            this.template.forEach(function(item, i, arr) {
                object.templateText += 'c ';
                object.templateText += item.start + ' до ' + item.end;
            });

        } else {
            this.templateText = 'Не рабочий день ';
            this.templateText += '(' + this.template[0].dayTypeText + ')';
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



    setAction(type){
        this.action = type;
        let button = document.getElementById('action_'+type);
        var buttons = document.getElementsByClassName('action_button');
        [].forEach.call(buttons, function(elem){
            elem.classList.remove('active');
        });
        button.classList.add('active');

        if(this.action === 'edit'){
            this.selection.disable();
            this.template_container.classList.add('hide');
        } else {
            this.selection.enable();
            this.template_container.classList.remove('hide');
        }
    }

    linked(){
        this.sources = [];
        //this.initCalendar();
        this.setAction(this.action);
        this.initRangeSelector();
        this.generateTemplateText();
        this.initScheduler();
        this.loadSchedules();
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
