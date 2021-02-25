class Auth{
    constructor(){
        this.login_container = document.getElementById('login-form');
    }

    getLoginScreen(){
        let object = this;
        axios({
            method: 'GET',
            url: '/login'
        }).then(function (resp) {
            object.login_container.innerHTML = resp.data.html;
            object.login_container.classList.remove('hide');
        });
    }

    login(){

    }

    save(elem, event){
        let object = this;
        event.preventDefault();
        if(window.isXHRloading) return;

        let form = elem.closest("form");
        let data = new FormData(form);
        axios({
            method: form.getAttribute("method"),
            url: form.getAttribute("action"),
            data: data
        }).then(function (resp) {
            if(resp.data.status === 'success'){
                object.login_container.innerHTML = '';
                object.login_container.classList.add('hide');
            }
        });
    }
}
export default Auth
