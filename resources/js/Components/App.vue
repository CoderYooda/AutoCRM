<template>
    <div id="app">
        <component :is="layout" />
    </div>

</template>

<script>
    import MainLayout from './layouts/MainLayout'
    export default {
        data: ()=> {
            return {
                isFullwidth: false,
                themeColor: 'primary'
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
            MainLayout
        }
    }
</script>
