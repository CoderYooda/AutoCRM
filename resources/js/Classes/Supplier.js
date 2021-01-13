class Supplier{

    pick(id, name, event) {
        var selects = document.getElementsByClassName('supplier_select');
        [].forEach.call(selects, function(elem){
            elem.value = id;
            var str = '<option value="' + id + '">' + name + '</option selected>';
            elem.innerHTML = str;
        });
        notification.notify( 'success', 'Производитель выбран');
        closeDialog(event);
    };

    remove(id) {

    };
}
export default Supplier;
