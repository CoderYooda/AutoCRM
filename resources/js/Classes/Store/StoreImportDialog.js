import Modal from "../Modal/Modal";

class storeImportDialog extends Modal{

    constructor(dialog){
        super(dialog);
        console.log('Окно импорта товаров инициализировано');
        this.init();
    }

    init() {
            var pCaption = $('.progress-bar p');
            var iProgress = document.getElementById('inactiveProgress');
            var aProgress = document.getElementById('activeProgress');
            var iProgressCTX = iProgress.getContext('2d');

            this.drawInactive(iProgressCTX);

            var percentage = 100;
            this.drawProgress(aProgress, percentage, pCaption);
    }

    save() {

        let element = this.current_dialog.querySelector('#form-import');

        console.log(element);

        event.preventDefault();

        let formData = new FormData(element);

        axios({
            url: '/store/import',
            method: 'post',
            data: formData
        })
            .then(response => {
                console.log(response);
            });
    }

    drawInactive(iProgressCTX){
        iProgressCTX.lineCap = 'square';

        //outer ring
        iProgressCTX.beginPath();
        iProgressCTX.lineWidth = 15;
        iProgressCTX.strokeStyle = '#e1e1e1';
        iProgressCTX.arc(137.5,137.5,129,0,2*Math.PI);
        iProgressCTX.stroke();

        //progress bar
        iProgressCTX.beginPath();
        iProgressCTX.lineWidth = 0;
        iProgressCTX.fillStyle = '#e6e6e6';
        iProgressCTX.arc(137.5,137.5,121,0,2*Math.PI);
        iProgressCTX.fill();

        //progressbar caption
        iProgressCTX.beginPath();
        iProgressCTX.lineWidth = 0;
        iProgressCTX.fillStyle = '#fff';
        iProgressCTX.arc(137.5,137.5,100,0,2*Math.PI);
        iProgressCTX.fill();

    }

    drawProgress(bar, percentage, pCaption){
        var barCTX = bar.getContext("2d");
        var quarterTurn = Math.PI / 2;
        var endingAngle = ((2*percentage) * Math.PI) - quarterTurn;
        var startingAngle = 0 - quarterTurn;

        bar.width = bar.width;
        barCTX.lineCap = 'square';

        barCTX.beginPath();
        barCTX.lineWidth = 20;
        barCTX.strokeStyle = '#00B4FF';
        barCTX.arc(137.5,137.5,111,startingAngle, endingAngle);
        barCTX.stroke();

        pCaption.text( (parseInt(percentage * 100, 10)) + '%');
    }
}
export default storeImportDialog;
