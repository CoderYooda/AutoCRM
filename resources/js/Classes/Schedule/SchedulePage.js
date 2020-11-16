

import Selection from '@simonwep/selection-js';


class schedulePage{

    constructor(){
        console.log('страница Планировщика инициализировано');
        this.active = true;
        this.root_id = 'calendar_index_page';
        this.save_butt = document.getElementById('save_butt');
        this.template_container = document.getElementById('template_container');
        this.start_date_input = document.getElementById('start_date');
        this.end_date_input =  document.getElementById('end_date');
        this.start_date = new Date();
        this.end_date =  this.addMonths(new Date(), 2);
        this.resources_id = [];
        this.resources = null;
        this.search = null;
        this.calendar = null;
        this.lastView = null;
        this.sources = [];
        this.action = "template"; // [ edit , template]
        this.template = [{
            partner_id: null,
            dayType: "work",
            dayTypeId: 1,
            dayTypeText: null,
            date: null,
            start: "08:00",
            end: "17:00"
        }];
        this.bisy = false;
        this.selection = null;
        this.square_select = document.getElementById('square_select'), this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0;
        this.templateText = 'Шаблон не выбран';
        this.cells_pressed = false;
        this.resource_data_temp = {};
        this.resource_data = {};

        this.start_date_flatpkr = null;
        this.end_date_flatpkr = null;
        this.start_date_mask = null;
        this.end_date_mask = null;


        this.init();
        this.generateTemplateText();
        this.initScheduler();
        this.checkActive();
    }

    checkActive(){
        let className = window.location.pathname.substring(1);
        let link = document.getElementById('sсhedule_link');
        if(className === 'schedule'){
            link.classList.add('active');
            this.active = true;
        } else {
            link.classList.remove('active');
            this.active = false;
        }
    }

    resetDate(){
        let sd = document.querySelector('.date_picker_start').value.split(".");
        this.start_date = new Date(sd[2],(sd[1]-1),sd[0]);
        let ed = document.querySelector('.date_picker_end').value.split(".");
        this.end_date = new Date(ed[2],(ed[1]-1),ed[0]);
        this.initScheduler();
    }

    init(){
        let object = this;
        document.addEventListener('ajaxLoaded', function(e){
            object.checkActive();
            //object.load();
        });
        this.selection = Selection.create({
            class: 'selection',
            selectables: ['#cell_grid .cell'],
            boundaries: ['#cell_grid'],
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
        this.initRangeSelector();
    }

    addMonths(date, months) {
        let d = date.getDate();
        date.setMonth(date.getMonth() + +months);
        if (date.getDate() != d) {
            date.setDate(0);
        }
        return date;
    }

    markSelected(){
        let object = this;
        var selected_cells = document.querySelectorAll('.cell.selected');
        [].forEach.call(selected_cells, function(elem){

            if(object.action === 'undo'){
                object.restoreDay(elem.querySelector('.schedules'));
            } else if(object.action === 'clear') {
                object.clearDay(elem.querySelector('.schedules'));
            } else {
                object.insertDay(elem.querySelector('.schedules'));
            }

            elem.classList.remove('selected');
        });
    }

    insertByAction(elem){
        let object = this;
        if(object.action === 'undo'){
            object.restoreDay(elem);
        } else if(object.action === 'clear') {
            object.clearDay(elem);
        } else {
            object.insertDay(elem);
        }
    }

    storeSchedules(){
        let object = this;
        if(!object.bisy){
            try {
                object.bisy = true;
                window.axios({
                    method: 'post',
                    url: '/schedules/store',
                    data: {
                        resources: object.resources_id,
                        start_date: object.start_date,
                        end_date: object.end_date,
                        data:object.resource_data_temp
                    }
                }).then(function (resp) {
                    if(resp.data.status === 'success'){
                        object.initScheduler();
                        let start_date = document.querySelector('.date_picker_start');
                        let end_date = document.querySelector('.date_picker_end');
                        object.start_date_mask.updateValue();
                        object.end_date_mask.updateValue();
                    }
                }).then(function(){
                    object.bisy = false;
                });
            } catch (e) {
                dd(e);
            }


        } else {
            dd('Подождите...');
        }
    }

    loadSchedules(){
        let object = this;
        window.axios({
            method: 'post',
            url: '/schedules/get',
            data: {
                start_date: object.start_date,
                end_date: object.end_date,
                resources: object.resources_id,
            }
        }).then(function (resp) {
            object.resource_data = Object.assign({}, resp.data.schedules_date);
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



            if(day === null){

                let fast_template = JSON.parse(JSON.stringify(object.template));

                if(this.resource_data_temp[date] == null){
                    this.resource_data_temp[date] = {};
                }

                fast_template.forEach(function (schedule, index) {
                    fast_template[index].partner_id = parseInt(partner_id);
                    fast_template[index].date = date;
                });

                object.resource_data_temp[date][partner_id] = fast_template;

                if(object.template[0].dayType === 'work'){
                    elem.closest('td').classList.remove('free_day');
                    elem.closest('td').classList.add('work_day');
                } else {
                    elem.closest('td').classList.remove('work_day');
                    elem.closest('td').classList.add('free_day');
                }

                object.template.forEach(function (schedule) {
                    let node = null;
                    if(object.template[0].dayType === 'free') {
                        node = window.helper.createElementFromHTML('<span class="perod_date">' + schedule.dayTypeText + '</span>');
                    } else {
                        node = window.helper.createElementFromHTML('<span class="perod_date">' + schedule.start + ' - ' + schedule.end + '</span>');
                    }
                    elem.appendChild(node);
                });

                //dd(object.template);


            } else {

                object.resource_data_temp[date][partner_id] = day;

                if(day[0].dayType === 'work'){
                    elem.closest('td').classList.remove('free_day');
                    elem.closest('td').classList.add('work_day');
                } else {
                    elem.closest('td').classList.remove('work_day');
                    elem.closest('td').classList.add('free_day');
                }

                day.forEach(function(schedule) {
                    let node = null;
                    if(day[0].dayType === 'work') {
                        node = window.helper.createElementFromHTML('<span class="perod_date">' + schedule.start + ' - ' + schedule.end + '</span>');
                    } else {
                        node = window.helper.createElementFromHTML('<span class="perod_date">' + schedule.dayTypeText + '</span>');
                    }
                    elem.appendChild(node);
                });
            }
            object.canSave();
        }
    }

    initScheduler(){
        let object = this;

        // let start_date = new Date(object.start_date);
        // let end_date = new Date(object.end_date);

        let days = (object.end_date.getTime() - object.start_date.getTime()) / (1000 * 3600 * 24);
        let table_height = document.querySelector('.sc').clientHeight;
        let dates_list_height = 28;
        this.resources = null;
        let dates = [];
        let resources_count = 0;
        let dates_html = '';
        let d = object.start_date;
        const monthNames = ["янв", "фев", "март", "апр", "май", "июн",
            "июл", "авг", "сен", "окт", "ноя", "дек"
        ];
        const weekNames = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
        for (let i = 0; i < days; i++) {

            let day = new Date(d.getFullYear(), d.getMonth(), (d.getDate() + i));
            let month = null;
            let date = null;
            if(day.getDate().toString().length === 1){
                date = '0' + (day.getDate());
            } else {
                date = day.getDate();
            }


            if((day.getMonth() + 1).toString().length === 1){
                month = '0' + (day.getMonth() + 1)
            } else {
                month = day.getMonth() + 1
            }

            dates.push(day.getFullYear() + '-' + month + '-' + date);

            dates_html += '<th class="date_num header_item cell-width">' + weekNames[day.getDay()] + ", " + date + "." + month + '</th>';
        }
        //dates_html += '<th class="date_num header_item cell-width"></th>';
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
            object.resources = resp.data;
            resources_count = object.resources.length;
            let resources_html = '<tbody>';
            object.resources_id = [];
            object.resources.forEach(function(item, i, arr) {
                object.resources_id.push(item.id);
                resources_html += '<tr><td><div data-resource_id="' + item.id + '" class="cell-height resource_left">' + item.title + '</div></td></tr>';
            });
            resources_html += '</tbody>';
            document.querySelector('#resources_grid').innerHTML = resources_html;
            let cell_grid_html = '<table><tbody class="sel_cont">';
            for (let i = 0; i < resources_count; i++) {
                cell_grid_html += '<tr>';
                    for (let d = 0; d < days; d++) {
                        cell_grid_html += '<td id="cell_' +  dates[d] + '_' + object.resources[i].id + '" class="cell-width cell_selector">' +
                            '<div class="cell-height cell">' +
                            '<div class="cell_buttons_container">' +
                            '<button class="btn-icon" onclick="window.schedule.restoreDay(this)"><i class="fa fa-undo"></i></button>' +
                            '<button class="btn-icon" onclick="window.schedule.clearDay(this)"><i class="fa fa-trash"></i></button>' +
                            '</div>' +
                            '<div class="schedules" onclick="window.schedule.insertByAction(this)">' +
                            '</div>' +
                            '</div></td>';
                    }
                cell_grid_html += '</tr>';
            }
            cell_grid_html += '</tbody></table>';
            document.querySelector('#cell_grid').innerHTML = cell_grid_html;
            object.loadSchedules();
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
        if(this.resource_data[date] && this.resource_data[date][partner_id]){
            day = JSON.parse(JSON.stringify(this.resource_data[date][partner_id]));
        }
        if(day){
            day.forEach(function (schedule, index) {
                day[index].partner_id = parseInt(partner_id);
                day[index].date = date;
            });
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

        if(this.resource_data_temp[date]){
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
            let node = null;
            if(data.dayType === 'work') {
                node = window.helper.createElementFromHTML('<span class="perod_date">' + data.start + ' - ' + data.end + '</span>');
            } else {
                node = window.helper.createElementFromHTML('<span class="perod_date">' + data.dayTypeText + '</span>');
            }
            cell.querySelector('.schedules').appendChild(node);
        }
    }

    canSave(){
        if(this.wasEdited()){
            //this.save_butt.classList.remove('hide');
            return true;
        } else {
            //this.save_butt.classList.add('hide');
            return false;
        }
    }

    generateTemplateText(){
        let object = this;
        if(this.template[0].dayType === 'work'){
            this.templateText = 'Рабочий день ';
            this.template.forEach(function(item, i, arr) {
                if(i > 0){object.templateText += ', ';}
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
        let object = this;
        let start_date = document.querySelector('.date_picker_start');
        let end_date = document.querySelector('.date_picker_end');
        start_date.value = this.start_date.getDate() + '.' + (this.start_date.getMonth() + 1) + '.' + this.start_date.getFullYear();
        end_date.value = this.end_date.getDate() + '.' + ( this.end_date.getMonth() + 1 ) + '.' + this.end_date.getFullYear();

        object.start_date_flatpkr = window.flatpickr(".date_picker_start", {
            allowInput: true,
            dateFormat: "d.m.Y",
        });
        object.end_date_flatpkr = window.flatpickr(".date_picker_end", {
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

    sourceAddFailure(){
        //console.log('there was an error while fetching events!');
    }

    setAction(type){
        this.action = type;
        let button = document.getElementById('action_' + type);
        var buttons = document.getElementsByClassName('action_button');
        [].forEach.call(buttons, function(elem){
            elem.classList.remove('active');
        });
        button.classList.add('active');
        if(this.action === 'undo'){
            this.template_container.classList.add('hide');
        } else if(this.action === 'clear') {
            this.template_container.classList.add('hide');
        } else {
            this.template_container.classList.remove('hide');
        }
    }

    linked()
    {
        this.sources = [];
        this.setAction(this.action);
        this.generateTemplateText();
        this.initScheduler();
        this.initRangeSelector();
    }

    toggleSource(elem)
    {
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
