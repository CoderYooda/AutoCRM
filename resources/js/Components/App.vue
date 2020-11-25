<template>
    <div id="app">
        <component :is="layout" />
        <login/>
        <Dialogs/>
        <notifications group="main" position="bottom left" />
    </div>
</template>

<script>
    import MainLayout from './layouts/MainLayout'
    import Login from './auth/Login'
    import Dialogs from './template/Dialogs'
    export default {
        data: ()=> {
            return {
            }
        },
        mounted() {
            this.$eventBus.$on('TooManyAttempts', ()=>{
                this.$notify({
                    group: 'main',
                    title: 'Ошибка сервера!',
                    text: 'Слишком много запросов, повторите попытку позже.'
                });
            });
        },
        created(){
        },
        methods: {
        },
        computed: {
            layout() {
                return (this.$route.meta.layout || 'main') + '-layout'
            },
        },
        components: {
            Login,
            MainLayout,
            Dialogs
        }
    }
</script>
