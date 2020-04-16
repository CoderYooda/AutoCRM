import {Contextual, ContextualItem} from "../Contentual";

class partnerPage{

    constructor(){
        console.log('страница партнера инициализировано');
        this.active = true;
        this.root_id = 'partner_index_page';
        this.root_category = 3;
        this.category_id = null;
        this.page = window.helper.findGetParameter('page');
        this.search = null;
        this.search_obj = document.querySelector("#partner_search");
        this.contextDop = 'partner';
        this.parametr = 'partner';
        this.active_tab = 'partner';
        this.init();
    }

    init(){
        let object = this;
        document.addEventListener('ajaxLoaded', function(e){
            object.checkActive();
            //object.load();
        });
        object.checkActive();
        //object.searchInit();

        document.addEventListener('PartnerStored', function(e){
            object.prepareParams();
            object.table.setData('/partner/tabledata', object.prepareDataForTable());
        });

        document.addEventListener('PartnerRemoved', function(e){
            object.prepareParams();
            object.table.setData('/partner/tabledata', object.prepareDataForTable());
        });

        document.addEventListener('WarrantStored', function(e){
            object.prepareParams();
            object.table.setData('/partner/tabledata', object.prepareDataForTable());
        });

        document.addEventListener('CategoryStored', function(e){
            if(object.active){
                object.prepareParams();
                object.table.setData('/partner/tabledata', object.prepareDataForTable());
                object.loadCategory(object.category_id, true, false);
            }
        });
        object.linked();
    }

    openCategoryModal(){
        let cat_id = this.root_category;
        if(this.category_id != null){
            cat_id = this.category_id;
        }
        window.openDialog('categoryDialog', '&category_select=' + cat_id);
    }

    openPartnerModal(){
        let cat_id = this.root_category;
        if(this.category_id != null){
            cat_id = this.category_id;
        }
        window.openDialog('partnerDialog', '&category_select=' + cat_id);
    }


    // reloadPage(){
    //     let cat_string;
    //     if(this.category_id === null){
    //         cat_string = 'category_id=';
    //     } else {
    //         cat_string = 'category_id=' + this.category_id;
    //     }
    //     let search_string;
    //     if(this.search === null){
    //         search_string = '&search=';
    //     } else {
    //         search_string = '&search=' + this.search;
    //     }
    //     let page_string;
    //     if(this.page === null){
    //         page_string = '&page=';
    //     } else {
    //         page_string = '&page=' + this.page;
    //     }
    //     window.goto(window.helper.getBaseUrl() + '?' + cat_string + search_string + page_string);
    // }

    // load(){
    //     this.category_id = window.helper.findGetParameter('category_id');
    //     if(window.helper.findGetParameter('page') !== null){
    //         this.page = window.helper.findGetParameter('page');
    //     } else { this.page = 1}
    //     if(window.helper.findGetParameter('search') !== null){
    //         this.search = window.helper.findGetParameter('search');
    //     } else { this.search = ''}
    //    //this.searchInit();
    // }

    linked(){ //Состояние Linked - когда экземпляр класса уже был загружен, и находится в памяти. (Возвращение на страницу)
        this.category_id = window.helper.findGetParameter('category_id');
        this.page = window.helper.findGetParameter('page');
        this.search = window.helper.findGetParameter('search');
        this.searchInit();
        this.initTableData();
        this.initCategoryContextual();
        this.checkActive();
        //this.loadCategory(this.root_category, true, true);
    }

    cleanSearch(){
        this.search = null;
        document.getElementById("search").value = null;
        this.table.setData('/partner/tabledata', this.prepareDataForTable());
    }

    checkActive(){
        let className = window.location.pathname.substring(1);
        let link = document.getElementById('partner_link');
        if(className === 'partner'){
            link.classList.add('active');
            this.active = true;
        } else {
            link.classList.remove('active');
            this.active = false;
        }
    }

    searchInit(){
        let object = this;
        if(document.getElementById("search")){
            let search = document.getElementById("search");
            if(search){
                let searchFn = window.helper.debounce(function(e) {
                    object.search = search.value;
                    object.page = 1;
                    object.table.setData('/partner/tabledata', object.prepareDataForTable());
                    console.log(1);
                }, 400);
                search.addEventListener("keydown", searchFn);
                search.addEventListener("paste", searchFn);
                search.addEventListener("delete", searchFn);
                //document.addEventListener("PartnerStored", searchFn);
            }
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
    }

    getUrlString(){
        let url = '?view_as=json';
        url += '&target=ajax-table-partner';
        if(this.category_id !== null){
            url += '&category_id=';
            url += this.category_id;
        }
        if(this.search && this.search !== 'null' && this.search !== '' && this.search !== null){
            url += '&search=';
            url += this.search;
        }
        if(this.page !== null || this.page !== 'null'){
            url += '&page=';
            url += this.page;
        }
        return url;
    }

    searchFn(){
        let object = this;
        object.prepareParams();
        if (isXHRloading) { return; } window.isXHRloading = true;
        object.table.setData('/partner/tabledata', object.prepareDataForTable());
    }

    searcher(string){
        document.getElementById("search").value = string;
        let object = this;
        object.search = string;
        if (isXHRloading) { return; } window.isXHRloading = true;
        object.table.setData('/partner/tabledata', object.prepareDataForTable());
    }

    initTableData(){
        let object = this;
        let table_container = document.getElementById('table-container');
        let height = 500;

        if(table_container){
            height = table_container.offsetHeight;
        }
        let cleanHeight = height - 110;
        let elements = cleanHeight / 44;

        object.table = new Tabulator("#partner-table", {
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
            height:height-15,
            pagination:"remote",
            layout:"fitColumns",
            ajaxSorting:true,
            ajaxURL:'/partner/tabledata',
            ajaxRequesting:function(url, params){
                window.isXHRloading = true;
                document.body.classList.add('loading');
            },
            ajaxResponse:function(url, params, response){
                window.isXHRloading = false;
                document.body.classList.remove('loading');
                return response;
            },
            ajaxParams:object.prepareDataForTable(),//object.prepareUrlForTable(), //ajax parametersвфеу
            paginationSize:Math.floor(elements),
            placeholder:"По данным критериям ничего нет",
            columns: object.generateColumns(),
            rowContext:function(e, row){
                e.preventDefault();
                object.selectedData = object.table.getSelectedData();
                let items = [
                    new ContextualItem({label:'Открыть', onClick: () => {openDialog(object.contextDop + 'Dialog', '&' + object.parametr + '_id=' + row.getData().id)}, shortcut:'Что то' }),
                    new ContextualItem({label:'Редактировать', onClick: () => {openDialog(object.contextDop + 'Dialog', '&' + object.parametr + '_id=' + row.getData().id)}, shortcut:'Что то' }),
                    new ContextualItem({type:'seperator'}),
                    new ContextualItem({label:'Удалить', onClick: () => {window.entity.remove(object.contextDop, row.getData().id, object)}, shortcut:'Ctrl+A' }),
                ];
                if(object.selectedData.length > 0){
                    items.push(new ContextualItem({label:'Удалить выделенные', onClick: () => {window.entity.remove(object.contextDop, window.helper.pluck(object.selectedData, 'id'), object)}, shortcut:'Ctrl+A' }));
                }
                object.tableContextual = null;
                object.tableContextual = new Contextual({
                    isSticky: false,
                    items:items,
                });
            },
            tableBuilt:function(){
            },
            rowClick:function(e, row){
                let addsCard = document.getElementById('adds-card');
                if(object.active_tab != 'store'){
                    console.log('Загружаем инфо');
                    let data = {};
                    data.id = row.getData().id;
                    window.axios({
                        method: 'post',
                        url: '/partner/side_info',
                        data: data
                    }).then(function (resp) {
                        document.getElementById('contact_block').innerHTML = resp.data.info;
                        if(addsCard){
                            addsCard.classList.remove('hide');
                        }
                        //document.getElementById('comment_block').innerHTML = resp.data.comment;
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

    loadCategory(category_id, clean_search = null, update_data = null){
        let object = this;
        // if(clean_search != null && clean_search){
        //
        // }
        this.search = null;
        document.getElementById("search").value = null;
        document.getElementById("search").value = '';
        object.search = '';
        window.helper.insertParamUrl('search', '');

        window.isXHRloading = true;
        window.helper.insertParamUrl('category_id', category_id);

        object.category_id = category_id;
        if(update_data != null && update_data){
            object.table.setData('/partner/tabledata', object.prepareDataForTable());
        }
        let data = {};
        data.category_id = category_id;
        data.search = object.search;
        data.class = 'partner';
        window.axios({
            method: 'post',
            url: '/category/loadview',
            data: data
        }).then(function (resp) {
            document.getElementById('category-nav').innerHTML = resp.data.html;
            object.initCategoryContextual();
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            window.isXHRloading = false;
        });
    }

    generateColumns(){
        let object = this;
        object.contextDop = 'partner';
        object.parametr = 'partner';

        var phoneFormatter = function(cell, formatterParams, onRendered){
            onRendered(function(){

                if(cell.getValue() != null){
                    cell.getElement().innerHTML = '<input disabled class="table_input" id="phone_'+ cell.getData().id +'" type="text" value="'+ cell.getValue() +'"/>';
                    window.IMask(document.getElementById('phone_' + cell.getData().id), {
                            mask: [
                                {
                                    mask: '+{7}(000)000-00-00',
                                    startsWith: '7',
                                    lazy: true,
                                    country: 'Россия'
                                },
                                {
                                    mask: '{8}(000)000-00-00',
                                    startsWith: '8',
                                    lazy: true,
                                    country: 'Россия'
                                },
                                {
                                    mask: '+{380}(000)000-00-00',
                                    startsWith: '3',
                                    lazy: true,
                                    country: 'Украина'
                                },
                            ]
                        }
                    );
                } else {
                    cell.getElement().innerHTML = 'Не указано';
                }
            });
        };
        var priceFormatter = function(cell, formatterParams, onRendered){
            onRendered(function(){
                cell.getElement().innerHTML = '<input disabled class="table_input" id="price_'+ cell.getData().id +'" type="text" value="'+ cell.getValue() +'"/>';
                window.IMask(document.getElementById('price_' + cell.getData().id),   {
                        mask: 'N Р',
                        blocks: {
                            N: {
                                mask: Number,
                                signed: true,
                                thousandsSeparator: ' '
                            }
                        }
                    }
                );
            });
        };
        let columns = [
            {formatter:"rowSelection", width:34, titleFormatter:"rowSelection", align:"center", headerSort:false, cellClick:function(e, cell){
                    cell.getRow().toggleSelect();
                }},
            {title:"ID", field:"id", width:80},
            {title:"Фио", field:"name", align:"left"},
            {title:"Категория", field:"category", align:"left"},
            {title:"Телефон", field:"phone", align:"left", formatter:phoneFormatter},
            {title:"Баланс", field:"balance", width:130, align:"left", formatter:priceFormatter},
        ];
        return columns;
    }

    prepareDataForTable(){
        let object = this;
        let data = {};
        data.view_as = "json";
        data.target = "ajax-table-partner";
        //data.page = 1;

        if(object.partner !== []){data.partner = object.partner;}
        if(object.dates_range !== null){data.dates_range = object.dates_range;}
        if(object.category_id !== null){data.category_id = object.category_id.toString();}
        if(object.search && object.search !== 'null' || object.search !== null){data.search = object.search.toString();}
        return data;
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

    // reload(){
    //     let object = this;
    //     object.prepareParams();
    //     if (isXHRloading) { return; } window.isXHRloading = true;
    //     window.axios({
    //         method: 'get',
    //         url: object.getUrlString(),
    //     }).then(function (resp) {
    //         var results_container = document.getElementById(resp.data.target);
    //         results_container.innerHTML = resp.data.html;
    //         window.helper.insertParamUrl('search', object.search);
    //         window.helper.insertParamUrl('category_id', object.category_id);
    //         window.helper.insertParamUrl('page', object.page);
    //
    //         if(object.search.length > 0){
    //             let root = document.getElementById(object.root_id)
    //             let category_header = root.querySelector("#category_header");
    //             let category_list = root.querySelector("#category_list_aside");
    //             category_header.innerHTML = 'Поиск';
    //
    //             let list =
    //                 '<li class="d-flex flex category-aside">'+
    //                 '<a href="partner" class="ajax-nav d-flex text-ellipsis" style="flex: auto;">'+
    //                 '<span class="nav-text text-ellipsis"><i class="fa fa-chevron-left"></i> К категориям</span>'+
    //                 '</a>'+
    //                 '</li>';
    //             category_list.innerHTML = list;
    //         }
    //
    //
    //         window.rebuildLinks();
    //         object.load();
    //     }).catch(function (error) {
    //         console.log(error);
    //     }).finally(function () {
    //         window.isXHRloading = false;
    //     });
    // }
}
export default partnerPage;
