
class Product{

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
            console.log(resp.message);
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

    searchInit(){
        var self = this;

        if(document.getElementById("search")){
            var el = document.getElementById("search");
            var searchFn = helper.debounce(function(e) {
                self.search();
            }, 400);
            el.addEventListener("keydown", searchFn);
            el.addEventListener("paste", searchFn);
            el.addEventListener("delete", searchFn);
        }
    }

    search() {
        if (isXHRloading) {
            return;
        }
        isXHRloading = true;
        var dReq = new XMLHttpRequest();
        dReq.onreadystatechange = function (e) {
            if (dReq.readyState === 4) {
                var resp = JSON.parse(this.responseText);
                if (dReq.status === 200) {
                    console.log(123);
                } else {
                    //notification.notify('error', resp.message);
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

        dReq.open("get", '/store/search', true);
        dReq.setRequestHeader('X-CSRF-TOKEN', token.content);
        dReq.send();
        isXHRloading = false;
    }

}
export default Product;
