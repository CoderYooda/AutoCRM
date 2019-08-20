
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
                self.search(e);
            }, 400);
            el.addEventListener("keydown", searchFn);
            el.addEventListener("paste", searchFn);
            el.addEventListener("delete", searchFn);
        }
        var update_link = document.getElementsByClassName('update_url');
        var search = getQueryVar('search');
        if(search == 'undefined'){
            search = '';
        }
        [].forEach.call(update_link, function(elem){
            helper.insertParam(elem, 'search', search);
        });
    }

    activeTabInit(){

    }

    checkTrinity(search_str){
        isXHRloading = true;
        var dReq = new XMLHttpRequest();
        dReq.onreadystatechange = function (e) {
            if (dReq.readyState === 4) {
                var resp = JSON.parse(this.responseText);
                if (dReq.status === 200) {
                    var badge = '<b class="badge badge-sm badge-pill warn">' + resp.brands.count + '</b>';
                    document.querySelector('#provider-tab .nav-badge').innerHTML = badge;
                } else {
                    //notification.notify('error', resp.message);
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
        var badge = '<i class="fa fa-gear fa-spin"></i>';
        document.querySelector('#provider-tab .nav-badge').innerHTML = badge;
        dReq.open("get", '/providers/trinity/search_brands?search=' + search_str, true);
        dReq.setRequestHeader('X-CSRF-TOKEN', token.content);
        dReq.send();
    }

    search(e) {
        if (isXHRloading) {
            return;
        }
        var active_tab = getQueryVar('active_tab');
        if(active_tab == 'undefined'){
            active_tab = 'store';
        }
        if(e.target.value.length < 1){
            goto('/store?active_tab=' + active_tab + '&target=ajax-tab-content');
        } else {
            goto('/store?active_tab=' + active_tab + '&view_as=json&target=ajax-table&search=' + e.target.value);
        }
        this.checkTrinity(e.target.value);
    }

}
export default Product;
