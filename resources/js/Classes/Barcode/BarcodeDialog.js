class barcodeDialog{

    constructor(dialog){
        console.log('Окно штрихкода инициализировано');
        this.root_dialog = dialog;
        this.active = true;
        this.init();
    }

    init(){
    }

    finitaLaComedia(){
        closeDialog(null, this.root_dialog.id);
        delete window[this.root_dialog.id];
    }
}
export default barcodeDialog;
