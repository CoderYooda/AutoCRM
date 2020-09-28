import Modal from "../Modal/Modal";
import Tabs from "../../Tools/Tabs";

class orderDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Диалог заказа инициализирован');
        this.init();
    }

    init() {
        new Tabs('order_tabs');
    }
}
export default orderDialog;
