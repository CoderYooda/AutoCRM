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

    pick(id, name, event) {
        var selects = document.getElementsByClassName('category_select');
        [].forEach.call(selects, function(elem){
            var str = '<option value="' + id + '">' + name + '</option selected>';
            elem.innerHTML = str;
        });
        notification.notify( 'success', 'Категория выбрана');
        closeDialog(event);
    };

    remove(id) {
        if (isXHRloading) { return; }
        var dReq = new XMLHttpRequest();
        isXHRloading = true;
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


        dReq.open("post", 'categories/remove=' + id, true);
        dReq.setRequestHeader('X-CSRF-TOKEN', token.content);
        dReq.send();
    };
}
export default Category;
