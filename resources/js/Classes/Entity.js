// Класс описывающий стандартные действия сущностей.

class Entity {

    remove(tag, id, object = null) { // Удаление элемента списка с подтверждением
        if (isXHRloading) {
            return;
        }
        let data = {};
        data.ids = null;
        if (Array.isArray(id)) {
            data.ids = id;
            id = 'array'
        }
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
                axios({
                    method: 'POST',
                    url: tag + '/' + id + '/delete',
                    data: data,
                }).then(function (resp) {
                    let type = 'success';
                    if (resp.data.type != null) {
                        type = resp.data.type;
                    }
                    if (object === null) {
                        var element = document.getElementById(tag + '_' + resp.data.id);

                        if (type === 'success') {
                            element.remove();
                        }
                        ;
                    } else {
                        object.table.deleteRow(resp.data.id);
                        object.table.setData('/' + object.active_tab + '/tabledata', object.prepareDataForTable());
                    }

                    if (resp.data.event) {
                        let event = new Event(resp.data.event, {bubbles: true});
                        document.dispatchEvent(event);
                        console.log("Событие " + resp.data.event + " объявлено");
                    }
                    notification.notify(type, resp.data.message);
                });
            } else {
            }
        });
    };

    restore(tag, id, object = null) { // Восстановление элемента списка с подтверждением
        if (isXHRloading) {
            return;
        }
        let data = {};
        data.ids = null;
        if (Array.isArray(id)) {
            data.ids = id;
            id = 'array'
        }
        Swal.fire({
            title: 'Вы уверены?',
            text: "восстановение",
            type: 'warning',
            animation: false,
            showCancelButton: true,
            cancelButtonText: 'Отменить',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Восстановить!'
        }).then((result) => {
            if (result.value) {
                axios({
                    method: 'POST',
                    url: tag + '/' + id + '/restore',
                    data: data,
                }).then(function (resp) {
                    let type = 'success';
                    if (resp.data.type != null) {
                        type = resp.data.type;
                    }

                    if (resp.data.event) {
                        let event = new Event(resp.data.event, {bubbles: true});
                        document.dispatchEvent(event);
                        console.log("Событие " + resp.data.event + " объявлено");
                    }
                    notification.notify(type, resp.data.message);
                });
            } else {
            }
        });
    };

    addProductToList(elem_or_id, object, type) { // Добавление элемента в список
        let article_id = null;
        let focus = true;
        if (Number.isInteger(elem_or_id)) {
            article_id = elem_or_id;
            focus = false;
        } else {
            article_id = elem_or_id.closest('.list-item').dataset.article_id;
        }

        object.touch();
        let store_id = false;
        if (!Number.isInteger(elem_or_id)) {
            if (elem_or_id.closest('.dialog').querySelector('input[name=store_id]') != null) {
                let store_id = elem_or_id.closest('.dialog').querySelector('input[name=store_id]').value;
            }
            let count_elem = elem_or_id.closest('.list-item').querySelector('input[name="count"]');
        } else {
            store_id = window.store_id;
        }
        let count = 1;
        window.axios({
            method: 'post',
            url: 'product/addtolist',
            data: {
                refer: object.root_dialog.id,
                type: type,
                article_id: article_id,
                store_id: store_id,
                count: count,
            }
        }).then(function (resp) {
            let isset = object.items.map(function (e) {
                return e.id;
            }).indexOf(resp.data.product.id);
            if (Number.isInteger(elem_or_id)) {
                if (isset < 0) {
                    object.addItem({
                        id: resp.data.product.id,
                        html: resp.data.html
                    }, resp.data.product.id);
                    if (focus) {
                        object.root_dialog.querySelector('.price_elem:last-child').focus();
                    }
                } else {
                    let item = object.items.map(function (e) {
                        return e.id;
                    }).indexOf(resp.data.product.id);
                    object.items[item].count++;

                    let increment_element = object.root_dialog.querySelector('#product_selected_' + object.items[item].id).querySelector('.count_elem');

                    increment_element.value = Number.parseInt(increment_element.value) + 1;

                    object.recalculate();
                }
            } else {
                if (isset < 0) {
                    object.addItem({
                        id: resp.data.product.id,
                        html: resp.data.html
                    }, resp.data.product.id);
                    if (focus) {
                        object.root_dialog.querySelector('.price_elem:last-child').focus();
                    }
                } else {
                    window.notification.notify('error', 'Товар уже в списке');
                }
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
