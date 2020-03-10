class scheduleTemplateDialog{

    constructor(dialog){
        console.log('Диалог создания шаблона активирован');
        this.active = true;
        this.root_dialog = dialog;

        this.day_type = true; // Рабочий
        this.periods = {};

        this.init();
        this.activateTime(0);
    }

    applyTemplate(){

    }

    addPeriod(){
        var container = this.root_dialog.querySelector('#periods');

        var count = container.getElementsByClassName('period').length;

        if(count > 2){
            notification.notify( 'error', 'Максимальное кол-во интервалов - 3');
        } else {
            var node = helper.createElementFromHTML('' +
                '<div class="row row-sm mt-15 period">' +
                '<div class="col-sm-5">' +
                '<input type="text" class="form-control" value="8:00" name="period[' + count + '][\'start\']" id="period_' + count + '_start">' +
                '</div>' +
                '<div class="col-sm-5">' +
                '<input type="text" class="form-control" value="17:00" name="period[' + count + '][\'end\']" id="period_' + count + '_end">' +
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
            container.appendChild(node);
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
