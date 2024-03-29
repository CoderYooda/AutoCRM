import Tabs from "../../Tools/Tabs";

class scheduleTemplateDialog{

    constructor(dialog){
        console.log('Диалог создания шаблона активирован');
        this.active = true;
        this.root_dialog = dialog;
        this.container = this.root_dialog.querySelector('#periods');
        this.periods = {};
        //this.day_off_type = this.root_dialog.getElementById('day_off_type');

        //this.activateTime(0);
        this.template = window.schedule.template;
        this.dayType = this.template[0].dayType; // Рабочий
        this.init();
        // this.initPeriods();
        // this.activateDayType(this.template[0].dayType);
        // this.activateFreeDayType(this.template[0].dayTypeId);
    }

    init(){
        this.linked();
    }

    applyTemplate()
    {
        let object = this;

        if(this.dayType === 'work'){
            let periods = this.container.getElementsByClassName('period');
            object.template = [];
            [].forEach.call(periods, function(elem){
                let start = elem.getElementsByClassName('start_period')[0];
                let end = elem.getElementsByClassName('end_period')[0];

                object.template.push({
                    partner_id: null,
                    dayType: object.dayType,
                    dayTypeId: 0,
                    dayTypeText: "Не указано",
                    date: null,
                    start: start.value,
                    end: end.value
                });
            });
        } else {
            let selector = object.root_dialog.querySelector('#freeDayType');
            object.template = [{
                partner_id: null,
                dayType: object.dayType,
                dayTypeId: selector.value,
                dayTypeText: selector.options[selector.selectedIndex].text,
                date: null,
                start: null,
                end: null
            }];
        }
        window.schedule.template = this.template;
        this.finitaLaComedia();
        window.schedule.generateTemplateText();
    }

    initPeriods(){
        let object = this;
        if(this.template != null){
            object.container.innerHTML = '';
            this.template.forEach(function(item, i, arr) {
                object.addPeriod(item.start, item.end);
            });
        }
    }

    linked(){
        this.initPeriods();
        this.activateDayType(this.template.type);
        this.activateFreeDayType(this.template.freeDayType);
        if(this.root_dialog.querySelector('#schedule_tabs')){
            new Tabs('schedule_tabs');
        };
    }

    addPeriod(start = null, end = null)
    {
        var count = this.container.getElementsByClassName('period').length;
        if(count > 2){
            notification.notify( 'error', 'Максимальное кол-во интервалов - 3');
        } else {
            if(!start){start = '8:00'}
            if(!end){end = '17:00'}
            var node = helper.createElementFromHTML('' +
                '<div class="row row-sm mt-15 period">' +
                '<div class="col-sm-5">' +
                '<input type="text" class="form-control start_period" value="' + start  + '" name="period[' + count + '][\'start\']" id="period_' + count + '_start">' +
                '</div>' +
                '<div class="col-sm-5">' +
                '<input type="text" class="form-control end_period" value="' + end + '" name="period[' + count + '][\'end\']" id="period_' + count + '_end">' +
                '</div>' +
                '<div class="col-sm-2">' +
                '<span class="input-group-append" data-toggle="tooltip" data-placement="top" title="Удалить интервал">' +
                '<button onclick="window.scheduleTemplateDialog.deleteInterval(this)" class="input-group-text butt_del_append" type="button" style="height: auto">' +
                '<i class="fa fa-trash"></i>' +
                '</button>' +
                '</span>' +
                '</div>' +
                '</div>' +
                '');
            this.container.appendChild(node);
            this.activateTime(count);
        }
    }

    deleteInterval(elem){

        // var div = this.root_dialog.querySelector('#periods');
        // var id = elem.closest('.phone').dataset.id;

        elem.closest('.period').remove();

    }

    setDaytype(value){
        this.day_type = value;
        if(value === 'free'){
            this.dayType = 'free';
        } else {
            this.dayType = 'work';
            this.initPeriods();
        }
    }

    changeDayType(elem){

        this.template[0].dayTypeId = elem.value;
        this.template[0].dayTypeText = elem.options[elem.selectedIndex].text;
    }

    sourceAddFailure(){
        //console.log('there was an error while fetching events!');
    }

    activateFreeDayType(type){
        let selector = this.root_dialog.querySelector('#freeDayType');
        selector.value = type;
    }

    activateDayType(type)
    {
        let button_work = this.root_dialog.querySelector('#work_button');
        let button_free = this.root_dialog.querySelector('#free_button');
        let work = this.root_dialog.querySelector('#work');
        let free = this.root_dialog.querySelector('#free');

        button_work.classList.remove('active');
        button_free.classList.remove('active');
        work.classList.remove('active');
        free.classList.remove('active');

        if(type === 'work'){
            button_work.classList.add('active');
            work.classList.add('active');
        } else {
            button_free.classList.add('active');
            free.classList.add('active');
        }
    }

    activateTime(id){
        let object = this;
        window.flatpickr(document.querySelector('#period_'+ id +'_start'),{
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
        });
        window.flatpickr(document.querySelector('#period_'+ id +'_end'),{
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
        });
    }

    finitaLaComedia(){
        closeDialog(null, this.root_dialog.id);
        delete window[this.root_dialog.id];
    }
}
export default scheduleTemplateDialog;
