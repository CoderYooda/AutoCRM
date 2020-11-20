<template>
    <div id="ajax-content">
        <AsideMenu menu="cash"/>
        <div class="main-content">
            <div class="box-lister box">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.$eventBus.$emit('set-title', 'Главная страница');
        },
        methods: {
        },
    }
</script>
