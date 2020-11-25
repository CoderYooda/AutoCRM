<template>
    <div class="bottom-container">
        <Categories v-bind:category_id="category_id" root_id="2" />
        <div class="box-lister">
            <div class="d-flex mb-15">
                <div class="search-field-container w-100">
                    <input v-model.lazy="search" v-debounce="450" id="search" name="search" placeholder="Поиск по складу" class="input w-100" value="" type="text">
                </div>
                <div class="actions">
                    <button type="button" class="button primary ml-15" v-on:click="newDialog('category')">Новая категория</button>
                    <button type="button" class="button primary ml-15" v-on:click="newDialog('product')">Новый товар</button>
                </div>
            </div>
            <div class="box d-flex" style="height: calc(100% - 45px);">
                <Table v-bind:search="search" v-bind:root_id="root_category"/>
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
                root_category: 2,
                category: null,
                search: '',
                categories:null
            }
        },
        computed:{
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

                    console.log(this.categories);
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
