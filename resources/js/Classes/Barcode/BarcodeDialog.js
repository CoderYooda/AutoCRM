import Modal from "../Modal/Modal";

class barcodeDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log(1);
        // console.log('Окно штрихкода инициализировано');
        // this.active = true;
        // this.init();
        // console.log(1);
    }

    init(){
    }

    scanOperation(){
        dd(2);
    }

}
export default barcodeDialog;
