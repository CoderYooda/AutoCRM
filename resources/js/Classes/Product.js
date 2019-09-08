
class Product{


    initDialog(){

    }

    remove(id) {
        if (isXHRloading) { return; }
        isXHRloading = true;
        var dReq = new XMLHttpRequest();
        dReq.onreadystatechange = function (e) {
            if (dReq.readyState === 4) {
                var resp = JSON.parse(this.responseText);
                if(dReq.status === 200){
                    var element = document.getElementById('product_'+resp.product_id);
                    notification.notify( 'success', resp.message);
                    element.remove();
                }else{
                    notification.notify( 'error', resp.message);
                }
            }
        };
        dReq.onerror = function () {
            var resp = JSON.parse(this.responseText);
            isXHRloading = false;
        };
        dReq.onload = function () {
            var resp = JSON.parse(this.responseText);
            //document.getElementById('category_list').innerHTML = resp.html;
            isXHRloading = false;
        };
        dReq.open("post", 'product/'+id+'/delete', true);
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
    }

    add(id, event, referal = null){
        var list;

        if(referal != null && document.getElementById(referal).length > 0){
            var cont = document.getElementById(referal);
            list = cont.getElementsByClassName('product_list');
        } else {
            list = document.getElementsByClassName('product_list');
        }

        isXHRloading = true;


        axios({
            method: 'post',
            url: 'product/'+ id +'/addtolist',
            data: null
        }).then(function (resp) {
            [].forEach.call(list, function(elem){
                var element = document.getElementById('product_selected_' + resp.data.id);
                if(element != null){
                    notification.notify('error', 'Товар уже в списке');
                } else {

                    var tbody = document.createElement('tbody');
                    tbody.innerHTML = resp.data.html;

                    elem.prepend(tbody.firstChild);

                    // var div = element.closest('.addable').querySelector('.phones');
                    // elem.innerHTML = elem.innerHTML + resp.data.html;
                    notification.notify( 'success', 'Товар добавлен к списку');
                }
            });

        }).catch(function (error) {

        }).finally(function () {
            isXHRloading = false;
        });
    };

    removeListElement(elem){
        elem.closest('.product_list_elem').remove();
    }



    activeTabInit(){

    }





}
export default Product;
