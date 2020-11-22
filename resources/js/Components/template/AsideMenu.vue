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
        data: ()=> {
            return {
                menu: {},
            }
        },
        computed:{
        },
        beforeMount(){

        },
        mounted() {
            this.getCategories();
        },
        methods:{
          getCategories(){
              let stored_data = this.getFromLocalStorage(this.$attrs.menu + '_aside_data');
              if(!stored_data){
                  axios.get('/data/' + this.$attrs.menu +  '/aside').then((response) => {
                      this.menu = response.data;
                      this.saveToLocalStorage(this.$attrs.menu + '_aside_data', this.menu);
                  });
              } else {
                  this.menu = stored_data;
              }
          }
        }
    }
</script>

<style scoped>

</style>
