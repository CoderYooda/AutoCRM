<template>
    <header class="app-header">
        <HeadLogo/>
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
    import HeadLogo from "./HeadLogo"
    export default {
        name: "Header",
        components:{
            Clock, StackModals, SystemMessages, UserMenu, HeadLogo
        }
    }
</script>

<style scoped>

</style>
