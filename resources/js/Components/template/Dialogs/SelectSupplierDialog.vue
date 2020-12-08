<template>
    <div>
        <div class="modal-header">
            <div class="flex d-flex w-100">
                <input v-model="search" type="text" class="form-control search" placeholder="Поиск производителя">
            </div>
        </div>
        <div style="height: 400px">
            <div v-if="loading" class="list-placeholder">
                <div v-for="elem in 13" v-bind:key="elem" class="list-placeholder_item">
                    <div class="list-placeholder_cell w-100">
                    </div>
                </div>
            </div>
            <div class="p-15" v-if="!suppliers.length && ! loading">
                <div class="not-found-text mb-10">Производителя по запросу "{{ search}}" не найдено</div>
                <div class="form-group d-flex">
                    <input class="flex-1" v-model="new_supplier" type="text">
                    <button @click="save()" class="button primary flex-1">Добавить производителя</button>
                </div>
            </div>
            <div data-simplebar style="max-height: 400px;">
                <ul v-bind:class="{'d-none' : loading}" class="nav mt-0 mb-0">
                    <li v-for="supplier in suppliers" class="category-item">
                        <a @click="pickSupplier(supplier)" class="supplier_item">
                            <span title="Автоаксессуары">{{ supplier.name }}</span>
                        </a>
                    </li>
                </ul>
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
    export default {
        name: "SelectSupplierDialog",
        props:['dialog'],
        data: ()=> {
            return {
                suppliers: [],
                loading:false,
                search:null,
                new_supplier: null,
            }
        },
        // beforeMount(){
        //     this.dialog = this.$attrs.dialog;
        // },
        watch:{
            'search' : _.debounce(function(string) {
                this.getSuppliers();
            }, 400),
        },
        beforeMount(){
            this.dialog.title = "Выбор производителя";
            this.dialog.width = 400;
        },
        mounted(){
            this.getSuppliers();
            this.loading = true;
        },
        computed: {
        },
        methods:{
            getSuppliers(){
                this.loading = true;
                window.axios({
                    method: 'get',
                    url: '/suppliers',
                    params:{
                        search: this.search
                    },
                }).then((resp) =>  {
                    this.new_supplier = this.search;
                    this.suppliers = resp.data;
                    this.loading = false;
                });
            },
            pickSupplier(supplier){
                this.dialog.params.ref.setSupplier(supplier);
                this.$parent.closeDialog(this.dialog);
            },
            save(){
                this.loading = true;
                this.search = this.new_supplier;
                window.axios({
                    method: 'post',
                    url: '/suppliers',
                    params:{
                        name: this.new_supplier
                    },
                }).then((resp) =>  {
                    this.loading = false;
                    this.getSuppliers();
                });
            }
        }
    }
</script>

<style scoped>
    .supplier_item{
        padding: 4px 15px;
        display: block;
        position: relative;
        border-bottom: 1px solid #E7E8EC;
        color: #404040;
    }
    .supplier_item:hover{
        background: #f6f7f8;
    }
    li:last-child .supplier_item{
        border-bottom: none;
    }
    .not-found-text{
        text-align: center;
        font-size: 15px;
        color: #949494;
    }
</style>
