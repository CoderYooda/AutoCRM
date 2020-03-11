class scheduleTemplateDialog{

    constructor(dialog){
        console.log('Диалог создания шаблона активирован');
        this.active = true;
        this.root_dialog = dialog;
        this.container = this.root_dialog.querySelector('#periods');

        this.day_type = true; // Рабочий
        this.periods = {};
        //this.day_off_type = this.root_dialog.getElementById('day_off_type');

        this.init();
        //this.activateTime(0);

        this.template = window.schedule.template;
        //this.initPeriods();

    }

    applyTemplate()
    {
        window.schedule.template = this.template;
        let object = this;
        var periods = this.container.getElementsByClassName('period');
        object.template.periods = [];
        [].forEach.call(periods, function(elem){
            let start = elem.getElementsByClassName('start_period')[0];
            let end = elem.getElementsByClassName('end_period')[0];
            object.template.periods.push({
                start: start.value,
                end: end.value,
            });
        });
        console.log(this.template);
        this.finitaLaComedia();
    }

    initPeriods(){
        let object = this;
        if(this.template.periods != null){
            this.template.periods.forEach(function(item, i, arr) {
                console.log( i + ": " + item + " (массив:" + arr + ")" );
                object.addPeriod(item.start, item.end);
            });
        }

    }

    linked(){
        this.initPeriods();
    }

    addPeriod(start = null, end = null)
    {
        var count = this.container.getElementsByClassName('period').length;

        if(count > 2){
            notification.notify( 'error', 'Максимальное кол-во интервалов - 3');
        } else {
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
        if(value === 'free' || value === 'work'){
            this.template.type = value;
        }
    }

    changeDayType(elem){
        this.template.freeDayType = elem.value;
    }

    sourceAddFailure(){
        //console.log('there was an error while fetching events!');
    }

    init(){

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
