<template>
    <div class="content-menu box w-250" id="category-nav">
        <div class="box-header store">

            <div v-if="only_name">{{ name }}</div>
            <router-link class="category-back-button" v-if="!only_name" tag="a" :to="{ name: 'base', params: { category_id: parent_id }}">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
                <span title="Автокрепеж">{{ name }}</span>
            </router-link>
        </div>
        <div class="box-content" data-simplebar style="max-height: calc(100% - 54px);">
            <ul class="nav" id="category-block">
                <router-link v-for="category in categories" v-bind:key="category.id" tag="li" :to="{ name: 'base', params: { category_id: category.id }}">
                    <a href="#">{{ category.name }}</a>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Categories",
        data: ()=> {
            return {
                category: 2,
                name: null,
                parent_id: null,
                parent_name: null,
                only_name: true,
                categories:{}
            }
        },
        watch: {
            $route(to, from) {
                this.setRootCategory();
                this.getCategories();
            }
        },
        mounted(){

            this.setRootCategory();
            this.getCategories();
        },
        computed: {
            category_id(){
                this.category = (this.$route.params.category_id === 'all') ? this.root_category : this.$route.params.category_id;
                return this.category;
            },
        },
        methods:{
            isOnlyName(){
                this.only_name = this.$attrs.category_id == this.$attrs.root_id;
            },
            setRootCategory(){
                let category = this.getFromLocalStorage('category_' + this.$attrs.category_id + '_meta');
                this.category = this.$attrs.category_id;
                if(category){
                    this.name = category.name;
                    this.parent_id = category.parent_id;
                    this.parent_name = category.parent_name;
                    this.isOnlyName();
                } else {
                    window.axios({
                        method: 'get',
                        url: '/data/categories/show',
                        params: {
                            category_id: this.category
                        }
                    }).then((resp) =>  {
                        this.name = resp.data.name;
                        this.parent_id = resp.data.parent_id;
                        this.parent_name = resp.data.parent_name;
                        this.saveToLocalStorage('category_' + this.$attrs.category_id + '_meta', resp.data);
                        this.isOnlyName();
                    });
                }
            },
            getCategories(){
                let categories = this.getFromLocalStorage('categories_' + this.category);
                if(categories){
                    this.categories = categories;
                } else {
                    window.axios({
                        method: 'get',
                        url: '/data/categories/get',
                        params: {category_id: this.$attrs.category_id}
                    }).then((resp) =>  {
                        this.categories = resp.data;
                        this.saveToLocalStorage('categories_' + this.category, this.categories);
                    });
                }
            },
        }
    }
</script>

<style scoped>

</style>
