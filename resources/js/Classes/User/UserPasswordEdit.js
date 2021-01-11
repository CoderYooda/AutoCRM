class userPasswordEditPage{

    constructor(){
        console.log('страница редактирования пароля инициализировано');
        this.init();
    }

    init(){
        let object = this;
    }

    linked(){
        this.init();
    }

    save(elem){
        if(window.isXHRloading) return;
        let object = this;

        dd(1);
        window.axform.send(elem, function(e){
            //window.goto('/user?id=' + e.data.id, function(){}, true);
        });
    }


}
export default userPasswordEditPage;
