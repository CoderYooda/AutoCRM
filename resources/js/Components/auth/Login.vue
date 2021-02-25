<template>
    <div id="auth_form" v-if="showLogin">
        <form method="post" action="/">
            <div class="logo"></div>
            <div class="action">Сессия закончилась</div>
            <div class="form-group">
                <input v-model="loginData.phone" v-mask="mask" v-bind:class="{ 'is-invalid': loginData.phoneHasError }" placeholder="Номер телефона" />
                <div v-if="loginData.phoneHasError" class="invalid-text">{{ phoneInvalidText }}</div>
            </div>
            <div class="form-group">
                <input v-model="loginData.password" type="password" v-bind:class="{ 'is-invalid': loginData.passwordHasError }" placeholder="Пароль">
                <div v-if="loginData.passwordHasError" class="invalid-text">{{ passwordInvalidText }}</div>
            </div>
            <div class="form-group">
                <button class="button auth_butt" v-on:click="login">Войти</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data: ()=> {
            return {
                showLogin: false,
                phoneInvalidText: '',
                passwordInvalidText: '',
                mask: ['+7', '(', /\d/, /\d/, /\d/, ') ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
                loginData: {
                    phone:'',
                    password:'',
                }
            }
        },
        beforeMount(){
            //this.getShowLoginState();
        },
        mounted() {
            this.$eventBus.$on('NoAuthEvent', ()=>{
                this.showLogin = true;
            });
        },
        methods:{
            show(e){
                console.log(e);
            },
            getShowLoginState(e){
                let token = localStorage['api_token'];
                this.showLogin = !token;
            },

            login: function () {
                this.$store.dispatch('login', this.loginData)
                    .then(() => {
                        this.$router.push('/');
                    });
            },
        }
    }
</script>

<style scoped>
    #auth_form{
        position: absolute;
        top: 0;
        z-index: 10169;
        width: 100vw;
        height: 100vh;
        left: 0;
        background: #2D76A8;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #auth_form form{
        margin: 0 auto;
    }
    .logo{
        background: url(/images/logo_bb.svg) center no-repeat;
        height: 50px;
    }
    .action{
        text-align: center;
        color: #fff;
        font-size: 18px;
        margin-bottom: 15px;
    }
    .auth_butt{
        background-color: #2d76a8;
        color: #fff;
        border: 1px solid #4993c5;
        border-radius: 3px;
        margin: 0 auto;
        display: block;
    }
</style>
