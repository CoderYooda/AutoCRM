import Modal from '../Modal/Modal.js';

class ProductDialog extends Modal {

    constructor(dialog) {
        super(dialog);
        console.log('Окно создания товара инициализировано');
        this.provider_search_container = this.root_dialog.querySelector('#provider_search_container');
        this.provider_search_cont = this.root_dialog.querySelector('#provider_search_container .cont');
        this.article_input = this.root_dialog.querySelector('input[name=article]');
        this.init();
    }

    init() {
        let object = this;
        // document.addEventListener("ProductStored", function(){
        //     object.finitaLaComedia();
        // });
        let focused = document.getElementById('product_dialog_focused');
        if (focused) {
            focused.focus();
            focused.select();
        }
        helper.initTabs('product_tabs');
        var fn = window.helper.debounce(function (e) {
            object.fapiSearch();
        }, 800);

        object.root_dialog.getElementsByTagName('form')[0].addEventListener('keydown', function (e) {
            if (e.which == 13) {
                e.preventDefault();
                object.saveAndClose(object.root_dialog.getElementsByTagName('form')[0]);
            }
        });

        ///Вешаем обрабочик на поле скидки/////////////
        this.article_input.addEventListener("keydown", fn);
        this.article_input.addEventListener("paste", fn);
        this.article_input.addEventListener("delete", fn);
    }

    save(elem) {
        if (window.isXHRloading) return;

        window.axform.send(elem, (e) => {
            if (e.status === 200) this.finitaLaComedia(true);
        });
    }

    fapiSearch() {

        document.getElementById('trin_preload').classList.remove('hide');

        window.axios({
            method: 'get',
            url: '/api/manufacturers/' + this.article_input.value,
        }).then(response => {
            let data = response.data;

            this.provider_search_container.classList.add('show');

            let html = '';

            Object.keys(data).forEach(key => {
                let m_name = data[key].m_name;
                let m_id = data[key].m_id;
                let p_article = data[key].p_article;
                let p_name = data[key].p_name;

                html += '<div class="tr_result" data-ident="' + p_name + '" data-article="' + p_article + '" data-producer="' + m_name + '" onclick="window.productDialog.appendArticle(this)">' +
                    '<span class="article">' + p_name + '</span>' +
                    '<span class="article">Артикул: ' + p_article + '</span>' +
                    '<span class="article">Производитель: ' + m_name + '</span>' +
                    '</div>'
            });

            this.provider_search_cont.innerHTML = html;

            let search_element = this.current_dialog.querySelector('.empty_search');

            if(html.length) {
                search_element.classList.add('d-none');
            }
            else {
                search_element.classList.remove('d-none');
            }

            // var badge = '<b class="badge badge-sm badge-pill warn">' + resp.data.brands.count + '</b>';
            // let providertab = document.querySelector('#provider-tab .nav-badge');
            // if(providertab){
            //     providertab.innerHTML = badge;
            // }
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            document.getElementById('trin_preload').classList.add('hide');
            window.isXHRloading = false;
        });
    }

    selectArticle(input) {
        if (input.value.length) {
            this.root_dialog.querySelector('#provider_search_container').classList.add('show');
        }
    }

    appendArticle(elem) {
        this.root_dialog.querySelector('input[name=article]').value = elem.dataset.article;
        this.root_dialog.querySelector('input[name=name]').value = elem.dataset.ident;
        this.root_dialog.querySelector('input[name=new_supplier_name]').value = elem.dataset.producer;
        this.root_dialog.querySelector('button[name=supplier_id]').innerHTML = elem.dataset.producer;

        console.log(this.root_dialog.querySelector('#provider_search_container'));

        this.root_dialog.querySelector('#provider_search_container').classList.remove('show');
    }

    openSelectCategoryDialog(category_selected = null, root_category = null) {
        let category_add = '';
        let root_add = '';
        if (category_selected) {
            category_add = '&category_id=' + category_selected
        }
        if (root_category) {
            root_add = '&root_category=' + root_category
        }
        window.openDialog('selectCategory', '&refer=' + this.root_dialog.id + category_add + root_add);
    }

    openSelectSupplierDialog() {
        window.openDialog('selectSupplier', '&refer=' + this.root_dialog.id);
    }

    selectCategory(id) {
        var object = this;
        window.axios({
            method: 'post',
            url: 'category/' + id + '/select',
            data: {refer: this.root_dialog.id}
        }).then(function (resp) {

            let select = object.root_dialog.querySelector('button[name=category_id]');
            let input = object.root_dialog.querySelector('input[name=category_id]');
            let str = resp.data.name;
            input.value = resp.data.id;
            select.innerHTML = str;
            window.notification.notify('success', 'Категория выбрана');
            document.dispatchEvent(new Event('CategorySelected', {bubbles: true}));
            console.log("Событие CategorySelected вызвано");
            //closeDialog(event);

        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    };

    selectSupplier(id) {
        var object = this;
        window.axios({
            method: 'post',
            url: 'suppliers/' + id + '/select',
            data: {refer: this.root_dialog.id}
        }).then(function (resp) {
            let select = object.root_dialog.querySelector('button[name=supplier_id]');
            let input = object.root_dialog.querySelector('input[name=supplier_id]');
            let str = resp.data.name;
            input.value = resp.data.id;
            select.innerHTML = str;
            window.notification.notify('success', 'Производитель выбран');
            document.dispatchEvent(new Event('SupplierSelected', {bubbles: true}));
            console.log("Событие SupplierSelected вызвано");
            //closeDialog(event);

        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    };

    openCategoryModal(category_selected = null) {
        window.openDialog('Dialog', '&refer=' + this.root_dialog.id + '&category_selected=' + category_selected);
    }

}

export default ProductDialog;
