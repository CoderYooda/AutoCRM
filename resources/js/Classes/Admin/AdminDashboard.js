class adminDashboardPage{

    constructor(){
        console.log('страница Админки инициализировано');
        this.active = true;
        this.init();
    }

    init(){

    }

    Linked(){

    }

    sendSystemMessage()
    {
        let data = {};
        data.user_id = document.getElementById('message_to').value;
        data.message = document.getElementById('message').value;

        window.axios({
            method: 'post',
            url: 'system_message/send',
            data: data
        }).then(function (resp) {
            console.log(resp);
        }).catch(function (error) {
            console.log(error);
        });
    }

}
export default adminDashboardPage;

