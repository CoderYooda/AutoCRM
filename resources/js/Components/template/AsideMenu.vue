<template>
    <div class="side-menu">
        <ul class="nav">
            <router-link tag="li" active-class="active" to="/store/base">
                <a href="#">База товаров</a>
            </router-link>
            <router-link tag="li" active-class="active" to="/store/provider_store">
                <a href="#">Склады поставщиков</a>
            </router-link>
            <router-link tag="li" active-class="active" to="/store/provider_order">
                <a href="#">Заявки поставщикам</a>
            </router-link>
            <router-link tag="li" active-class="active" to="/store/entrance">
                <a href="#">Поступления</a>
            </router-link>
            <router-link tag="li" active-class="active" to="/store/entrance_refund">
                <a href="#">Возвраты поступлений</a>
            </router-link>
            <router-link tag="li" active-class="active" to="/store/shipment">
                <a href="#">Продажи</a>
            </router-link>
            <router-link tag="li" active-class="active" to="/store/shipment_refund">
                <a href="#">Возвраты по продажам</a>
            </router-link>
            <router-link tag="li" active-class="active" to="/store/client_order">
                <a href="#">Заказы клиентов</a>
            </router-link>
            <router-link tag="li" active-class="active" to="/store/adjustment">
                <a href="#">Корректировки</a>
            </router-link>
            <router-link tag="li" active-class="active" to="/store/document">
                <a href="#">Документы</a>
            </router-link>
            <router-link tag="li" active-class="active" to="/store/shop_order">
                <a href="#">Онлайн заказы</a>
            </router-link>
        </ul>
        <div onclick="system.toggleMenu()" id="left_menu_toggle" class="toggle"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>
    </div>
</template>

<script>
    export default {
        name: "Aside"
    }
</script>

<style scoped>

</style>
