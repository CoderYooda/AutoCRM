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
        props:['category', 'root_category'],
        data: ()=> {
            return {
                name: null,
                parent_id: null,
                only_name: true,
                categories:{}
            }
        },
        watch: {
            $route(to, from) {
                console.log(2);
                this.setRootCategory();
                this.getCategories();
            }
        },
        mounted(){
            this.setRootCategory();
            this.getCategories();
        },
        computed: {
            // parent_id(){
            //     return this.parent_id ? this.parent_id : this.root_category;
            // },
            category_id(){
                return (this.$route.params.category_id === 'all') ? this.root_category : this.$route.params.category_id;
            },
        },
        methods:{
            isOnlyName(){
                this.only_name = this.category_id === this.root_category;
            },
            setRootCategory(){
                let category = this.getFromLocalStorage('category_' + this.category_id + '_meta');
                if(category){
                    this.name = category.name;
                    this.parent_id = category.category_id;
                    this.isOnlyName();
                } else {
                    window.axios({
                        method: 'get',
                        url: '/categories/' + this.category_id,
                    }).then((resp) =>  {
                        this.name = resp.data.name;
                        this.parent_id = resp.data.category_id;
                        this.saveToLocalStorage('category_' + this.category_id + '_meta', resp.data);
                        this.isOnlyName();
                    });
                }
            },
            getCategories(){
                let categories = this.getFromLocalStorage('categories_' + this.category_id);
                if(categories){
                    this.categories = categories;
                } else {
                    window.axios({
                        method: 'get',
                        url: '/categories/' + this.category_id + '/children',
                    }).then((resp) =>  {
                        this.categories = resp.data;
                        this.saveToLocalStorage('categories_' + this.category_id, this.categories);
                    });
                }
            },
        }
    }
</script>

<style scoped>

</style>
