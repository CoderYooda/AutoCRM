import io from 'socket.io-client';

class Socket{

    constructor(){

        this.socket = null;
        this.channel = 'system:message';
        this.systemChannel = 'app_base_channel:systemMessage';
        this.init();
        this.ownChannel = null;
        console.log('Сокеты подключены');
    }

    init(){
        let object = this;
        window.axios({
            method: 'post',
            url: '/user/get_channel',
        }).then(function (resp) {
            object.ownChannel = resp.data.channel;
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            object.connect();
        });
    }

    connect(){
        let object = this;
        object.socket = io(':6001');
        object.socket.on('connect', function(){
            object.socket.emit('subscribe', object.channel);
            object.socket.emit('subscribe',  object.ownChannel);
        });

        object.socket.on('error', function(error){
            console.warn(error);
        });

        object.socket.on('message', function(message){
            console.info(message);
        });

        object.socket.on(object.channel, function(data){

            $('#chat').prepend(
                $('<h4>').text(data.name),
                $('<p>').text(data.content)
            );
            console.log(data)
        });

        object.socket.on(object.ownChannel, function(data){
            console.log(data)
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
