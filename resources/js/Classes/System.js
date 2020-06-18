class System{

    constructor(){
        this.init();
    }

    init(){
    }

    toggleMenu(){
        document.getElementById('left_menu_draggable').classList.contains('closed') ? document.getElementById('left_menu_draggable').classList.remove('closed') : document.getElementById('left_menu_draggable').classList.add('closed');
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
