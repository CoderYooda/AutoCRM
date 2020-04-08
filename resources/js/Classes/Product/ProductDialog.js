
class ProductDialog{

    constructor(dialog){

        console.log('Окно создания товара инициализировано');
        this.root_dialog = dialog;
        // this.search_obj = dialog.querySelector("#product_search");
        // this.store_obj = dialog.querySelector("#product_search_store");
        // this.results_obj = dialog.querySelector("#search_product_results");
        // this.refer = dialog.querySelector("#refer").value;
        this.provider_search_container = this.root_dialog.querySelector('#provider_search_container');
        this.provider_search_cont = this.root_dialog.querySelector('#provider_search_container .cont');
        this.article_input = this.root_dialog.querySelector('input[name=article]');
        this.init();
    }

    init(){
        let object = this;
        // document.addEventListener("ProductStored", function(){
        //     object.finitaLaComedia();
        // });
        let focused = document.getElementById('product_dialog_focused');
        if(focused){
            focused.focus();
            focused.select();
        }

        var fn = window.helper.debounce(function(e) {object.trinitySearch();}, 800);

        ///Вешаем обрабочик на поле скидки/////////////
        this.article_input.addEventListener("keydown", fn);
        this.article_input.addEventListener("paste", fn);
        this.article_input.addEventListener("delete", fn);
    }

    finitaLaComedia(){
        closeDialog(null, this.root_dialog.id);
        delete window[this.root_dialog.id];
    }

    save(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(e){
            object.finitaLaComedia();
        });
    }

    trinitySearch(){
        let object = this;


        window.isXHRloading = true;
        document.getElementById('trin_preload').classList.remove('hide');
        let data = {};
        data.search = this.article_input.value;
        window.axios({
            method: 'post',
            url: '/providers/trinity/search_brands',
            data: data
        }).then(function (resp) {
            if(data.search.length > 0){
                object.provider_search_container.classList.add('show');
            } else {
                object.provider_search_container.classList.remove('show');
            }

            let html = '';
            for (let [key, value] of Object.entries(resp.data.brands.data)) {
                html += '<div class="tr_result" data-ident="' + value.ident + '" data-article="' + value.article + '" data-producer="' + value.producer + '" onclick="window.productDialog.appendArticle(this)">' +
                    '<span class="article">' + value.ident + '</span>' +
                    '<span class="article">Артикул: ' + value.article + '</span>' +
                    '<span class="article">Производитель: ' + value.producer + '</span>' +
                    '</div>'
            }
            object.provider_search_cont.innerHTML = html;
            document.getElementById('trin_preload').classList.add('hide');
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

    appendArticle(elem){
        this.root_dialog.querySelector('input[name=article]').value = elem.dataset.article;
        this.root_dialog.querySelector('input[name=name]').value = elem.dataset.ident;
        this.root_dialog.querySelector('input[name=new_supplier_name]').value = elem.dataset.producer;
        this.root_dialog.querySelector('button[name=supplier_id]').innerHTML = elem.dataset.producer;

    }

    openSelectCategoryDialog(category_selected = null){
        window.openDialog('selectCategory', '&refer=' + this.root_dialog.id + '&category_selected=' + category_selected);
    }

    openSelectSupplierDialog(){
        window.openDialog('selectSupplier', '&refer=' + this.root_dialog.id);
    }

    selectCategory(id){
        var object = this;
        window.axios({
            method: 'post',
            url: 'category/'+ id +'/select',
            data: {refer:this.root_dialog.id}
        }).then(function (resp) {

            let select = object.root_dialog.querySelector('button[name=category_id]');
            let input = object.root_dialog.querySelector('input[name=category_id]');
            let str = resp.data.name;
            input.value = resp.data.id;
            select.innerHTML = str;
            window.notification.notify( 'success', 'Категория выбрана');
            document.dispatchEvent(new Event('CategorySelected', {bubbles: true}));
            console.log("Событие CategorySelected вызвано");
            //closeDialog(event);

        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    };

    selectSupplier(id){
        var object = this;
        window.axios({
            method: 'post',
            url: 'suppliers/'+ id +'/select',
            data: {refer:this.root_dialog.id}
        }).then(function (resp) {
            let select = object.root_dialog.querySelector('button[name=supplier_id]');
            let input = object.root_dialog.querySelector('input[name=supplier_id]');
            let str = resp.data.name;
            input.value = resp.data.id;
            select.innerHTML = str;
            window.notification.notify( 'success', 'Производитель выбран');
            document.dispatchEvent(new Event('SupplierSelected', {bubbles: true}));
            console.log("Событие SupplierSelected вызвано");
            //closeDialog(event);

        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    };

    openCategoryModal(category_selected = null){
        window.openDialog('Dialog', '&refer=' + this.root_dialog.id + '&category_selected=' + category_selected);
    }

}
export default ProductDialog;
