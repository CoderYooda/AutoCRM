class Category{
    select(id) {
        if (isXHRloading) { return; }
        var dReq = new XMLHttpRequest();
        isXHRloading = true;
        dReq.onload = function () {
            var resp = JSON.parse(this.responseText);
            document.getElementById('category_list').innerHTML = resp.html;
            isXHRloading = false;
        };
        dReq.onerror = function () {
            isXHRloading = false;
        };

        dReq.open("get", 'categories/dialog/enter?category_id=' + id, true);
        dReq.send();
    };

    pick(id, name, event, referal = null){
        var selects;

        if(referal != null && document.getElementById(ref).length > 0){
            var cont = document.getElementById(ref);
            selects = cont.getElementsByClassName('category_select');
        } else {
            selects = document.getElementsByClassName('category_select');
        }

        [].forEach.call(selects, function(elem){
            elem.value = id;
            var str = '<option value="' + id + '">' + name + '</option selected>';
            elem.innerHTML = str;
        });
        notification.notify( 'success', 'Категория выбрана');
        closeDialog(event);
    };

    remove(id) {
        if (isXHRloading) { return; }
        isXHRloading = true;
        var dReq = new XMLHttpRequest();
        dReq.onreadystatechange = function (e) {
            if (dReq.readyState === 4) {
                var resp = JSON.parse(this.responseText);
                if(dReq.status === 200){
                    console.log('category_id='+resp.category_id);
                    var element = document.getElementById('category_'+resp.category_id);
                    notification.notify( 'success', resp.message);
                    element.remove();
                }else{
                    notification.notify( 'error', resp.message);
                }
            }
        };
        dReq.onerror = function () {
            var resp = JSON.parse(this.responseText);
            console.log(resp.message);
            isXHRloading = false;
        };
        dReq.onload = function () {
            var resp = JSON.parse(this.responseText);
            //document.getElementById('category_list').innerHTML = resp.html;
            isXHRloading = false;
        };
        dReq.open("post", 'categories/'+id+'/delete' , true);
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
export default Category;
