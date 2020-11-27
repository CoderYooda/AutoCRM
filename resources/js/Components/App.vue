<template>
    <div @keydown.esc="console.log(1)" id="app">
        <component :is="layout" />
        <login/>
        <Dialogs/>
        <notifications group="main" position="bottom left" />
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
            // this.$echo.channel("test-event").listen("ExampleEvent", e => {
            //     console.log(e);
            // });
            let token = localStorage['api_token'];
            if(token){
                this.echo = new Echo({
                    broadcaster: 'socket.io',
                    auth: {
                        headers: {
                            Authorization: 'Bearer ' + token
                        }
                    },
                    host: window.location.hostname + ':6001'
                });
            } else {
                console.warn('API токен не выдан, возможно Вы не авторизованы в системе');
            }
            // private-system_message.3
            this.echo
                .private('system_message.' + 3)
                .listen('SystemMessage', function(e){
                    console.log(1111);
                    // let block = helper.createElementFromHTML(e.view);
                    // var sp2 = document.querySelector("#system_messages > div");
                    // var parentDiv = sp2.parentNode;
                    // parentDiv.insertBefore(block, sp2);
                    // window.systemMessages.loadMessages();
                    // window.systemMessages.bellCall();
                    let audio = new Audio('sounds/system_message.mp3');
                    audio.play();
                });
                // .listen('StoreImportIteration', function(e){
                //     try {
                //         window.storeImportDialog.incrementImportPercent(e.percent);
                //     }
                //     catch (e) {
                //         console.log(e);
                //     }
                // })
                // .listen('StoreImportFinish', function(e){
                //     try {
                //         window.storeImportDialog.finishUpload(e.info, e.html);
                //     }
                //     catch (e) {
                //         console.log(e);
                //     }
                // })
                // .listen('OrderUpdated', function(e){
                //
                //     try {
                //         document.querySelector('#orders_count').innerHTML = e.orders_count;
                //     }
                //     catch (e) {
                //         console.log(e);
                //     }
                // });

            // Echo.join('survey.')
            //     .here((users) => {
            //         this.users_viewing = users;
            //         this.$forceUpdate();
            //     })
            //     .joining((user) => {
            //         if (this.checkIfUserAlreadyViewingSurvey(user)) {
            //             this.users_viewing.push(user);
            //             this.$forceUpdate();
            //         }
            //     })
            //     .leaving((user) => {
            //         this.removeViewingUser(user);
            //         this.$forceUpdate();
            //     });
        },
        methods: {
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
