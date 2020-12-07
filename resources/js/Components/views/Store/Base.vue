<template>
    <div class="bottom-container">
        <Categories v-bind:root_category="root_category" />
        <div class="box-lister">
            <div class="d-flex mb-15">
                <div class="search-field-container w-100">
                    <input v-model.lazy="search" v-debounce="450" id="search" name="search" placeholder="Поиск по складу" class="input w-100" value="" type="text">
                </div>
                <div class="actions">
                    <button type="button" class="button primary ml-15" v-on:click="newDialog('category',  {root_category:root_category, selected_category: category_id, })">Новая категория</button>
                    <button type="button" class="button primary ml-15" v-on:click="newDialog('product')">Новый товар</button>
                </div>
            </div>
            <div class="box d-flex" style="height: calc(100% - 45px);">
                <Table v-bind:table_data="table_data" v-bind:search="search" v-bind:root_id="root_category"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Categories from "./../../template/Categories"
    import Table from "../../service/Table";
    import debounce from './../../../debounce'
    export default {
        name: "Base",
        components:{
            Table,
            Categories
        },
        data: ()=> {
            return {
                table_data:{},
                root_category: 2,
                category: null,
                search: '',
                categories:null,
                table_loading:false,
                category_loading:false,
                categories_loading:false,
            }
        },
        beforeMount(){
            this.table_data.header = [
                {min_width: 90, width: 90, name: 'ID',table_name: 'id'},
                {min_width: 100, width: 'auto', name: 'Наименование', table_name: 'name'},
                {min_width: 150, width: 200, name: 'Артикул', table_name: 'article'},
                {min_width: 150, width: 200, name: 'Производитель', table_name: 'supplier'},
            ];
            this.table_data.context_menu = [
                {name:'Редактировать', action: (id) => {this.newDialog('product', {id:id})}},
                {name:'Открыть', action: (id) => {this.newDialog('product', {id:id})}},
                {name:'Создать заявку поставщику', action: (data) => {openDialog('providerOrderDialog', '&products=' + this.table.getSelectedIDs())}},
                {name:'Печать ценников', action: (data) => {window.openDialog('chequeDialog', '&products=' + this.table.getSelectedIDs())}},
                {name:'Показать аналоги в наличии', action: (data) => {this.showAnalogues(data);}},
            ];
            this.table_data.dbl_click = (id) => {this.newDialog('product', {id:id})};
            this.table_data.url = '/store/base/table_data';
        },
        computed:{
            loading(){
                return this.table_loading || this.category_loading || this.categories_loading;
            },
            category_id(){
                this.category = (this.$route.params.category_id === 'all') ? this.root_category : this.$route.params.category_id;
                return this.category;
            },
        },
        methods:{
            getCategories(){
                window.axios({
                    method: 'get',
                    url: '/data/categories/get',
                    params: {category_id: this.category}
                }).then((resp) =>  {
                    this.categories = resp.data;
                });
            },
            newDialog(tag, params = null){
                this.$eventBus.$emit('openDialog', {
                    tag: tag,
                    params: params
                });
            }
        },
        directives: {debounce}
    }
</script>

<style scoped>

</style>
