class AxForm{

    setActionButtons(boolean, elem){
        let state;
        if(boolean){
            elem.removeAttribute('disabled');
        } else {
            elem.setAttribute('disabled', true);
        }

    }

    send(elem, callback = null){
        let object = this;
        let dialog = elem.closest(".dialog");
        window.event.preventDefault();
        let form = elem.closest("form");
        let data = new FormData(form);
        object.setActionButtons(false, elem);
        axios({
            method: form.getAttribute("method"),
            url: form.getAttribute("action"),
            data: data
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
            callback(response);
            //rebuildLinks();
            object.setActionButtons(true, elem);
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
                    try{
                        var el = dialog.querySelector('[name="'+error_prepared+'"]:not([type="hidden"])');
                    } catch (e) {
                        var el = null
                    }

                    if(el === null){
                        var el = elem.closest('form').querySelector('[name="'+error_prepared+'"]:not([type="hidden"])');
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
            object.setActionButtons(true, elem);
            callback(error.response);
        }).then(function(){
            object.setActionButtons(true, elem);
        });
    }
}
export default AxForm;
