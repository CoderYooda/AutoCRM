<template>
    <div id="ajax-content">
        <AsideMenu v-bind:menu="menu"/>
        <div class="main-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import AsideMenu from "./../template/AsideMenu"
    export default {
        data: ()=> {
            return {
                isFullwidth: false,
                menu: [
                    {name: 'База товаров',          link: '/store/base'},
                    {name: 'Склады поставщиков',    link: '/store/provider_store'},
                    {name: 'Заявки поставщикам',    link: '/store/provider_order'},
                    {name: 'Поступления',           link: '/store/entrance'},
                    {name: 'Возвраты поступлений',  link: '/store/entrance_refund'},
                    {name: 'Продажи',               link: '/store/shipment'},
                    {name: 'Возвраты по продажам',  link: '/store/shipment_refund'},
                    {name: 'Заказы клиентов',       link: '/store/client_order'},
                    {name: 'Корректировки',         link: '/store/adjustment'},
                    {name: 'Документы',             link: '/store/document'},
                    {name: 'Онлайн заказы',         link: '/store/shop_order'},
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
