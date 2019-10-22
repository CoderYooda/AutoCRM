class cashboxDialog{

    constructor(dialog){
        console.log('Окно кассового аппарата инициализировано1');
        this.root_dialog = dialog;
        this.active = true;
        this.init();
    }

    init(){
        let object = this;
        document.addEventListener("CashboxStored", function(){
            object.finitaLaComedia();
        });
        let focused = document.getElementById('cashbox_dialog_focused');
        if(focused){
            focused.focus();
        }
    }

    save(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(e){
            object.finitaLaComedia();
        });
    }

    finitaLaComedia(){
        closeDialog(null, this.root_dialog.id);
        delete window[this.root_dialog.id];
    }

}
export default cashboxDialog;
