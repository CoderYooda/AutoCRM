class storePage{

    constructor(){
        console.log('страница склада инициализировано');
        this.active = true;
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
        object.checkCategory();
        document.addEventListener('ProductStored', function(e){
            object.reloadPage();
        });
        console.log(1);
        simplebar(document.getElementById('fof'));
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


    load(){
        this.checkCategory();
        var object = this;
        let search = document.getElementById('search');
        if(search){
            if(this.category_id && this.category_id !== 2 ){
                object.searchstring = null;
                search.value = null;
            }
        }
        this.searchInit();
    }

    checkCategory(){
        let category_id = window.helper.findGetParameter('category_id');
        if(category_id){
            this.category_id = category_id;
        } else {
            this.category_id = null;
        }
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

    searchInit(){
        var object = this;
        if(document.getElementById("search")){
            var el = document.getElementById("search");
            var searchFn = window.helper.debounce(function(e) {
                object.searchFn(e);
            }, 400);
            el.addEventListener("keydown", searchFn);
            el.addEventListener("paste", searchFn);
            el.addEventListener("delete", searchFn);
        }

        if(document.getElementById("search_partner")){
            var el = document.getElementById("search_partner");
            var searchFn = window.helper.debounce(function(e) {
                object.searchFn(e);
            }, 400);
            el.addEventListener("keydown", searchFn);
            el.addEventListener("paste", searchFn);
            el.addEventListener("delete", searchFn);
        }

        // var update_link = document.getElementsByClassName('update_url');
        // var search = getQueryVar('search');
        // if(search == 'undefined'){
        //     search = '';
        // }
        // [].forEach.call(update_link, function(elem){
        //     helper.insertParam(elem, 'search', search);
        // });
    }

    searchFn(e) {

        if (isXHRloading) { return; }
        let active_tab = getQueryVar('active_tab');
        if(active_tab == 'undefined'){
            active_tab = 'store';
        }

        let search = e.target.value;

        this.searchstring = search;
        if(search.length < 1){
            goto('/store?active_tab=' + active_tab + '&target=ajax-tab-content');
        } else {
            goto('/store?active_tab=' + active_tab + '&view_as=json&target=ajax-table-store&search=' + e.target.value);
        }
        this.checkTrinity(e.target.value);
    }

    checkTrinity(search_str){
        window.isXHRloading = true;

        let data = {};
        data.search = search_str;

        window.axios({
            method: 'post',
            url: '/providers/trinity/search_brands',
            data: data
        }).then(function (resp) {

            var badge = '<b class="badge badge-sm badge-pill warn">' + resp.data.brands.count + '</b>';
            let providertab = document.querySelector('#provider-tab .nav-badge');
            if(providertab){
                providertab.innerHTML = badge;
            }


        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    }

}
export default storePage;
