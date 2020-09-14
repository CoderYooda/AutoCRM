import Modal from '../../Modal/Modal'

class CompanyDialog extends Modal {

    constructor(dialog, response) {

        console.log(dialog, response);

        super(dialog);

        console.log(response);

        console.log('страница админ компании иниц.');
        this.init();
    }

    init() {
        this.linked();
    }

    linked() {
        //
    }
}
export default CompanyDialog;

