class AxForm {

    send(elem, callback = null, url = null, dataset = null, config = null, files = null){

        window.event.preventDefault();

        if(elem) helper.togglePreloader(elem, true);

        let form = elem.closest("form");
        let data = new FormData(form);

        if(dataset != null){
            for (const [key, value] of Object.entries(dataset)) {
                data.append(key, value);
            }
        }

        if(files){
            files.forEach((file, index) => {
                data.append('files[' + index + ']', file);
            });
        }

        if(url == null){
            url = form.getAttribute("action");
        }

        axios({
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            method: form.getAttribute("method"),
            url: url,
            data: data,
            config: config
        }).then(response => {

            if(response.data.redirect){
                goto(response.data.redirect);
            } else {
                if(response.data.container){
                    var container = document.getElementById(response.data.container);
                    if(container){
                        container.innerHTML = response.data.html;
                    }
                }
            }

            if(response.data.message){
                if(response.data.type && response.data.type == 'error'){
                    notification.notify( 'error', response.data.message);
                } else {
                    notification.notify( 'success', response.data.message);
                }
            }
            if(callback != null) callback(response);
            //rebuildLinks();
        }).catch(error => {

            helper.removeElementsByClass('nv-helper');
            helper.removeClassesByClass('is-invalid');

            if(error.response && error.response.data.system_message){
                try {
                    form.querySelector('.system_message').innerHTML = '<div class="error-message">' + error.response.data.system_message + '</div>';
                } catch (e) {
                    console.log(e);
                }

            }

            let messages = {};
            if(error.response && error.response.data){
                if(error.response.data.messages){
                    messages = error.response.data.messages;
                } else if(error.response.data.errors){
                    messages = error.response.data.errors;
                }
            }


            if(error.response && error.response.data &&(error.response.data.messages || error.response.data.errors)){
                let all_butt_butts = document.querySelectorAll(".helper_danger");
                all_butt_butts.forEach(el => {
                    el.setAttribute("style", "");
                });

                for(let error_stack in messages){

                    let error_stack_arr = error_stack.split('.');

                    let error_prepared = '';
                    Array.prototype.forEach.call(error_stack_arr, function(el, index) {
                        error_prepared += (index > 0) ? '[' + el + ']' : el;
                    });

                    let el = elem.closest('form').querySelector('[data-error="' + error_prepared + '"]');

                    if(el !== null){

                        let text_error = messages[error_stack][0];

                        el.classList.add('is-invalid');
                        el.innerHTML = text_error;
                        window.notification.notify( 'error', text_error);
                    }
                    else {
                        console.error('Ошибка вывода уведомления об ошибке: '  + error_prepared);
                    }
                }
            }

            if(callback != null) callback(error);
        }).finally(() => {
            if(elem) helper.togglePreloader(elem, false);
        });
    }
}

export default AxForm;
