var containerId = 'dialogs';
window.dialogs = [];

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
                window[elem.tag].finitaLaComedia();
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
				if(folderLeft < 0){d.style.left = 0 + 'px';} else {d.style.left = folderLeft + 'px';}
			} else {
				if((folderLeft + elem.width) > window.iw){d.style.left = (window.iw - elem.width)  + 'px';} else {d.style.left = folderLeft + 'px';}
			}
			var folderTop = e.pageY - elem.ot;
			if(e.pageY < (window.ih / 2)){
				if(folderTop < 0){d.style.top = 0 + 'px';} else {d.style.top = folderTop + 'px';}
			} else {
				if((folderTop + elem.height) > window.ih){d.style.top = (window.ih - elem.height)  + 'px';} else {d.style.top = folderTop + 'px';}
			}
		}
	});
});

window.openDialog = function(tag, params = null, reload = false) {
    var e = e || window.event;
    if(e){
        e.preventDefault();
    }
	if (isXHRloading) { return; }
	let dReq = new XMLHttpRequest();
	window.isXHRloading = true;
    dReq.onreadystatechange = function (e) {
        if (dReq.readyState === 4) {
            var resp = JSON.parse(this.responseText);
            if(dReq.status === 200){
                var resp = JSON.parse(this.responseText);
                if(!alreadyOpened(resp.tag) || reload){
                    closeDialog(null, resp.tag);
                    appendDialog(resp, resp.tag);
                    window.helper.initDialogMethods();
                }
                window.isXHRloading = false;
            }else{
                window.notification.notify( 'error', resp.message);
                window.isXHRloading = false;
            }
        }
    };
	dReq.onload = function () {

	};

	if(params != null){
		params = '?params=1' + params;
	} else {
		params = '';
	}

	dReq.open("get", 'dialog_' + tag + '_open' + params, true);
	dReq.send();
}

window.closeDialog = function(event, id = null){
	if(id){
		var dial = document.getElementById(id);
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
				delete dialogs[key];
				if(dial){
					dial.remove();
				}
				downEventListners();
			}
		});
	}

}

function appendDialog(resp, tag){

	window.dialogs[tag] = [];
	window.dialogs[tag].tag = tag;
	var node = helper.createElementFromHTML(resp.html);
	document.getElementById(containerId).appendChild(node);
	var position = dialogPosition(tag);
	var dialog = document.getElementById(tag);
	dialog.style.left = position.x + 'px';
	dialog.style.top = position.y + 'px';
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
		flashDialog(tag);
		return true;
	}else{
		return false;
	}
}

function flashDialog(tag){
	Object.keys(dialogs).map(function(key, index) {
		var elem = dialogs[key];
		var dial = document.getElementById(elem.tag);
		dial.classList.remove('selected');
	});
	var d = document.getElementById(tag);
	d.classList.add('selected');
	d.classList.add('flash');
	setTimeout(function(){
		d.classList.remove('flash');
	}, 300);
	console.info('Окно ' + tag + ' подсвечено');
}

function dialogPosition(tag){
    console.log(tag);
	var position = [];
	var dialog = document.getElementById(tag);
	position.x = (window.innerWidth - dialog.clientWidth) / 2;
	position.y = (window.innerHeight - dialog.clientHeight) / 2;
	window.dialogs[tag].position = position;
	return position;
}
