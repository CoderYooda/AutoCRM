
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
        console.log('страница Календаря инициализировано');
        this.active = true;
        this.root_id = 'calendar_index_page';
        this.search = null;
        this.calendar = null;
        this.lastView = null;
        this.init();
        this.sources = [];

        this.incomingWarrantSource = {
            url: '/employee/schedule',
            method: 'get',
            failure: this.sourceAddFailure(),
            textColor: 'white'
        };
    }

    sourceAddFailure(){
        //console.log('there was an error while fetching events!');
    }

    init(){
        let object = this;
        object.initCalendar();
    }

    linked(){
        let object = this;
        object.sources = [];
        object.initCalendar();
    }

    initCalendar(){
        let object = this;
        var calendarEl = document.getElementById('dates');

        this.calendar = new Calendar(calendarEl, {
            plugins: [ interactionPlugin, resourceTimelinePlugin ],
            locale: ruLocale,
            resourceLabelText: 'Сотрудники',
            views: {
                resourceTimelineMonth: {
                    type: 'resourceTimeline',
                    buttonText: 'Месяц',
                    duration: { month: 1 },
                    slotLabelFormat: [
                        { weekday: 'short', day:'numeric' } // lower level of text
                    ],
                },
                resourceTimelineSday: {
                    type: 'resourceTimeline',
                    buttonText: 'Неделя',
                    duration: { weeks: 1 },
                    slotDuration: {days: 1},
                    slotLabelFormat: [
                        { weekday: 'short', day:'numeric' } // lower level of text
                    ],
                }
            },
            schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
            defaultView: 'resourceTimelineMonth',
            slotWidth: 42,
            selectable: true,
            resources: {
                url: '/employee/resources',
                method: 'get',
            },
            dateClick: function(info) {
                console.log(info.resource.id);
                // change the day's background color just for fun
                //info.dayEl.style.backgroundColor = 'red';
            },
            header: {
                left:   'prev, today, next',
                center: 'title',
                right:  'resourceTimelineSday, resourceTimelineMonth'
            },
            height: "parent",
            eventClick: function(info) {
                try {
                    openDialog(info.event.extendedProps.modal, '&' + info.event.extendedProps.alias + '=' + info.event.extendedProps.id);
                } catch (e) {
                    console.warn('Ошибка открытия окна');
                }
                info.el.style.borderColor = 'red';
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
