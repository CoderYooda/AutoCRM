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

    animateToBase(objectKey){

        var elem = dialogs[objectKey];
        window.an = {};
        window.an.start = null;
        window.an.duration = 0.3;
        window.an.gridSize = 10;
        window.an.maxX = dialogs[objectKey].position.x;
        window.an.maxY = dialogs[objectKey].position.y;
        window.an.targetX = document.getElementById('stack_badge').getBoundingClientRect().left;
        window.an.targetY = document.getElementById('stack_badge').getBoundingClientRect().top;
        window.an.div = document.getElementById(elem.tag);
        requestAnimationFrame(window.step);
        //this.step(4, this, objectKey, home);
    }

    // step(speed, object, objectKey, target){
    //     var elem = dialogs[objectKey];
    //     let current = [document.getElementById(elem.tag).getBoundingClientRect().top, document.getElementById(elem.tag).getBoundingClientRect().left];
    //
    //     let dialog_window = document.getElementById(elem.tag);
    //
    //     let Topdistance = current[0] - target[0];
    //     let Ydistance = current[1] - target[1];
    //     //console.log(Topdistance, Ydistance);
    //
    //     if(Topdistance > target[0]){
    //         dialog_window.style.top = (Topdistance - 0.1 ) + 'px';
    //     }
    //     // if(Ydistance > 0){
    //     //     dialog_window.style.top = Ydistance - 4 + 'px';
    //     // }
    //
    //     if(Topdistance > target[0]){
    //         object.step(speed, object, objectKey, target);
    //     }
    //
    // }



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
        let object = this;
        Object.keys(dialogs).map(function(objectKey, index) {
            var elem = dialogs[objectKey];
            if(elem.tag == tag){
                let dialog = document.getElementById(elem.tag);
                //console.log(dialog);
                let title = dialog.querySelector('.titlebar').innerHTML;
                dialogs[objectKey].hidden = true;
                dialogs[objectKey].title = title;
                object.animateToBase(objectKey);
                //dialog.classList.add('hide');
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

window.step = function(timestamp)
{
    var progress, x, y;
    if(window.an.start === null) window.an.start = timestamp;

    progress = (timestamp - window.an.start) / window.an.duration / 1000; // percent

    x = Math.sin((90 * progress) * Math.PI / 180) * progress * (Math.max(window.an.maxX, window.an.targetX) - Math.min(window.an.maxX, window.an.targetX)); // x = ƒ(t)
    y = Math.sin((90 * progress) * Math.PI / 180) * (progress * (Math.max(window.an.maxY, window.an.targetY) - Math.min(window.an.maxY, window.an.targetY))); // x = ƒ(t)

    window.an.div.style.left =  window.an.maxX + x + "px";
    window.an.div.style.top = window.an.maxY - y + "px";

    window.an.div.style.transform = "scale(" + (1 - progress / 1.5) + ") translate(0px, -" + (window.an.div.offsetHeight * 1.5 * progress) + "px)";
    window.an.div.style.opacity = 1 - Math.sin((90 * progress) * Math.PI / 180);
    if(progress <= 1){
        requestAnimationFrame(window.step);
    } else {
        window.an.div.classList.add('hide');
        window.an.div.style.opacity = 1;
        window.an.div.style.transform = "none";

        window.an.start = null; // reset to start position
    }

}