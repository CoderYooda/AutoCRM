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
