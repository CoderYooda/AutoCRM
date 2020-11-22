<template>
    <div id="app">
        <component :is="layout" />
        <login/>
        <Dialogs/>
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
