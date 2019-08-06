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
            rebuildLinks();

        }).catch(function (error) {
                // handle error
                console.log(error);
        }).finally(function () {
                // always executed
        });
    }
}
export default AxForm;