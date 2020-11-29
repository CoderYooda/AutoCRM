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
                    {name: 'Профиль',       link: '/user/profile'},
                    {name: 'Мои услуги',    link: '/user/service'},
                    {name: 'Настройки',     link: '/user/settings'},
                    {name: 'Гараж',         link: '/user/garage'},
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
