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

    showResults() {
        window.axios({
            method: 'post',
            url: '/statistic',
            data: {
                refer: 'statistic',
                manager_id: document.querySelector("input[name=manager_id]").value,
                begin_date: document.querySelector("input[name=begin_date]").value,
                final_date: document.querySelector("input[name=final_date]").value
            }
        })
        .then(response => {
            console.log(response);
        })
        .catch(response => {
            console.log(response);
        })
    }

    selectPartner(id) {

        let object = this;
        window.axios({
            method: 'post',
            url: 'partner/'+ id +'/select',
            data: {refer: 'statistic'}
        }).then((resp) => {

            document.querySelector('input[name=manager_id]').value = resp.data.id;
            document.querySelector('button[name=partner_id]').innerHTML = resp.data.name;

        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;openSelectPartnerModal
        });
    }

    openSelectPartnermodal(){
        window.openDialog('selectPartner', '&refer=statistic');
    }
}
export default statisticPage;
