class ddsarticleDialog{

    constructor(dialog){
        console.log('Окно статьи дохода инициализировано');
        this.root_dialog = dialog;
        this.active = true;
        this.init();
    }

    init(){
        let object = this;
        document.addEventListener("DdsarticleStored", function(){
            object.finitaLaComedia();
        });
    }

    save(elem){
        if(window.isXHRloading) return;
        let object = this;
        window.axform.send(elem, function(e){
            object.finitaLaComedia();
        });
    }

    finitaLaComedia(){
        closeDialog(null, this.root_dialog.id);
        delete window[this.root_dialog.id];
    }
}
export default ddsarticleDialog;
