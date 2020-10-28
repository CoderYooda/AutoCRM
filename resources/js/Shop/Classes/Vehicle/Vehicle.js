class Vehicle {

    changeMark() {

        let mark_element = document.querySelector('#mark');

        let mark_id = mark_element.options[mark_element.selectedIndex].value;

        this.clearModel();
        this.clearModify();

        //Список моделей
        window.axios({
            method: 'get',
            url: '/models/' + mark_id + '/list',
        })
            .then(response => {

                let model_element = document.querySelector('#model');

                let data = response.data;

                model_element.innerHTML = '';

                Object.values(data).forEach(model => {

                    let option = document.createElement('option');

                    option.value = model.value;
                    option.innerHTML = model.label;

                    model_element.append(option);
                });
            });
    }

    clearModel() {

        let model_element = document.querySelector('#model');

        model_element.innerHTML = '';
    }

    changeModel() {

        let mark_element = document.querySelector('#mark');
        let mark_id = mark_element.options[mark_element.selectedIndex].value;

        let model_element = document.querySelector('#model');
        let model_id = model_element.options[model_element.selectedIndex].value;

        // document.querySelector('#model_id').value = model_id;

        this.clearModify();

        window.axios({
            method: 'get',
            url: '/modifies/' + mark_id + '/' + model_id + '/list',
        })
            .then(response => {

                let data = response.data;

                let modify_element = document.querySelector('#modify');

                Object.values(data).forEach(modify => {
                    let option = document.createElement('option');

                    option.value = modify.value;
                    option.innerHTML = modify.label;

                    modify_element.append(option);
                });

                // this.modify_choices.setChoices(response.data);
            });
    }

    clearModify() {
        // this.modify_choices.destroy();

        let modify_element = document.querySelector('#modify');

        modify_element.innerHTML = '';

        // this.modify_choices = new window.choices(modify_element, this.config);
    }

    changeModify() {
        let modify_element = document.querySelector('#modify');
        let modify_id = modify_element.options[modify_element.selectedIndex].value;

        // this.current_dialog.querySelector('#modify_id').value = modify_id;
    }

}
export default Vehicle;
