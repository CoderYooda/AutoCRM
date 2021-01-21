<template>
    <div id="auth_form">
        <form  method="post" action="/">
            <div class="logo"></div>
            <div class="action text-white">Регистрация</div>
            <div class="l-r-sided">
                <div class="form-group">
                    <label class="" for="">Реферальный код</label>
                    <input class="form-control" placeholder="" />
                    <div v-if="loginData.phoneHasError" class="invalid-text">{{ phoneInvalidText }}</div>
                </div>
                <div class="form-group">
                    <label class="" for="">Фамилия</label>
                    <input class="form-control" v-bind:class="{ 'is-invalid': loginData.phoneHasError }" placeholder="" />
                    <div v-if="loginData.phoneHasError" class="invalid-text">{{ phoneInvalidText }}</div>
                </div>
                <div class="form-group">
                    <label class="" for="">Имя</label>
                    <input class="form-control" v-bind:class="{ 'is-invalid': loginData.phoneHasError }" placeholder="" />
                    <div v-if="loginData.phoneHasError" class="invalid-text">{{ phoneInvalidText }}</div>
                </div>
                <div class="form-group">
                    <label class="" for="">Отчество</label>
                    <input class="form-control" v-bind:class="{ 'is-invalid': loginData.phoneHasError }" placeholder="" />
                    <div v-if="loginData.phoneHasError" class="invalid-text">{{ phoneInvalidText }}</div>
                </div>
                <div class="form-group">
                    <label class="" for="">Номер телефона</label>
                    <input class="form-control" v-model="loginData.phone" v-mask="mask" v-bind:class="{ 'is-invalid': loginData.phoneHasError }" placeholder="" />
                    <div v-if="loginData.phoneHasError" class="invalid-text">{{ phoneInvalidText }}</div>
                </div>
                <div class="form-group">
                    <label class="" for="">Пароль</label>
                    <input class="form-control" v-model="loginData.password" type="password" v-bind:class="{ 'is-invalid': loginData.passwordHasError }" placeholder="">
                    <div v-if="loginData.passwordHasError" class="invalid-text">{{ passwordInvalidText }}</div>
                </div>
                <div class="form-group">
                    <label class="" for="">Подтверждение</label>
                    <input class="form-control" v-model="loginData.password" type="password" v-bind:class="{ 'is-invalid': loginData.passwordHasError }" placeholder="">
                    <div v-if="loginData.passwordHasError" class="invalid-text">{{ passwordInvalidText }}</div>
                </div>
                <div class="form-group" style="margin-top: 30px">
                    <button type="button" class="button auth_butt" v-on:click="login">Войти</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Auth",
        data: ()=> {
            return {
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
        },
        mounted() {
            // this.$eventBus.$on('NoAuthEvent', ()=>{
            //     this.showLogin = true;
            // });
        },
        methods:{

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
