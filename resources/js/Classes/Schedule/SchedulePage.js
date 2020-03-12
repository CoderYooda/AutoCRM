
import { Calendar } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timegridPlugin from '@fullcalendar/timegrid';
// import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';
// import listPlugin from '@fullcalendar/list';
import ruLocale from '@fullcalendar/core/locales/ru';

// import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

class schedulePage{

    constructor(){
        console.log('страница Планировщика инициализировано');
        this.active = true;
        this.root_id = 'calendar_index_page';
        this.search = null;
        this.calendar = null;
        this.lastView = null;
        this.sources = [];
        this.action = "edit"; // [ edit , template]
        this.template = {
            type: 'work', // [ work , free ]
            periods: [{
                start: '08:00',
                end: '17:00',
            }],
            freeDayType: 0,
            freeDayTypeText: 'Не указано'
        };
        this.templateText = 'Шаблон не выбран';


        this.init();
        this.initRangeSelector();
        this.generateTemplateText();

        this.incomingWarrantSource = {
            url: '/employee/schedule',
            method: 'get',
            failure: this.sourceAddFailure(),
            textColor: 'white'
        };

        let table_height = 300;
        let dates_list_height = 28;

        const monthNames = ["янв", "фев", "март", "апр", "май", "июн",
            "июл", "авг", "сен", "окт", "ноя", "дек"
        ];

        const weekNames = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
        let m = 10;

        let d = new Date(2020, m, 1);

        let days = 66;
        let dates_html = '';
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

            dates_html += '<th class="date_num cell-width">' + weekNames[day.getDay()] + ", " + date + "." + month + '</th>';
        }

        document.querySelector('#dates_list').style.height = dates_list_height + 'px';
        document.querySelector('#cell_grid').style.height = (table_height - dates_list_height) + 'px';
        document.querySelector('#resources_list').style.height = (table_height - dates_list_height) + 'px';

        document.querySelector('#entry_dates').querySelector('tbody').innerHTML = dates_html;


        document.querySelector('#cell_grid').onscroll = function() {
            console.log(1);
            // if (!isSyncingLeftScroll) {
            //     isSyncingRightScroll = true;
            document.querySelector('#dates_list_scroller').scrollLeft = this.scrollLeft;
            document.querySelector('#resources_list').scrollTop = this.scrollTop;
            // }
            // isSyncingLeftScroll = false;
        }


        console.log(dates_html);
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
        object.initCalendar();
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
        this.initCalendar();
        this.setAction(this.action);
        this.initRangeSelector();
        this.generateTemplateText();
    }

    initCalendar(){
        let object = this;
        var calendarEl = document.getElementById('dates');

        this.calendar = new Calendar(calendarEl, {
            plugins: [ interactionPlugin, resourceTimelinePlugin ],
            locale: ruLocale,
            resourceLabelText: 'Сотрудники',
            resourceAreaWidth: '260px',
            // resourceColumns: [
            //     {
            //         labelText: 'ID',
            //         width: "20%",
            //         field: 'id'
            //     },
            //     {
            //         labelText: 'ФИО',
            //         field: 'title'
            //     }
            // ],
            // views: {
            //     resourceTimelineMonth: {
            //         type: 'resourceTimeline',
            //         buttonText: 'Месяц',
            //         duration: { month: 1 },
            //         slotLabelFormat: [
            //             { weekday: 'short', day:'numeric' } // lower level of text
            //         ],
            //     },
            //     resourceTimelineSday: {
            //         type: 'resourceTimeline',
            //         buttonText: 'Неделя',
            //         duration: { weeks: 1 },
            //         slotDuration: {days: 1},
            //         slotLabelFormat: [
            //             { weekday: 'short', day:'numeric' } // lower level of text
            //         ],
            //     }
            // },
            schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
            defaultView: 'resourceTimeline',
            slotWidth: 110,
            slotDuration: {days: 1},
            duration: { days: 44 },
            selectable: true,
            defaultDate:'2020-03-03',
            slotLabelFormat: [
                { weekday: 'short', day:'numeric', month:'numeric' } // lower level of text
            ],
            resources: {
                url: '/employee/resources',
                method: 'get',
                width:140,
            },
            events: [
                {
                    resourceId: 6, title: "event 1", start: "2020-03-11", end: "2020-03-13", allDay: true
                }
                // more events ...
            ],
            dayRender: function(cell) {
                cell.innerHtml = '<div><button>2</button></div>'
            },
            dateClick: function(info) {
                console.log(info);
                // change the day's background color just for fun
                //info.dayEl.style.backgroundColor = 'red';

                let events = object.calendar.getEvents();
                console.log(events);
                let to_delete = [];
                events.forEach(function(item, i, arr) {
                    console.log(item.source);
                    if(item.source){
                        to_delete.push(item);
                    }
                });

                if(object.template.type === 'work'){
                    object.template.periods.forEach(function(item, i, arr) {
                        object.calendar.addEvent({
                            resourceId: info.resource.id,
                            title: item.start + '-' + item.end,
                            start: info.dateStr + 'T' + item.start + ':00',
                            end: info.dateStr + 'T' + item.end + ':00',
                            allDay: false
                        });
                        // console.log( i + ": " + item + " (массив:" + arr + ")" );
                        // object.addPeriod(item.start, item.end);
                    });
                } else {
                    object.calendar.addEvent({
                        resourceId: info.resource.id,
                        title: object.templateText,
                        start: info.dateStr + 'T00:00:00',
                        end: info.dateStr + 'T00:00:00',
                        allDay: true
                    });
                }





            },
            select: function(info) {
                console.warn(info);
                console.log('selected ' + info.startStr + ' to ' + info.endStr);
            },
            header: false,
            height: "parent",
            eventClick: function(info) {

                info.event.remove();
                // try {
                //     openDialog(info.event.extendedProps.modal, '&' + info.event.extendedProps.alias + '=' + info.event.extendedProps.id);
                // } catch (e) {
                //     console.warn('Ошибка открытия окна');
                // }
                // info.el.style.borderColor = 'red';
            },

        });

        this.calendar.render();
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
