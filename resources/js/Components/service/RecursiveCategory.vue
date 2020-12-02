<template>
    <ul>
        <li v-bind:class="{'loading' : cat.loading}" v-for="cat in category.childs">
            <div v-on:click="getChilds(cat)" class="ic" v-bind:class="{'open' : isShown(cat)}"></div>
            <div v-on:click="pick(cat)" class="category pointer" v-bind:class="{'opened' : isShown(cat)}">
                {{ cat.name }}
            </div>
            <RecursiveCategory v-if="cat.childs" v-bind:class="{'show' : isShown(cat)}" v-bind:category="cat" />
        </li>
        <li>
            <div class="ic new"></div>
            <div class="category pointer new">
                <input placeholder="Новая категория" v-bind:class="{'is-invalid' : name_invalid}" @keydown.enter="saveCategory()" v-model="category_name" @keydown.esc="new_focused = false" v-on:focus="new_focused = true" class="new_cat" type="text">
                <button v-on:click="saveCategory()" v-if="new_focused">Создать</button>
            </div>
        </li>
    </ul>
</template>

<script>
    export default {
        props:['category'],
        name: "RecursiveCategory",
        data: ()=> {
            return {
                category_name: null,
                new_focused: false,
                name_invalid: false,
                childs: [],
            }
        },
        watch: {
            // categories: {
            //     handler(newVal, oldVal){
            //         console.log(123);
            //         this.categories = newVal
            //     },
            //     deep: true
            // }
        },
        mounted(){
            this.$eventBus.$on('CategoryUpdated', (data)=>{
                if(data.category_id === this.category.id){
                    this.getChilds(this.category, true);
                }
            });
        },
        computed:{
            // lastChilds(){
            //     return Boolean(this.childs.length);
            // }
        },
        methods:{
            getChilds(category, force = false){
                if(force || !category.childs){
                    category.loading = true;
                    this.$forceUpdate();
                    window.axios({
                        method: 'get',
                        url: '/categories/' + category.id + '/children',
                    }).then((resp) =>  {
                        category.childs = resp.data;
                        category.shown = true;
                        this.childs = category.childs.length;
                        category.loading = false;
                        this.$forceUpdate();
                    });
                } else {
                    category.shown = !category.shown;
                    this.$forceUpdate();
                }

            },
            isShown(category){
                return Boolean(category.shown);
            },
            pick(category){
                let wm = this.getUnrecursiveComponent('SelectCategoryDialog');
                wm.pick(category);
            },
            getUnrecursiveComponent(componentName) {
                let component = null;
                let parent = this.$parent;
                while (parent && !component) {
                    if (parent.$options.name === componentName) {
                        component = parent
                    }
                    parent = parent.$parent;
                }
                return component
            },
            saveCategory(){
                window.axios({
                    method: 'post',
                    url: '/categories',
                    data:{
                        name:           this.category_name,
                        category_id:    this.category.id,
                    }
                }).then((resp) =>  {
                    this.category_name = null;
                    this.new_focused = false;
                    this.$eventBus.$emit('CategoryUpdated', {id: resp.data.id, category_id:resp.data.category_id});
                }).catch((error) => {
                    if(error.response.data.messages.name)
                        this.name_invalid = true;
                });
            }
        },
        components:{
            'RecursiveCategory':        () => import(/* webpackChunkName: "RecursiveCategory" */        './RecursiveCategory'),
        }
    }
</script>

<style scoped>

</style>
