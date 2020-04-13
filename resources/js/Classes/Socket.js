import io from 'socket.io-client';
//require('dotenv').config();
class Socket{

    constructor(){

        this.socket = null;
        this.channel = 'system:message';
        this.systemChannel = 'app_base_channel:systemMessage';
        //this.init();
        this.ownChannel = [];
        this.allowedOrigins = "192.168.1.104:* autocrm:* ";
        console.log('Сокеты подключены');
    }

    init(){
        let object = this;
        window.axios({
            method: 'post',
            url: '/user/get_channel',
        }).then(function (resp) {
            object.ownChannel = resp.data.channels;
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            object.connect();
        });
    }

    connect(){
        let object = this;
        object.socket = io('autocrm:6001',{origins:object.allowedOrigins});
        object.socket.on('connect', function(){


            object.socket.emit('subscribe', object.systemChannel);
            [].forEach.call(object.ownChannel, function(chanel){
                object.socket.emit('subscribe',  chanel);
            });

        });

        object.socket.on('error', function(error){
            console.warn(error);
        });

        object.socket.on('message', function(message){
            console.info(message);
        });

        [].forEach.call(object.ownChannel, function(chanel){

            object.socket.on(chanel, function(data){
                console.log(chanel);
                if(data.kind != null){
                    document.dispatchEvent(new Event(data.kind + 'Stored', {bubbles: true}));
                }
                if(data.type == 'success'){
                    window.systemMessages.loadMessages();
                }
                console.log(data);
            });
        });

    }

    sendMessage(){
        let object = this;
        object.socket.emit(
            'system',
            {
                from: 'User',
                text: '123'
            },
            () => {console.log('callback')}
            );
    }
}
export default Socket;
