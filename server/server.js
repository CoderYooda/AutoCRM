var io = require('socket.io')(6001,{
        origins :'autocrm:* 192.168.1.64:*'
    }),
    request = require('request'),
    Redis = require('ioredis'),
    redis = new Redis();


//Посредник авторизации
io.use(function (socket,next) {
    request.get({
        url:'http://autocrm/ws/check-auth',
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
        request.get({
            url:'http://autocrm/ws/check-sub/' + channel,
            headers: {cookie : socket.request.headers.cookie},
            json: true,
        } , function(error, response, json){
            console.log(json);
            if(json.can){
                socket.join(channel, function(error){
                    socket.send('Присоединился к ' + channel);
                    //io  .to(channel + ':message')
                    // socket.broadcast.emit(
                    //     'message',
                    //     chatMessage('Chatbot', 'New User joined')
                    // );
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
    //console.log(error, count);
});

redis.on('pmessage', function(pattern, channel, message){

    message = JSON.parse(message);

    //console.log(channel + ':' + message.event);
    io  .to(channel + ':' + message.event)
        .emit(channel + ':' + message.event, message.data.message)
    console.log(message);
});