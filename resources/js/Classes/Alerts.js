class Alerts{

    constructor(){
        this.bell_item = document.getElementById('bell_badge');
        this.stack_item = document.getElementById('stack_badge');
        this.stack_item_container = document.getElementById('stack_item_container');
        this.stack_dropdown = document.getElementById('stack_dropdown');
        this.stack_badge_count = document.getElementById('stack_badge_count');
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

                window.an = {};
                window.an.start = null;
                window.an.duration = 0.2;
                window.an.gridSize = 10;
                window.an.maxX = dialogs[objectKey].position.x;
                window.an.maxY = dialogs[objectKey].position.y;
                window.an.targetX =  document.getElementById('stack_badge').getBoundingClientRect().left;
                window.an.targetY =  document.getElementById('stack_badge').getBoundingClientRect().top;
                window.an.div = document.getElementById(elem.tag);
                requestAnimationFrame(window.stepBack);
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

    freshDialogStack(){
        let object = this;
        let html = '';
        let count = 0;
        if(object.stack_item_container) {

            object.stack_item_container.innerHTML = html;
            Object.keys(dialogs).map(function (objectKey, index) {
                var elem = dialogs[objectKey];
                if (elem.hidden) {
                    count++;
                    stack_dialogs.push(dialogs[objectKey]);
                    html += '<a class="stack_item" onclick="window.alerts.comeBackDialog(\'' + elem.tag + '\')">' + elem.title + '</a>'
                }
                object.stack_item_container.innerHTML = html;
            });

            if (count > 0) {
                html = '';
                object.stack_item.classList.add('add');
                setTimeout(function () {
                    object.stack_item.classList.remove('add');
                }, 200);
                object.stack_item.classList.add('active');
            } else {
                object.stack_item.classList.remove('active');
                html = '<span class="sver">Свернутых окон нет</span>';
                object.stack_item_container.innerHTML = html;
            }


            this.stack_badge_count.innerHTML = count;
        }
        // if(this.stack_dropdown){
        //     if(count > 0){
        //         this.stack_dropdown.classList.remove('hide');
        //     } else {
        //         this.stack_dropdown.classList.add('hide');
        //     }
        // }

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

window.stepBack = function(timestamp)
{
    var progress, x, y;
    if(window.an.start === null) window.an.start = timestamp;

    progress = (timestamp - window.an.start) / window.an.duration / 1000; // percent

    x = Math.sin((90 * progress) * Math.PI / 180) * progress * (Math.max(window.an.maxX, window.an.targetX) - Math.min(window.an.maxX, window.an.targetX)); // x = ƒ(t)
    y = Math.sin((90 * progress) * Math.PI / 180) * (progress * (Math.max(window.an.maxY, window.an.targetY) - Math.min(window.an.maxY, window.an.targetY))); // x = ƒ(t)

    window.an.div.style.left =  window.an.targetX - x + "px";
    window.an.div.style.top = window.an.targetY + y + "px";

    window.an.div.style.transform = "scale(" + progress + ") translate(0px, -" + ((window.an.div.offsetHeight * progress) - window.an.div.offsetHeight ) + "px)";
    window.an.div.style.opacity = Math.sin((90 * progress) * Math.PI / 180);
    if(progress <= 1){
        requestAnimationFrame(window.stepBack);
    } else {
        window.an.div.style.transform = "none";
        window.an.div.style.opacity = 1;
        window.an.start = null; // reset to start position
    }
}

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
