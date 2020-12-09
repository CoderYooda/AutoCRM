<template>
    <div id="table-container" class="flex-1 h-100">
        <div ref="ofsetter" class="h-100">
            <div class="bbtable-container">
                <div class="bbtable-header">
                    <div class="header-elem checkbox">
                        <input v-bind:checked="isAnyChecked" type="checkbox">
                        <label v-on:click="toggleSelectAll()"></label>
                    </div>
                    <div v-bind:class="{'active' : isSortField(item)}" v-for="item in table_data.header" v-bind:key="item.name" v-bind:style="getHeaderStyle(item)" class="header-elem" data-field="id" style="width: 90px; min-width: 90px;">
                        <div v-on:click="toggleSort(item)" class="title">{{ item.name }}</div>
                        <div v-if="!isSortField(item)" class="arrow down"></div>
                        <div v-if="isSortField(item) && dir === 'DESC'" v-bind:class="{'active' : isSortField(item)}" class="arrow down"></div>
                        <div v-if="isSortField(item) && dir === 'ASC'" v-bind:class="{'active' : isSortField(item)}" class="arrow up"></div>
                    </div>
                </div>
                <div class="bbtable-body" data-simplebar style="height: calc(100% - 59px);" >
                    <div>
                        <div v-if="!loading" v-on:dblclick="dblClick(elem)"
                             v-on:contextmenu="openContext($event, elem)"
                             v-on:click="selectItem(elem)"
                             v-for="(elem, index) in items"
                             :ref="setRef(elem, index)"
                             v-bind:key="'item_' + index"
                             v-bind:class="{ 'selected' : isSelected(elem), 'updated' : isItemUpdated(elem)}"
                             class="body-elem">
                            <div class="cell checkbox">
                                <input type="checkbox" v-bind:checked="isSelected(elem)">
                                <label></label>
                            </div>
                            <div
                                v-for="item in table_data.header"
                                v-bind:key="item.name + elem.id" class="cell"
                                v-bind:style="getHeaderStyle(item)">
                                <div class="title">{{ elem[item.table_name] }}</div>
                            </div>
                        </div>
                        <div v-if="loading" class="list-placeholder">
                            <div v-for="elem in 12" v-bind:key="elem" class="list-placeholder_item">
                                <div class="list-placeholder_cell" style="width: 30px" ></div>
                                <div v-for="item in table_data.header"
                                     v-bind:key="item.name + 'placeholder'"
                                     v-bind:style="getHeaderStyle(item)" class="list-placeholder_cell" >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="!loading" ref="cont" class="context" id="context" v-bind:style="context_style">
                    <div v-on:click="menu.action(contexted_elem)"
                         v-for="menu in table_data.context_menu"
                         v-bind:key="menu.name" class="context_item">
                        <div class="title">{{ menu.name }}</div>
                    </div>
                </div>
                <div class="paginator">
                    <button v-on:click="setPage(1)" v-bind:disabled="firstButtonDisabled" >Первая</button>
                    <button v-on:click="setPage(current_page - 1)" v-bind:disabled="prevButtonDisabled">Назад</button>
                    <button v-for="page in paginate_array"
                            v-bind:class="isPageActive(page)" v-on:click="setPage(page)">{{ page }}</button>
                    <button v-on:click="setPage(current_page + 1)" v-bind:disabled="nextButtonDisabled" >Вперёд</button>
                    <button v-on:click="setPage(last_page)" v-bind:disabled="lastButtonDisabled">Последняя</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['table_data', 'filter_data', 'event_data'],
        name: "Table",
        data: ()=> {
            return {
                items: [],
                search: null,
                last_page: null,
                current_page:1,
                paginate_array: null,
                field: null,
                dir:null,
                selected: [],
                last_selected:null,
                index:0,
                context_opened:false,
                contexted_elem:null,
                context_style:{},
                updated_id:null,
            }
        },
        watch: {
            $route(to, from) {
                this.getItems();
            },
            $attrs:function(){
                this.search = this.$attrs.search;
                this.getItems();
            },
            filter_data: {
                handler(newVal, oldVal){
                    this.current_page = 1;
                    this.getItems();
                },
                deep: true
            },
        },
        mounted(){
            this.$eventBus.$on(this.table_data.event_tag + 'Updated', (data)=>{
                this.updated_id = data.id;
                this.getItems();
            });
            this.getItems();
            document.addEventListener('click', this.closeContext)
            this.$eventBus.$on('TooManyAttempts', ()=>{
                this.$notify({
                    group: 'main',
                    title: 'Ошибка сервера!',
                    text: 'Слишком много запросов, повторите попытку позже.'
                });
            });
            // ProductUpdated
        },
        computed:{
            loading(){
                return this.$parent.loading;
            },
            isAnyChecked(){
              return Boolean(this.selected.length);
            },
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
            isItemUpdated(item){
               return item.id === this.updated_id;
            },
            dblClick(elem){
                return this.table_data['dbl_click'] ? this.table_data.dbl_click(elem.id) : void(0) ;
            },
            unsetSelected(){
                this.last_selected = null;
                this.selected = [];
                this.search = null;
            },
            toggleSelectAll(){
                if(this.selected.length){
                    this.selected = [];
                } else {
                    this.items.forEach((item)=>{
                       this.selected.push(item.id);
                    });
                }
            },
            setRef(item, index){
                item.index = index;
                return 'item_' + index;
            },
            isSortField(item){
                return this.field === item.table_name;
            },
            isSelected(item){
                return this.selected.includes(item.id);
            },
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
                return (this.search === '') ? null : this.$attrs.search;
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
            filterMutator(params){
                if(this.filter_data){
                    if(this.filter_data.dates && this.filter_data.dates.start && this.filter_data.dates.end){
                        params.dates = [];
                        params.dates[0] = Date.parse(this.filter_data.dates.start) / 1000;
                        params.dates[1] = Date.parse(this.filter_data.dates.end) / 1000;
                    }
                    if(this.filter_data.filters){
                        this.filter_data.filters.forEach((filter)=>{
                            let collection = [];
                            filter.collection.forEach((item)=>{
                                if(item.bool)
                                    collection.push(item.val);
                            });
                            params[filter.filed] = collection;
                        })
                    }
                }
                return params;
            },
            getItems(){
                this.unsetSelected();
                this.items = [];
                this.$parent.table_loading = true;

                let params = {
                    category_id: this.getCategoryId(),
                    search: this.getSearchString(),
                    page: this.current_page,
                    field: this.field,
                    dir: this.dir,
                };
                params = this.filterMutator(params);
                window.axios({
                    method: 'get',
                    url: this.table_data.url,
                    params: params
                }).then((resp) =>  {
                    this.items = resp.data.data;
                    this.last_page = resp.data.last_page;
                    this.getPaginator();
                    setTimeout(()=>{
                        this.updated_id = null;
                    }, 1000);
                }).then(()=>{
                    this.$parent.table_loading = false;
                });
            },
            setPage(num){
                this.current_page = num;
                this.getItems();
            },
            toggleSort(item){
                if(!item.sort){
                    item.sort = 'ASC';
                } else if(item.sort === 'ASC') {
                    item.sort = 'DESC'
                } else {
                    item.sort = 'ASC'
                }
                this.field = item.table_name;
                this.dir = item.sort;
                this.getItems();
            },
            unselectAll(){
                this.selected = [];
            },
            unselect(id){
                this.selected.forEach((val, key)=>{
                    if (val === id){
                        this.selected.splice(key, 1)
                    }
                });
            },
            selectItem(item){
                this.updated_id = null;
                this.closeContext();
                if(!window.ctrl_pressed && !window.shift_pressed){
                    this.unselectAll();
                }
                if(window.ctrl_pressed){
                    if(this.selected.includes(item.id)){
                        this.unselect(item.id)
                    } else {
                        this.selected.push(item.id);
                    }
                } else {
                    this.selected.push(item.id);
                }
                if(window.shift_pressed && this.last_selected != null){
                    let indexes = [];
                    let max = (this.last_selected > item.index) ? this.last_selected : item.index;
                    let min = (this.last_selected < item.index) ? this.last_selected : item.index;
                    for (let i = min; i <= max; i++) {
                        indexes.push(parseInt(i));
                    }
                    this.selected = [];
                    this.items.forEach((item) => {
                        if(indexes.includes(item.index)){
                            this.selected.push(item.id);
                        }
                    });
                } else {
                    this.last_selected = item.index;
                }
            },
            openContext(event, elem){
                event.preventDefault();
                this.contexted_elem = elem;
                this.context_opened = true;
                let ofsetter = this.$refs.ofsetter;
                if(ofsetter){
                    let contextY = event.clientY - ofsetter.getBoundingClientRect().top + window.scrollY;
                    if(event.clientY + this.$refs.cont.offsetHeight + 100 >= window.innerHeight){
                        contextY -= this.$refs.cont.offsetHeight;
                    }
                    this.context_style = {
                        top: contextY + 'px',
                        left: event.clientX - ofsetter.getBoundingClientRect().left + window.scrollX + 'px'
                    };

                }

            },
            closeContext(e){
                this.context_style = {
                    top: '-1200px',
                    left: '-1200px',
                };
            }
        },
    }
</script>
<style scoped>
    .updated:before{
        content: '';
        border-bottom: 1px solid transparent!important;
        position: absolute;
        background: #63a049;
        height: 100%;
        width: 100%;
        opacity: 0;
        z-index: 0!important;
        animation: 1s updated_table linear;
    }
</style>
