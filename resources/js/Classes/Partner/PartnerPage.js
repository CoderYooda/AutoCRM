class partnerPage{

    constructor(){
        console.log('страница партнера инициализировано');
        this.active = true;
        this.root_id = 'partner_index_page';
        this.category_id = window.helper.findGetParameter('category_id');
        this.page = window.helper.findGetParameter('page');
        this.search = window.helper.findGetParameter('search');
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
        this.searchInit();
        this.category_id = window.helper.findGetParameter('category_id');
        this.page = window.helper.findGetParameter('page');
        this.search = window.helper.findGetParameter('search');
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
            el = el.querySelector("input[name=search]");
            if(el){
                let searchFn = window.helper.debounce(function(e) {
                    object.searchFn(el);
                }, 400);
                el.addEventListener("keydown", searchFn);
                el.addEventListener("paste", searchFn);
                el.addEventListener("delete", searchFn);
                //document.addEventListener("PartnerStored", searchFn);
            }
        }
    }

    searchFn(el){
        let object = this;
        var string = el.value;
        if (isXHRloading) { return; } window.isXHRloading = true;
        let data = {};
        data.search = string;
        data.category_id = window.helper.findGetParameter('category_id');
        window.axios({
            method: 'post',
            url: 'partner/search',
            data: data,
        }).then(function (resp) {
            var results_container = document.getElementById('ajax-table-partner');
            results_container.innerHTML = resp.data.html;

            window.helper.insertParamUrl('search', string);

            let root = document.getElementById(object.root_id)
            let category_header = root.querySelector("#category_header");
            let category_list = root.querySelector("#category_list_aside");
            category_header.innerHTML = 'Поиск';

            let list =
            '<li class="d-flex flex category-aside">'+
            '<a href="http://autocrm/partner" class="ajax-nav d-flex text-ellipsis" style="flex: auto;">'+
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
}
export default partnerPage;
