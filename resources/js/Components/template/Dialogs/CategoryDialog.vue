<template>
    <div>
        <form >
            <div class="">
                <div class="box-body">
                    <div class="form-group">
                        <label for="category_id">В категории</label>
                        <div class="input-group mb-3">
                            <button type="button" name="category_id" class="category_select form-control text-left button_select">
                                {{ parent_name }}
                            </button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="category_dialog_focused">Наименование</label>
                        <input type="text" v-model="name" class="form-control" placeholder="Наименование (не более 255 символов)" autofocus>
                    </div>
                    <div class="form-group mb-0">
                        <label class="mb-5">Основное фото</label>
                        <div style="width: 110px; height: 110px;">
                            <img class="h-100 w-100 image" src="#" />
                        </div>
                        <label class="upload_file pointer" for="shop[image]">Выберите файл<div></div></label>
                        <input type="file" id="shop[image]"  accept="image/jpeg,image/png,image/gif" hidden/>
                        <input type="hidden" name="image_id"  />
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="button white" >Закрыть</button>
                <button class="button primary pull-right">Сохранить</button>
            </div>
            <div class="system_message">
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "CategoryDialog",
        data: ()=> {
            return {
                root_category: 2,
                parent_id: null,
                parent_name: null,
                id: null,
                name: null,
                dialog: null,
            }
        },
        beforeMount(){
            this.dialog = this.$attrs.dialog;
        },
        mounted(){
            console.log(1);
            let route_category = this.$route.params.category_id;
            if(route_category && route_category !== 'all'){
                this.root_category = route_category;
            }

            if(this.dialog.id === 0){
                this.dialog.title = "Новая категория";
            }
            window.axios({
                method: 'get',
                url: '/data/categories/show',
                params: {
                    category_id: this.root_category
                }
            }).then((resp) =>  {
                this.id = resp.data.id;
                this.name = resp.data.name;
                this.parent_id = resp.data.parent_id;
                this.parent_name = resp.data.parent_name;
                this.dialog.id = resp.data.id;
            });
        },
        computed: {

        },
        methods:{

        }
    }
</script>
