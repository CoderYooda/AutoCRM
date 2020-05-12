import Croppr from "croppr";
//window.croppr = require('croppr');


class userPage{

    constructor(){
        console.log('страница профиля1 инициализировано');
        this.credit = 0;
        this.crop_modal = null;
        this.init();
    }

    init(){
        let object = this;

        let myModal = document.getElementById('croppr_dialog');
        let options = {
                backdrop: true,
                keyboard: true,
            }
        this.crop_modal = new bootstrap.Modal(myModal, options);
        // object.crop_modal.show();
        // setTimeout(function(){
        //     object.crop_modal.hide();
        // }, 1000)
    }

    getPayment(){
        let data = 1;
        axios({
            method: 'POST',
            url: '/tariff/get_payment',
            data: data
        }).then(function (response){
            if(response.data.redirect){
                window.location.href = response.data.redirect;
            }
        }).catch(function(response){
            dd(response);
        }).finally(function () {
            window.isXHRloading = false;
        });
    }

    checkPayment(id){
        axios({
            method: 'POST',
            url: '/tariff/check_payment',
            data: {id: id}
        }).then(function (response){
            let div = document.getElementById(response.data.target);
            div.innerHTML = response.data.html;

        }).catch(function(response){
            dd(response);
        }).finally(function () {
            window.isXHRloading = false;
        });
    }

    linked(){ //Состояние Linked - когда экземпляр класса уже был загружен, и находится в памяти. (Возвращение на страницу)
        this.active_tab = window.helper.findGetParameter('active_tab');
    }

    uploadImage(input){
        let object = this;
        var form = input.closest('form');

        var data = new FormData();

        data.append('image[]', document.getElementById('file_upload').files[0]);

        axios({
            method: 'POST',
            url: '/system/image_upload',
            data: data
        }).then(function (response){
            object.crop_modal.show();
            document.getElementById('croppr-container').innerHTML = '';
            var crop = document.createElement('img');
            crop.setAttribute("src", response.data.images[0].url);
            crop.setAttribute("id", 'croppr');

            document.getElementById('croppr-container').appendChild(crop);

            document.getElementById('file_upload').value = '';

            // $('#pick-button').hide();
            // $('#save-button').show();
            // $('#another-button').show();
            var croppr = new Croppr('#croppr', {
                startSize: [90, 90],
                minSize: [50, 50, 'px'],
                aspectRatio: 1.4,
                onCropStart: function(){
                    // document.getElementById('crop_form_modal').classList.add('moving');
                    // document.getElementById('modal-container').classList.add('freeze');
                    // clearTimeout(window.freezeTimer);
                },
                onCropEnd: function(value) {
                    window.cropdata = {'url':response.data.images[0].url, 'filename':response.data.images[0].filename, 'coords' : value};
                    // document.getElementById('crop_form_modal').classList.remove('moving');
                    // window.freezeTimer = setTimeout(function() { document.getElementById('modal-container').classList.remove('freeze') }, 3000);
                },
                onInitialize: function(instance) {
                    window.cropdata = {'url':response.data.images[0].url, 'filename':response.data.images[0].filename, 'coords' : instance.getValue()};
                }
            });

        }).catch(function(response){
            dd(response);
        }).finally(function () {
            window.isXHRloading = false;
        });

    }

    anotherPicture(){
        document.getElementById('file_upload').click();
    }

    cropImage(cropdata){
        let object = this;
        axios({
            method: 'POST',
            url: '/system/crop_image',
            data: cropdata
        }).then(function (response){
            // let div = document.getElementById(response.data.target);
            // div.innerHTML = response.data.html;
            var pics = document.getElementsByClassName('user_thumb');
            [].forEach.call(pics, function(elem){
                elem.src = response.data.avatar.thumb_url;
            });
            document.getElementsByClassName('user_avatar')[0].src = response.data.avatar.url;
            object.crop_modal.hide();
        }).catch(function(response){
            dd(response);
        }).finally(function () {
            window.isXHRloading = false;
        });
    }
}
export default userPage;
