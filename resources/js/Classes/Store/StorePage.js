import {Contextual, ContextualItem} from "../Contentual";
import Sortable from "sortablejs";
import entranceMethods from "./tabs/EntranceMethods";
import providerStoresMethods from "./tabs/ProviderStoreMethods";
import documentMethods from "./tabs/DocumentMethods";

const classes = {
    entranceMethods,
    providerStoresMethods,
    documentMethods
};


class storePage{

    constructor(){
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
        object.table.setData('/' + object.active_tab + '/tabledata', object.prepareDataForTable ());
    }

    clearList(type, container){
        this[type] = [];
        document.getElementById(container).innerHTML = '';
        this.table.setData('/' + this.active_tab + '/tabledata', this.prepareDataForTable());
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
                //object.reload();
                object.table.setData('/' + object.active_tab + '/tabledata', object.prepareDataForTable());
                window.notification.notify( 'success', 'Контакт выбран');
            }
            //document.dispatchEvent(new Event('PartnerSelected', {bubbles: true}));
            //console.log("Событие PartnerSelected вызвано");
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            window.isXHRloading = false;
        });
    };

    setArticleCartAmount(element) {
        let amount = Number(element.value);
        this.changeArticleCartAmount(element, amount);
    }

    incrementArticleCartAmount(element) {
        let target_element = element.closest('tr');
        let input_element = target_element.querySelector('input');

        let value = Number(input_element.value);

        this.changeArticleCartAmount(element, value + 1);
    }

    decrementArticleCartAmount(element) {
        let target_element = element.closest('tr');
        let input_element = target_element.querySelector('input');

        let value = Number(input_element.value);

        this.changeArticleCartAmount(element, value - 1);
    }

    changeArticleCartAmount(element, count) {

        let target_element = element.closest('tr');
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

        let target_element = element.closest('tr');

        let service_input = document.querySelector('[name="service_key"]');

        let index = -1;

        for(let i = Object.keys(this.items).length - 1; i != -1; i--) {
            if(this.items[i].index == target_element.id) index = target_element.id;
        }

        let data = {
            provider_key: service_input.value,
            article: this.search,
            product: this.items[index],
            count: count
        };

        axios.post('/provider_stores/cart/set', data)
            .then(response => {
                dd(response);
            })
            .catch(response => {
                dd(response);
            });
    }

    addToCart(element) {
        let target_element = element.closest('tr');

        let service_input = document.querySelector('[name="service_key"]');

        target_element.querySelector('.add-to-cart').classList.add('d-none');
        target_element.querySelector('.edit-cart-count').classList.remove('d-none');

        let input = target_element.querySelector('input');
        this.addInputCountMask(input);

        input.value = '1';

        let index = -1;

        for(let i = Object.keys(this.items).length - 1; i != -1; i--) {
            console.log(i, this.items[i].index, target_element.id, this.items[i].index == target_element.id);
            if(this.items[i].index == target_element.id) index = i;
        }

        console.log(index, target_element.id, this.items[index]);

        let data = {
            provider_key: service_input.value,
            article: this.search,
            product: this.items[index]
        };

        axios.post('/provider_stores/cart/add', data)
            .then(response => {
               dd(response);
            })
            .catch(response => {
                dd(response);
            });
    }

    removePartner(id, type){
        this[type].splice(this[type].indexOf(id));
        document.getElementById(type + '_' + id).remove();
        this.table.setData('/' + this.active_tab + '/tabledata', this.prepareDataForTable());
    }

    loadBreadcrumbs(category_id, root_category){

        let object = this;
        window.isXHRloading = true;
        // window.helper.insertParamUrl('category_id', category_id);
        // window.helper.insertParamUrl('search', 'null');
        object.category_id = category_id;
        //document.getElementById("search").value = '';;
        //object.table.setData('/tableproductdata', object.prepareDataForTable());
        let data = {};
        data.category_id = category_id;
        data.root_category = root_category;
        data.search = object.search;
        window.axios({
            async:true,
            method: 'post',
            url: '/category/breadcrumbs',
            data: data
        }).then((resp) => {
            if(this.search != null) {
                document.getElementById('breadcrumbs-nav').innerHTML = resp.data.html;
            }
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            window.isXHRloading = false;
        });
    }

    loadCategory(category_id, clean_search = null, update_data = null){
        let object = this;
        if(clean_search != null && clean_search){
            document.getElementById("search").value = '';
            object.search = '';
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
            }).then(function (resp) {
                category_block.innerHTML = resp.data.html;
                if(!object.search){
                    object.loadBreadcrumbs(category_id, object.root_category);
                }
                if(update_data != null && update_data){
                    object.table.setData('/' + object.active_tab + '/tabledata', object.prepareDataForTable());
                }
                object.initCategoryContextual();
            }).catch(function (error) {
                console.log(error);
            }).then(function () {
                window.isXHRloading = false;
            });
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

    generateColumns(){
        let object = this;
        let columns = [];

        if(object.active_tab === 'store') {
            object.contextDop = 'product';
            object.parametr = 'product';
            // var priceFormatter = function(cell, formatterParams, onRendered){
            //     onRendered(function(){
            //
            //         if(isNaN(cell.getValue())){
            //             cell.getElement().innerHTML = '<span class="table_input" id="price_'+ cell.getData().id +'" >'+ cell.getValue() +'</span>';
            //         } else {
            //             var formatter = new Intl.NumberFormat('ru-RU', {
            //                 style: 'currency',
            //                 currency: 'RUB',
            //             });
            //             cell.getElement().innerHTML = '<span class="table_input" id="price_'+ cell.getData().id +'" >'+ formatter.format(cell.getValue()) +'</span>';
            //         }
            //     });
            // };

            columns = [
                {formatter:"rowSelection", width:34, titleFormatter:"rowSelection", align:"center", headerSort:false, cellClick:function(e, cell){
                        cell.getRow().toggleSelect();
                    }},
                {title:"ID", field:"id", width:80},
                {title:"Модель", field:"name"},
                {title:"Артикул", field:"article", width:150, align:"left"},
                {title:"Бренд", field:"supplier_name", width:150, align:"left"},
                // {title:"Наличие", field:"isset", width:130, align:"left"},
                // {title:"Цена (Ррозница)", field:"price", width:130, align:"left", formatter:priceFormatter},
            ];
        } else if(object.active_tab === 'provider_orders'){
            object.contextDop = 'providerorder';
            object.parametr = 'provider_order';
            let iconFormatter = function(cell, formatterParams, onRendered){
                onRendered(function(){
                    cell.getElement().innerHTML = '<div class="ic-' + cell.getValue() + '"><div>';
                });
            };
            let priceFormatter = function(cell, formatterParams, onRendered){
                onRendered(function(){
                    var formatter = new Intl.NumberFormat('ru-RU', {
                        style: 'currency',
                        currency: 'RUB',
                    });
                    cell.getElement().innerHTML = '<span class="table_input" id="price_'+ cell.getData().id +'" >'+ formatter.format(cell.getValue()) +'</span>';
                });
            };
            columns = [
                {formatter:"rowSelection", width:34, titleFormatter:"rowSelection", align:"center", headerSort:false, cellClick:function(e, cell){
                        cell.getRow().toggleSelect();
                    }},
                {title:"№", field:"id", width:50},
                {title:"Оплата", field:"pays", width:80, formatter:iconFormatter},
                {title:"Поступление", field:"incomes",align:"left", width:130, formatter:iconFormatter},
                {title:"Дата", field:"created_at", width:150},
                {title:"Поставщик", field:"partner_name", align:"left"},
                {title:"Ответственный", field:"manager_name", align:"left"},
                {title:"Сумма", field:"itogo", width:130, align:"left", formatter:priceFormatter},
            ];
        } else if(object.active_tab === 'entrance'){
            object.contextDop = 'entrance';
            object.parametr = 'entrance';
            columns = [
                {formatter:"rowSelection", width:34, titleFormatter:"rowSelection", align:"center", headerSort:false, cellClick:function(e, cell){
                        cell.getRow().toggleSelect();
                    }},
                {title:"№", field:"id", width:80},
                {title:"Заявка", field:"ordid", width:100},
                {title:"Дата", field:"created_at", width:150},
                {title:"Поставщик", field:"partner", align:"left"},
                {title:"Принимающий", field:"manager", align:"left"},
                {title:"Комментарий", field:"comment", width:150, align:"left"},
            ];
        } else if(object.active_tab === 'shipments'){
            object.contextDop = 'shipment';
            object.parametr = 'shipment';
            var priceFormatter = function(cell, formatterParams, onRendered){
                onRendered(function(){
                    var formatter = new Intl.NumberFormat('ru-RU', {
                        style: 'currency',
                        currency: 'RUB',
                    });
                    cell.getElement().innerHTML = '<span class="table_input" id="price_'+ cell.getData().id +'" >'+ formatter.format(cell.getValue()) +'</span>';
                });
            };
            columns = [
                {formatter:"rowSelection", width:34, titleFormatter:"rowSelection", align:"center", headerSort:false, cellClick:function(e, cell){
                        cell.getRow().toggleSelect();
                    }},
                {title:"№", field:"id", width:80},
                {title:"Дата", field:"created_at", width:150},
                {title:"Покупатель", field:"partner", align:"left"},
                {title:"Сумма", field:"price", width:130, align:"left", formatter:priceFormatter},
                {title:"Скидка", field:"discount", width:90, align:"left"},
                {title:"Итого", field:"total", width:130, align:"left", formatter:priceFormatter},
            ];
        } else if(object.active_tab === 'refund'){
            object.contextDop = 'refund';
            object.parametr = 'refund';
            var priceFormatter = function(cell, formatterParams, onRendered){
                onRendered(function(){
                    var formatter = new Intl.NumberFormat('ru-RU', {
                        style: 'currency',
                        currency: 'RUB',
                    });
                    cell.getElement().innerHTML = '<span class="table_input" id="price_'+ cell.getData().id +'" >'+ formatter.format(cell.getValue()) +'</span>';
                });
            };
            columns = [
                {formatter:"rowSelection", width:34, titleFormatter:"rowSelection", align:"center", headerSort:false, cellClick:function(e, cell){
                        cell.getRow().toggleSelect();
                    }},
                {title:"№", field:"id", width:80},
                {title:"Дата", field:"created_at", width:150},
                {title:"Ответственный", field:"manager", align:"left"},
                {title:"Покупатель", field:"partner", align:"left"},
                {title:"Сумма", field:"price", width:130, align:"left", formatter:priceFormatter}
            ];
        } else if(object.active_tab === 'client_orders'){
            object.contextDop = 'clientorder';
            object.parametr = 'client_order';
            var priceFormatter = function(cell, formatterParams, onRendered){
                onRendered(function(){
                    var formatter = new Intl.NumberFormat('ru-RU', {
                        style: 'currency',
                        currency: 'RUB',
                    });
                    cell.getElement().innerHTML = '<span class="table_input" id="price_'+ cell.getData().id +'" >'+ formatter.format(cell.getValue()) +'</span>';
                });
            };
            columns = [
                {formatter:"rowSelection", width:34, titleFormatter:"rowSelection", align:"center", headerSort:false, cellClick:function(e, cell){
                        cell.getRow().toggleSelect();
                    }},
                {title:"№", field:"coid", width:80},
                {title:"Статус", field:"status_formatted", width:150},
                {title:"Дата", field:"created_at", width:150},
                {title:"Покупатель", field:"partner", align:"left"},
                {title:"Сумма", field:"summ", width:130, align:"left", formatter:priceFormatter},
                {title:"Скидка", field:"discount_formatted", width:90, align:"left"},
                {title:"Итого", field:"itogo", width:130, align:"left", formatter:priceFormatter},
            ];
        } else if(object.active_tab === 'adjustment'){
            object.contextDop = 'adjustment';
            object.parametr = 'adjustment';
            columns = [
                {formatter:"rowSelection", width:34, titleFormatter:"rowSelection", align:"center", headerSort:false, cellClick:function(e, cell){
                        cell.getRow().toggleSelect();
                    }},
                {title:"№", field:"id", width:80},
                {title:"Дата", field:"created_at", width:150},
                {title:"Ответственный", field:"partner"},
                {title:"Магазин ", field:"store", align:"left"},
                {title:"Комментарий", field:"comment", width:150, align:"left"},
            ];
        }
        else if(object.active_tab === 'entrance_refunds'){
            object.contextDop = 'entranceRefund';
            object.parametr = 'entrance_refund';
            var priceFormatter = function(cell, formatterParams, onRendered){
                onRendered(function(){
                    var formatter = new Intl.NumberFormat('ru-RU', {
                        style: 'currency',
                        currency: 'RUB',
                    });
                    cell.getElement().innerHTML = '<span class="table_input" id="price_'+ cell.getData().id +'" >'+ formatter.format(cell.getValue()) +'</span>';
                });
            };

            columns = [
                {formatter:"rowSelection", width:34, titleFormatter:"rowSelection", align:"center", headerSort:false, cellClick:function(e, cell){
                        cell.getRow().toggleSelect();
                    }},
                {title:"№", field:"id", width:80},
                {title:"Поступление", field:"entrance_id", width:80},
                {title:"Дата", field:"created_at", width:150},
                {title:"Ответственный", field:"manager_name", align:"left"},
                {title:"Поставщик", field:"partner_name", align:"left"},
                {title:"Сумма", field:"wsumm", width:130, align:"left", formatter:priceFormatter}
            ];
        }
        else if(object.active_tab === 'documents'){
            object.contextDop = 'document';
            object.parametr = 'document';

            columns = [
                {formatter:"rowSelection", width:34, titleFormatter:"rowSelection", align:"center", headerSort:false, cellClick:function(e, cell){
                        cell.getRow().toggleSelect();
                    }},
                {title:"№", field:"id", width:80},
                {title:"Название", field:"name", width:150},
                {title:"Менеджер", field:"manager_id", width:150},
                {title:"Дата", field:"created_at", width:150},
            ];
        }
        return columns;
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

        let service_input = document.querySelector('[name="service_key"]');

        let table_element = document.getElementById('table-container');

        document.querySelector('.out_of_search').classList.add('d-none');

        togglePreloader(table_element, true);

        if(this.search == null) this.search = '';

        axios.post('/provider_stores/tableData', {
            search: this.search,
            selected_service: service_input.value
        })
        .then(response => {

            if(!response.data.html.length) {
                document.getElementById('table_body').innerHTML = '';
                document.querySelector('.out_of_search').classList.remove('d-none');
            }
            else {

                document.getElementById('table_body').innerHTML = response.data.html;

                let counts = response.data.counts;

                Object.keys(counts).forEach(service_key => {

                    let manufacturers = counts[service_key];

                    document.getElementById('service_count_' + service_key).innerText = manufacturers.length;
                });
            }

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

        let is_desc = true;

        let target_element = document.getElementById('brand_context_' + manufacturer);

        element = element.querySelector('i');

        let table_element = target_element.querySelector('.preloader-block');

        togglePreloader(table_element, true);

        let sort_elements = document.querySelectorAll('.sort_arrow');

        sort_elements.forEach(element => {

            if(element.classList.contains(sort)) {

                if(element.classList.contains('active')) {
                    if(element.classList.contains('up')) {
                        element.classList.remove('up');
                        element.classList.add('down');

                        is_desc = true;
                    }
                    else {
                        element.classList.add('up');
                        element.classList.remove('down');

                        is_desc = false;
                    }
                }
                else {
                    element.classList.add('active');
                }
            }
            else {
                element.classList.remove('active');
                element.classList.remove('up');
                element.classList.remove('down');

                element.classList.add('down');
            }
        });

        if(element.classList.contains('fa-angle-down') || sort != null) {

            let service_input = document.querySelector('[name="service_key"]');

            target_element.classList.remove('d-none');

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

                element.classList.remove('fa-angle-down');
                element.classList.add('fa-angle-up');

                target_element.querySelector('tbody').innerHTML = data.html;

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
            });
        }
        else {

            element.classList.remove('fa-angle-up');
            element.classList.add('fa-angle-down');

            target_element.classList.add('d-none');

            //Очищаем внутренний список
            target_element.querySelector('tbody').innerHTML = '';
        }
    }

    addInputCountMask(element) {
        IMask(element, {
            mask: IMask.MaskedRange,
            from: 0,
            to: 999
        });
    }

    initTableData() {

        //Исключение для списка поставщиков
        if(this.active_tab === 'provider_stores') return;

        let object = this;
        let table_container = document.getElementById('table-container');
        let height = 500;
        let cleanHeight = height - 125;
        let tableHeight = height - 55;
        if(table_container) {
            height = table_container.offsetHeight;
            cleanHeight = height - 86;
            tableHeight = height;
            if(this.active_tab == 'store'){
                cleanHeight = height - 140;
                tableHeight = height - 55;
            }
        }
        let elements = cleanHeight / 44;

        object.table = new Tabulator("#" + this.getCurrentActiveTab() + "-table", {
            locale:true,
            langs:{
                "ru":{
                    "ajax":{
                        "loading":"Загрузка", //ajax loader text
                        "error":"Ошибка", //ajax error text
                    },
                    "pagination":{
                        "page_size":"Кол-во элементов",
                        "first":"Первая",
                        "first_title":"Первая страница",
                        "last":"Последняя",
                        "last_title":"Последняя страница",
                        "prev":"Предыдущая",
                        "prev_title":"Предыдущая страница",
                        "next":"Следующая",
                        "next_title":"Следующая страница",
                        "show_page":"След.",
                    },
                    "headerFilters":{
                        "default":"filter column...",
                        "columns":{
                            "name":"filter name...",
                        }
                    }
                }
            },
            clipboard:true,
            selectable:true,
            selectableRangeMode:"click",
            resizableColumns:false,
            height:tableHeight,
            pagination:"remote",
            layout:"fitColumns",
            ajaxSorting:true,
            ajaxURL:'/' + object.active_tab + '/tabledata',
            ajaxRequesting:function(url, params){
                window.isXHRloading = true;
                document.body.classList.add('loading');
            },
            ajaxResponse: (url, params, response) => {
                window.isXHRloading = false;
                document.body.classList.remove('loading');

                let manufacturers = response.manufacturers;

                if(object.active_tab === 'store') {

                    if(this.search && this.search.length) {
                        document.getElementById('breadcrumbs-nav').innerHTML = response.info;
                    }

                    if(Object.keys(manufacturers).length) {

                        this.manufacture_id = null;

                        let store_list = document.getElementById('store-list');

                        store_list.innerHTML = '';

                        Object.keys(manufacturers).forEach(key => {

                            console.log(manufacturers[key]);

                            let html = '<div onclick="store.selectManufacture(this)" class="store-list-item pointer" id="manufacture_' + manufacturers[key].m_id + '">' + manufacturers[key].m_name + '</div>';

                            store_list.append(helper.createElementFromHTML(html));
                        });

                        if(this.manufacture_show === true) {
                            document.querySelector('.search-field-container > .box').style.display = 'block';
                            this.manufacture_show = false;
                        }
                    }
                }

                return response.data;
            },
            ajaxParams:object.prepareDataForTable(),//object.prepareUrlForTable(), //ajax parametersвфеу
            paginationSize:Math.floor(elements),
            placeholder:"По данным критериям ничего нет",
            columns: object.generateColumns(),
            renderComplete: () => {
                let title_elements = document.querySelectorAll('.tabulator-cell');

                title_elements.forEach(element => {
                    element.title = element.innerText;
                });
            },
            rowDblClick:function(e, row){
                openDialog(object.contextDop + 'Dialog', '&' + object.parametr + '_id=' + row.getData().id)
            },
            rowContext:function(e, row){
                e.preventDefault();
                object.selectedData = object.table.getSelectedData();
                let items = [];

                let id = row.getData().id;

                items.push(new ContextualItem({label:'Открыть', onClick: () => {openDialog(object.contextDop + 'Dialog', '&' + object.parametr + '_id=' + id)}, shortcut:'Что то' }));
                items.push(new ContextualItem({label:'Редактировать', onClick: () => {openDialog(object.contextDop + 'Dialog', '&' + object.parametr + '_id=' + id)}, shortcut:'Что то' }));

                if(object.contextDop == 'shipment') {

                    items.push(new ContextualItem({type:'seperator'}));

                    let products = row.getData().articles;

                    let data = {};

                    Object.values(products).forEach((value, index) => {
                        data[index] = {
                            id: value.id,
                            count: value.pivot.count,
                            price: value.pivot.price,
                            total: value.pivot.count * value.pivot.price
                        };
                    });

                    data = JSON.stringify(data);

                    items.push(new ContextualItem({label:'Оформить возврат', onClick: () => {openDialog('refundDialog', '&shipment_id=' + id);} }));
                    items.push(new ContextualItem({type:'seperator'}));
                    items.push(new ContextualItem({label:'Печать УПД', onClick: () => {window.helper.printDocument('shipment-upd', id, data, true);} }));
                    items.push(new ContextualItem({label:'Печать счёта', onClick: () => {window.helper.printDocument('shipment-score', id, data);} }));
                }
                else if(object.contextDop == 'clientorder') {
                    items.push(new ContextualItem({type:'seperator'}));
                    items.push(new ContextualItem({label:'Печать', onClick: () => {window.helper.printDocument('client-order', id);} }));
                }
                else if(object.contextDop == 'product') {
                    items.push(new ContextualItem({type:'seperator'}));

                    items.push(new ContextualItem({
                        label: 'Печать ценников', onClick: () => {

                            let ids = window.helper.pluck(object.selectedData, 'id');

                            window.openDialog('chequeDialog', '&products='+ids);
                        },
                        shortcut: 'Ctrl+A'
                    }));
                }

                items.push(new ContextualItem({
                    label: 'Удалить', onClick: () => {
                        window.entity.remove(object.contextDop, row.getData().id, object)
                    },
                    shortcut: 'Ctrl+A'
                }));

                if (object.selectedData.length) {
                    items.push(new ContextualItem({
                        label: 'Удалить выделенные', onClick: () => {
                            window.entity.remove(object.contextDop, window.helper.pluck(object.selectedData, 'id'), object)
                        },
                        shortcut: 'Ctrl+A'
                    }));
                }

                object.tableContextual = null;
                object.tableContextual = new Contextual({
                    isSticky: false,
                    items:items,
                });
            },
            tableBuilt:function(){
                // console.log('Таблица готова');
            },
            rowClick:function(e, row){
                if(object.active_tab != 'store'){
                    console.log('Загружаем инфо');
                    let data = {};
                    data.id = row.getData().id;
                    window.axios({
                        method: 'post',
                        url: '/' + object.active_tab + '/side_info',
                        data: data
                    }).then(function (resp) {
                        let addsCard = document.getElementById('adds-card');
                        if(addsCard){
                            addsCard.classList.remove('hide');
                        }
                        document.getElementById('contact_block').innerHTML = resp.data.info;
                        document.getElementById('comment_block').innerHTML = resp.data.comment;
                        //console.log(resp);
                    }).catch(function (error) {
                        console.log(error);
                    }).finally(function () {
                        window.isXHRloading = false;
                    });
                }
            },
        });
    }

    selectManufacture(element) {
        this.manufacture_id = element.getAttribute('id').match(/\d+/)[0];
        this.reload();

        document.querySelector('.search-field-container > .box').style.display = 'none';
    }

    prepareDataForTable(){
        let object = this;
        let data = {};
        data.view_as = "json";
        data.target = "ajax-table-store";
        data.page = 1;

        if(object.category_id !== null){data.category_id = object.category_id.toString();}

        if(object.accountable !== null){data.accountable = object.accountable;}
        if(object.manufacture_id !== null){data.manufacture_id = object.manufacture_id;}
        if(object.client !== null){data.client = object.client;}
        if(object.pay_status !== null){data.pay_status = object.pay_status;}
        if(object.entrance_status !== null){data.entrance_status = object.entrance_status;}
        if(object.clientorder_status !== null){data.clientorder_status = object.clientorder_status;}
        if(object.provider !== []){data.provider = object.provider;}
        if(object.dates_range !== null){data.dates_range = object.dates_range;}

        if(object.search && object.search !== 'null' || object.search !== null) {

            let search_string = object.search.toString();
            data.search = search_string;
        }

        return data;
    }

    init(){
        let object = this;
        document.addEventListener('ajaxLoaded', function(e){
            object.checkActive();
        });
        object.linked();
        if(object.active_tab == 'store'){
            object.loadCategory(this.root_category, true, true);
        }

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
            'EntranceRefundStored'
        ];

        // //Поиск
        // let el = document.querySelector("#ajax-tab-content #search");
        // let searchFn = window.helper.debounce(function(e) {
        //     object.search();
        // }, 400);
        // if(el){
        //     el.addEventListener("keydown", searchFn);
        //     el.addEventListener("paste", searchFn);
        //     el.addEventListener("delete", searchFn);
        // }


        events.forEach(event => {
            document.addEventListener(event, function(e){
                object.prepareParams();
                object.reload();
            });
        });

        document.addEventListener('ClientOrderStored', function(e){
            if(object.active){
                object.prepareParams();
                object.reload();
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

    linked()
    {
        this.baseParams();
        this.active_tab = this.getCurrentActiveTab();
        this.category_id = window.helper.findGetParameter('category_id');
        this.page = window.helper.findGetParameter('page');
        this.search = window.helper.findGetParameter('search');
        this.date_start = 'null';
        this.date_end = 'null';
        window.helper.debugBar(this);
        let addsCard = document.getElementById('adds-card');
        if(addsCard){
            addsCard.classList.add('hide');
        }

        this.initCategoryContextual();
        this.initTableData();
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
            refund: 'refund',
            client_orders: 'clientOrders',
            documents: 'document'
        };

        let model_name = model_names[this.active_tab] + 'Methods';
        try {
            this.model = new classes[model_name]();
        } catch (e) {
            dd(e);
        }

    }

    prepareParams(){
        if(this.category_id === null){
            this.category_id = '';
        }
        if(!this.search || this.search === 'null' || this.search === null){
            this.search = '';
        } else {
            this.category_id = this.root_category;
        }
        if(this.page === null || this.page === 'null'){
            this.page = 1;
        }
        if(this.date_start === null || this.date_start === 'null'){
            this.date_start = '';
        }
        if(this.date_end === null || this.date_end === 'null'){
            this.date_end = '';
        }
    }

    sortBy(element, type) {

        let brand_element = document.querySelector('.fa-angle-up').parentElement;

        let brand_name = brand_element.dataset.manufacturer;

        this.showManufactureStores(brand_element, brand_name, type);
    }

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

    showBrands() {
        if(this.search != null && this.search.length) document.querySelector('.search-field-container > .box').style.display = 'block';
    }

    searchInit() {
        var object = this;
        var searchFn;
        let search_field = document.getElementById("search");
        if(search_field){
            searchFn = window.helper.debounce((e) => {
                this.manufacture_show = true;
                let manufacturer_list = document.querySelector('.search-field-container > .box');
                if(manufacturer_list){
                    manufacturer_list.style.display = 'none';
                }

                object.search = search_field.value;
                window.helper.insertParamUrl('search', search_field.value);
                object.category_id = null;
                if(object.search == ''){
                    object.category_id = object.root_category;
                }
                if(object.table) {
                    window.helper.insertParamUrl('category_id', 'null');
                    object.table.setData('/' + object.active_tab + '/tabledata', object.prepareDataForTable());
                    object.loadCategory(object.category_id);
                }
                else {
                    this.searchProviderStores();
                }
                //object.page = 1;
                //object.reload(e);
            }, 400);
            search_field.addEventListener("keydown", searchFn);
            search_field.addEventListener("paste", searchFn);
            search_field.addEventListener("delete", searchFn);
        }
    }

    resetDate(){
        this.dates_range = null;
        this.page = 1;
        this.table.setData('/' + this.active_tab + '/tabledata', this.prepareDataForTable());
        this.dates.clear();
        window.notification.notify( 'success', 'Дата очищена');
    }

    resetSearch(){
        document.getElementById('search').value = '';
        this.search = '';
        this.page = 1;
        this.reload();
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
                    object.dates_range = window.flatpickr.formatDate(selectedDates[0], "d.m.Y") + '|' + window.flatpickr.formatDate(selectedDates[1], "d.m.Y").toString();
                } else {
                    object.dates_range = null;
                }
                // object.reload();
                object.table.setData('/' + object.active_tab + '/tabledata', object.prepareDataForTable());
            }
        });
    }

    reload(){
        this.table.setData('/' + this.active_tab + '/tabledata', this.prepareDataForTable());
    }

}
export default storePage;
