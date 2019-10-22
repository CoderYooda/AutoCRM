
// Класс описывающий стандартные действия сущностей. Является абстрактным.

class Entity{

    remove(tag, id) {
        if (isXHRloading) { return; }
        Swal.fire({
            title: 'Вы уверены?',
            text: "действие необратимо",
            type: 'warning',
            animation: false,
            showCancelButton: true,
            cancelButtonText: 'Отменить',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Удалить!'
        }).then((result) => {
            if (result.value) {
                isXHRloading = true;
                axios({
                    method: 'POST',
                    url: tag + '/' + id + '/delete',
                }).then(function (resp) {
                    var element = document.getElementById(tag + '_' + resp.data.id);
                    let type = 'success';
                    if(resp.data.type != null){
                        type = resp.data.type;
                    }
                    if(type === 'success'){
                        element.remove();
                    };
                    if(resp.data.event){
                        let event = new Event(resp.data.event, {bubbles: true});
                        document.dispatchEvent(event);
                        console.log("Событие " + resp.data.event + " объявлено");
                    }
                    notification.notify( type, resp.data.message);


                }).catch(function (error) {
                    console.log(error);
                    notification.notify( 'error', error.data.message);
                }).finally(function(){

                    isXHRloading = false;
                });
            } else {
            }
        });







    };
}
export default Entity;
