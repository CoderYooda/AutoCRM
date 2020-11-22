<template>
    <div class="bottom-container">
        <Categories/>
        <button v-on:click="newDialog('product')">Новый товар</button>
        <div class="box-lister box">
            wad
        </div>
    </div>
</template>

<script>
    import Categories from "./../../template/Categories"
    export default {
        name: "Base",
        components:{
            Categories
        },

        mounted(){
            //this.getData()
        },
        methods:{
            getData(){
                window.axios({
                    method: 'post',
                    url: '/store/index',
                    data: this.$route.query
                }).then((resp) =>  {

                });
            },
            newDialog(tag){
                let params = null;
                this.$eventBus.$emit('openDialog', {
                    tag: tag,
                    params: params
                });
            }
        }
    }
</script>

<style scoped>

</style>
