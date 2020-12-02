<template>
    <div class="ml-15">
        <v-date-picker v-if="dates_applied" v-model="filter_data.dates" value="range" color="blue" is-range class="mb-15" />
        <div class="box w-290 p-15 filter-panel">
            <div class="box-title">Фильтр</div>
            <div v-if="dates_applied" class="filter_pos mb-10">
                <div class="form-group mb-0 d-flex">
                    <label class="no-wrap" >Период <span class="text-muted" v-if="isAllPeriod">( за всё время )</span></label>
                    <button type="button" class="clear_filter" v-on:click="unsetDate()" >очистить</button>
                </div>
                <div class="form-group d-flex mb-10">
                    <input style="width: 90px; flex: 1;" v-model="start" type="text" disabled>
                    <span class="defis"></span>
                    <input style="width: 90px; flex: 1;" v-model="end" type="text" disabled>
                </div>
            </div>

            <div v-for="filter in filter_data.filters" v-bind:key="filter.filed" class="filter_pos mb-10">
                <div class="form-group d-flex mb-0">
                    <label class="no-wrap" >{{ filter.title }}</label>
                    <button type="button" class="clear_filter" v-on:click="unset(filter)" >очистить</button>
                </div>
                <div v-for="item in filter.collection" class="form-group d-flex mb-0">
                    <div class="header-elem checkbox">
                        <input v-model="item.bool" v-bind:id="filter.filed + item.title" type="checkbox">
                        <label v-bind:for="filter.filed + item.title"></label>
                    </div>
                    <label v-bind:for="filter.filed + item.title" class="checkbox_label flex-1" >{{ item.title }}</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FilterBox",
        props: ['filter_data'],
        data: ()=> {
            return {

            }
        },
        // watch: {
        //     $route(to, from) {
        //         this.setRootCategory();
        //         this.getCategories();
        //     }
        // },
        mounted(){

        },
        computed: {
            start(){
                let date = new Date(this.filter_data.dates.start);
                return this.filter_data.dates.start ? date.ddmmyyy() : 'от';
            },
            end(){
                let date = new Date(this.filter_data.dates.end);
                return this.filter_data.dates.end ? date.ddmmyyy() : 'до';
            },
            dates_applied(){
                return Boolean(this.filter_data.dates);
            },
            isAllPeriod(){
                return !Boolean(this.filter_data.dates.start && this.filter_data.dates.end);
            }
        },
        methods:{
            unsetDate(){
                this.filter_data.dates = {
                    start: null,
                    end: null,
                };
                this.$notify({
                    group: 'main',
                    title: 'Фильтр',
                    text: 'Дата очищена'
                });
            },
            unset(filter){
                filter.collection.forEach((item)=>{
                    item.bool = false;
                });
                this.$notify({
                    group: 'main',
                    title: 'Фильтр',
                    text: 'Статус оплаты очищен'
                });
            }
        }
    }
</script>

<style scoped>

</style>
