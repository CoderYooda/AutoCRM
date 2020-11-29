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
                    phoneHasError:false,
                    password:'',
                    passwordHasError:false,
                }
            }
        },
        beforeMount(){
            this.getShowLoginState();
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
            login(e){
                e.preventDefault();
                this.loginData.phoneHasError = false;
                this.loginData.passwordHasError = false;
                window.axios({
                    method: 'post',
                    url: '/login',
                    data: this.loginData
                }).then((resp) =>  {
                    if(resp.data.status === 'success' && resp.data.api_token){
                        this.saveToLocalStorage('api_token', resp.data.api_token);
                        this.saveToLocalStorage('company_id', resp.data.company_id);
                        this.saveToLocalStorage('user_pic', resp.data.pic);
                        this.saveToLocalStorage('user_name', resp.data.name);
                        this.saveToLocalStorage('user_role', resp.data.role);
                        this.saveToLocalStorage('user_id', resp.data.id);
                        this.showLogin = false;
                        this.$router.go();
                    }
                }).catch((error)=>{
                    let errors = error.response.data.errors;
                    Object.entries(errors);
                    for (const [key, value] of Object.entries(errors)) {
                        this.loginData[key + 'HasError'] = true;
                        this[key + 'InvalidText'] = value[0];
                    }
                });
            }
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
