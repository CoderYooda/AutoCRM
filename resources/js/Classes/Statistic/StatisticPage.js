class statisticPage {

    constructor(){
        console.log('страница статистики инициализировано');
        this.init();

    }

    init(){
        this.linked();
    }

    linked()
    {
    }

    selectPartner(id) {

        var object = this;
        window.axios({
            method: 'post',
            url: 'partner/'+ id +'/select',
            data: {refer: 'statistic'}
        }).then(function (resp) {

            $('')

            let select = object.root_dialog.querySelector('button[name=partner_id]');
            let input = object.root_dialog.querySelector('input[name=partner_id]');
            let balance = object.root_dialog.querySelector('#balance');
            let str = resp.data.name;

            input.value = resp.data.id;

        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    }

    openSelectPartnermodal(){
        window.openDialog('selectPartner', '&refer=statistic');
    }
}
export default statisticPage;
