<template>
    <div class="side-menu">
        <ul class="nav">
            <router-link  v-for="item in menu" v-bind:key="item.link" tag="li" active-class="active" :to="item.link">
                <a href="#">{{ item.name }}</a>
            </router-link>
        </ul>
        <div onclick="system.toggleMenu()" id="left_menu_toggle" class="toggle"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>
    </div>
</template>

<script>
    export default {
        name: "AsideMenu",
        props:['menu'],
        data: ()=> {
            return {
            }
        },
        computed:{
        },
        beforeMount(){

        },
        mounted() {
        },
        methods:{
        }
    }
</script>

<style scoped>

</style>
