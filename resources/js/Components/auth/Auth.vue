<template>
    <div id="auth_form">
        <form  method="post" action="/">
            <div class="logo"></div>
            <div class="action text-white">Регистрация</div>
            <div class="l-r-sided">
                <div class="form-group relative">
                    <div class="d-flex">
                        <label class="" for="">Фамилия</label>
                        <input v-model="registerData.surname" class="form-control" v-bind:class="{'is-invalid' : !!$store.getters.register_errors.surname}" placeholder="" />
                    </div>
                    <div v-if="!!$store.getters.register_errors.surname" class="invalid-text"><div class="left arrow"></div>{{ this.$store.getters.register_surname_error }}</div>
                </div>
                <div class="form-group relative">
                    <div class="d-flex">
                        <label class="" for="">Имя</label>
                        <input v-model="registerData.name" class="form-control" v-bind:class="{ 'is-invalid': !!$store.getters.register_errors.name }" placeholder="" />
                    </div>
                    <div v-if="!!$store.getters.register_errors.name" class="invalid-text"><div class="left arrow"></div>{{ this.$store.getters.register_errors.name[0] }}</div>
                </div>
                <div class="form-group relative">
                    <div class="d-flex">
                        <label class="" for="">Отчество</label>
                        <input v-model="registerData.patronymic" class="form-control" v-bind:class="{ 'is-invalid': !!$store.getters.register_errors.patronymic }" placeholder="" />
                    </div>
                    <div v-if="!!$store.getters.register_errors.patronymic" class="invalid-text"><div class="left arrow"></div>{{ this.$store.getters.register_errors.patronymic[0] }}</div>
                </div>
                <div class="form-group relative">
                    <div class="d-flex">
                        <label class="" for="">Номер телефона</label>
                        <input v-model="registerData.phone" class="form-control" v-mask="phoneMask" v-bind:class="{ 'is-invalid': !!$store.getters.register_errors.phone }" placeholder="" />
                    </div>
                    <div v-if="!!$store.getters.register_errors.phone" class="invalid-text"><div class="left arrow"></div>{{ this.$store.getters.register_errors.phone[0] }}</div>
                </div>
                <div class="form-group relative">
                    <div class="d-flex">
                        <label class="" for="">Реферальный код</label>
                        <input v-model="registerData.referal" v-bind:class="{ 'is-invalid': !!$store.getters.register_errors.referal }" class="form-control" placeholder="" />
                    </div>
                    <div v-if="!!$store.getters.register_errors.referal" class="invalid-text"><div class="left arrow"></div>{{ this.$store.getters.register_errors.referal[0] }}</div>
                </div>
                <div class="form-group relative">
                    <div class="d-flex">
                        <label class="" for="">Пароль</label>
                        <input v-model="registerData.password" class="form-control" type="password" v-bind:class="{ 'is-invalid': !!$store.getters.register_errors.password }" placeholder="">
                    </div>
                    <div v-if="!!$store.getters.register_errors.password" class="invalid-text"><div class="left arrow"></div>{{ this.$store.getters.register_errors.password[0] }}</div>
                </div>
                <div class="form-group relative">
                    <div class="d-flex">
                        <label class="" for="">Подтверждение</label>
                        <input v-model="registerData.password_confirmation" class="form-control" type="password" v-bind:class="{ 'is-invalid': !!$store.getters.register_errors.password_confirmation }"placeholder="">
                    </div>
                    <div v-if="!!$store.getters.register_errors.password_confirmation" class="invalid-text"><div class="left arrow"></div>{{ this.$store.getters.register_errors.password_confirmation[0] }}</div>
                </div>
                <div v-if="$store.getters.need_sms_confirmation" class="form-group relative">
                    <div class="d-flex">
                        <label class="" >SMS код</label>
                        <input v-model="registerData.sms_code" class="form-control" placeholder="">
                    </div>
                </div>
                <div v-if="!!$store.getters.auth_service_message" class="form-group">
                    <div class="card sys_mess">{{ this.$store.getters.auth_service_message }}</div>
                </div>
                <div class="form-group" style="margin-top: 30px">
                    <button type="button" class="button auth_butt" v-on:click="register">Войти</button>
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
                phoneMask: ['+7', '(', /\d/, /\d/, /\d/, ') ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
                loginData: {
                    phone:'',
                    password:'',
                },
                needSmsConfirm:false,
                registerData: {
                    referal: '',
                    surname: '',
                    name: '',
                    patronymic: '',
                    phone:'',
                    password:'',
                    password_confirmation:'',
                    sms_code:'',
                },
                formErrors:{

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
            login: function () {
                this.$store.dispatch('login', this.loginData)
                    .then(() => {
                        this.$router.push('/');
                    });
            },
            register: function () {
                this.$store.dispatch('register', this.registerData)
                    .then(() => this.$router.push('/')).catch((err) => {
                        console.log(this.$store.getters.need_sms_confirmation);
                });
            },
        }
    }
</script>

<style scoped>
    .sys_mess{
        background: #ea6a6a;
        color: #fff;
        border-radius: 3px;
        padding: 6px 10px;
    }
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
