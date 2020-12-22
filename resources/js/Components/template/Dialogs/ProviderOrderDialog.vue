<template>
    <div>
        <div class="modal-body">
            <div class="d-flex">
                <div class="link-tabs no-pr">
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
                <div class="dialog_tab_holder">
                    <div class="tab-content no-pl">
                        <div class="tab-pane" v-bind:class="{'active' : tabs[0].state}">
                            <FormInput v-bind:inputData="{type:'selector',label:'Поставщик',name:'partner_name', onClick:'selectPartner'}" />
                            <FormInput v-bind:inputData="{type:'input',label:'Склад',name:'store.name', onClick:'selectPartner', disabled:true}" />
                            <FormInput v-bind:inputData="{type:'textarea',label:'Комментарий',name:'entity.comment', onClick:'selectPartner', height: 75}" />
                        </div>
                        <div class="tab-pane"  v-bind:class="{'active' : tabs[1].state}">
                            <List v-bind:data="list_data"/>
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
    import storeMixin from "./../../mixins/storeMixin"
    import categoryMixin from "./../../mixins/categoryMixin"
    import partnerMixin from "./../../mixins/partnerMixin"
    import supplierMixin from "./../../mixins/supplierMixin"
    import FormInput from "./../../service/FormInput"
    import List from "./../../service/List"
    export default {
        name: "ProviderOrderDialog",
        props: ['dialog'],
        mixins: [categoryMixin, supplierMixin, partnerMixin, storeMixin],
        data: () => {
            return {
                get shop_activated(){
                    let local_settings = JSON.parse(localStorage['settings']);
                    let index = _.findIndex(local_settings, function(o) { return o.key === "shop_enabled"; });
                    return local_settings[index] ? Boolean(parseInt(local_settings[index].value)) : false;
                },
                tabs: [
                    {slug: "base", name: "Основные", state: true},
                    {slug: "items", name: "Позиции", state: false},
                ],
                entity: {
                    id:null,
                    articles: [],
                    store: {
                        id: null,
                        name: "Не выбран",
                    },
                    partner: {
                        id: null,
                        companyName:'Не выбран',
                        fio:'Не выбран',
                        type: 2
                    }
                },
                list_data:{
                    header: [
                        {min_with: NaN,  width: NaN,    name: 'pivot_id',      table_name: 'pivot_id',    type: 'hidden'},
                        {min_with: NaN,  width: NaN,    name: 'product_id',    table_name: 'product_id',  type: 'hidden'},
                        {min_with: 100,  width: 'auto', name: 'Наименование',  table_name: 'name',        type:'text'},
                        {min_with: 100,  width: 100,    name: 'Артикул',       table_name: 'article',     type:'text'},
                        {min_with: 65,   width: 65,     name: 'Кол-во',        table_name: 'count',       type: 'counter',},
                        {min_with: 80,   width: 80,     name: 'Цена',          table_name: 'price',       type: 'price',},
                        {min_with: 70,   width: 70,     name: 'НДС, %',        table_name: 'nds_percent', type: 'passive',},
                        {min_with: 70,   width: 70,     name: 'НДС',           table_name: 'nds',         type: 'passive',},
                        {min_with: 100,  width: 100,    name: 'Итого',         table_name: 'total',       type: 'passive',},
                    ],
                    prefs:{
                        index:'ordinal',
                        use_nds:true,
                        can_add_items:true,
                        nds:true,
                        nds_included:true
                    },
                    items:[],
                },
                messages:{},
                loading:false,
            }
        },
        mounted() {
            this.dialog.width = 1000;
            if (this.dialog.id === 0) {
                this.dialog.title = "Новая заявка поставщику";
            } else {
                this.loading = true;
                window.axios({
                    method: 'get',
                    url: '/provider_orders/' + this.dialog.id,
                }).then((resp) => {
                    this.id = resp.data.id;
                    this.entity = resp.data;
                    this.list_data.items = resp.data.articles;
                    this.dialog.title = "Редактирование заказа поставщику №'" + this.entity.id + "'";
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
            FormInput, List
        }
    }
</script>
