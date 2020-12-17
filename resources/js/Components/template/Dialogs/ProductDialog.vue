<template>
    <div>
        <!--        <div class="modal-header dark" style="justify-content: normal;">-->
        <!--            <div class="modal-alt-header">-->
        <!--                <span class="item-title _500">Розничная цена</span>-->
        <!--                <div class="item-except font-weight-bolder h-1x">-->
        <!--                <span id="total_price">-->
        <!--                   {{ $product->stores->find(Auth::user()->current_store)->pivot->retail_price ?? '0' }}-->
        <!--                </span>-->
        <!--                </div>-->
        <!--                <div class="item-tag tag hide">-->
        <!--                </div>-->
        <!--            </div>-->
        <!--            <div class="modal-alt-header">-->
        <!--                <span class="item-title _500">На своем складе / на других</span>-->
        <!--                <div class="item-except font-weight-bolder h-1x">-->
        <!--                <span id="total_price">-->
        <!--                   {{ $product->getCountSelfOthers() }}-->
        <!--                </span>-->
        <!--                </div>-->
        <!--                <div class="item-tag tag hide">-->
        <!--                </div>-->
        <!--            </div>-->
        <!--            <div class="modal-alt-header">-->
        <!--                <span class="item-title _500">Хранение</span>-->
        <!--                <div class="item-except font-weight-bolder h-1x">-->
        <!--                <span id="total_price">-->
        <!--                   {!! $product->getStorageCode() !!}-->
        <!--                </span>-->
        <!--                </div>-->
        <!--                <div class="item-tag tag hide">-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </div>-->

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
                            <div class="tab-pane p-3" v-bind:class="{'active' : tabs[0].state}">

                                <!--                                <div id="provider_search_container" class="provider_search_container fade" data-simplebar style="height: 300px;">-->
                                <!--                                    <div class="cont"></div>-->
                                <!--                                    <div class="empty_search">-->
                                <!--                                        <div class="out_of_search"></div>-->
                                <!--                                        <div class="text-center">Результатов нет</div>-->
                                <!--                                    </div>-->
                                <!--                                </div>-->

                                <FormInput v-bind:inputData="{type:'input',label:'Артикул',name:'entity.article', placeholder:'Артикул детали (не более 64 символов)'}" />
                                <FormInput v-bind:inputData="{type:'input',label:'Наименование',name:'entity.name', placeholder:'Наименование (не более 255 символов)'}" />
                                <FormInput v-bind:inputData="{type:'selector',label:'В категории',name:'entity.category.name', onClick:'selectCategory'}" />
                                <FormInput v-bind:inputData="{type:'selector',label:'Производитель',name:'entity.supplier.name', onClick:'selectSupplier'}" />
                                <!--                                <div class="form-group">-->
                                <!--                                    @foreach($stores as $store)-->
                                <!--                                    <label>Розничная цена для магазина "{{ $store->name }}"</label>-->
                                <!--                                    <div class="input-group mb-3">-->
                                <!--                                        <input type="number" min="0" name="storage[{{ $store->id }}][retail_price]" class="form-control ml-0" placeholder="Розничная цена" value="@if($product){{ $product->stores->find($store->id)->pivot->retail_price ?? '0' }}@endif" >-->
                                <!--                                    </div>-->
                                <!--                                    @endforeach-->
                                <!--                                </div>-->
                            </div>
                            <div class="tab-pane" v-bind:class="{'active' : tabs[1].state}" >
                                <table class="table w-100">
                                    <thead>
                                    <tr>
                                        <th>Склад</th>
                                        <th>Количество</th>
                                        <th>Хранение</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            Магазин
                                        </td>
                                        <td>
                                            0
                                        </td>
                                        <td>
                                            <div class="storage_store_container">
                                                <input value=" " class="storage_store bb_1" type="text">
                                                <input value=" " class="storage_store bb_2" type="text">
                                                <input value=" " class="storage_store bb_3" type="text">
                                                <input value=" " class="storage_store bb_4" type="text">
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div class="box mt-10">
                                    <div class="bb_faq faq_1">Зона хранения</div>
                                    <div class="bb_faq faq_2">Номер стеллажа</div>
                                    <div class="bb_faq faq_3">Номер вертикальной секции стеллажа</div>
                                    <div class="bb_faq faq_4">Номер полки</div>
                                </div>
                            </div>
                            <div class="tab-pane p-3" v-bind:class="{'active' : tabs[2].state}">
                                <div v-if="shop_activated" ref="tabmain" id="tab_main" data-simplebar style="height: 310px;">
                                    <div class="contented mb-10">
                                        <FormInput v-bind:inputData="{type:'checkbox',mb:false, label:'Показать на главной странице',name:'entity.sp_main'}" />
                                    </div>
                                    <div class="contented mb-10">
                                        <div class="relative">
                                            <label for="sp_stock" class="w-100 mb-0 pointer">Акционный товар</label>
                                            <label class="absolute custom_checkbox" style="right: 0; top: 3px;">
                                                <input id="sp_stock" v-model="entity.sp_stock" type="checkbox" class="not_default"/>
                                                <span></span>
                                            </label>
                                        </div>

                                        <div v-bind:class="{'d-none':!entity.sp_stock}" class="stocks mb-5 mt-10" >
                                            <div  class="form-group d-flex">
                                                <label class="col-sm-4 no-pl">Цена</label>
                                                <div class="input-group col-sm-8 no-pr">
                                                    <input v-model="entity.sp_discount_price" type="number" class="form-control discount" disabled />
                                                </div>
                                            </div>
                                            <div class="form-group d-flex">
                                                <label class="col-sm-4 no-pl">Скидка</label>
                                                <div class="input-group col-sm-8 no-pr">
                                                    <input v-model="entity.sp_discount" type="number" style="flex: 0.6;" class="form-control discount mr-10" />

                                                    <Selector v-bind:data="{
                                                    model:'entity.sp_discount_type',
                                                    default_value:1,
                                                    elements:[
                                                        {name:'в рублях', value:0},
                                                        {name:'в процентах', value:1}
                                                    ]
                                                }" />
                                                </div>
                                            </div>
                                            <div  class="form-group d-flex">
                                                <label class="col-sm-4 no-pl">Итого</label>
                                                <div class="input-group col-sm-8 no-pr">
                                                    <input v-model="entity.sp_discount_total" type="number" class="form-control" disabled />
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <FormInput v-bind:inputData="{type:'input',label:'Наименование продукта',name:'entity.sp_name', placeholder:'Наименование продукта'}" />
                                    <div class="d-flex mt-10">
                                        <div class="form-group">
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
                                        <div class="flex-3 ml-15">
                                            <label>Описание продукта</label>
                                            <textarea v-model="entity.sp_desc" class="form-control p-5 resize-none border-radius-none" placeholder="Введите описание" style="height: 94px;"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Характеристики</label>
                                        <a href="javascript:void(0)" @click="addSpecification()" class="float-right">Добавить</a>
                                        <div v-for="specification in entity.specifications" class="specifications">
                                            <div class="element copy d-flex mb-10">
                                                <div>
                                                    <span>Наименование</span>
                                                    <span class="mt-5">Значение</span>
                                                </div>
                                                <div class="ml-15 flex-1">
                                                    <input type="text" v-model="specification.label" class="form-control" placeholder="Вязкость">
                                                    <input type="text" v-model="specification.value" class="form-control mt-5" placeholder="5W40">
                                                </div>
                                                <div class="remove pointer ml-10"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="!shop_activated">Активируйте интернет-магазин в <a class="ajax-nav" href="#">настройках</a>.</div>
                                <div v-if="!shop_activated">Это бесплатно.</div>

                            </div>
                            <div class="tab-pane p-3" v-bind:class="{'active' : tabs[3].state}">
                                <FormInput v-bind:inputData="{type:'input',label:'Штрих-код производителя (EAN 13)',name:'entity.barcode', messages:messages, placeholder:'Штрихкод'}" />
                                <FormInput v-bind:inputData="{type:'input',label:'Внутренний штрих-код (EAN 13)',name:'entity.barcode_local', messages:messages, placeholder:'Штрихкод склада'}" />
                            </div>

                            <!--<div class="tab-pane" id="{{ $class }}_tab_entrances" data-simplebar
                                 style="max-height: 400px;">

                                @if(isset($product->entrances) && count($product->entrances))
                                <table>
                                    <tr>
                                        <th>ID</th>
                                        <th>Поставщик</th>
                                        <th>Количество</th>
                                        <th>Дата</th>
                                    </tr>

                                    @foreach($product->entrances as $entrance)

                                    <tr>
                                        <td>{{ $entrance->id }}</td>
                                        <td>{{ $entrance->partner->official_name ?? '' }}</td>
                                        <td>{{ $entrance->pivot->count }}</td>
                                        <td>{{ $entrance->pivot->created_at }}</td>
                                    </tr>

                                    @endforeach

                                </table>
                                @else
                                Поступления не найдены
                                @endif

                            </div>-->

                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button @click="$parent.closeDialog(dialog)" type="submit" class="button white">Закрыть</button>
                <button @click="save()" type="submit" class="button primary pull-right">Сохранить</button>
            </div>
            <div class="system_message">

            </div>
        </div>
    </div>
</template>

<script>
    import categoryMixin from "./../../mixins/categoryMixin"
    import supplierMixin from "./../../mixins/supplierMixin"
    import FormInput from "./../../service/FormInput"
    export default {
        name: "ProductDialog",
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
                root_category: 2,
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
            image(){
                return this.entity.image && this.entity.image.url ? this.entity.image.url : '/images/no_image.png';
            }
        },
        methods: {
            addSpecification(){
                this.entity.specifications.unshift({label:null, value:null});
            },
            sync(e){
                e.preventDefault();
                this.image_file = e.target.files[0];
                this.syncImage();
            },
            uploadClick(){
                this.$refs.product_img_upload.click();
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
                    this.entity.image = {};
                    this.entity.image.url = resp.data.images[0].url;
                    this.entity.image.id = resp.data.images[0].id;
                    this.loading = false;
                });
            },
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
