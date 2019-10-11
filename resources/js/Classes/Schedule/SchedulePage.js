
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
            url: '/warrant/events',
            method: 'POST',
            extraParams: {
                isIncoming: 1
            },
            failure: this.sourceAddFailure(),
            textColor: 'white'
        };

        this.outcomingWarrantSource = {
            url: '/warrant/events',
            method: 'POST',
            extraParams: {
                isIncoming: false
            },
            failure: this.sourceAddFailure(),
            textColor: 'white'
        };

        this.clientOrderSource = {
            url: '/clientorder/events',
            method: 'POST',
            extraParams: {
                isIncoming: 0
            },
            failure: this.sourceAddFailure(),
            textColor: 'white'
        };

        this.entranceSource = {
            url: '/entrance/events',
            method: 'POST',
            extraParams: {
                isIncoming: 0
            },
            failure: this.sourceAddFailure(),
            textColor: 'white'
        };

        this.shipmentSource = {
            url: '/shipment/events',
            method: 'POST',
            extraParams: {
                isIncoming: 0
            },
            failure: this.sourceAddFailure(),
            textColor: 'white'
        }
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
            schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
            defaultView: 'resourceTimeline',
            slotWidth: 60,
            resources: [
                {id: 'room101', name: 'Room 101'},
                {id: 'room102', name: 'Room 102'},
                {id: 'room201', name: 'Room 201'},
                {id: 'room301', name: 'Room 301'},
                {id: 'room401', name: 'Room 401'},
                {id: 'room707', name: 'Room 707'}
            ],
            dateClick: function(info) {
                console.log(info.resource.id);
                // change the day's background color just for fun
                //info.dayEl.style.backgroundColor = 'red';
            },
            header: {
                left:   'prev, today, next',
                center: 'title',
                right:  'resourceTimelineWeek, resourceTimelineYear, resourceTimelineFourDays, timeGridDay, listDay, ' //'month,agendaWeek,agendaDay,list'
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
