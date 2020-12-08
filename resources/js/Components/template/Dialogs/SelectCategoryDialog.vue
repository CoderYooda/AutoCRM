<template>
    <div>
        <!--<div class="modal-header">-->
            <!--<form class="flex d-flex w-100">-->
                <!--<input type="text"  name="category_search" class="form-control search mr-15" placeholder="Поиск категории" required="">-->
            <!--</form>-->
        <!--</div>-->
        <div class="box-body inscroll">
            <div class="recurse_categories" data-simplebar style="max-height: 400px;" >
                <div class="base_cat"></div>
                <RecursiveCategory v-bind:category="{id:root_category, childs:categories}"/>
            </div>
        </div>
        <div class="modal-footer">
            <button @click="$parent.closeDialog(dialog)" class="button white">Закрыть</button>
        </div>
        <div class="system_message">

        </div>
    </div>
</template>

<script>
    import RecursiveCategory from "../../service/RecursiveCategory"
    export default {
        name: "SelectCategoryDialog",
        props:['dialog'],
        data: ()=> {
            return {
                category: 1,
                category_id: 1,
                parent_name: null,
                categories:[],
            }
        },
        // beforeMount(){
        //     this.dialog = this.$attrs.dialog;
        // },
        beforeMount(){
            this.dialog.title = "Выбор категории";
            this.dialog.width = 400;
            this.root_category = this.dialog.params.root_category ? this.dialog.params.root_category : this.root_category;
        },
        mounted(){

            window.axios({
                method: 'get',
                url: '/categories/' + this.root_category + '/children',
            }).then((resp) =>  {
                this.categories = resp.data;
            });
        },
        computed: {
        },
        methods:{
            pickCategory(category){
                this.dialog.params.ref.setCategory(category);
                this.$parent.closeDialog(this.dialog);
            }
        },
        components:{
            RecursiveCategory
        }
    }
</script>
