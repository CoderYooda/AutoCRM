<template>
    <div class="bottom-container">
        <div class="box-lister">
            <div class="d-flex mb-15">
                <div class="search-field-container w-100">
                    <input v-model.lazy="search" v-debounce="450" id="search" name="search" placeholder="Поиск по заявкам поставщику" class="input w-100" value="" type="text">
                </div>
                <div class="actions">
                    <button type="button" class="button primary ml-15 w-290" v-on:click="newDialog('product')">Создать заявку</button>
                </div>
            </div>
            <div class="d-flex" style="height: calc(100% - 45px);">
                <Table v-bind:table_data="table_data" v-bind:filter_data="filter_data" v-bind:search="search" />
                <FilterBox v-bind:filter_data="filter_data"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Table from "../../service/Table";
    import FilterBox from "../../template/FilterBox";
    import debounce from './../../../debounce';
    export default {
        name: "ProviderOrder",
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
                {min_width: 60, width: 150, name: 'Оплата', table_name: 'pays', transform: 'transform_ico'},
                {min_width: 60, width: 150, name: 'Поступление', table_name: 'incomes', transform: 'transform_ico'},
                {min_width: 120, width: 200, name: 'Поставщик', table_name: 'partner_name'},
                {min_width: 120, width: 'auto', name: 'Ответственный', table_name: 'manager_name'},
                {min_width: 90, width: 200, name: 'Сумма', table_name: 'summ', transform: 'transform_price'},
                {min_width: 90, width: 150, name: 'Дата', table_name: 'created_at'},
            ];
            this.table_data.context_menu = [
                {name:'Редактировать', action: function(data){openDialog('providerOrderDialog', '&provider_order_id=' + data.contexted.id)}},
                {name:'Открыть', action: function(data){openDialog('providerOrderDialog', '&provider_order_id=' + data.contexted.id)}},
                // {name:'Удалить', action: function(data){dd(data);}},
                // {name:'Удалить выделенные', action: function(data){dd(data);}, only_group:true},
            ];
            this.table_data.dbl_click = id => openDialog('providerOrderDialog', '&provider_order_id=' + id);
            this.table_data.url = '/provider_order/base/table_data';
            this.filter_data = {
                dates: {
                    start: null,
                    end: null,
                },
                filters:[
                    {
                        title:'Статус оплаты',
                        filed:'payment',
                        collection:[
                            {bool:false, val:0, title:'Оплачен'},
                            {bool:false, val:1, title:'Не оплачен'},
                            {bool:false, val:2, title:'Оплачен частично'},
                            {bool:false, val:3, title:'Переплачен'},
                        ]
                    },
                    {
                        title:'Статус поступления',
                        filed:'entrance',
                        collection:[
                            {bool:false, val:0, title:'Частично'},
                            {bool:false, val:1, title:'Полностью'},
                            {bool:false, val:2, title:'Без поступлений'},
                        ]
                    },
                ]
            };
        },
        directives: {debounce}
    }
</script>

<style scoped>

</style>
