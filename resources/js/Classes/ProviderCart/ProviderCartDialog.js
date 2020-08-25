import Modal from "../Modal/Modal";

class providerCartDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно штрихкода инициализировано');
        this.init();
    }

    init(){

    }

    send() {
        axios.post('/provider_stores/cart/order')
            .then(response => {
                dd(response);
            })
            .catch(response => {

            });
    }
}
export default providerCartDialog;
