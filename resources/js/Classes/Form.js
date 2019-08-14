class AxForm{
    send(elem){

        var dialog = elem.closest(".dialog");
        window.event.preventDefault();
        var form = elem.closest("form");
        var data = new FormData(form);

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
                closeDialog(event, dialog.getAttribute("id"));
            }
            if(response.data.message){
                notification.notify( 'success', response.data.message);
            }
            rebuildLinks();

        }).catch(function (error) {
            helper.removeElementsByClass('nv-helper');
            helper.removeClassesByClass('is-invalid');
            if(error.response.data.messages){

                var all_butt_butts = document.querySelectorAll(".helper_danger");
                Array.prototype.forEach.call(all_butt_butts, function(el) {
                    el.setAttribute("style", "");
                });

                for(var error_stack in error.response.data.messages){
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
                    var el = dialog.querySelector('[name="'+error_prepared+'"]:not([type="hidden"])');
                    if(el.closest(".tab-pane")){
                        var tab_container_id = el.closest(".tab-pane").getAttribute('id');
                        var tab_butt = document.querySelector("a[href='#" + tab_container_id + "']");
                        tab_butt.querySelector(".helper_danger").setAttribute("style", "display:block!important;");
                    }

                    //var tab = dialog.querySelector('[href='+error_stack+']:not([type="hidden"])');
                    var iteration = 0;
                    //Array.prototype.forEach.call(input, function(el) {
                    if(el.getAttribute('type') != 'hidden'){
                        el.classList.add('is-invalid');
                        var node = helper.createElementFromHTML('<small class="nv-helper form-text text-muted">' + error.response.data.messages[error_stack] + '</small>');
                        iteration++;
                        el.parentNode.appendChild(node);
                    }
                    //});

                }

            }
            if(error.response.data.message){
                notification.notify( 'error', error.response.data.message);
            }
        }).finally(function () {
                // always executed
        });
    }
}
export default AxForm;
