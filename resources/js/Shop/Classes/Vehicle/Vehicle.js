import BBSlider from '../../../../modules/bbslider/bbslider.min';
import Tab from "../Tab";

class Vehicle {

    constructor() {
        this.initSlider();
    }

    changeMark(element) {

        let form_element = element.closest('form');

        let mark_element = form_element.querySelector('#mark');

        let mark_id = mark_element.options[mark_element.selectedIndex].value;

        // this.clearModel();
        // this.clearModify();

        //Список моделей
        window.axios({
            method: 'get',
            url: '/models/' + mark_id + '/list',
        })
            .then(response => {

                let model_element = form_element.querySelector('#model');

                let data = response.data;

                model_element.innerHTML = '';

                Object.values(data).forEach(model => {

                    let option = document.createElement('option');

                    option.value = model.value;
                    option.innerHTML = model.label;

                    model_element.append(option);
                });

                this.changeModel(element);
            });
    }

    changeModel(element) {

        let form_element = element.closest('form');

        let mark_element = form_element.querySelector('#mark');
        let mark_id = mark_element.options[mark_element.selectedIndex].value;

        let model_element = form_element.querySelector('#model');
        let model_id = model_element.options[model_element.selectedIndex].value;

        this.clearModify(element);

        window.axios({
            method: 'get',
            url: '/modifies/' + mark_id + '/' + model_id + '/list',
        })
            .then(response => {

                let data = response.data;

                let modify_element = form_element.querySelector('#modify');

                Object.values(data).forEach(modify => {
                    let option = document.createElement('option');

                    option.value = modify.value;
                    option.innerHTML = modify.label;

                    modify_element.append(option);
                });
            });
    }

    clearModify(element) {

        let form_element = element.closest('form');

        let modify_element = form_element.querySelector('#modify');

        modify_element.innerHTML = '';
    }

    update(element, vehicle_id) {
        if(element.tagName.toLowerCase() != 'form') {
            element = element.closest('form');
        }

        let data = new FormData(element);

        data.append('_method', 'PATCH');

        helper.removeClassesByClass('is-invalid');

        helper.togglePreloader(element, true);

        axios.post('/user/vehicles/' + vehicle_id, data)
            .then(response => {

                this.updateSlider(response.data.html);

                document.querySelector('[name="vin_code"]').value = '';

                window.edit_vehicle.remove();
            })
            .catch(error => {

                let data = error.response.data;

                Object.keys(data.messages).forEach(message => {

                    let group_element = element.querySelector('[name="' + message + '"]').closest('.form-group-flex');
                    group_element.classList.add('is-invalid');

                    let span_element = group_element.querySelector('.error_text');
                    span_element.innerHTML = data.messages[message][0];
                });
            })
            .finally(()=> {
                helper.togglePreloader(element, false);
            });
    }

    save(element) {

        if(element.tagName.toLowerCase() != 'form') {
            element = element.closest('form');
        }

        let data = new FormData(element);

        helper.removeClassesByClass('is-invalid');

        helper.togglePreloader(element, true);

        axios.post('/user/vehicles', data)
            .then(response => {

                this.updateSlider(response.data.html);

                document.querySelector('[name="vin_code"]').value = '';
            })
            .catch(error => {

                let data = error.response.data;

                Object.keys(data.messages).forEach(message => {

                    let group_element = element.querySelector('[name="' + message + '"]').closest('.form-group-flex');
                    group_element.classList.add('is-invalid');

                    let span_element = group_element.querySelector('.error_text');
                    span_element.innerHTML = data.messages[message][0];
                });
            })
            .finally(()=> {
                helper.togglePreloader(element, false);
            });
    }

    edit(element, vehicle_id) {

        event.preventDefault();

        helper.togglePreloader(element, true);

        axios({
            method: 'GET',
            url: '/user/vehicles/' + vehicle_id + '/edit'
        })
        .then(response => {

            window.edit_vehicle = createModal('Редактирование транспорта', response.data.html);

            $(document).ready(() => {
                $('#auth-tabs > select').select2();
            });

        })
        .catch(function (error) {
            console.log(error)
        })
        .finally(() => {
            helper.togglePreloader(element, false);
        });
    }

    remove(element, vehicle_id) {

        element.closest('.vehicle_element').remove();

        let vehicle_elements = document.querySelectorAll('.vehicle_element');

        if(vehicle_elements.length == 0) {
            document.querySelector('.empty_table').classList.remove('d-none');
        }

        let data = {
            vehicle_id: vehicle_id,
            _method: 'DELETE'
        };

        axios.post('/user/vehicles', data)
            .then(response => {
                this.updateSlider(response.data.html);
            })
            .catch(response => {
                console.log(response);
            });
    }

    initSlider() {

        let vehicle_elements = document.querySelectorAll('.vehicle_element');

        if(vehicle_elements.length == 0) return;

        let classes = document.querySelector('.controls').classList;

        vehicle_elements.length > 3 ? classes.remove('d-none') : classes.add('d-none');

        window.garageSlider = new BBSlider({
            selector: '.vehicle_list',
            duration: 600,
            easing: 'ease-out',
            perPage: 3,
            startIndex: 0,
            draggable: true,
            multipleDrag: true,
            threshold: 20,
            loop: false,
            rtl: false,
            onInit: () => {},
            onChange: () => {},
        });
    }

    updateSlider(html) {
        let slider_element = document.querySelector('.slider_container');

        slider_element.innerHTML = html;

        this.initSlider();
    }
}
export default Vehicle;
