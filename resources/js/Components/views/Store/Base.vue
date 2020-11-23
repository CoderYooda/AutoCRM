<template>
    <div class="bottom-container">
        <Categories/>
        <div class="box-lister">
            <div class="d-flex mb-15">
                <div class="search-field-container w-100">
                    <input id="search" name="search" placeholder="Поиск по складу" class="input w-100" value="" type="text">
                </div>
                <div class="actions">
                    <button type="button" class="button primary ml-15" v-on:click="newDialog('category')">Новая категория</button>
                    <button type="button" class="button primary ml-15" v-on:click="newDialog('product')">Новый товар</button>
                </div>
            </div>
            <div class="box h-100 d-flex">wad</div>
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
            newDialog(tag, params = null){
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
