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
    }

    loadMessages(){
        let object = this;
        axios({
            method: 'get',
            url: '/systemMessages/load'
        }).then(function (resp) {
            object.bell.classList.add('add');
            object.stack_bell_count.innerHTML = resp.data.count;
            setTimeout(function () {
                object.bell.classList.remove('add');

            }, 200);
            if(resp.data.count > 0){
                object.bell.classList.add('active');
            } else {
                object.bell.classList.remove('active');
            }
            object.container.innerHTML = resp.data.html;
        }).catch(function (error) {
            console.warn(error);
        });
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
