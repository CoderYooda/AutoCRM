<template>
    <div>
        <div>
            <input class="d-none" ref="cat_img_upload" type="file" @change="sync" accept="image/jpeg,image/png,image/gif"/>
            <div class="">
                <div class="box-body">
                    <div class="d-flex">
                        <div class="flex-1">
                            <div class="form-group mb-0">
                                <label>В категории</label>
                                <div v-if="loading" class="list-placeholder mb-3" style="height: 30px;">
                                    <div class="list-placeholder_item" style="height: 30px;">
                                        <div class="list-placeholder_cell" style="width: 100%" ></div>
                                    </div>
                                </div>
                                <div v-if="!loading" class="input-group mb-3">
                                    <button v-on:click="openSelectCategoryDialog()" type="button" name="category_id" class="category_select form-control text-left button_select">
                                        {{ parent_name }}
                                    </button>
                                </div>
                            </div>
                            <FormInput v-bind:inputData="{type:'input',label:'Название',name:'name', messages:messages}" />

                        </div>
                        <div class="ml-15">
                            <div class="form-group mb-0">
                                <label>Основное фото</label>
                                <div class="img_upload_cat_container">
                                    <div v-if="loading" class="list-placeholder mb-3" style="height: 100px;">
                                        <div class="list-placeholder_item" style="height: 100px;">
                                            <div class="list-placeholder_cell" style="width: 100%" ></div>
                                        </div>
                                    </div>
                                    <img v-if="!loading" class="h-100 w-100 image" :src="image" />
                                    <span v-if="!loading" @click="uploadClick()" class="upload_btn">Загрузить</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button @click="$parent.closeDialog(dialog)" type="button" class="button white" >Закрыть</button>
                <button v-on:click="save()" type="button" class="button primary pull-right">Сохранить</button>
            </div>
            <div class="system_message">
            </div>
        </div>
    </div>
</template>

<script>
    import validateMixin from "./../../mixins/validateMixin"
    import FormInput from "./../../service/FormInput"
    export default {
        name: "CategoryDialog",
        props:['dialog'],
        mixins: [validateMixin],
        data: ()=> {
            return {
                category_id: 1,
                parent_name: null,
                id: null,
                image: '/images/no_image.png',
                image_id: null,
                image_file: null,
                name: null,
                loading:false,
                messages:{},
            }
        },
        // beforeMount(){
        //     this.dialog = this.$attrs.dialog;
        // },
        mounted(){

            if(this.dialog.params && this.dialog.params.selected_category){
                let category_id = this.dialog.params.selected_category;
                if(category_id && category_id !== 'all'){
                    this.category_id = category_id;
                }
            }

            if(this.dialog.id === 0){
                this.dialog.title = "Новая категория";
                this.getParentCategory();
            } else {
                this.loading = true;
                window.axios({
                    method: 'get',
                    url: '/categories/' + this.dialog.id,
                }).then((resp) =>  {
                    this.dialog.title = "Редактирование категории '" + resp.data.name + "'";
                    this.id = resp.data.id;
                    this.name = resp.data.name;
                    this.category_id = resp.data.category_id;
                    this.parent_name = resp.data.parent.name;
                    this.image = resp.data.image ? resp.data.image.url : '/images/no_image.png';
                    this.image_id = resp.data.image_id;
                    this.dialog.id = resp.data.id;
                    this.loading = false;
                });
            }
        },
        watch: {
            name: {
                handler(newVal, oldVal){
                    this.messages['name'] = null;
                }
            }
        },
        computed: {
            nameHasError(){
                return this.messages.name && this.messages.name.length;
            }
        },
        methods:{
            getParentCategory(){
                this.loading = true;
                window.axios({
                    method: 'get',
                    url: '/categories/' + this.category_id,
                }).then((resp) =>  {
                    this.category_id = resp.data.id;
                    this.parent_name = resp.data.name;
                    this.loading = false;
                });
            },
            sync(e){
                e.preventDefault();
                this.image_file = e.target.files[0];
                this.syncImage();
            },
            uploadClick(){
                this.$refs.cat_img_upload.click();
            },
            syncImage(){
                let data = new FormData();
                data.append('image', this.image_file);
                this.loading = true;
                window.axios({
                    method: 'post',
                    url: '/image/upload',
                    data:data
                }).then((resp) =>  {
                    this.image = resp.data.images[0].url;
                    this.image_id = resp.data.images[0].id;
                    this.loading = false;
                });
            },
            openSelectCategoryDialog(){
                this.$eventBus.$emit('openDialog', {
                    tag: 'selectCategory',
                    params: {root_category:this.dialog.params.root_category, ref: this}
                    // params: {ref: {
                    //     name: this.dialog.name,
                    //     id: this.dialog.id,
                    //     }}
                });
            },
            setCategory(category){
                this.category_id = category.id;
                this.parent_name = category.name;
                this.$notify({
                    group: 'main',
                    type: 'success',
                    text: 'Категория выбрана'
                });
            },
            save(){
                let method = this.id ? 'patch' : 'post';
                let url = this.id ? '/' + this.id : '';
                this.loading = true;
                window.axios({
                    method: method,
                    url: '/categories' + url,
                    data:{
                        name:           this.name,
                        category_id:    this.category_id,
                        image_id:       this.image_id
                    }
                }).then((resp) =>  {
                    this.id = resp.data.id;
                    this.$eventBus.$emit('CategoryUpdated', {id: this.id, category_id:this.category_id});
                    this.$parent.closeDialog(this.dialog);
                    this.loading = false;
                }).catch((error) => {
                    this.loading = false;
                    this.messages = error.response.data.messages;
                });
            }
        },
        components:{
            FormInput
        }
    }
</script>
