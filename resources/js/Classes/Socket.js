import Echo from "laravel-echo"
window.io = require('socket.io-client');

class Socket{

    constructor(){
        console.log('Сокеты подключены');
        this.init();
    }

    init(){
        axios({
            method: 'get',
            url: '/whoami'
        }).then((response) => {
            console.log('Здравствуйте, ' + response.data.name + '!');
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
                .private('system_message.' + response.data.id)
                .listen('SystemMessage', function(e){
                    let block = helper.createElementFromHTML(e.view);
                    var sp2 = document.querySelector("#system_messages > div");
                    var parentDiv = sp2.parentNode;
                    parentDiv.insertBefore(block, sp2);
                    window.systemMessages.bellCall();
                    var audio = new Audio('sounds/system_message.mp3');
                    audio.play();
                });
        });



    }
}
export default Socket;
