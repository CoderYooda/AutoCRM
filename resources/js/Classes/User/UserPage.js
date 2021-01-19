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

    removeVehicle(vehicle_id) {
        window.axios({
            method: 'post',
            url: '/vehicles/'+ vehicle_id,
            data: {
                _method: 'DELETE'
            }
        }).then(response => {
            document.getElementById('vehicle_' + vehicle_id).remove();
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
            document.getElementById('croppr-container').innerHTML = '';
            let crop = document.createElement('img');
            crop.setAttribute("src", response.data.images[0].url);
            crop.setAttribute("id", 'croppr');

            document.getElementById('croppr-container').appendChild(crop);

            document.getElementById('file_upload').value = '';

            var croppr = new Croppr('#croppr', {
                startSize: [100, 100, '%'],
                minSize: [140, 195, 'px'],
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
                    object.crop_modal.show();
                    setTimeout(function(){
                        let w = document.getElementsByClassName('croppr-image')[0].clientWidth;
                        let h = document.getElementsByClassName('croppr-image')[0].clientHeight;
                        instance.moveTo(w/2, h/2);
                        instance.resizeTo(140, 195);

                    }, 100);
                    window.cropdata = {'url':response.data.images[0].url, 'filename':response.data.images[0].filename, 'coords' : instance.getValue()};
                }
            });

            // $('#pick-button').hide();
            // $('#save-button').show();
            // $('#another-button').show();




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
        }).then(response => {
            let image = response.data.file;

            var pics = document.getElementsByClassName('user_thumb');
            [].forEach.call(pics, elem => {
                elem.src = image.image_path;
            });
            document.getElementsByClassName('user_avatar')[0].src = image.image_path;

            this.updateUserImage(image);

            object.crop_modal.hide();

        }).catch(function(response){
            dd(response);
        }).finally(function () {
            window.isXHRloading = false;
        });
    }

    updateUserImage(image) {

        let data = {
            image_id: image.id
        };

        axios.post('/user/update-image', data)
            .then(response => {

            })
            .catch(response => {

            });
        //        $user->partner->update([
//            'avatar_id' => $imageobject->id,
//            'pic_id' => $imageobject->id
//        ]);
    }
}
export default userPage;
