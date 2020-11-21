<template>
    <div class="bottom-container">
        <Categories/>
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
            console.log(this.$route.query);
            this.getData()
        },
        methods:{
            getData(){
                window.axios({
                    method: 'post',
                    url: '/store/index',
                    data: this.$route.query
                }).then((resp) =>  {
                    console.log(resp);
                });
            }
        }
    }
</script>

<style scoped>

</style>
