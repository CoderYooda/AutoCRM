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
    import AsideMenu from "./../template/AsideMenu"
    export default {
        data: ()=> {
            return {
                menu: null,
            }
        },
        mounted() {
            this.$eventBus.$emit('set-title', 'Главная страница');
            this.menuElements();
        },
        methods: {
            menuElements(){
                this.menu = [
                    {
                        name:"Перемещения",
                        link:"/"
                    }
                ]
            }
        },
        components:{
            AsideMenu
        }
    }
</script>
