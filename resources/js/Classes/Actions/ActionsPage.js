import {Contextual, ContextualItem} from "../Contentual";
import Tabs from "../../Tools/Tabs";

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
        this.dates_range = null;
        this.partner_id = null;
        this.type = null;
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
            // object.prepareParams();
            // object.table.setData('/partner/tabledata', object.prepareDataForTable());
        });

        document.addEventListener('PartnerRemoved', function(e){
            // object.prepareParams();
            // object.table.setData('/partner/tabledata', object.prepareDataForTable());
        });

        document.addEventListener('WarrantStored', function(e){
            // object.prepareParams();
            // object.table.setData('/partner/tabledata', object.prepareDataForTable());
        });

        document.addEventListener('CategoryStored', function(e){
            // object.prepareParams();
            // object.table.setData('/partner/tabledata', object.prepareDataForTable());
            // object.loadCategory(object.category_id, true, false)
        });
        object.linked();
    }

    linked(){ //Состояние Linked - когда экземпляр класса уже был загружен, и находится в памяти. (Возвращение на страницу)
        // this.category_id = window.helper.findGetParameter('category_id');
        // this.page = window.helper.findGetParameter('page');
        // this.search = window.helper.findGetParameter('search');

        // this.initTableData();
        //this.loadCategory(this.root_category, true, true);
        this.searchInit();
        this.initDatesFilter();
    }

    setField(option, value = null, text, elem = null){
        let object = this;
        object[option] = value;
        document.getElementById(option).value = text;
        if(elem !== null){
            elem.closest('.dropdown').classList.remove('show');
        }

        if(value == null){
            window.notification.notify( 'success', 'Поле очищено');
        }
        this.reloadPage();
    }

    searchInit(){
        let object = this;
        if(document.getElementById("actions_search")){
            let search = document.getElementById("actions_search");
            if(search){
                let searchFn = window.helper.debounce(function(e) {
                    object.search = search.value;
                    object.page = 1;
                    object.loadUsers(search.value);
                }, 400);
                search.addEventListener("keydown", searchFn);
                search.addEventListener("paste", searchFn);
                search.addEventListener("delete", searchFn);
                //document.addEventListener("PartnerStored", searchFn);
            }
        }
    }

    pickPartner(id){
        this.partner_id = id;
        this.reloadPage();
    }

    cleanSearch(){
        this.search = null;
        this.search_obj.value = null;
        this.loadUsers(null);
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
                object.reloadPage();
                //object.table.setData('/' + object.active_tab + '/tabledata', object.prepareDataForTable());
            }
        });
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

    loadUsers(string){
        let object = this;
        let data = {};
        data.view_as = "json";
        data.search = string;

        window.axios({
            method: 'post',
            url: '/actions/searchPartner',
            data: data
        }).then(function (resp) {
            document.getElementById('members-container').innerHTML = resp.data.members;
        });
    }

    resetDate(){
        this.dates_range = null;
        this.page = 1;
        this.dates.clear();
        this.reloadPage();
        window.notification.notify( 'success', 'Дата очищена');
    }

    reloadPage(){
        let object = this;
        let data = {};
        data.view_as = "json";
        data.target = "ajax-table-partner";
        data.page = 1;

        if(object.dates_range !== null){data.dates_range = object.dates_range;}
        if(object.type !== null){data.type = object.type.toString();}
        if(object.partner_id !== null){data.user_id = object.partner_id;}

        window.axios({
            method: 'post',
            url: 'actions/freshPage',
            data: data
        }).then(function (resp) {
            document.getElementById('actions-container').innerHTML = resp.data.actions;
            document.getElementById('system_messages-container').innerHTML = resp.data.system_messages;
        });

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
