class Scanner{
    constructor(){
        this.init();
        this.UPC = '';
    }

    init(){
        console.log('scanner init');
        let object = this;

        let scanFN = window.helper.debounce(function(e) {
            if (object.UPC.length >= 6) {
                console.log('barcode scanned:  ', object.UPC);
                if(window.barcodeDialog){
                    window.barcodeDialog.finitaLaComedia();
                }
                window.openDialog('barcodeDialog', '&upc=' + object.UPC);
            }
            setTimeout(function(){
                object.UPC = '';
                console.log('Буфер сканера очищен');
            }, 100);
        }, 20);



        document.addEventListener("keydown", function(e) {
            const textInput = e.key || String.fromCharCode(e.keyCode);
            const targetName = e.target.localName;
            if (textInput && textInput.length === 1 && targetName !== 'input'){
                object.UPC = object.UPC+textInput;
                scanFN();
            }
        });
    }

    // search(){
    //     let data = {};
    //     data.upc = this.UPC;
    //     window.axios({
    //         method: 'post',
    //         url: 'barcode/search',
    //         data: data,
    //     }).then(function (resp) {
    //         console.log(resp.data);
    //     }).catch(function (error) {
    //         console.log(error);
    //     }).finally(function () {
    //         window.isXHRloading = false;
    //     });
    // }
}
export default Scanner
