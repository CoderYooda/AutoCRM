class scheduleTemplateDialog{

    constructor(dialog){
        console.log('Диалог создания шаблона активирован');
        this.active = true;
        this.root_dialog = dialog;

        this.day_type = true; // Рабочий
        this.periods = {};

        this.init();
        this.addPeriod();
    }

    applyTemplate(){

    }

    addPeriod(){
        window.flatpickr(document.querySelector('#period_0_start'),{
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
        });
        window.flatpickr(document.querySelector('#period_0_end'),{
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
        });
    }

    setDaytype(value){
        this.day_type = value;
    }

    sourceAddFailure(){
        //console.log('there was an error while fetching events!');
    }

    init(){
        let object = this;
    }

    finitaLaComedia(){
        closeDialog(null, this.root_dialog.id);
        delete window[this.root_dialog.id];
    }
}
export default scheduleTemplateDialog;
