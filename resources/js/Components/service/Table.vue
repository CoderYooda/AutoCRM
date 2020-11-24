<template>
    <div id="table-container" class="flex-1">
        <div id="storeTable" class="h-100">
            <div class="bbtable-container">
                <div class="bbtable-header">
                    <div class="header-elem checkbox"><input type="checkbox" id="check_all" name="check_all"><label
                        for="check_all"></label></div>

                    <div v-for="item in header" v-bind:key="item.name" v-bind:style="getHeaderStyle(item)" class="header-elem" data-field="id" style="width: 90px; min-width: 90px;">
                        <div class="title">{{ item.name }}</div>
                        <div class="arrow down"></div>
                    </div>
                </div>
<!--                data-simplebar-->
                <div class="bbtable-body" style="height: calc(100% - 59px);">
                    <div v-for="elem in items" v-bind:key="elem.id" class="body-elem">
                        <div class="cell checkbox"><input type="checkbox"><label></label></div>

                        <div v-for="item in header" v-bind:key="item.name + elem.id" class="cell" v-bind:style="getHeaderStyle(item)">
                            <div class="title">{{ elem[item.table_name] }}</div>
                        </div>

                    </div>
                </div>
<!--                <div class="context" id="context" style="top: 57px; left: 138px;">-->
<!--                    <div class="context_item">-->
<!--                        <div class="title">Редактировать</div>-->
<!--                    </div>-->
<!--                    <div class="context_item">-->
<!--                        <div class="title">Открыть</div>-->
<!--                    </div>-->
<!--                    <div class="context_item">-->
<!--                        <div class="title">Создать заявку поставщику</div>-->
<!--                    </div>-->
<!--                    <div class="context_item">-->
<!--                        <div class="title">Печать ценников</div>-->
<!--                    </div>-->
<!--                    <div class="context_item">-->
<!--                        <div class="title">Показать аналоги в наличии</div>-->
<!--                    </div>-->
<!--                </div>-->
                <div class="paginator">
                    <button data-page="1" class="disabled">Первая</button>
                    <button data-page="0" class="disabled">Назад</button>
                    <button class="active" data-page="1">1</button>
                    <button data-page="2">2</button>
                    <button data-page="2">Вперёд</button>
                    <button data-page="2">Последняя</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Table",
        data: ()=> {
            return {
                header: [
                    {min_with: 90, width: 90, name: 'ID',table_name: 'id'},
                    {min_with: 100, width: 'auto', name: 'Наименование', table_name: 'name'},
                    {min_with: 150, width: 200, name: 'Артикул', table_name: 'article'},
                    {min_with: 150, width: 200, name: 'Производитель', table_name: 'supplier'},
                ],
                context_menu: [
                    {name:'Редактировать', action: function(data){openDialog('productDialog', '&product_id=' + data.contexted.id)}},
                    {name:'Открыть', action: function(data){openDialog('productDialog', '&product_id=' + data.contexted.id)}},
                    {name:'Создать заявку поставщику', action: (data) => {openDialog('providerOrderDialog', '&products=' + this.table.getSelectedIDs())}},
                    {name:'Печать ценников', action: (data) => {window.openDialog('chequeDialog', '&products=' + this.table.getSelectedIDs())}},
                    {name:'Показать аналоги в наличии', action: (data) => {this.showAnalogues(data);}},
                ],
                dbl_click: function(id){openDialog('productDialog', '&product_id=' + id)},
                items: [],
                search: null,
            }
        },
        watch: {
            // $route(to, from) {
            //     this.getItems();
            // },

            // $attrs: _.debounce(function(){
            //
            // }, 550)
            $attrs:function(){
                this.search = this.$attrs.search;
                this.getItems();
            }
        },
        mounted(){
            this.getItems();
        },
        computed:{
            // itemss(){
            //     window.axios({
            //         method: 'get',
            //         url: '/store/base/table_data',
            //         params: {
            //             category_id: this.$route.params.category_id,
            //             search: this.$attrs.search
            //         }
            //     }).then((resp) => {
            //         this.items = resp.data.data;
            //         return resp.data.data
            //     });
            //     // this.getItems();
            //     // return this.items;
            // },
        },
        methods:{
            getHeaderStyle(item){
                let style = {};
                if(item.min_with){style.min_with = item.min_with + 'px';}
                if(item.width){
                    if(item.width === 'auto'){
                        style.flex = 1;
                    } else {
                        style.width = item.width + 'px';
                    }
                }
                return style;
            },
            getItems(){
                window.axios({
                    method: 'get',
                    url: '/store/base/table_data',
                    params: {
                        category_id: this.$route.params.category_id,
                        search: this.search,
                    }
                }).then((resp) =>  {
                    this.items = resp.data.data
                });
            },
        },
    }
</script>

<style scoped>

</style>
