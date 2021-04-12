class CatalogueMethods {
    constructor() {
        console.log('Методы каталога инициализированы.');
    }

    getMarks(){
        window.axios({
            method: 'post',
            url: '/icat/marks',
            data: {}
        }).then((resp) =>  {
            document.getElementById('ajax-table-store').innerHTML = resp.data.view
            // console.log(resp.data.view);
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            window.isXHRloading = false;
        });
    }

    getModels(mark_id){
        window.axios({
            method: 'post',
            url: '/icat/models',
            data: { mark_id: mark_id}
        }).then((resp) =>  {
            document.getElementById('ajax-table-store').innerHTML = resp.data.view
            // console.log(resp.data.view);
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            window.isXHRloading = false;
        });
    }

    getModifications(model_id){
        window.axios({
            method: 'post',
            url: '/icat/modifications',
            data: { model_id: model_id}
        }).then((resp) =>  {
            document.getElementById('ajax-table-store').innerHTML = resp.data.view
            // console.log(resp.data.view);
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            window.isXHRloading = false;
        });
    }
}
export default CatalogueMethods;
