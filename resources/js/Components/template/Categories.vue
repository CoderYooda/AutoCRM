<template>
    <div class="content-menu box w-250" id="category-nav">
        <div v-if="loading" class="list-placeholder" style="height: 53px;">
            <div class="list-placeholder_item" style="height: 53px;">
                <div class="list-placeholder_cell" style="width: 100%" ></div>
            </div>
        </div>
        <div v-if="loading" class="list-placeholder">
            <div v-for="elem in 12" v-bind:key="elem" class="list-placeholder_item" style="height: 31px;">
                <div class="list-placeholder_cell" style="width: 100%" ></div>
            </div>
        </div>
        <div v-if="!loading" class="box-header store">
            <div v-if="only_name">{{ name }}</div>
            <router-link class="category-back-button" v-if="!only_name" tag="a" :to="{ name: 'base', params: { category_id: parent_id }}">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
                <span title="Автокрепеж">{{ name }}</span>
            </router-link>
        </div>
        <div class="box-content" v-bind:class="{'d-none' : loading}" data-simplebar style="max-height: calc(100% - 54px);">
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
                id: null,
                parent_id: null,
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
            // parent_id(){
            //     return this.parent_id ? this.parent_id : this.root_category;
            // },
            loading(){
                return this.$parent.loading;
            },
            category_id(){
                return (this.$route.params.category_id === 'all' || parseInt(this.$route.params.category_id) <= parseInt(this.root_category)) ? this.root_category : this.$route.params.category_id;
            },
        },
        methods:{
            isOnlyName(){
                this.only_name = parseInt(this.category_id) <= parseInt(this.root_category);
            },

            setRootCategory(force = false){
                this.$parent.category_loading = true;
                window.axios({
                    method: 'get',
                    url: '/categories/' + this.category_id,
                }).then((resp) =>  {
                    this.name = resp.data.name;
                    this.parent_id = resp.data.category_id;
                    this.isOnlyName();
                    this.$parent.category_loading = false;
                });
            },
            getCategories(){
                this.$parent.categories_loading = true;
                window.axios({
                    method: 'get',
                    url: '/categories/' + this.category_id + '/children',
                }).then((resp) =>  {
                    this.categories = resp.data;
                    this.$parent.categories_loading = false;
                });
            },
        }
    }
</script>

<style scoped>

</style>
