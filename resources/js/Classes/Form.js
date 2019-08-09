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
            if(response.data.container){
                var container = document.getElementById(response.data.container);
                if(container){
                    container.innerHTML = response.data.html;
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
                for(var error_stack in error.response.data.messages){
                    // console.log(dialog);
                    // if(dialog){
                    //     var input = dialog.getElementsByName(error_stack);
                    // } else{
                    //     var input = document.getElementsByName(error_stack);
                    // }
                    var input = document.getElementsByName(error_stack);
                    var iteration = 0;
                    Array.prototype.forEach.call(input, function(el) {
                        el.classList.add('is-invalid');
                        var node = helper.createElementFromHTML('<small class="nv-helper form-text text-muted">' + error.response.data.messages[error_stack][iteration] + '</small>');
                        iteration++;
                        el.parentNode.appendChild(node);
                    });

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
