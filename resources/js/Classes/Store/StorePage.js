import {Contextual, ContextualItem} from "../Contentual";
import Sortable from "sortablejs";
import storeMethods from "./tabs/StoreMethods";
import entranceMethods from "./tabs/EntranceMethods";
import providerStoresMethods from "./tabs/ProviderStoreMethods";
import documentsMethods from "./tabs/DocumentsMethods";
import providerOrdersMethods from "./tabs/ProviderOrdersMethods";
import entranceRefundsMethods from "./tabs/EntranceRefundsMethods";
import shipmentsMethods from "./tabs/ShipmentsMethods";
import refundMethods from "./tabs/RefundMethods";
import clientOrdersMethods from "./tabs/ClientOrdersMethods";
import adjustmentMethods from "./tabs/AdjustmentMethods";
import shopOrdersMethods from "./tabs/ShopOrdersMethods";
import {Table} from "../BBTable";
import Page from "../Page/Page";

const classes = {
    storeMethods,
    entranceMethods,
    providerStoresMethods,
    providerOrdersMethods,
    entranceRefundsMethods,
    shipmentsMethods,
    refundMethods,
    clientOrdersMethods,
    adjustmentMethods,
    documentsMethods,
    shopOrdersMethods
};


class storePage extends Page{

    constructor(){
        super();
        console.log('страница склада инициализировано');
        this.init();
    }

    searcher(){
        this.model.search(arguments);
    }

    baseParams(){
        this.active = true;
        this.active_tab = this.getCurrentActiveTab();
        this.category_id = window.helper.findGetParameter('category_id');
        this.page = 1;
        this.search = null;
        this.tableContextual = null;
        this.selectedData = null;
        this.root_category = 2;
        this.categoryContextual = null;
        this.table = null;
        this.dates = null;
        //  filter parametrs
        this.pay_status = null;
        this.entrance_status = null;
        this.clientorder_status = null;
        this.provider = [];
        this.accountable = [];
        this.client = [];
        this.dates_range = null;
        //Context
        this.tabledata = {};
        this.contextDop = null;
        this.parametr = null;

        this.manufacture_id = null;
        this.manufacture_show = true;
    }

    openSelectPartnerModal(target){
        let cat_id = 1;
        if(target === 'provider'){
            cat_id = 6;
        }else if(target === 'accountable'){
            cat_id = 5;
        }else if(target === 'client'){
            cat_id = 7;
        }

        window.openDialog('selectPartner', '&only_current_category=1&refer=' + 'store&category_id=' + cat_id + '&target=' + target);
    }

    openCategoryModal(){
        let cat_id = this.root_category;
        if(this.category_id != null){
            cat_id = this.category_id;
        }
        window.openDialog('categoryDialog', '&category_select=' + cat_id);
    }

    openProductModal(){
        let cat_id = this.root_category;
        if(this.category_id != null){
            cat_id = this.category_id;
        }
        window.openDialog('productDialog', '&category_select=' + cat_id);
    }

    setField(option, value = null, text, elem = null){
        let object = this;
        object[option] = value;
        document.getElementById(option).value = text;
        if(elem !== null){
            setTimeout(function(){
                elem.closest('.dropdown').classList.remove('show');
            }, 50);

        }
        if(value == null){
            window.notification.notify( 'success', 'Поле очищено');
        }
        this.table.setRequest(option, value);
    }

    clearList(type, container){
        this[type] = [];
        document.getElementById(container).innerHTML = '';
        this.table.setRequest(type, []);
        window.notification.notify( 'success', 'Поле очищено');
    }

    selectPartner(id, target){
        let object = this;
        window.axios({
            method: 'post',
            url: 'partner/'+ id +'/select',
            data: {refer:null}
        }).then(function (resp) {

            if(object[target].includes(resp.data.id)){
                window.notification.notify( 'error', 'Уже имеется в списке');
            } else {
                object[target].push(resp.data.id);
                //let input = document.getElementById(target);
                //input.value = resp.data.name;
                let stack = document.getElementById(target + '_stack');
                var node = helper.createElementFromHTML('' +
                    '<div id="' + target + '_' + resp.data.id + '" class="' + target + '_selected filter_element" >' +
                    '<span>' + resp.data.name + '</span>' +
                    '<button type="button" onclick="store.removePartner(' + resp.data.id + ', \'' + target + '\')" class="right-remove"><i class="fa fa-remove"></i></button>' +
                    '</div>' +
                    '');
                stack.appendChild(node);
                object.table.setRequest(target, object[target]);
                window.notification.notify( 'success', 'Контакт выбран');
            }
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            window.isXHRloading = false;
        });
    };

    incrementArticleCartAmount(element, count) {
        let target_element = element.closest('.table_item');
        let input_element = target_element.querySelector('input');

        let value = Number(input_element.value);

        this.changeArticleCartAmount(element, value + count);
    }

    decrementArticleCartAmount(element, count) {
        let target_element = element.closest('.table_item');
        let input_element = target_element.querySelector('input');

        let value = Number(input_element.value);

        this.changeArticleCartAmount(element, value - count);
    }

    changeArticleCartAmount(element, count) {

        let target_element = element.closest('.table_item');
        let input_element = target_element.querySelector('input');

        let current_count = Number(input_element.value);

        if(count < 1) {
            target_element.querySelector('.add-to-cart').classList.remove('d-none');
            target_element.querySelector('.edit-cart-count').classList.add('d-none');
        }

        if(count < 0 && current_count <= 0 || count > 0 && current_count >= 999) return;

        input_element.value = count;

        this.debouneArticleCartAmount(element, count);
    }

    saveArticleCartAmount(element, count) {

        let target_element = element.closest('.table_item');

        let service_input = document.querySelector('[name="service_key"]');

        let element_index = parseInt(target_element.id);

        let index = -1;

        this.items.forEach((model, array_index) => {
            if(model.index == element_index) index = array_index;
        });

        let data = {
            provider_key: service_input.value,
            article: this.search,
            product: this.items[index],
            count: count
        };

        axios.post('/provider_stores/cart/set', data)
            .then(response => {
                // dd(response);
            })
            .catch(response => {
                dd(response);
            });
    }

    sortBy(element, type) {

        let brand_element = document.querySelector('.fa-angle-up').parentElement;

        let brand_name = brand_element.dataset.manufacturer;

        this.showManufactureStores(brand_element, brand_name, type);
    }

    registerProviderOrder(element) {

        window.openDialog('ProviderCartDialog');
    }

    addToCart(element, count) {
        let target_element = element.closest('.table_item');

        let service_input = document.querySelector('[name="service_key"]');

        target_element.querySelector('.add-to-cart').classList.add('d-none');
        target_element.querySelector('.edit-cart-count').classList.remove('d-none');

        let input = target_element.querySelector('input');
        this.addInputCountMask(input);

        input.value = count;

        let element_index = parseInt(target_element.id);

        let index = -1;

        this.items.forEach((model, array_index) => {
            if(model.index == element_index) index = array_index;
        });

        let data = {
            provider_key: service_input.value,
            article: this.search,
            product: this.items[index],
            count: count
        };

        axios.post('/provider_stores/cart/add', data)
            .then(response => {
               // dd(response);
            })
            .catch(response => {
                dd(response);
            });
    }

    removePartner(id, type){
        this[type].remove(id);
        document.getElementById(type + '_' + id).remove();
        this.table.setRequest(type, this[type]);
    }

    loadCategory(category_id, clean_search = null, update_data = null){
        let object = this;
        if(clean_search != null && clean_search){
            document.getElementById("search").value = '';
            object.search = '';
            this.table.setRequest('search', null, false);
            window.helper.insertParamUrl('search', '');
        }

        window.isXHRloading = true;
        window.helper.insertParamUrl('category_id', category_id);

        object.category_id = category_id;

        let data = {};
        data.category_id = category_id;
        data.search = object.search;
        data.class = 'store';

        let category_block = document.getElementById('category-nav');

        if(category_block){
            window.axios({
                method: 'post',
                url: '/category/loadview',
                data: data
            }).then((resp) =>  {
                category_block.innerHTML = resp.data.html;
                if(resp && resp.data){
                    this.table.setRequest('category_id', data.category_id, false);
                    this.table.setDatas(JSON.parse(resp.data.data));
                }
                if(!object.search){
                    document.getElementById('breadcrumbs-nav').innerHTML = resp.data.breadcrumbs;
                }
                object.initCategoryContextual();
            }).catch(function (error) {
                console.log(error);
            }).then(function () {
                window.isXHRloading = false;
            });
        } else {
            return false;
        }
    }

    initCategoryContextual(){
        let object = this;
        let category_block = document.getElementById('category-block');
        if(category_block){
            let elems = category_block.querySelectorAll('.category-item');
            [].forEach.call(elems, function(elem){
                let items = [
                    new ContextualItem({label:'Редактировать', onClick: () => {openDialog('categoryDialog', '&category_id=' + elem.dataset.id)}, shortcut:'Что то' }),
                    new ContextualItem({type:'seperator'}),
                    new ContextualItem({label:'Удалить', onClick: () => {window.entity.remove('category', elem.dataset.id, null)}, shortcut:'Ctrl+A' }),
                ];
                elem.addEventListener('contextmenu',function(e){
                    e.preventDefault();
                    new Contextual({
                        isSticky: false,
                        items:items,
                    });
                });
            });
        }
    }

    getCurrentActiveTab(){
        var active_tab = window.helper.findGetParameter('active_tab');

        if(active_tab == null || active_tab == 'null'){
            active_tab = 'store';
        }
        return active_tab;
    }

    cleanSearch(){
        this.search = null;
        document.getElementById("search").value = null;
        this.table.setData('/' + this.active_tab + '/tabledata', this.prepareDataForTable());
    }

    search() {
        if(this.active_tab == 'provider_stores') this.searchProviderStores();
        else this.table.setData('/' + this.active_tab + '/tabledata', this.prepareDataForTable());
    }

    searchProviderStores() {

        if(window.isXHRloading == true) return;

        window.isXHRloading = true;

        let service_input = document.querySelector('[name="service_key"]');

        let table_element = document.getElementById('table-container');

        togglePreloader(table_element, true);

        if(this.search == null) this.search = '';

        axios.post('/provider_stores/tableData', {
            search: this.search,
            selected_service: service_input.value
        })
        .then(response => {

            document.getElementById('table-container').innerHTML = response.data.html;

            let counts = response.data.counts;

            Object.keys(counts).forEach(service_key => {

                let manufacturers = counts[service_key];

                document.getElementById('service_count_' + service_key).innerText = manufacturers.length;
            });

            let errors = response.data.errors;

            if(errors) {
                Object.keys(errors).forEach(key => {
                    let value = errors[key];
                    notification.notify('error', key + ': ' + value);
                });
            }
        })
        .catch(response => {
            dd(response);
        })
        .finally(() => {
            togglePreloader(table_element, false);

            window.isXHRloading = false;
        });
    }

    showProvider(button, service_key) {

        let button_elements = document.querySelectorAll('.provider_tabs button');

        button_elements.forEach(element => {
            element.classList.remove('active');
        });

        button.classList.add('active');

        let service_input = document.querySelector('[name="service_key"]');

        service_input.value = service_key;

        this.searchProviderStores();
    }

    showManufactureStores(element, manufacturer, sort = null) {

        if(window.isXHRloading == true) return;

        window.isXHRloading = true;

        let is_desc = false;

        let table_element = document.getElementById('table-container');

        togglePreloader(table_element, true);

        let service_input = document.querySelector('[name="service_key"]');

        axios.post('/provider_stores/stores', {
            manufacturer: manufacturer,
            article: this.search,
            selected_service: service_input.value,
            sort: sort,
            is_desc: is_desc
        })
            .then(response => {

                let data = response.data;

                this.items = data.stores;

                table_element.innerHTML = data.html;

                let inputs = document.querySelectorAll('.provider-cart-input');

                inputs.forEach(input => {
                    this.addInputCountMask(input);
                });
            })
            .catch(response => {
                console.log(response);
            })
            .finally(()=> {
                togglePreloader(table_element, false);

                window.isXHRloading = false;
            });
    }

    addInputCountMask(element) {
        IMask(element, {
            mask: IMask.MaskedRange,
            from: 0,
            to: 999
        });
    }

    selectManufacture(element) {
        this.manufacture_id = element.getAttribute('id').match(/\d+/)[0];
        this.reload();

        document.querySelector('.search-field-container > .box').style.display = 'none';
    }

    init(){
        let object = this;
        document.addEventListener('ajaxLoaded', function(e){
            object.checkActive();
        });
        object.linked();

        this.debouneArticleCartAmount = helper.debounce((element, count) => {
            this.saveArticleCartAmount(element, count);
        }, 200);

        let events = [
            'ProductStored',
            'ProviderOrderStored',
            'EntranceStored',
            'RefundStored',
            'AdjustmentStored',
            'ShipmentStored',
            'WarrantStored',
            'EntranceRefundStored',
            'OrderStored',
            'ClientOrderStored'
        ];

        events.forEach((event) => {
            document.addEventListener(event, (e) => {
                object.table.freshData();
            });
        });

        document.addEventListener('ClientOrderStored', (e) => {
            if(object.active){
                object.table.freshData();
            }
        });

        document.addEventListener('CategoryStored', function(e){
            if(object.active){
                object.loadCategory(object.category_id, true, false);
            }
        });

        let focused = document.querySelector('#search');
        if(focused) focused.focus();

        if(this.active_tab == 'provider_stores') {
            this.searchProviderStores();
        }
    }

    load(){
        this.active_tab = this.getCurrentActiveTab();
        if(window.helper.findGetParameter('page') !== null){
            this.page = window.helper.findGetParameter('page');
        } else { this.page = 1}
        if(window.helper.findGetParameter('search') !== null){
            this.search = window.helper.findGetParameter('search');
        } else { this.search = ''}

        this.searchInit();
    }

    showAnalogues(info) {
        let product = info.contexted;

        let data = {
            brand: product.supplier,
            article: product.article
        };

        axios.post('/analogues', data)
            .then(response => {

                document.getElementById('breadcrumbs-nav').innerHTML = 'Результат поиска аналогов на складе по артикулу: ' + product.article;

                this.table.setRequest('analogues', JSON.stringify(response.data.analogues), true, false);
            })
            .catch(error => {
                console.log(error);
            });
    }

    linked()
    {
        this.baseParams();
        this.active_tab = this.getCurrentActiveTab();
        this.category_id = window.helper.findGetParameter('category_id');
        this.page = window.helper.findGetParameter('page');
        this.search = window.helper.findGetParameter('search');
        this.date_start = 'null';
        this.date_end = 'null';
        let addsCard = document.getElementById('adds-card');
        if(addsCard){
            addsCard.classList.add('hide');
        }
        this.initCategoryContextual();
        this.searchInit();
        this.initDatesFilter();
        this.checkActive();

        let focused = document.querySelector('#search');
        if(focused) focused.focus();

        if(this.active_tab == 'provider_stores') {
            let available_list = document.querySelector('.provider_tabs');
            let sortable = new Sortable(available_list, {
                items: 'button',
                dragClass: "sortable-ghost",
                onEnd: evt => {

                    let sorts = {};

                    let button_elements = available_list.querySelectorAll('button');

                    button_elements.forEach((element, index) => {
                        if (element.dataset.sort != index) {
                            sorts[index] = {
                                id: element.dataset.id,
                                sort: index
                            };
                            element.dataset.sort = index;
                        }
                    });

                    axios.post('/services/updateSort', {
                        sorts: sorts
                    })
                    .then(response => {
                        // console.log(response);
                    })
                    .catch(response => {
                        console.log(response);
                    });
                },
            });
        }

        let model_names = {
            store: 'store',
            entrance: 'entrance',
            provider_stores: 'providerStores',
            provider_orders: 'providerOrders',
            entrance_refunds: 'entranceRefunds',
            shipments: 'shipments',
            refund: 'refund',
            client_orders: 'clientOrders',
            documents: 'document',
            shop_orders: 'shopOrders',
            adjustment: 'adjustment'
        };

        let model_name = model_names[this.active_tab] + 'Methods';

        try {
            this.model = new classes[model_name]();
        } catch (e) {
            dd(e);
        }

        if(this.active_tab == 'provider_stores') return;

        let container = 'ajax-table-' + this.active_tab;
        this.readData(container);

        this.table = new Table({
            container: this.active_tab + 'Table',
            data: this.data,
            url: '/' + this.active_tab + '/tabledata',
            start_sort: 'DESC'
        });

        let header, context_menu, dbl_click, slug;

        if(this.active_tab === 'store'){
            header = [
                {min_with: 90, width: 90, name: 'ID',table_name: 'id'},
                {min_with: 100, width: 'auto', name: 'Наименование', table_name: 'name'},
                {min_with: 150, width: 200, name: 'Артикул', table_name: 'article'},
                {min_with: 150, width: 200, name: 'Производитель', table_name: 'supplier'},
            ];
            context_menu = [
                {name:'Редактировать', action: function(data){openDialog('productDialog', '&product_id=' + data.contexted.id)}},
                {name:'Открыть', action: function(data){openDialog('productDialog', '&product_id=' + data.contexted.id)}},
                {name:'Создать заявку поставщику', action: (data) => {
                    openDialog('providerOrderDialog', '&products=' + this.table.getSelectedIDs())
                }},
                {name:'Печать ценников', action: (data) => {
                    window.openDialog('chequeDialog', '&products=' + this.table.getSelectedIDs())
                }},
                {name:'Показать аналоги в наличии', action: (data) => {
                    this.showAnalogues(data);
                }},
                {name:'Переместить в категорию', action: (data) => {

                    openDialog('selectCategory', '&refer=store&root_category=2');

                    this.selected = data.selected;
                }},
            ];
            dbl_click = function(id){openDialog('productDialog', '&product_id=' + id)};
            slug = 'store';
        } else if(this.active_tab === 'provider_orders'){
            header = [
                {min_with: 90, width: 90, name: 'ID',table_name: 'id'},
                {min_with: 60, width: 150, name: 'Оплата', table_name: 'pays', transform: 'transform_ico'},
                {min_with: 60, width: 150, name: 'Поступление', table_name: 'incomes', transform: 'transform_ico'},
                {min_with: 120, width: 200, name: 'Поставщик', table_name: 'partner_name'},
                {min_with: 120, width: 'auto', name: 'Ответственный', table_name: 'manager_name'},
                {min_with: 90, width: 200, name: 'Сумма', table_name: 'summ', transform: 'transform_price'},
                {min_with: 90, width: 150, name: 'Дата', table_name: 'created_at'},
            ];
            context_menu = [
                {name:'Редактировать', action: function(data){openDialog('providerOrderDialog', '&provider_order_id=' + data.contexted.id)}},
                {name:'Открыть', action: function(data){openDialog('providerOrderDialog', '&provider_order_id=' + data.contexted.id)}},
                // {name:'Удалить', action: function(data){dd(data);}},
                // {name:'Удалить выделенные', action: function(data){dd(data);}, only_group:true},
            ];
            dbl_click = id => openDialog('providerOrderDialog', '&provider_order_id=' + id);
            slug = 'store';
        } else if(this.active_tab === 'entrance'){
            header = [
                {min_with: 90, width: 90, name: 'ID',table_name: 'id'},
                {min_with: 150, width: 150, name: 'Заявка', table_name: 'ordid'},
                {min_with: 130, width: 'auto', name: 'Поставщик', table_name: 'partner'},
                {min_with: 150, width: 'auto', name: 'Принимающий', table_name: 'manager'},
                {min_with: 150, width: 200, name: 'Комментарий', table_name: 'comment', transform: 'transform_comment'},
                {min_with: 150, width: 150, name: 'Дата', table_name: 'created_at'},
            ];
            context_menu = [
                {name:'Редактировать', action: function(data){openDialog('entranceDialog', '&entrance_id=' + data.contexted.id)}},
                {name:'Открыть', action: function(data){openDialog('entranceDialog', '&entrance_id=' + data.contexted.id)}},
                {name:'Открыть заявку', action: function(data){openDialog('clientorderDialog', '&client_order_id=' + data.contexted.ordid)}},
                // {name:'Удалить', action: function(data){dd(data);}},
                // {name:'Удалить выделенные', action: function(data){dd(data);}, only_group:true},
            ];
            dbl_click = function(id){openDialog('entranceDialog', '&entrance_id=' + id)};
            slug = 'store';
        } else if(this.active_tab === 'entrance_refunds'){
            header = [
                {min_with: 90, width: 90, name: 'ID',table_name: 'id'},
                {min_with: 150, width: 150, name: 'Поступление', table_name: 'entrance_id'},
                {min_with: 130, width: 'auto', name: 'Поставщик', table_name: 'partner_name'},
                {min_with: 150, width: 'auto', name: 'Ответственный', table_name: 'manager_name'},
                {min_with: 150, width: 200, name: 'Возвращено', table_name: 'wsumm', transform: 'transform_price'},
                {min_with: 150, width: 150, name: 'Дата', table_name: 'created_at'},
            ];

            context_menu = [
                {name:'Редактировать', action: function(data){openDialog('entranceRefundDialog', '&entrance_refund_id=' + data.contexted.id)}},
                {name:'Открыть', action: function(data){openDialog('entranceRefundDialog', '&entrance_refund_id=' + data.contexted.id)}},
                {name:'Открыть поступление', action: function(data){openDialog('entranceDialog', '&entrance_id=' + data.contexted.entrance_id)}},
                // {name:'Удалить', action: function(data){dd(data);}},
                // {name:'Удалить выделенные', action: function(data){dd(data);}, only_group:true},
            ];
            dbl_click = function(id){openDialog('entranceRefundDialog', '&entrance_refund_id=' + id)};
            slug = 'store';
        } else if(this.active_tab === 'shipments'){
            header = [
                {min_with: 90, width: 90, name: 'ID',table_name: 'id'},
                {min_with: 130, width: 'auto', name: 'Покупатель', table_name: 'partner'},
                {min_with: 150, width: 200, name: 'Скидка', table_name: 'discount'},
                {min_with: 150, width: 200, name: 'Сумма', table_name: 'price', transform: 'transform_price'},
                {min_with: 150, width: 200, name: 'Итого', table_name: 'total', transform: 'transform_price'},
                {min_with: 150, width: 150, name: 'Дата', table_name: 'created_at'},
            ];
            context_menu = [
                {name:'Редактировать', action: function(data){openDialog('shipmentDialog', '&shipment_id=' + data.contexted.id)}},
                {name:'Открыть', action: function(data){openDialog('shipmentDialog', '&shipment_id=' + data.contexted.id)}},
                {name:'Оформить возврат', action: function(data){openDialog('refundDialog', '&shipment_id=' + data.contexted.id)}},
                {name:'Печать УПД', action: function(data){window.helper.printDocument('shipment-upd', data.contexted.id)}},
                {name:'Печать счёта', action: function(data){window.helper.printDocument('shipment-score', data.contexted.id)}}
            ];
            dbl_click = function(id){openDialog('shipmentDialog', '&shipment_id=' + id)};
            slug = 'store';
        } else if(this.active_tab === 'refund'){
            header = [
                {min_with: 90, width: 90, name: 'ID',table_name: 'id'},
                {min_with: 130, width: 'auto', name: 'Ответственный', table_name: 'manager'},
                {min_with: 130, width: 'auto', name: 'Покупатель', table_name: 'partner'},
                {min_with: 150, width: 200, name: 'Сумма', table_name: 'price', transform: 'transform_price'},
                {min_with: 150, width: 150, name: 'Дата', table_name: 'created_at'},
            ];

            context_menu = [
                {name:'Редактировать', action: function(data){openDialog('refundDialog', '&refund_id=' + data.contexted.id)}},
                {name:'Открыть', action: function(data){openDialog('refundDialog', '&refund_id=' + data.contexted.id)}},
                // {name:'Удалить', action: function(data){dd(data);}},
                // {name:'Удалить выделенные', action: function(data){dd(data);}, only_group:true},
            ];
            dbl_click = function(id){openDialog('refundDialog', '&refund_id=' + id)};
            slug = 'store';
        } else if(this.active_tab === 'client_orders'){
            header = [
                {min_with: 90, width: 90, name: 'ID',table_name: 'id'},
                {min_with: 130, width: 200, name: 'Статус', table_name: 'status'},
                {min_with: 90, width: 110, name: 'Скидка', table_name: 'discount_formatted'},

                {min_with: 130, width: 'auto', name: 'Покупатель', table_name: 'partner'},
                {min_with: 150, width: 200, name: 'Сумма', table_name: 'summ', transform: 'transform_price'},
                {min_with: 150, width: 150, name: 'Дата', table_name: 'created_at'},
            ];

            context_menu = [
                {name:'Редактировать', action: function(data){openDialog('clientorderDialog', '&client_order_id=' + data.contexted.id)}},
                {name:'Открыть', action: function(data){openDialog('clientorderDialog', '&client_order_id=' + data.contexted.id)}},
                {name:'Печать', action: function(data){window.helper.printDocument('client-order', data.contexted.id)}},

                // {name:'Удалить', action: function(data){dd(data);}},
                // {name:'Удалить выделенные', action: function(data){dd(data);}, only_group:true},
            ];
            dbl_click = function(id){openDialog('clientorderDialog', '&client_order_id=' + id)};
            slug = 'store';
        } else if(this.active_tab === 'adjustment'){
            header = [
                {min_with: 90, width: 90, name: 'ID',table_name: 'id'},
                {min_with: 130, width: 'auto', name: 'Ответственный', table_name: 'partner'},
                {min_with: 150, width: 200, name: 'Магазин', table_name: 'store'},
                {min_with: 150, width: 200, name: 'Комментарий', table_name: 'comment', transform: 'transform_comment'},
                {min_with: 150, width: 150, name: 'Дата', table_name: 'created_at'},
            ];

            context_menu = [
                {name:'Редактировать', action: function(data){openDialog('adjustmentDialog', '&adjustment_id=' + data.contexted.id)}},
                {name:'Открыть', action: function(data){openDialog('adjustmentDialog', '&adjustment_id=' + data.contexted.id)}},
                // {name:'Удалить', action: function(data){dd(data);}},
                // {name:'Удалить выделенные', action: function(data){dd(data);}, only_group:true},
            ];
            dbl_click = function(id){openDialog('adjustmentDialog', '&adjustment_id=' + id)};
            slug = 'store';
        } else if(this.active_tab === 'documents'){
            header = [
                {min_with: 90, width: 90, name: 'ID',table_name: 'id'},
                {min_with: 130, width: 250, name: 'Название', table_name: 'name'},
                {min_with: 150, width: 'auto', name: 'Менеджер', table_name: 'manager'},
                {min_with: 150, width: 150, name: 'Дата', table_name: 'created_at'},
            ];

            context_menu = [
                {name:'Открыть', action: function(data){window.helper.openDocument(data.contexted.id)}},
                // {name:'Удалить', action: function(data){dd(data);}},
                // {name:'Удалить выделенные', action: function(data){dd(data);}, only_group:true},
            ];
            dbl_click = function(id){window.helper.openDocument(id)};
            slug = 'store';
        }
        else if(this.active_tab === 'shop_orders'){
            header = [
                {min_with: 90, width: 90, name: 'ID',table_name: 'id'},
                {min_with: 90, width: 'auto', name: 'Статус',table_name: 'status'},
                {min_with: 130, width: 250, name: 'Заказчик', table_name: 'partner_name'},
                {min_with: 150, width: 150, name: 'Дата', table_name: 'created_at'},
            ];

            context_menu = [
                { name:'Открыть', action: data => openDialog('orderDialog', '&order_id=' + data.contexted.id) },
            ];

            dbl_click = function(id) { openDialog('orderDialog', '&order_id=' + id) };

            slug = 'store';
        }

        this.table.setHeader(header);
        this.table.setContextMenu(context_menu);
        this.table.setBblClick(dbl_click);
        this.table.setSlug(slug);

        this.table.draw(this.active_tab + 'Table', this.data);
    }


    // sortBy(element, type) {
    //
    //     let brand_element = document.querySelector('.fa-angle-up').parentElement;
    //
    //     let brand_name = brand_element.dataset.manufacturer;
    //
    //     this.showManufactureStores(brand_element, brand_name, type);
    // }

    checkActive(){
        let className = window.location.pathname.substring(1);
        let link = document.getElementById('store_link');
        if(className === 'store'){
            link.classList.add('active');
            this.active = true;
        } else {
            link.classList.remove('active');
            this.active = false;
        }
    }

    // showBrands() {
    //     if(this.search != null && this.search.length) document.querySelector('.search-field-container > .box').style.display = 'block';
    // }

    searchInit() {
        let object = this;
        let searchFn;
        let search_field = document.getElementById("search");
        if(search_field){
            searchFn = window.helper.debounce((e) => {

                object.search = search_field.value;
                window.helper.insertParamUrl('search', search_field.value);
                object.category_id = null;
                if(object.search == ''){
                    object.category_id = object.root_category;
                }
                if(this.table) {
                    window.helper.insertParamUrl('category_id', 'null');
                    this.table.setRequest('category_id', null, false);
                    this.table.setRequest('analogues', null, false);
                    this.table.setRequest('search', object.search, false);
                    if(!object.loadCategory(object.category_id)){
                        this.table.freshData();
                    }
                }
                else {
                    this.searchProviderStores();
                }
            }, 400);
            search_field.addEventListener("keydown", searchFn);
            search_field.addEventListener("paste", searchFn);
            search_field.addEventListener("delete", searchFn);
        }
    }

    resetDate(){
        this.dates_range = null;
        this.page = 1;
        this.table.setRequest('dates_range', this.dates_range, false);
        this.table.setRequest('page', this.page);
        this.dates.clear();
        window.notification.notify( 'success', 'Дата очищена');
    }

    resetSearch(){
        document.getElementById('search').value = '';
        this.search = '';
        this.page = 1;
        this.table.setRequest('search', this.search, false);
        this.table.setRequest('page', this.page);
    }

    getUrlString(type = null){

        let url = '?view_as=json';

        url += '&target=ajax-table-' + this.active_tab;

        if(type != null){
            url += '&type=' + type;
        }
        if(this.category_id !== null){
            url += '&category_id=';
            url += this.category_id;
        }
        if(this.search && this.search !== 'null' || this.search !== null){
            url += '&search=';
            url += this.search;
        }
        if(this.active_tab !== null || this.active_tab !== 'null'){
            url += '&active_tab=';
            url += this.active_tab;
        }
        if(this.page !== null || this.page !== 'null'){
            url += '&page=';
            url += this.page;
        }
        if(this.date_start !== null || this.date_start !== 'null' || this.date_start !== ''){
            url += '&date_start=';
            url += this.date_start;
        }
        if(this.date_end !== null || this.date_end !== 'null' || this.date_end !== ''){
            url += '&date_end=';
            url += this.date_end;
        }

        return url;
    }

    initDatesFilter(){
        let object = this;
        let startDateArray = [];
        this.dates = window.flatpickr(".date_filter", {
            mode: "range",
            defaultDate: startDateArray,
            dateFormat: "d.m.Y",
            onClose: function(selectedDates, dateStr, instance) {
                object.page = 1;
                if(selectedDates.length > 1){
                    object.table.setRequest('dates_range', window.flatpickr.formatDate(selectedDates[0], "d.m.Y") + '|' + window.flatpickr.formatDate(selectedDates[1], "d.m.Y").toString());
                } else {
                    object.table.setRequest('dates_range', null);
                }
            }
        });
    }

    reload(){
        this.table.setData('/' + this.active_tab + '/tabledata', this.prepareDataForTable());
    }

    selectCategory(selected_category) {

        let data = {
            products: JSON.stringify(this.selected),
            category_id: selected_category
        };

        axios.post('/products/move', data)
            .then(response => {

                let data = response.data;

                window.notification.notify(data.type, data.message);

                if(this.category_id != 2) {
                    this.table.freshData();
                }
            })
            .then(error => {
                console.log(error);
            });
    }
}
export default storePage;
