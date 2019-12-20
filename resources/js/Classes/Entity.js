
// Класс описывающий стандартные действия сущностей.

class Entity{

    remove(tag, id) { // Удаление элемента списка с подтверждением
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
                    //console.log(error);
                    notification.notify( 'error', error.message);
                }).finally(function(){

                    isXHRloading = false;
                });
            } else {
            }
        });
    };

    addProductToList(elem, object, type){ // Добавление элемента в список
        let article_id = elem.closest('.list-item').dataset.id;

        let store_id = false;
        if(elem.closest('.dialog').querySelector('input[name=store_id]') != null){
            let store_id = elem.closest('.dialog').querySelector('input[name=store_id]').value;
        }


        let count_elem = elem.closest('.list-item').querySelector('input[name="count"]');
        let count = 1;
        if(count_elem && count_elem !== null){
            count = count_elem.value;
        }
        window.axios({
            method: 'post',
            url: 'product/addtolist',
            data: {
                refer:object.root_dialog.id,
                type:type,
                article_id:article_id,
                store_id:store_id,
                count:count,
            }
        }).then(function (resp) {
            var isset = object.items.map(function(e){
                return e.id;
            }).indexOf(resp.data.product.id);
            if(isset < 0){
                object.addItem({
                    id:resp.data.product.id,
                    html:resp.data.html
                }, resp.data.product.id);
            } else {
                window.notification.notify('error', 'Товар уже в списке');
            }
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            window.isXHRloading = false;
        });
    }

    loadItemsToList(object, entity) { // Добавление элементов в стек при инициальзации списка
        console.log('Загружаем товары');
        window.isXHRloading = true;
        var id = object.root_dialog.dataset.id;
        if (id && id !== 'undefined') {
            window.axios({
                method: 'post',
                url: entity + '/' + id + '/get_' + entity + 's',
                data: {},
            }).then(function (resp) {
                [].forEach.call(resp.data.products, function (elem) {
                    object.items.push({
                        id: elem.id,
                        count: elem.pivot.count,
                        price: elem.pivot.price,
                        total: elem.pivot.total,
                    });

                    let item = object.root_dialog.querySelector('#product_selected_' + elem.id);

                    let inputs = item.getElementsByTagName('input');

                    [].forEach.call(inputs, function (elem) {
                        var fn = window.helper.debounce(function (e) {
                            object.recalculate(e);
                        }, 50);
                        elem.addEventListener("keydown", fn);
                        elem.addEventListener("paste", fn);
                        elem.addEventListener("delete", fn);
                    });

                });
                // object.recalculate();
                // document.body.appendChild(object.root_dialog.getElementsByTagName('form')[0]);
            }).catch(function (error) {
                console.log(error);
            }).then(function () {
                window.isXHRloading = false;
            });
        }
    }


}
export default Entity;
