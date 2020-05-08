//import Sortable from "sortablejs";

class userPage{

    constructor(){
        console.log('страница профиля1 инициализировано');
        this.credit = 0;
        this.init();
    }

    init(){
        let object = this;
    }

    getPayment(){
        let data = 1;
        axios({
            method: 'POST',
            url: '/tariff/get_payment',
            data: data
        }).then(function (response){
            if(response.data.redirect){
                window.location.href = response.data.redirect;
            }
        }).catch(function(response){
            dd(response);
        })
    }

    checkPayment(id){
        axios({
            method: 'POST',
            url: '/tariff/check_payment',
            data: {id: id}
        }).then(function (response){
            let div = document.getElementById(response.data.target);
            div.innerHTML = response.data.html;

        }).catch(function(response){
            dd(response);
        })
    }

    linked(){ //Состояние Linked - когда экземпляр класса уже был загружен, и находится в памяти. (Возвращение на страницу)
        this.active_tab = window.helper.findGetParameter('active_tab');
    }

}
export default userPage;
