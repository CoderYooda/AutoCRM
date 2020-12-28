import Echo from "laravel-echo"
window.io = require('socket.io-client');

class Socket{

    constructor(){
        console.log('Сокеты подключены');
        this.init();
    }

    init(){
        let unprinted = document.getElementById('unprinted');
        if(unprinted){

            console.log(window.socket_host + ':' + window.socket_port);

            axios({
                method: 'get',
                url: '/whoami'
            }).then((response) => {
                console.log('Здравствуйте, ' + response.data.partner.fio + '!');
                this.echo = new Echo({
                    broadcaster: 'socket.io',
                    auth: {
                        headers: {
                            Authorization: window.token
                        }
                    },
                    host: window.socket_host + ':' + window.socket_port
                });

                this.echo
                    .private(`company_message.${response.data.company.id}`)
                    .listen('ModelWasStored', function (e) {
                        document.dispatchEvent(new CustomEvent(e.model));
                    });

                this.echo
                    .private('system_message.' + response.data.id)
                    .listen('SystemMessage', function(e){
                        // let block = helper.createElementFromHTML(e.view);
                        // var sp2 = document.querySelector("#system_messages > div");
                        // var parentDiv = sp2.parentNode;
                        // parentDiv.insertBefore(block, sp2);
                        window.systemMessages.loadMessages();
                        window.systemMessages.bellCall();
                        var audio = new Audio('sounds/system_message.mp3');
                        audio.play();
                    })
                    .listen('StoreImportIteration', function(e){
                        try {
                            window.storeImportDialog.incrementImportPercent(e.percent);
                        }
                        catch (e) {
                            console.log(e);
                        }
                    })
                    .listen('StoreImportFinish', function(e){

                        console.log(e.info, e.html);

                        try {
                            window.storeImportDialog.finishUpload(e.info, e.html);
                        }
                        catch (e) {
                            console.log(e);
                        }
                    })
                    .listen('OrderUpdated', function(e){

                        try {
                            window.notification.notify('success', 'Поступил новый заказ');
                            document.querySelector('#orders_count').innerHTML = e.orders_count;
                        }
                        catch (e) {
                            console.log(e);
                        }
                    });
            });
        }
    }
}
export default Socket;
