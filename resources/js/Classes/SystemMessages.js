class SystemMessages{

    constructor(){
        this.container =  document.querySelector("#system_messages");
        this.bell =  document.querySelector("#bell_badge");
        this.stack_bell_count = document.getElementById('stack_bell_count');
        console.log('Системные сообщения подключены');
        let object = this;
        document.addEventListener("AuthorizedEvent", function(){
            object.loadMessages();
        });


        let modal_html = document.getElementById('notifications');
        let options = {
            backdrop: true,
            keyboard: true,
        };
        if(modal_html){
            this.modal = new bootstrap.Modal(modal_html, options);
        }
    }

    loadMessages(){
        let object = this;
        axios({
            method: 'get',
            url: '/systemMessages/load'
        }).then(function (resp) {

            if(resp.data.count > 0){
                object.bell.classList.add('active');
            } else {
                object.bell.classList.remove('active');
            }
            object.container.innerHTML = resp.data.html;
            object.bellCall();
        }).catch(function (error) {
            console.warn(error);
        });
    }

    bellCall(){
        let count = document.querySelector('#system_messages .list-group').childElementCount;
        this.stack_bell_count.innerHTML = count;
        this.bell.classList.add('add');

        setTimeout(() => {
            this.bell.classList.remove('add');
        }, 200);

    }

    readMessage(id){
        let object = this;
        axios({
            method: 'post',
            url: '/systemMessages/read',
            data:{id:id}
        }).then(function (resp) {
            object.loadMessages();
        })
    }
}
export default SystemMessages;
