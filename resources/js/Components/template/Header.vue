<template>
    <header class="app-header">
        <div class="app-logo">
            <svg class="preloader" version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
                        <circle fill="#fff" stroke="none" cx="6" cy="50" r="6"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1"/></circle>
                <circle fill="#fff" stroke="none" cx="26" cy="50" r="6"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2"/></circle>
                <circle fill="#fff" stroke="none" cx="46" cy="50" r="6"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3"/></circle>
                    </svg>
        </div>
        <div class="top-navs">
            <ul class="nav top-nav-bar app-top-menu">
                <router-link tag="li" active-class="active" to="/store">
                    <a class="header-tab" href="#">
                        Склад
                    </a>
                </router-link>
                <router-link tag="li" active-class="active" to="/cash">
                    <a class="header-tab" href="#">
                        Финансы
                    </a>
                </router-link>
                <router-link tag="li" active-class="active" to="/contact">
                    <a class="header-tab" href="#">
                        Контакты
                    </a>
                </router-link>
                <router-link tag="li" active-class="active" to="/schedule">
                    <a class="header-tab" href="#">
                        Планировщик
                    </a>
                </router-link>
                <router-link tag="li" active-class="active" to="/history">
                    <a class="header-tab" href="#">
                        История
                    </a>
                </router-link>
                <router-link tag="li" active-class="active" to="/statistic">
                    <a class="header-tab" href="#">
                        Статистика
                    </a>
                </router-link>
                <router-link tag="li" active-class="active" to="/shop">
                    <a class="header-tab" href="#">
                        Интернет-магазин
                    </a>
                </router-link>
            </ul>
            <span class="md-auto  mr-auto"><span id="shop_name"></span></span>
            <Clock/>
            <ul class="top-nav-bar right-nav">
                <StackModals/>
                <SystemMessages/>
                <UserMenu/>
            </ul>
        </div>
    </header>
</template>

<script>
    import Clock from "./Clock"
    import StackModals from "./StackModals"
    import SystemMessages from "./SystemMessages"
    import UserMenu from "./UserMenu"
    export default {
        name: "Header",
        components:{
            Clock, StackModals, SystemMessages, UserMenu
        }
    }
</script>

<style scoped>

</style>
