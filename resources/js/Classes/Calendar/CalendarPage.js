
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timegridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import ruLocale from '@fullcalendar/core/locales/ru';

class calendarPage{

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
        console.log('there was an error while fetching events!');
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
            plugins: [ interactionPlugin, dayGridPlugin, listPlugin, timegridPlugin, timelinePlugin ],
            locale: ruLocale,
            defaultView: 'dayGridMonth',
            navLinks: true,
            droppable: true,
            editable: false,
            eventLimit: true,
            // customButtons: {
            //     myCustomButton: {
            //         text: 'custom!',
            //         class: 'lol',
            //         click: function() {
            //             alert('clicked the custom button!');
            //         }
            //     }
            // },

            header: {
                left:   'prev, today, next',
                center: 'title',
                right:  'Year, dayGridMonth, timeGridWeek, timeGridDay, listDay, ' //'month,agendaWeek,agendaDay,list'
            },
            height: "parent",
            eventClick: function(info) {
                try {
                    openDialog(info.event.extendedProps.modal, '&' + info.event.extendedProps.alias + '=' + info.event.extendedProps.id);
                } catch (e) {
                    console.warn('Ошибка открытия окна');
                }

                // alert('Event: ' + info.event.title);
                // alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
                // alert('View: ' + info.view.type);

                // change the border color just for fun
                info.el.style.borderColor = 'red';
            },
            // viewDisplay: function (view) {
            //     if (object.lastView == null) {
            //         object.lastView = 'firstRun';
            //     }
            //     if (view.name !== lastView) {
            //         if (view.name == 'agendaWeek') {
            //             this.loadEvents();
            //         }
            //         object.lastView = view.name;
            //     }
            // },
            //eventSources: [object.warrantSource],
            // events: {
            //     url: '/clientorder/events',
            //     type: 'POST',
            //     data:{
            //         custom_param1: 'something',
            //         custom_param2: 'somethingelse'
            //     },
            //     error: function() {
            //         alert('there was an error while fetching events!');
            //     },
            //     color: 'yellow',   // a non-ajax option
            //     textColor: 'black' // a non-ajax option
            // }
            // events: function(start, end, timezone, callback) {
            //     object.loadEvents(start, end, timezone, callback);
            // }
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
export default calendarPage;
