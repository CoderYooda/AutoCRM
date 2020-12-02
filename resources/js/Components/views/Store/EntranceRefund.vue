<template>
    <div class="bottom-container">
        <div class="box-lister">
            <div class="d-flex" style="height: calc(100% - 45px);">
                <Table v-bind:table_data="table_data" v-bind:filter_data="filter_data" v-bind:search="search" />
                <div>
                    <button type="button" class="button primary ml-15 mb-15 w-290" v-on:click="newDialog('product')">Создать возврат поступления</button>
                    <FilterBox v-bind:filter_data="filter_data"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Table from "../../service/Table";
    import FilterBox from "../../template/FilterBox";
    import debounce from './../../../debounce';
    export default {
        name: "EntranceRefund",
        components:{
            Table, FilterBox
        },
        data: ()=> {
            return {
                table_data:{},
                search: '',
                table_loading:false,
                filter_data:false,
            }
        },
        computed:{
            loading(){
                return this.table_loading;
            },
        },
        beforeMount() {
            this.table_data.header = [
                {min_width: 90, width: 90, name: 'ID',table_name: 'id'},
                {min_width: 150, width: 150, name: 'Заявка', table_name: 'ordid'},
                {min_width: 130, width: 'auto', name: 'Поставщик', table_name: 'partner'},
                {min_width: 150, width: 'auto', name: 'Принимающий', table_name: 'manager'},
                {min_width: 150, width: 200, name: 'Комментарий', table_name: 'comment', transform: 'transform_comment'},
                {min_width: 150, width: 150, name: 'Дата', table_name: 'created_at'},
            ];
            this.table_data.context_menu = [
                {name:'Редактировать', action: function(data){openDialog('entranceDialog', '&entrance_id=' + data.contexted.id)}},
                {name:'Открыть', action: function(data){openDialog('entranceDialog', '&entrance_id=' + data.contexted.id)}},
                {name:'Открыть заявку', action: function(data){openDialog('clientorderDialog', '&client_order_id=' + data.contexted.ordid)}},
                // {name:'Удалить', action: function(data){dd(data);}},
                // {name:'Удалить выделенные', action: function(data){dd(data);}, only_group:true},
            ];
            this.table_data.dbl_click = function(id){openDialog('entranceDialog', '&entrance_id=' + id)};
            this.table_data.url = '/entrance_refund/base/table_data';
            this.filter_data = {
                dates: {
                    start: null,
                    end: null,
                },
            };
        },
        directives: {debounce}
    }
</script>

<style scoped>

</style>
