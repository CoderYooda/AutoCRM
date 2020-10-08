var containerId = 'dialogs';
window.dialogs = [];
window.dialogs_index = 0;

document.addEventListener('mouseup', function(e){
	e = e || window.event;
	document.getElementsByTagName('body')[0].classList.remove('dialog-dragged');
	Object.keys(dialogs).map(function(objectKey, index) {
		var value = dialogs[objectKey];
		value.dragged = false;
	});
});

document.addEventListener('keydown', function(e){
    if(e.key=='Escape'||e.key=='Esc'||e.keyCode==27){
        e.preventDefault();
        Object.keys(dialogs).map(function(objectKey, index) {
            var elem = dialogs[objectKey];
            var d = document.getElementById(elem.tag);

            if(d.classList.contains('selected')){
                window[d.id].finitaLaComedia();
            }
        });
    }
}, true);

document.addEventListener('mousemove', function(e){
	e = e || window.event;
	Object.keys(dialogs).map(function(objectKey, index) {
		var elem = dialogs[objectKey];
		if(elem.dragged){
			document.getElementsByTagName('body')[0].classList.add('dialog-dragged');
			var d = document.getElementById(elem.tag);
			var folderLeft = e.pageX - elem.ol;
			if(e.pageX < (window.iw / 2)){
				if(folderLeft < 0){d.style.left = 0 + 'px'; dialogs[objectKey].position.x = 0} else {d.style.left = folderLeft + 'px'; dialogs[objectKey].position.x = folderLeft}
			} else {
				if((folderLeft + elem.width) > window.iw){d.style.left = (window.iw - elem.width)  + 'px'; dialogs[objectKey].position.x = (window.iw - elem.width)} else {d.style.left = folderLeft + 'px'; dialogs[objectKey].position.x = folderLeft}
			}
			var folderTop = e.pageY - elem.ot;
			if(e.pageY < (window.ih / 2)){
				if(folderTop < 52){d.style.top = 52 + 'px'; dialogs[objectKey].position.y = 52} else {d.style.top = folderTop + 'px'; dialogs[objectKey].position.y = folderTop}
			} else {
				if((folderTop + elem.height) > window.ih){d.style.top = (window.ih - elem.height)  + 'px'; dialogs[objectKey].position.y = (window.ih - elem.height)} else {d.style.top = folderTop + 'px'; dialogs[objectKey].position.y = folderTop}
			}
		}
	});
});

window.openDialog = function(tag, params = null, reload = false) {
    var e = e || window.event;
    if(e){
        e.preventDefault();
    }
	if (isXHRloading) return;
    window.isXHRloading = true;
    if(params != null){
        params = '?params=1' + params;
    } else {
        params = '';
    }
    //
    window.axios({
        method: 'get',
        url: '/dialog_' + tag + '_open' + params
    }).then(function (resp) {

        console.log(resp.data.tag);

        if(typeof(resp.data.tag) == "undefined") return ;

        if(!alreadyOpened(resp.data.tag) || reload){
            closeDialog(null, resp.data.tag);
            appendDialog(resp.data, resp.data.tag);
            window.helper.initDialogMethods(resp);
        }
    }).finally(function(){
        window.isXHRloading = false;
    });
}

window.closeDialog = function(event, id = null){
	if(id){
		var dial = document.getElementById(id);

		if(dialogs[id]) findPrevDialog(dialogs[id].index);

		delete dialogs[id];
		if(dial){
			dial.remove();
		}
		downEventListners();
	} else{
		Object.keys(dialogs).map(function(key, index) {
			var elem = dialogs[key];
			var dial = document.getElementById(elem.tag);
			if(dial.contains(event.target)){

                if(dialogs[key]) findPrevDialog(dialogs[key].index);

				delete dialogs[key];
				if(dial){
					dial.remove();
				}
				downEventListners();
			}
		});
	}
}

function findPrevDialog(id){

    let array = Object.keys(dialogs);

    dance:
    for(let i = id - 1; i !== -1; i --) {
        for(let x = 0; x < array.length; x++) {
            let dialog = dialogs[array[x]];
            if (dialog.index === i) {
                let element = document.getElementById(dialog.tag);
                element.classList.add('selected');
                break dance;
            }
        }
    }
}

function appendDialog(resp, tag){

	window.dialogs[tag] = [];
	window.dialogs[tag].tag = tag;
	window.dialogs[tag].index = window.dialogs_index;
	var node = helper.createElementFromHTML(resp.html);
	document.getElementById(containerId).appendChild(node);
    window.applySelects();
	var position = dialogPosition(tag);
	var dialog = document.getElementById(tag);
	dialog.style.left = position.x + 'px';
	dialog.style.top = position.y + 'px';
    dialog.hidden = false;
	window.dialogs[tag].height = dialog.offsetHeight;
	window.dialogs[tag].width = dialog.offsetWidth;

    Object.keys(dialogs).map(function(key, index) {
        var elem = dialogs[key];
        var dial = document.getElementById(elem.tag);
        if(dial){
            dial.classList.remove('selected');
        }
    });

	dialog.classList.add('selected');
	downEventListners();
    window.dialogs_index++;
}

function downEventListners(){
	Object.keys(dialogs).map(function(objectKey, index) {
		var elem = dialogs[objectKey];
		var tag = window.dialogs[elem.tag];
		var d = document.getElementById(elem.tag);

		d.addEventListener('mousedown', function(e){
			e = e || window.event;
			if(e.target.className == 'titlebar') {
				tag.dragged = true;
				tag.ol = e.pageX - d.offsetLeft;
				tag.ot = e.pageY - d.offsetTop;
			}
			if(d.contains(e.target)){
				Object.keys(dialogs).map(function(key, index) {
					var elem = dialogs[key];
					var dial = document.getElementById(elem.tag);
					if(dial){
                        dial.classList.remove('selected');
                    }
				});
				d.classList.add('selected');
			}
		});
	});
}

function alreadyOpened(tag){
	console.info('Проверка на вхождение окна...');
	if(document.getElementById(tag)){
	    if(window.dialogs[tag].hidden){
            window.alerts.comeBackDialog(tag);
        }
        window.flashDialog(tag);
		return true;
	}else{
		return false;
	}
}

window.flashDialog = function(tag, onlySelect = false){
	Object.keys(dialogs).map(function(key, index) {
		var elem = dialogs[key];
		var dial = document.getElementById(elem.tag);
		dial.classList.remove('selected');
	});
	var d = document.getElementById(tag);
	d.classList.add('selected');
	if(!onlySelect){
        d.classList.add('flash');
        setTimeout(function(){
            d.classList.remove('flash');
        }, 300);
    }
}

function dialogPosition(tag){
	var position = [];
	var dialog = document.getElementById(tag);
	position.x = (window.innerWidth - dialog.clientWidth) / 2;
	position.y = (window.innerHeight - dialog.clientHeight) / 2;
	window.dialogs[tag].position = position;
	return position;
}
