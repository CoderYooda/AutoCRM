
// Класс описывающий стандартные действия сущностей. Является абстрактным.

class Entity{

    remove(tag, id) {
        if (isXHRloading) { return; }
        isXHRloading = true;
        var dReq = new XMLHttpRequest();
        dReq.onreadystatechange = function (e) {
            if (dReq.readyState === 4) {
                var resp = JSON.parse(this.responseText);
                if(dReq.status === 200){
                    var element = document.getElementById(tag + '_' + resp.id);
                    notification.notify( 'success', resp.message);
                    element.remove();
                }else{
                    notification.notify( 'error', resp.message);
                }
            }
        };
        dReq.onerror = function () {
            //var resp = JSON.parse(this.responseText);
            isXHRloading = false;
        };
        dReq.onload = function () {
            //var resp = JSON.parse(this.responseText);
            //document.getElementById('category_list').innerHTML = resp.html;
            isXHRloading = false;
        };
        dReq.open("post", tag + '/' + id + '/delete' , true);
        dReq.setRequestHeader('X-CSRF-TOKEN', token.content);

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
                dReq.send();
            } else {
                dReq.abort();
                isXHRloading = false;
            }
        });
    };
}
export default Entity;
