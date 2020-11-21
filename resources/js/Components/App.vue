<template>
    <div id="app">
        <component :is="layout" />
        <Login/>
    </div>
</template>

<script>
    import MainLayout from './layouts/MainLayout'
    import Login from "../../../../manager/resources/js/components/Auth/Login";
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
            MainLayout
        }
    }
</script>
