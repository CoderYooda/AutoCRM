import Modal from "../Modal/Modal";

class roleDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно штрихкода инициализировано');
        this.active = true;
        this.users = [];
        this.init();
    }

    init(){
        let object = this;

        let focused = document.getElementById('partner_dialog_focused');
        if(focused){
            focused.focus();
        }
    }

    save(elem){
        let object = this;
        if(!window.isXHRloading){
            window.axform.send(elem, function(e){
                object.finitaLaComedia(true);
            });
        }
    }

    selectAll(){
        var perms = document.getElementsByClassName('perm');
        [].forEach.call(perms, function(elem){
            elem.checked = true;
        });
    }

    unselectAll(){
        var perms = document.getElementsByClassName('perm');
        [].forEach.call(perms, function(elem){
            elem.checked = false;
        });
    }

    openSelectUsersModal(target){
        window.openDialog('selectPartner', '&refer=' + this.root_dialog.id + '&target=' + target);
    }

    selectPartner(id, target){
        let object = this;
        window.axios({
            method: 'post',
            url: 'partner/'+ id +'/select',
            data: {refer:null}
        }).then(function (resp) {
            if(object[target].includes(resp.data.id)){
                window.notification.notify( 'error', 'Уже имеется в списке');
            } else {
                object[target].push(resp.data.id);
                let stack = document.getElementById(target + '_stack');
                var node = helper.createElementFromHTML('' +
                    '<div id="' + target + '_' + resp.data.id + '" class="' + target + '_selected filter_element" >' +
                    '<span>' + resp.data.name + '</span>' +
                    '<button type="button" onclick="' + object.root_dialog.id + '.removeUser(' + resp.data.id + ', \'' + target + '\')" class="right-remove"><i class="fa fa-remove"></i></button>' +
                    '</div>' +
                    '');
                stack.appendChild(node);
                object.setEmpty(target, 'users_stack');
                window.notification.notify( 'success', 'Контакт выбран');
            }

        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            window.isXHRloading = false;
        });
    };

    removeUser(id, type){
        let object = this;
        object[type].remove(id);
        object.setEmpty(type, 'users_stack');
        document.getElementById(type + '_' + id).remove();
    }

    clearList(type, container){
        this[type] = [];
        this.setEmpty(type, container);
        window.notification.notify( 'success', 'Поле очищено');
    }

    setEmpty(target, container){
        console.log(target, container);
        if(this[target].length < 1){
            document.getElementById(container).innerHTML = '<div class="no-items-text">Для этой роли пользователи не назначены</div>';
        } else {
            let notext = this.root_dialog.querySelector('.no-items-text');
            if(notext){
                notext.remove();
            }
        }
    }

}
export default roleDialog;
