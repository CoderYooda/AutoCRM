class AxForm{

    send(elem, callback = null, url = null, dataset = null, config = null, files = null){

        window.event.preventDefault();

        togglePreloader(elem, true);

        let dialog = elem.closest(".dialog");
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
        }).then(function (response) {

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

            if(dialog){
                //closeDialog(event, dialog.getAttribute("id"));
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
        }).catch(function (error) {

            var elements = document.getElementsByClassName('is-invalid');
            Array.prototype.forEach.call(elements, function(el) {
                if(el._tippy){
                    el._tippy.destroy();
                }
            });

            helper.removeElementsByClass('nv-helper');
            helper.removeClassesByClass('is-invalid');

            if(error.response && error.response.data.system_message){
                try {
                    dialog.querySelector('.system_message').innerHTML = '<div class="error-message">' + error.response.data.system_message + '</div>';
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
                var all_butt_butts = document.querySelectorAll(".helper_danger");
                Array.prototype.forEach.call(all_butt_butts, function(el) {
                    el.setAttribute("style", "");
                });



                for(var error_stack in messages){

                    var error_stack_arr = error_stack.split('.');

                    var iteration = 0;
                    var error_prepared = '';
                    Array.prototype.forEach.call(error_stack_arr, function(el) {
                        if(iteration > 0){
                            el = '[' + el + ']';
                            error_prepared += el;
                        } else {
                            error_prepared = el;
                        }
                        iteration++;
                    });

                    console.log(error_prepared);

                    try{
                        var el = dialog.querySelector('[name="'+error_prepared+'"]:not([type="hidden"])');
                    } catch (e) {
                        var el = null;
                    }

                    if(el === null){

                        var el = elem.closest('form').querySelector('[data-error="' + error_prepared + '"]');

                        if(el == null) {
                            var el = elem.closest('form').querySelector('[name="'+error_prepared+'"]:not([type="hidden"])');
                        }
                    }

                    if(el !== null && el.closest(".tab-pane")){
                        var tab_container_id = el.closest(".tab-pane").getAttribute('id');
                        var tab_butt = document.querySelector("a[href='#" + tab_container_id + "']");
                        tab_butt.querySelector(".helper_danger").setAttribute("style", "display:block!important;");
                    }

                    if(el !== null && el.getAttribute('type') != 'hidden'){

                        el.classList.add('is-invalid');
                        tippy(el, {
                            content: messages[error_stack][0],
                            placement: 'bottom'
                        });
                        window.notification.notify( 'error', messages[error_stack][0]);
                        // var node = helper.createElementFromHTML('<small class="nv-helper form-text text-muted">' + error.response.data.messages[error_stack] + '</small>');
                        // el.parentNode.appendChild(node);
                    }

                }
            }
            // if(error.response && messages){
            //
            // }
            if(callback != null) callback(error.response);
        }).finally(() => {
            togglePreloader(elem, false);
        });
    }
}
export default AxForm;
