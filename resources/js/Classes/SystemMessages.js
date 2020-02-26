class SystemMessages{

    constructor(){
        console.log('Системные сообщения подключены');
    }

    getMessage(){
        axios({
            method: form.getAttribute("method"),
            url: form.getAttribute("action"),
            data: data
        }).then(function (response) {

        }).catch(function (error) {

        });
    }
}
export default SystemMessages;
