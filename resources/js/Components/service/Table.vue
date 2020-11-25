<template>
    <div id="table-container" class="flex-1 h-100">
        <div id="storeTable" class="h-100">
            <div class="bbtable-container">
                <div class="bbtable-header">
                    <div class="header-elem checkbox"><input type="checkbox" id="check_all" name="check_all"><label
                        for="check_all"></label></div>

                    <div v-for="item in header" v-bind:key="item.name" v-bind:style="getHeaderStyle(item)" class="header-elem" data-field="id" style="width: 90px; min-width: 90px;">
                        <div v-on:click="toggleSort(item)" class="title">{{ item.name }}</div>
                        <div class="arrow down"></div>
                    </div>
                </div>
                <div class="bbtable-body" data-simplebar style="height: calc(100% - 59px);" >
                    <div>
                        <div v-on:click="toggleSelectItem(elem)" v-for="elem in items" v-bind:key="elem.id" class="body-elem">
                            <div class="cell checkbox"><input type="checkbox"><label></label></div>
                            <div v-for="item in header" v-bind:key="item.name + elem.id" class="cell" v-bind:style="getHeaderStyle(item)">
                                <div class="title">{{ elem[item.table_name] }}</div>
                            </div>
                        </div>
                        <div v-if="loading" class="list-placeholder">
                            <div v-for="elem in 12" v-bind:key="elem" class="list-placeholder_item">
                                <div class="list-placeholder_cell" style="width: 30px" ></div>
                                <div v-for="item in header" v-bind:key="item.name + 'placeholder'" class="list-placeholder_cell" v-bind:style="getHeaderStyle(item)" ></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="paginator">
                    <button v-on:click="setPage(1)" v-bind:disabled="firstButtonDisabled" >Первая</button>
                    <button v-on:click="setPage(current_page - 1)" v-bind:disabled="prevButtonDisabled">Назад</button>

                    <button v-for="page in paginate_array" v-bind:class="isPageActive(page)" v-on:click="setPage(page)">{{ page }}</button>

                    <button v-on:click="setPage(current_page + 1)" v-bind:disabled="nextButtonDisabled" >Вперёд</button>
                    <button v-on:click="setPage(last_page)" v-bind:disabled="lastButtonDisabled">Последняя</button>
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
                    {min_width: 90, width: 90, name: 'ID',table_name: 'id'},
                    {min_width: 100, width: 'auto', name: 'Наименование', table_name: 'name'},
                    {min_width: 150, width: 200, name: 'Артикул', table_name: 'article'},
                    {min_width: 150, width: 200, name: 'Производитель', table_name: 'supplier'},
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
                last_page: null,
                current_page:1,
                paginate_array: null,
                field: null,
                dir:null,
                loading: false,
                selected: [],
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
            lastButtonDisabled(){
                return this.current_page >= this.last_page;
            },
            firstButtonDisabled(){
                return this.current_page <= 1;
            },
            nextButtonDisabled(){
                return this.current_page === this.last_page;
            },
            prevButtonDisabled(){
                return this.current_page === 1;
            }
        },
        methods:{
            isPageActive(page){
                return (page === this.current_page) ? 'active' : '';
            },
            getPaginator(){
                let paginate_array = [];
                let prev_array = [];
                for (let i = 1; i < 2; i++) {
                    if(i > 0 && i <= this.last_page){
                        prev_array.push(i);
                    }
                }
                let pages_array = [];
                for (let i = this.current_page - 2; i < this.current_page + 2; i++) {
                    if(i > 0 && i <= this.last_page){
                        pages_array.push(i);
                    }
                }
                let last_array = [];
                for (let i = this.last_page - 2; i < this.last_page; i++) {
                    if(i > 0 && i <= this.last_page){
                        last_array.push(i);
                    }
                }
                paginate_array = paginate_array.concat(prev_array).unique();
                paginate_array = paginate_array.concat(pages_array).unique();
                paginate_array = paginate_array.concat(last_array).unique();
                this.paginate_array = paginate_array;
            },
            getCategoryId(){
                return (this.$route.params.category_id === 'all') ? this.$attrs.root_id : this.$route.params.category_id;
            },
            getSearchString(){
                return (this.search === '') ? null : this.search;
            },
            getHeaderStyle(item){
                let style = {};
                if(item.min_width){
                    style.minWidth = item.min_width + 'px';
                }
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
                this.loading = true;
                this.items = [];
                window.axios({
                    method: 'get',
                    url: '/store/base/table_data',
                    params: {
                        category_id: this.getCategoryId(),
                        search: this.getSearchString(),
                        page: this.current_page,
                        field: this.field,
                        dir: this.dir,
                    }
                }).then((resp) =>  {
                    this.items = resp.data.data;
                    this.last_page = resp.data.last_page;
                    this.getPaginator();
                }).then(()=>{
                    this.loading = false;
                });
            },
            // Setters

            setPage(num){
                this.current_page = num;
                this.getItems();
            },
            toggleSort(item){
                if(!item.sort){
                    item.sort = 'DESC';
                } else if(item.sort === 'DESC') {
                    item.sort = 'ASC'
                } else {
                    item.sort = 'DESC'
                }
                this.field = item.table_name;
                this.dir = item.sort;
                this.getItems();
            },
            toggleSelectItem(item){
                this.selected[item.id] = item;
            }
        },
    }
</script>

<style scoped>

</style>
