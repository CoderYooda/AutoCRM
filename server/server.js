require('dotenv').config();

let socket_doamain = process.env.SOCKET_DOMAIN;

var io = require('socket.io')(6001,{
        origins : process.env.SOCKET_ORIGINS
    }),
    request = require('request'),
    Redis = require('ioredis'),
    redis = new Redis();


//Посредник авторизации
io.use(function (socket,next) {

    if(!socket_doamain){
        console.log('Домен заменен на autocrm');
        socket_doamain = 'autocrm';
    }

    request.get({
        url:'http://' + socket_doamain + '/ws/check-auth',
        headers: {cookie : socket.request.headers.cookie},
        json: true,
    } , function(error, response, json){

        return json.auth ? next() : next(new Error(' Вы не авторизованы в системе'));
    });
});


//Разрешение на подключение к каналу
io.on('connection', function(socket){
    socket.on('subscribe', function(channel){
        console.log('Кто кто хочет войти в: ' + channel);
        if(!socket_doamain){
            console.log('Домен заменен на autocrm');
            socket_doamain = 'autocrm';
        }
        request.get({
            url:'http://' + socket_doamain + '/ws/check-sub/' + channel,
            headers: {cookie : socket.request.headers.cookie},
            json: true,
        } , function(error, response, json){
            if(json.can){
                console.log(channel + 'Может');
                socket.join(channel, function(error){
                    socket.send('Присоединился к ' + channel);
                    io  .to(channel + ':systemMessage');
                    socket.broadcast.emit(
                        'message',
                        chatMessage('Chatbot', 'New User joined')
                    );
                })
            }
            return;
        });
    })
});

const chatMessage = (from, text) => {
    return {
        from,
        text,
        time: new Date().getTime()
    };
};

redis.psubscribe('*', function(error, count){
    console.log(error, count);
});

redis.on('pmessage', function(pattern, channel, message){
    message = JSON.parse(message);
    io  .to(channel + ':' + message.event)
        .emit(channel + ':' + message.event, message.data.message)
    console.log(message);
});
