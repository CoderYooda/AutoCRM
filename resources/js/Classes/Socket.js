import Echo from "laravel-echo"
//window.io = require('socket.io-client');
//require('dotenv').config();
//
// window.echo = new Echo({
//     broadcaster: 'socket.io',
//     auth: {
//         headers: {
//             Authorization: window.token
//         }
//     },
//     host: 'http://autocrm:6001' // значение должно быть равным authHost из конфига + порт
// });
//
// window.echo
//     .private('chat.1')
//     .listen('SystemMessage', function(e){
//         console.log(e);
//     });

class Socket{

    constructor(){
        console.log('Сокеты подключены');
        this.init();
    }

    init(){

        //console.log(this.echo);
    }
}
export default Socket;
