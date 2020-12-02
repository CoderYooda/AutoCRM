<template>
    <div id="app">
        <component :is="layout" />
        <login/>
        <Dialogs/>
        <notifications group="main" position="bottom left" />
        <vue-confirm-dialog class="v-confirm"></vue-confirm-dialog>
    </div>
</template>

<script>
    import MainLayout from './layouts/MainLayout'
    import Login from './auth/Login'
    import Dialogs from './template/Dialogs'
    import Echo from "laravel-echo"

    export default {
        data: ()=> {
            return {
                echo:null,
            }
        },
        mounted() {
            this.$eventBus.$on('TooManyAttempts', ()=>{
                this.$notify({
                    group: 'main',
                    title: 'Ошибка сервера!',
                    text: 'Слишком много запросов, повторите попытку позже.'
                });
            });
        },
        created(){
            let token = this.getFromLocalStorage('api_token');
            let user_id = this.getFromLocalStorage('user_id');
            let company_id = this.getFromLocalStorage('company_id');
            if(token && user_id){
                this.echo = new Echo({
                    broadcaster: 'socket.io',
                    auth: {
                        headers: {
                            Authorization: 'Bearer ' + token
                        }
                    },
                    host: window.location.hostname + ':6001',
                });
            } else {
                console.warn('API токен не выдан, возможно Вы не авторизованы в системе');
            }
            this.echo
                .private('system_message.' + user_id)
                .listen('SystemMessage', (data)=>{
                    this.$eventBus.$emit('systemMessage', data);
                    console.log(data);
                    // let audio = new Audio('/sounds/system_message.mp3');
                    // audio.play();
                });
        },
        methods: {
            targetAction(target, method, args) {



                // let component = null;
                // let children = this.$children;
                // children.forEach((child)=>{
                //
                // });
                // while (parent && !component) {
                //     if (parent.$options.name === componentName) {
                //         component = parent
                //     }
                //     parent = parent.$parent;
                // }
                // return component
            },
        },
        computed: {
            layout() {
                return (this.$route.meta.layout || 'main') + '-layout'
            },
        },
        components: {
            Login,
            MainLayout,
            Dialogs
        }
    }
</script>
