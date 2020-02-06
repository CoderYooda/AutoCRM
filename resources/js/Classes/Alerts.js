class Alerts{

    constructor(){
        this.bell_item = document.getElementById('bell_badge');
        this.stack_item = document.getElementById('stack_badge');
        this.stack_item_container = document.getElementById('stack_item_container');
        window.stack_dialogs = [];
        console.log('Оповещения подключены');
        this.freshDialogStack();
    }

    comeBackDialog(tag){
        Object.keys(dialogs).map(function(objectKey, index) {
            var elem = dialogs[objectKey];
            if(elem.tag == tag){
                let dialog = document.getElementById(elem.tag);
                dialogs[objectKey].hidden = false;
                dialog.classList.remove('hide');
                window.flashDialog(elem.tag, true);
            }
        });
        this.freshDialogStack();
    }

    freshDialogStack(){
        let object = this;
        let html = '';
        object.stack_item_container.innerHTML = html;
        Object.keys(dialogs).map(function(objectKey, index) {
            var elem = dialogs[objectKey];

            if(elem.hidden){
                stack_dialogs.push(dialogs[objectKey]);
                html += '<a class="stack_item" onclick="window.alerts.comeBackDialog(\'' + elem.tag + '\')">' + elem.title + '</a>'

            }
            object.stack_item_container.innerHTML = html;
        });
        //this.stack_item
    }

    hideDialog(tag){
        Object.keys(dialogs).map(function(objectKey, index) {
            var elem = dialogs[objectKey];
            if(elem.tag == tag){
                let dialog = document.getElementById(elem.tag);
                //console.log(dialog);
                let title = dialog.querySelector('.titlebar').innerHTML;
                dialogs[objectKey].hidden = true;
                dialogs[objectKey].title = title;
                dialog.classList.add('hide');
            }
        });
        this.freshDialogStack();
    }



    init(){
        let object = this;
        // window.axios({
        //     method: 'post',
        //     url: '/user/get_channel',
        // }).then(function (resp) {
        //     object.ownChannel = resp.data.channel;
        // }).catch(function (error) {
        //     //console.log(error);
        // }).finally(function () {
        //     object.connect();
        // });
    }


}
export default Alerts;
