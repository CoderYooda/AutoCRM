<template>
    <div id="ajax-content">
        <AsideMenu v-bind:menu="menu"/>
        <div class="main-content">
            <div class="box-lister box">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import AsideMenu from "./../template/AsideMenu"
    export default {
        data: ()=> {
            return {
                menu: [
                    {name: 'Кассовые ордера',       link: '/cash/warrant'},
                    {name: 'Перемещения',           link: '/cash/cash_move'},
                    {name: 'Начисление зарплат',    link: '/cash/salary_payments'},
                ],
            }
        },
        mounted() {
            this.$eventBus.$emit('set-title', 'Главная страница');
        },
        methods: {
        },
        components:{
            AsideMenu
        }
    }
</script>
