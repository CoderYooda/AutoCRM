
class selectCategoryDialog{

    constructor(dialog){

        console.log('Окно выбора категории инициализировано');
        this.root_dialog = dialog;
        this.refer = dialog.querySelector("#refer").value;
        this.active = true;
        this.init();
    }

    init(){
        let object = this;
        document.addEventListener("CategorySelected", function(){
            object.finitaLaComedia();
        });
    }

    finitaLaComedia(){
        closeDialog(null, this.root_dialog.id);
        delete window[this.root_dialog.id];
    }

    save(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(e){
            object.finitaLaComedia();
        });
    }

}
export default selectCategoryDialog;
