import {Contextual, ContextualItem} from "../Contentual";

class actionsPage{

    constructor(){
        console.log('страница истории инициализировано');
        this.active = true;
        this.root_id = 'partner_index_page';
        this.root_category = 3;
        this.category_id = null;//window.helper.findGetParameter('category_id');
        this.page = window.helper.findGetParameter('page');
        this.search = null;
        this.search_obj = document.querySelector("#actions_search");
        this.contextDop = 'actions';
        this.parametr = 'actions';
        this.active_tab = 'actions';
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
            object.prepareParams();
            object.table.setData('/partner/tabledata', object.prepareDataForTable());
            object.loadCategory(object.category_id, true, false)
        });
        object.linked();
    }

    linked(){ //Состояние Linked - когда экземпляр класса уже был загружен, и находится в памяти. (Возвращение на страницу)
        // this.category_id = window.helper.findGetParameter('category_id');
        // this.page = window.helper.findGetParameter('page');
        // this.search = window.helper.findGetParameter('search');
        // this.searchInit();
        // this.initTableData();
        //this.loadCategory(this.root_category, true, true);
    }

    cleanSearch(){
        this.search = null;
        this.search_obj.value = null;
    }


    searchInit(){
        let object = this;
        if(object.search_obj){
            let search = object.search_obj;
            if(search){
                let searchFn = window.helper.debounce(function(e) {
                    object.search = search.value;
                    object.page = 1;
                    //object.table.setData('/partner/tabledata', object.prepareDataForTable());
                    //console.log(1);
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

    checkActive(){
        let className = window.location.pathname.substring(1);
        let link = document.getElementById('actions_link');
        if(className === 'actions'){
            link.classList.add('active');
            this.active = true;
        } else {
            link.classList.remove('active');
            this.active = false;
        }
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



    prepareDataForTable(){
        let object = this;
        let data = {};
        data.view_as = "json";
        data.target = "ajax-table-partner";
        data.page = 1;

        if(object.partner !== []){data.partner = object.partner;}
        if(object.dates_range !== null){data.dates_range = object.dates_range;}
        if(object.category_id !== null){data.category_id = object.category_id.toString();}
        if(object.search && object.search !== 'null' || object.search !== null){data.search = object.search.toString();}
        return data;
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
export default actionsPage;
