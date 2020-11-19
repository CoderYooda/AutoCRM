<template>
    <div id="ajax-content">
        <AsideMenu menu="store"/>
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
                isFullwidth: false,
                themeColor: 'primary'
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
