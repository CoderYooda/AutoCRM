<template>
    <li v-on:click="open = !open" class="top-nav-item dropdown pointer" v-bind:class="{ 'show': open }" >
        <div class="d-flex align-items-center">
            <div class="w-52 p-10">
                <div class="avatar w-32 mr-3">
                    <img class="user_thumb" v-bind:src="user_pic" alt="...">
                </div>
            </div>
            <div class="pr-10">
                <div style="line-height: 14px;">{{ user_name }}</div>
                <div style="font-size: 12px;font-weight: bold;line-height: 14px;">{{ user_role }}</div>
            </div>
        </div>

        <div class="dropdown_menu" v-bind:class="{ 'show': open }">
            <div class="arrow"></div>

            <router-link tag="a" class="element" active-class="active" to="/user">
                Личный кабинет
            </router-link>
            <router-link tag="a" class="element" active-class="active" to="/user/service">
                Мои услуги
            </router-link>
            <router-link tag="a" class="element" active-class="active" to="/user/settings">
                Настройки
            </router-link>
            <router-link tag="a" class="element" active-class="active" to="/user/garage">
                Гараж
            </router-link>
            <a class="element" href="#">Вернуться в адм. панель</a>
            <a v-on:click="logout" class="element">Выход</a>
        </div>
    </li>
</template>

<script>
    export default {
        name: "UserMenu",
        data: ()=> {
            return {
                user_name: 'Нет имени',
                user_pic: 'https://via.placeholder.com/150',
                user_role: 'Нет роли',
                open:false,
            }
        },
        beforeMount(){
            let user_pic = this.getFromLocalStorage('user_pic');
            if(user_pic)
                this.user_pic = user_pic;
            let user_name = this.getFromLocalStorage('user_name');
            if(user_name)
                this.user_name = user_name;
            let user_role = this.getFromLocalStorage('user_role');
            if(user_role)
                this.user_role = user_role;
        },
        mounted() {
            document.addEventListener('click', this.close)
        },
        methods:{
            close (e) {
                if (!this.$el.contains(e.target)) {
                    this.open = false
                }
            },
            logout(){
                this.saveToLocalStorage('api_token', '', false);
                this.$router.go();
            }
        }
    }
</script>

<style scoped>

</style>
