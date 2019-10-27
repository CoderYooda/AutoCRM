class partnerPage{

    constructor(){
        console.log('страница партнера инициализировано');
        this.active = true;
        this.root_id = 'partner_index_page';
        this.root_category = 3;
        this.category_id = null;//window.helper.findGetParameter('category_id');
        this.page = window.helper.findGetParameter('page');
        this.search = null;
        this.search_obj = document.querySelector("#partner_search");
        this.init();
    }

    init(){
        let object = this;
        document.addEventListener('ajaxLoaded', function(e){
            object.checkActive();
            object.load();
        });
        object.checkActive();
        object.searchInit();

        document.addEventListener('PartnerStored', function(e){
            object.reloadPage();
        });
        document.addEventListener('PartnerRemoved', function(e){
            object.reloadPage();
        });
    }

    reloadPage(){
        let cat_string;
        if(this.category_id === null){
            cat_string = 'category_id=';
        } else {
            cat_string = 'category_id=' + this.category_id;
        }
        let search_string;
        if(this.search === null){
            search_string = '&search=';
        } else {
            search_string = '&search=' + this.search;
        }
        let page_string;
        if(this.page === null){
            page_string = '&page=';
        } else {
            page_string = '&page=' + this.page;
        }
        window.goto(window.helper.getBaseUrl() + '?' + cat_string + search_string + page_string);
    }

    load(){
        this.category_id = window.helper.findGetParameter('category_id');
        if(window.helper.findGetParameter('page') !== null){
            this.page = window.helper.findGetParameter('page');
        } else { this.page = 1}
        if(window.helper.findGetParameter('search') !== null){
            this.search = window.helper.findGetParameter('search');
        } else { this.search = ''}
        this.searchInit();this.searchInit();
    }

    linked(){ //Состояние Linked - когда экземпляр класса уже был загружен, и находится в памяти. (Возвращение на страницу)
        this.category_id = window.helper.findGetParameter('category_id');
        this.page = window.helper.findGetParameter('page');
        this.search = window.helper.findGetParameter('search');
        this.searchInit();
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
        let el = document.getElementById(object.root_id);
        if(el){
            let search = el.querySelector("input[name=search]");
            if(search){
                let searchFn = window.helper.debounce(function(e) {
                    object.search = search.value;
                    object.page = 1;
                    object.reload();
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
        window.axios({
            method: 'get',
            url: object.getUrlString(),
        }).then(function (resp) {
            var results_container = document.getElementById(resp.data.target);
            results_container.innerHTML = resp.data.html;

            window.helper.insertParamUrl('search', object.search);

            let root = document.getElementById(object.root_id)
            let category_header = root.querySelector("#category_header");
            let category_list = root.querySelector("#category_list_aside");
            category_header.innerHTML = 'Поиск';

            let list =
            '<li class="d-flex flex category-aside">'+
            '<a href="partner" class="ajax-nav d-flex text-ellipsis" style="flex: auto;">'+
            '<span class="nav-text text-ellipsis"><i class="fa fa-chevron-left"></i> К категориям</span>'+
            '</a>'+
            '</li>';
            category_list.innerHTML = list;
            window.rebuildLinks();
            object.load();

        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
        // console.log(111);
        //goto('/partner/search?view_as=json&search=' + string);
    }

    reload(){
        let object = this;
        object.prepareParams();
        if (isXHRloading) { return; } window.isXHRloading = true;
        window.axios({
            method: 'get',
            url: object.getUrlString(),
        }).then(function (resp) {
            var results_container = document.getElementById(resp.data.target);
            results_container.innerHTML = resp.data.html;
            window.helper.insertParamUrl('search', object.search);
            window.helper.insertParamUrl('category_id', object.category_id);
            window.helper.insertParamUrl('page', object.page);

            if(object.search.length > 0){
                let root = document.getElementById(object.root_id)
                let category_header = root.querySelector("#category_header");
                let category_list = root.querySelector("#category_list_aside");
                category_header.innerHTML = 'Поиск';

                let list =
                    '<li class="d-flex flex category-aside">'+
                    '<a href="partner" class="ajax-nav d-flex text-ellipsis" style="flex: auto;">'+
                    '<span class="nav-text text-ellipsis"><i class="fa fa-chevron-left"></i> К категориям</span>'+
                    '</a>'+
                    '</li>';
                category_list.innerHTML = list;
            }


            window.rebuildLinks();
            object.load();
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    }
}
export default partnerPage;
