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

                        let detail = {
                            detail: e,
                        };

                        Object.values(window.dialogs).forEach(dialog => {
                            let dialog_element = document.getElementById(dialog.tag);

                            dialog_element.dispatchEvent(new CustomEvent(e.model, detail));
                        });

                        document.dispatchEvent(new CustomEvent(e.model, detail));
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
                        helper.notifySound();
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

                        try {
                            window.storeImportDialog.finishUpload(e.info, e.html);
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
