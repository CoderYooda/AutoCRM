<template>
    <div>
        <div class="modal-body">
            <div class="row">
                <div class="col-sm-4 no-pr d-flex">
                    <ul class="nav">
                        <li v-for="tab in tabs" v-bind:key="tab.slug" v-bind:class="{'active' : tab.state}"
                            class="nav-item">
                            <a v-on:click="selectTab(tab)" class="nav-link" href="javascript:void(0)">
                                {{ tab.name }}
                                <span class="float-right helper_danger d-none-f">
                                    <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="col-sm-8 no-pl">
                    <div class="tab-content no-pl">
                        <div class="tab-pane active" id="tab_base">
                            <div class="form-group row row-sm">
                                <label for="category_id" class="col-sm-4 label-sm">Поставщик</label>
                                <div class="input-group col-sm-8">
                                    <button type="button" name="partner_id" class="partner_select form-control text-left button_select">
                                    </button>
                                </div>
                            </div>
                            <div class="form-group row row-sm">
                                <label for="category_id" class="col-sm-4 label-sm">Склад</label>
                                <div class="input-group col-sm-8">
                                    <div class="w-100">
                                        <select class="form-control input-c">
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row row-sm">
                                <div class="col-sm-12">
                                    <textarea placeholder="Комментарий" style="resize: none;height: 70px;" class="form-control" name="comment" cols="20" rows="6">23</textarea>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane" id="tab_items">
                            <div  id="po_list">
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="modal-footer">
            <button class="button white uppercase-btn">Закрыть</button>
            <button type="button" class="button primary pull-right uppercase-btn">Сохранить и закрыть</button>
            <button type="button" class="button primary pull-right mr-15 uppercase-btn">Сохранить</button>
        </div>

        <div class="system_message">
        </div>
    </div>
</template>

<script>
    import categoryMixin from "./../../mixins/categoryMixin"
    import supplierMixin from "./../../mixins/supplierMixin"
    import FormInput from "./../../service/FormInput"
    export default {
        name: "ProviderOrderDialog",
        props: ['dialog'],
        mixins: [categoryMixin, supplierMixin],
        data: () => {
            return {
                get shop_activated(){
                    let local_settings = JSON.parse(localStorage['settings']);
                    let index = _.findIndex(local_settings, function(o) { return o.key === "shop_enabled"; });
                    return local_settings[index] ? Boolean(parseInt(local_settings[index].value)) : false;
                },
                tabs: [
                    {slug: "base", name: "Основные", state: true},
                    {slug: "store", name: "Склад", state: false},
                    {slug: "shop", name: "Интернет магазин", state: false},
                    {slug: "barcode", name: "Штрихкод", state: false},
                    {slug: "entrance", name: "Поступления", state: false},
                ],
                entity: {
                    name:null,
                    article:null,
                    sp_main:false,
                    sp_stock:false,
                    sp_discount:0,
                    sp_discount_type:null,
                    specifications:[],
                    image: {
                        id: null,
                        path: '/images/no_image.png',
                    },
                    category:{
                        id:2,
                        name:null,
                    },
                    supplier:{
                        id:null,
                        name:'Не выбран',
                    },
                },
                messages:{},
                loading:false,
            }
        },
        mounted() {
            this.dialog.width = 600;
            if (this.dialog.id === 0) {
                this.dialog.title = "Новый продукт";
                this.getParentCategory();
            } else {
                this.loading = true;
                window.axios({
                    method: 'get',
                    url: '/products/' + this.dialog.id,
                }).then((resp) => {
                    this.dialog.title = "Редактирование товара '" + resp.data.name + "'";
                    this.id = resp.data.id;
                    this.entity = resp.data;
                    this.loading = false;
                }).catch((error) => {
                    if(error.response.status === 404){
                        this.$parent.closeDialog(this.dialog);
                    }
                    this.loading = false;
                });
            }
        },
        computed: {
        },
        methods: {
            selectTab(tab) {
                this.tabs.forEach((tab) => {
                    tab.state = false;
                });
                tab.state = true;
            },
            save(){
                let method = this.entity.id ? 'patch' : 'post';
                let url = this.entity.id ? '/' + this.entity.id : '';
                this.loading = true;
                window.axios({
                    method: method,
                    url: '/products' + url,
                    data:this.entity,
                }).then((resp) =>  {
                    this.$eventBus.$emit('ProductUpdated', {id: this.id, category_id:this.category_id});
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
