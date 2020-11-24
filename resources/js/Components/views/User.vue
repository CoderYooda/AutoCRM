<template>
    <div id="ajax-content">
        <AsideMenu menu="user"/>
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
