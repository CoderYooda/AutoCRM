import Tabs from "../../../Tools/Tabs";

class User {

    constructor() {
        let tabs_element = document.getElementById('user_tabs');
        if(tabs_element) new Tabs('user_tabs');

        let url = new URL(window.location.href);
        let hash = url.hash.substring(1);

        if(hash) {

            setTimeout(() => {
                let target_element = document.querySelector('[data-target="' + hash + '"]');
                if(target_element) target_element.click();
            }, 50);
        }
        else {

            let local_tab = localStorage.getItem('userTabs');

            if (local_tab) {
                setTimeout(() => {
                    let target_element = document.querySelector('[data-target="' + local_tab + '"]');
                    if(target_element) target_element.click();
                }, 50);
            }
        }
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

        edit_element.querySelector('input').focus();
    }

    removeField(element) {
        let group_element = element.closest('.form-group-flex');

        group_element.remove();

        let addresses_element = document.querySelector('.add_address');
        addresses_element.classList.remove('d-none');
    }

    saveField(element) {
        let group_element = element.closest('.form-group-flex');

        let display_element = group_element.querySelector('.display');
        let edit_element = group_element.querySelector('.edit');

        let input_elements = edit_element.querySelectorAll('input');

        input_elements.forEach(input_element => {

            helper.togglePreloader(input_element, true);

            let data = {
                field: input_element.name,
                value: input_element.value
            };

            axios.post('/user/save', data)
                .then(response => {
                    display_element.querySelector('span').innerHTML = input_element.value;

                    display_element.classList.remove('d-none');
                    edit_element.classList.add('d-none');

                    helper.togglePreloader(input_element, false);
                })
                .catch(response => {
                    console.log(response);
                });

        });
    }

    addAddress(element) {

        let addresses_element = document.querySelector('.addresses');

        let copy_element = addresses_element.querySelector('.copy').cloneNode(true);

        copy_element.classList.remove('d-none');

        copy_element.classList.remove('copy');
        addresses_element.append(copy_element);

        let addresses_elements = addresses_element.querySelectorAll('.form-group-flex:not(.copy)');

        if(addresses_elements.length >= 3) {
            element.classList.add('d-none');
        }
    }

    saveAddresses(element) {

        let address_elements = document.querySelectorAll('.addresses .form-group-flex:not(.copy)');

        let data = {
            addresses: []
        };

        address_elements.forEach((address_element, index) => {
            let input_element = address_element.querySelector('input');

            data['addresses'][index] = input_element.value;
        });

        helper.togglePreloader(element, true);

        axios.post('/user/delivery/save', data)
            .then(response => {

                let data = response.data;

                window.notification.notify(data.type, data.message);
            })
            .catch(response => {
                console.log(response);
            })
            .finally(() => {
                helper.togglePreloader(element, false);
            });
    }
}
export default User;
