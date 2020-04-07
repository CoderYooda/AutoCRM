class System{

    constructor(){
        this.init();
    }

    init(){
        // let object = this;
        // window.axios({
        //     method: 'post',
        //     url: '/user/get_channel',
        // }).then(function (resp) {
        //     object.ownChannel = resp.data.channels;
        // }).catch(function (error) {
        //     console.log(error);
        // }).finally(function () {
        //     object.connect();
        // });
    }

    authByUser(id){
        window.axios({
            method: 'post',
            url: '/system/auth_by_user',
            data:{id:id}
        }).then(function (resp) {
            window.location.reload();
        }).catch(function (error) {
            console.log(error);
        });
    }
}
export default System;
