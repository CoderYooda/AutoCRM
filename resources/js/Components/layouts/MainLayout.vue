<template>
    <div class="app">
        <Header/>
        <div id="content" v-bind:class="{ dark: isDark }" class="app-content box-shadow-0" role="main">
            <Aside/>
            <router-view />
        </div>
    </div>
</template>

<script>
    import Aside from '../template/Aside'
    // import Footer from '../template/Footer';
    import Header from '../template/Header';
    export default {
        data: ()=> {
            return {
                isDark: false,
            }
        },
        created(){
        },
        computed: {

        },
        methods: {

        },
        components: {
            Aside, Header
        }
    }
</script>
