class Modal{

    constructor(dialog){
        this.touched = false;
        this.root_dialog = dialog;
        this.current_dialog = dialog; //alias to root_dialog
        let object = this;
        let form = this.current_dialog.getElementsByTagName('form')[0];
        if(form){
            form.addEventListener('keydown',  function(e){
                if(e.target.classList.contains('search')){

                } else {
                    object.touch();
                }
            });
        }
        this.storage_tabs();
    }

    storage_tabs(){
        let storage_tabs = this.current_dialog.querySelector('[storage_tabs]');
        if(storage_tabs){

            // dd(localStorage.getItem(this.constructor.name + '_tab'));

            if(localStorage.getItem(this.constructor.name + '_tab') !== 'undefined'){

                let panes = this.current_dialog.querySelectorAll('.tab-pane');

                panes.forEach((pane)=>{
                    pane.classList.remove('active');
                });

                let tabs = storage_tabs.querySelectorAll('li');
                tabs.forEach((tab)=>{
                    tab.classList.remove('active');
                    tab.querySelector('a').setAttribute('aria-expanded', 'false');
                });

                let tab_a = this.current_dialog.querySelector('[data-target="' + localStorage.getItem(this.constructor.name + '_tab') + '"]');
                tab_a.setAttribute('aria-expanded', 'true');
                tab_a.parentElement.classList.add('active');
                this.current_dialog.querySelector(localStorage.getItem(this.constructor.name + '_tab')).classList.add('active');

            }


            let items = storage_tabs.querySelectorAll('li.nav-item');
            items.forEach((elem)=>{
                elem.addEventListener('click', ()=>{
                    localStorage.setItem(this.constructor.name + '_tab', elem.querySelector('a').dataset.target);
                })
            })
        }
    }

    touch(){
        this.touched = true;
    }

    finitaLaComedia(forced = null){
        window.event.preventDefault();
        if(!this.touched || forced){
            closeDialog(null, this.root_dialog.id);
            delete window[this.root_dialog.id];
        } else {
            Swal.fire({
                title: 'Вы точно хотите закрыть окно?',
                text: "Обнаружена заполненная информация",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Да, закрыть',
                cancelButtonText: 'Отмена'
            }).then((result) => {
                if (result.value) {
                    closeDialog(null, this.root_dialog.id);
                    delete window[this.root_dialog.id];
                }
            });
        }
    }
}
export default Modal
