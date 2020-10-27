import Tabs from "../../../Tools/Tabs";

class User {

    constructor() {
        let tabs_element = document.getElementById('user_tabs');
        if(tabs_element) new Tabs('user_tabs');
    }

    showOrderPositions(element) {
        let i_element = element.querySelector('i');

        i_element.classList.toggle('fa-chevron-down');
        i_element.classList.toggle('fa-chevron-up');

        let target_element = element.closest('.order_element');

        target_element.classList.toggle('active');

        let order_elements = document.querySelectorAll('.order_element');

        order_elements.forEach(order_element => {
            if(order_element != target_element) order_element.classList.remove('active');
        });
    }

    editField(element) {
        let group_element = element.closest('.form-group-flex');

        let display_element = group_element.querySelector('.display');
        let edit_element = group_element.querySelector('.edit');

        display_element.classList.toggle('d-none');
        edit_element.classList.toggle('d-none');
    }

    saveField(element) {
        this.editField(element);
    }
}
export default User;
