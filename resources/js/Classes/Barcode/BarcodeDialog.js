import Modal from "../Modal/Modal";

class barcodeDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно штрихкода инициализировано');
        this.active = true;
        this.init();
        console.log(1);
    }

    init(){
    }

}
export default barcodeDialog;
