<template>
    <div  ref="ofsetter_cat" class="content-menu box w-250" id="category-nav">
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
        <div v-if="!loading" ref="contextt" class="context" id="context" v-bind:style="context_style">
            <div v-on:click="editCategory()" class="context_item">
                <div class="title">Редактировать</div>
            </div>
            <div v-on:click="removeCategory()" class="context_item">
                <div class="title">Удалить</div>
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
                    <a v-bind:class="{'active' : isSelected(category.id)}" v-on:contextmenu="openContext($event, category.id )" href="#">{{ category.name }}</a>
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
                categories:{},
                context_opened: false,
                context_style:{},
                contexted_category: null,
            }
        },
        watch: {
            $route(to, from) {
                this.setRootCategory();
                this.getCategories();
            }
        },
        mounted(){
            this.$eventBus.$on('CategoryUpdated', (data)=>{
                this.$notify({
                    group: 'main',
                    title: 'Система',
                    text: 'Категория обновлена'
                });
                this.setRootCategory(true);
                this.getCategories(true);
            });
            this.$eventBus.$on('CategoryDeleted', ()=>{
                this.$notify({
                    group: 'main',
                    title: 'Система',
                    text: 'Категория удалена'
                });
                this.setRootCategory(true);
                this.getCategories(true);
            });
            this.setRootCategory();
            this.getCategories();
            document.addEventListener('click', this.closeContext);
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
            isSelected(id){
                return (id === this.contexted_category) && this.context_opened;
            },
            isOnlyName(){
                this.only_name = parseInt(this.category_id) <= parseInt(this.root_category);
            },

            setRootCategory(force = null){
                if(!force)
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
            getCategories(force = null){
                if(!force)
                    this.$parent.categories_loading = true;
                window.axios({
                    method: 'get',
                    url: '/categories/' + this.category_id + '/children',
                }).then((resp) =>  {
                    this.categories = resp.data;
                    this.$parent.categories_loading = false;
                });
            },
            openContext(event, id){
                event.preventDefault();
                this.contexted_category = id;
                this.context_opened = true;
                let ofsetter = this.$refs.ofsetter_cat;
                if(ofsetter){
                    let contextY = event.clientY - ofsetter.getBoundingClientRect().top + window.scrollY;
                    if(event.clientY + this.$refs.contextt.offsetHeight + 100 >= window.innerHeight){
                        contextY -= this.$refs.contextt.offsetHeight;
                    }
                    this.context_style = {
                        top: contextY + 'px',
                        left: event.clientX - ofsetter.getBoundingClientRect().left + window.scrollX + 'px'
                    };
                }
            },
            closeContext(e){
                this.context_opened = false;
                this.context_style = {
                    top: '-1200px',
                    left: '-1200px',
                };
            },
            editCategory(){
                this.$eventBus.$emit('openDialog', {
                    tag: 'category',
                    params: {root_category:this.root_category, id: this.contexted_category}
                });
            },
            removeCategory(){

                this.$confirm(
                    {
                        title: 'Внимание!',
                        message: 'Действие необратимо. Все вложенные товары переместятся в категорию "Несортированные".',
                        button: {
                            no: 'Закрыть',
                            yes: 'Удалить'
                        },
                        callback: confirm => {
                            if (confirm) {
                                window.axios({
                                    method: 'delete',
                                    url: '/categories/' + this.contexted_category,
                                }).then((resp) =>  {
                                    this.$eventBus.$emit('CategoryDeleted');
                                });
                            }
                        }
                    }
                );


            }
        }
    }
</script>

<style scoped>

</style>
