class Scanner{
    constructor(){
        this.init();
        this.UPC = '';
        console.log('Сканер активен');
    }

    init(){
        let object = this;
        let scanFN = window.helper.debounce(function(e) {
            if (object.UPC.length >= 6) {
                console.log('Штрихкод отсканирован:', object.UPC);
                let dialogs = document.getElementsByClassName('dialog');
                let targeted = false;
                if(dialogs.length) {
                    [].forEach.call(dialogs, function (elem) {
                        if (elem.classList.contains('selected')) {
                            window.axios({
                                method: 'post',
                                url: 'product/getByUpc',
                                data: {upc: object.UPC}
                            }).then(function (resp) {
                                try {
                                    window[elem.id].scanOperation(resp.data.id);
                                    targeted = true;
                                } catch (e) {
                                    console.warn(elem.id + ' не содержит метода scanOperation');
                                }
                                if (targeted === false) {
                                    if (window.barcodeDialog) {
                                        window.barcodeDialog.finitaLaComedia();
                                    }
                                    //window.openDialog('barcodeDialog', '&upc=' + object.UPC);
                                }
                            }).catch(function (error) {
                                console.log(error);
                            }).finally(function () {
                                window.isXHRloading = false;
                            });
                        }
                    });
                } else {
                    //window.openDialog('barcodeDialog', '&upc=' + object.UPC);
                }
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
