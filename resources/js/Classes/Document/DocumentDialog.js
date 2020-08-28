import Modal from "../Modal/Modal";

class documentDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно документа инициализировано');
        this.init();
    }

    init(){
        let search_element = this.current_dialog.querySelector('[name="search"]');

        search_element.addEventListener('keyup',  (event) => {

            let input_element = this.current_dialog.querySelectorAll('.focuseable');

            let search_text = search_element.value.toLowerCase();

            input_element.forEach(element => {

                let text = element.querySelector('span').innerText.toLowerCase();

                if(text.indexOf(search_text) === -1 && search_text.length) {
                    element.classList.add('d-none');
                    element.classList.remove('selected');

                    element.querySelector('input').checked = false;
                }
                else {
                    element.classList.remove('d-none');
                }
            });
        });
    }

    select(element) {

        let input_element = this.current_dialog.querySelectorAll('.focuseable');

        input_element.forEach(input => {
            input.classList.remove('selected');
        });

        element.classList.add('selected');

        element.querySelector('input').checked = true;
    }

    save(element) {

        window.axform.send(element, (response) => {
            if(response.status === 200) {
                //
            }
        });
    }
}
export default documentDialog;
