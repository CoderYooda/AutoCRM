import Modal from '../Modal/Modal.js';
import Tabs from "../../Tools/Tabs";

class ProductDialog extends Modal {

    constructor(dialog, response) {
        super(dialog);
        console.log('Окно создания товара инициализировано');
        this.provider_search_container = this.root_dialog.querySelector('#provider_search_container');
        this.provider_search_cont = this.root_dialog.querySelector('#provider_search_container .cont');
        this.article_input = this.root_dialog.querySelector('input[name=article]');

        this.product = response.product;

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
        helper.initTabs('product_tabs', false);
        let fn = window.helper.debounce(function (e) {
            object.fapiSearch();
        }, 800);

        object.root_dialog.getElementsByTagName('form')[0].addEventListener('keydown', function (e) {
            if (e.which == 13) {
                e.preventDefault();
                object.saveAndClose(object.root_dialog.getElementsByTagName('form')[0]);
            }
        });

        this.field_id = this.product ? this.product.specifications.length : 0;

        ///Вешаем обрабочик на поле скидки/////////////
        this.article_input.addEventListener("keydown", fn);
        this.article_input.addEventListener("paste", fn);
        this.article_input.addEventListener("delete", fn);

        this.initShopDiscountRecalculate();

        this.linked();
    }

    initShopDiscountRecalculate() {

        this.recalculateShopDiscountDebounce = window.helper.debounce( (e) => {
            this.recalculateShopDiscount();
        }, 500);

        let stocks_element = this.current_dialog.querySelector('.stocks');

        if(stocks_element) {
            let discount_element = stocks_element.querySelector('.discount');

            discount_element.addEventListener('keyup', this.recalculateShopDiscountDebounce);
            discount_element.addEventListener('paste', this.recalculateShopDiscountDebounce);
            discount_element.addEventListener('delete', this.recalculateShopDiscountDebounce);

            let price_element = stocks_element.querySelector('.price');

            price_element.addEventListener('keyup', this.recalculateShopDiscountDebounce);
            price_element.addEventListener('paste', this.recalculateShopDiscountDebounce);
            price_element.addEventListener('delete', this.recalculateShopDiscountDebounce);
        }
    }

    recalculateShopDiscount() {

        let stocks_element = this.current_dialog.querySelector('.stocks');

        let price_element = stocks_element.querySelector('.price');
        let discount_element = stocks_element.querySelector('.discount');
        let total_element = stocks_element.querySelector('.total');
        let type_element = stocks_element.querySelector('.type');

        let price = parseFloat(price_element.value);
        let discount = parseFloat(discount_element.value);
        let total = 0;

        if(type_element.value == 1) { //Если скидка в процентах

            if(discount < 0 || discount > 100) discount = discount_element.value = 0;

            total = price - (price / 100 * discount);
        }
        else {

            if(discount < 0 || discount > price) discount = discount_element.value = 0;

            total = price - discount;
        }

        total_element.value = total;
    }


    linked()
    {
        if(this.current_dialog.querySelector('#shop_tabs')) new Tabs('shop_tabs');
    }

    toggleStock(element) {

        let target_element = this.current_dialog.querySelector('.stocks');

        target_element.classList.toggle('d-none');
    }

    save(elem) {
        if (window.isXHRloading) return;

        window.axform.send(elem, (e) => {
            if (e.status === 200) this.finitaLaComedia(true);
        });
    }

    changeFile(input) {

        let data = new FormData();

        data.append('image[]', input.files[0]);
        data.append('refer', 'shop');

        let image_element = this.current_dialog.querySelector('.image');
        let image_input = this.current_dialog.querySelector('[name="image_id"]');
        let preloader_element = image_input.closest('div');

        togglePreloader(preloader_element, true);

        axios({
            method: 'POST',
            url: '/system/image_upload',
            data: data
        }).then((response) => {

            let image_id = response.data.images[0].id;
            let image_url = response.data.images[0].url;

            image_element.src = image_url;

            image_input.value = image_id;
        })
        .finally(() => {
            togglePreloader(preloader_element, false);
        });
    }

    addSpecificationField(element) {

        let list_element = this.current_dialog.querySelector('.specifications');

        let copy_element = list_element.querySelector('.copy').cloneNode(true);

        copy_element.classList.remove('d-none');

        let input_elements = copy_element.querySelectorAll('input');

        input_elements.forEach((input, index) => {

            if(index == 0) input.name = 'shop[specifications][' + this.field_id + '][label]';
            if(index == 1) input.name = 'shop[specifications][' + this.field_id + '][value]';

            input.disabled = false;
        });

        this.field_id++;

        list_element.append(copy_element);
    }

    removeSpecification(element) {
        let target_element = element.closest('.element');

        target_element.remove();
    }

    toggleShopSettings(element, store_id) {

        let i_element = element.querySelector('i');

        i_element.classList.toggle('fa-angle-down');
        i_element.classList.toggle('fa-angle-up');

        let target_element = this.current_dialog.querySelector('#toggle_' + store_id);

        target_element.classList.toggle('d-none');
    }

    fapiSearch() {

        document.getElementById('trin_preload').classList.remove('hide');

        this.provider_search_container.classList.add('show');

        window.axios({
            method: 'get',
            url: '/api/manufacturers/' + this.article_input.value,
        }).then(response => {
            let data = response.data;

            let html = '';

            Object.values(data.articles).forEach(item => {
                let m_name = item.brand;
                let p_article = item.article;
                let p_name = item.description;

                html += '<div class="tr_result" data-ident="' + p_name + '" data-article="' + p_article + '" data-producer="' + m_name + '" onclick="window.' + this.current_dialog.id + '.appendArticle(this);">' +
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
        }).catch(function (error) {
            console.log(error);
        }).finally(() => {

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
