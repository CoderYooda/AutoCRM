class storeDialog{

    constructor(dialog){
        console.log('Окно склада инициализировано');
        this.root_dialog = dialog;
        this.active = true;
        this.init();
    }

    init(){
        let object = this;
        document.addEventListener("StoreStored", function(){
            object.finitaLaComedia();
        });
        let focused = document.getElementById('store_dialog_focused');
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
export default storeDialog;
