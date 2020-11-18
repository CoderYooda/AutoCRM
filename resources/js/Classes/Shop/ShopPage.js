import ymaps from 'ymaps';
import TextEditor from '@ckeditor/ckeditor5-build-classic/build/ckeditor';
// import Croppr from "croppr";
import Cropper from 'cropperjs';

class shopPage {

    constructor() {

        console.log('страница интернет-магазина инициализирована');
        this.init();
    }

    init() {
        this.linked();

        this.sizes = {
            image_logotype: [52, 52],
            image_header: [1920, 220],
            image_background: [1920, 500]
        };

        this.clicked_input = null;
    }

    linked() {

        this.loadCroppModal();

        this.active_tab = this.getCurrentActiveTab();

        if (this.active_tab == 'contacts') {
            this.map = null;

            let start_coords = document.querySelector('[name=address_coords]').value;

            this.address_coords = start_coords ? start_coords.split(",") : [55.753215, 37.622504];
            this.address_text = document.querySelector('[name=address_name]').value;
            this.address_placemark = null;

            this.loadYandexMapAddress();
            this.addPhoneMask();
        } else if (this.active_tab == 'about' || this.active_tab == 'delivery' || this.active_tab == 'warranty') {

            let editor_element = document.querySelector('#editor');

            TextEditor.create(editor_element, {
                language: 'ru',
            })
                .then(newEditor => {
                    this.texteditor = newEditor
                });
        }
        else if(this.active_tab == 'settings') {
            this.addSubdomainMask();
            this.addEmailMask();
        }

        this.checkActive();
    }

    loadCroppModal()
    {
        let myModal = document.getElementById('croppr_dialog');

        let options = {
            keyboard: true,
            backdrop: 'static'
        }

        this.crop_modal = new bootstrap.Modal(myModal, options);
    }

    changeFile(input){

        this.clicked_input = input;

        let data = new FormData();

        data.append('image[]', input.files[0]);
        data.append('refer', 'shop');

        let size = this.sizes[input.id];

        let img = new Image()
        img.src = window.URL.createObjectURL(input.files[0]);
        img.onload = () => {

            input.value = '';

            if(img.width < size[0] || img.height < size[1]) {
                window.notification.notify('error', 'Минимальный размер изображения: ' + size[0] + 'x' + size[1]);
                return;
            }

            axios({
                method: 'POST',
                url: '/system/image_upload',
                data: data
            }).then((response) => {

                let another_element = document.querySelector('.reload');

                togglePreloader(another_element, false);

                document.getElementById('croppr-container').innerHTML = '';

                let cropper_element = document.createElement('img');
                cropper_element.setAttribute("src", response.data.images[0].url);
                cropper_element.setAttribute("id", 'croppr');

                document.getElementById('croppr-container').appendChild(cropper_element);

                document.querySelector('#croppr_dialog .save').setAttribute('onclick', 'shop.cropImage(this, window.cropdata);');
                document.querySelector('#croppr_dialog .reload').setAttribute('onclick', 'shop.anotherPicture(this);');

                let timer = setInterval(() => {

                    let orig_w = cropper_element.naturalWidth;
                    let orig_h = cropper_element.naturalHeight;

                    let w = cropper_element.clientWidth;
                    let h = cropper_element.clientHeight;

                    if(orig_w == 0) return;

                    console.log(w, h, orig_w, orig_h);

                    let scale_index = orig_w / 677;

                    console.log(scale_index, orig_w, orig_h, orig_w /scale_index, orig_h / scale_index);

                    clearInterval(timer);

                    input.value = '';

                    window.croppr = new Cropper(cropper_element, {
                        // minContainerWidth: 677,
                        //minContainerHeight: 300,
                        minCropBoxWidth: orig_w / scale_index,
                        minCropBoxHeight: orig_h / scale_index,
                        aspectRatio: size[0] / size[1],
                        viewMode: 2,
                        // autoCropArea: 1,
                        center: true,
                        cropBoxMovable: true,
                        // cropBoxResizable: false,
                        zoomable: false
                    });

                    cropper_element.addEventListener('ready',() => {
                        this.crop_modal.show();
                    });

                    cropper_element.addEventListener('crop',(event) => {

                        // let detail = event.detail;
                        //
                        // let min_w = orig_w / scale_index;
                        // let min_h = orig_h / scale_index;
                        //
                        // if(detail.width < min_w || detail.height < min_h) {
                        //     window.croppr.setCropBoxData({
                        //         "left":detail.x,
                        //         "top":detail.y,
                        //         "width":min_w,
                        //         "height":min_h
                        //     });
                        // }

                        // console.log(event.detail.x);
                        // console.log(event.detail.y);
                        // console.log(event.detail.width);
                        // console.log(event.detail.height);
                        // console.log(event.detail.rotate);
                        // console.log(event.detail.scaleX);
                        // console.log(event.detail.scaleY);
                    });

                }, 50);

                // $('#pick-button').hide();
                // $('#save-button').show();
                // $('#another-button').show();

            }).catch(function(response){
                dd(response);
            }).finally(function () {
                window.isXHRloading = false;
            });
        };
    }

    anotherPicture(element) {

        togglePreloader(element, true);

        this.clicked_input.click();
    }

    cropImage(element, cropdata){

        togglePreloader(element, true);

        axios({
            method: 'POST',
            url: '/system/crop_image',
            data: cropdata
        }).then(response => {

            let file = response.data.file;

            let file_element = document.querySelector('[name="' + window.cropdata.target + '_id"]');
            let image_element = file_element.closest('div').querySelector('.image_main');

            image_element.src = file.path;
            file_element.value = file.id;

            this.crop_modal.hide();

        }).catch(response => {
            dd(response);
        }).finally(() => {
            window.isXHRloading = false;

            togglePreloader(element, false);
        });
    }

    addEmailMask()
    {
        let email_elements = document.querySelectorAll('[type="email"]');

        //TODO добавить email маску

        // email_elements.forEach(element => {
        //     IMask(element, {
        //             mask: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        //         }
        //     );
        // });
    }

    addSubdomainMask()
    {
        let element = document.querySelector('[name="subdomain"]');

        IMask(element, {
                mask: 'NAME.bbcrm.ru',
                prepare: function (str) {
                    return str.toLowerCase();
                },
                lazy: false,
                blocks: {
                    NAME: {
                        mask: /^[0-9a-zA-Z]+$/
                    }
                }
            }
        );
    }

    selectFiles(element) {
        element.querySelector('input').click();
    }

    uploadFiles(element) {

        let count_images = document.querySelectorAll('image').length;

        if (count_images + element.files.length > 9) {
            return notification.notify('error', 'Количество изображений не может быть больше 9.');
        }

        for (let i = 0; i < element.files.length; ++i) {

            let file = element.files[i];

            let data = new FormData();
            data.append('image[]', file);

            axios({
                method: 'POST',
                url: '/system/image_upload',
                data: data
            }).then(response => {

                let image = response.data.images[0];

                let copy_element = document.querySelector('.image.copy').cloneNode(true);

                copy_element.querySelector('img').src = image.url;

                copy_element.querySelector('button').dataset.id = image.id;

                copy_element.classList.remove('d-none');
                copy_element.classList.remove('copy');

                let list_element = document.querySelector('.images');

                list_element.append(copy_element);

                this.freshImagesIndexes();

            }).catch(function(response){
                dd(response);
            }).finally(function () {

            });
        }

        element.value = '';
    }

    removeImage(element) {
        let target_element = element.closest('.image');
        target_element.remove();

        this.freshImagesIndexes();
    }

    loadYandexMapAddress() {
        let map_element = document.querySelector('#address_map');

        ymaps
            .load('https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=a5b7952a-1613-4e29-ab35-5ce2d1a5a775')
            .then(maps => {

                new maps
                    .SuggestView('suggest')
                    .events
                    .add('select', (event) => {

                        let address = event.get('item').value;

                        this.address_text = address;

                        let myGeocoder = new maps.geocode(address);
                        myGeocoder.then(res => {
                                let obj = res.geoObjects.get(0);

                                let bounds = obj.properties.get('boundedBy');

                                let mapState = maps.util.bounds.getCenterAndZoom(
                                    bounds,
                                    [map_element.style.width, map_element.style.height]
                                );

                                this.address_coords = mapState.center;

                                this.map.setCenter(mapState.center, 9);

                                this.createPlacemark(maps, this.address_coords);
                            },
                            function (err) {
                                console.log(err);
                            }
                        );
                    });

                this.map = new maps.Map(map_element, {
                    center: this.address_coords,
                    zoom: 9,
                    controls: ['zoomControl']
                });

                this.map.events.add('click', (e) => {
                    this.address_coords = e.get('coords');

                    this.createPlacemark(maps, this.address_coords);
                })

                if (this.address_coords) {
                    this.createPlacemark(maps, this.address_coords);
                }

            })
            .catch(error => console.log('Failed to load Yandex Maps', error));
    }

    createPlacemark(maps, position) {

        if (this.address_placemark != null) this.map.geoObjects.remove(this.address_placemark);

        document.querySelector('[name=address_coords]').value = this.address_coords;

        this.address_placemark = new maps.Placemark(position, {
            // iconContent: this.address_text,
            balloonContent: this.address_text
        }, {
            preset: "islands#redDotIconWithCaption",
            // Балун будем открывать и закрывать кликом по иконке метки.
            hideIconOnBalloonOpen: false
        });

        this.map.geoObjects.add(this.address_placemark);
    }

    toggleSupplierOffers(element) {
        let select_element = element.closest('.form-group').querySelector('.select_supplier');

        select_element.classList.toggle('d-none');
    }

    addPhone(element) {

        let div = element.closest('.addable').querySelector('.phones');
        let count = div.getElementsByClassName('phone').length;
        let node = document.querySelector('.phone').cloneNode(true);

        node.querySelectorAll('input').forEach((input, index) => {
            if (index < 2) {
                input.name = 'phones[' + count + '][' + (index == 0 ? 'number' : 'desc') + ']';
                input.value = '';
            } else {
                input.value = count;
                input.checked = false;
            }
        })

        if (this.canAddMorePhone(div)) {
            div.appendChild(node);
        }

        node.querySelector('input').focus();

        this.addPhoneMask();
    }

    addEmail(element) {

        let div = element.closest('.addable').querySelector('.emails');
        let count = div.getElementsByClassName('email').length;
        let node = document.querySelector('.email').cloneNode(true);

        node.querySelectorAll('input').forEach((input, index) => {
            if (index < 2) {
                input.name = 'emails[' + count + '][' + (index == 0 ? 'email' : 'desc') + ']';
                input.value = '';
            } else {
                input.value = count;
                input.checked = false;
            }
        })

        if (this.canAddMoreEmails(div)) {
            div.appendChild(node);
        }

        node.querySelector('input').focus();

        this.addPhoneMask();
    }

    canAddMorePhone(div) {
        let elems = div.getElementsByClassName('phone');

        if (elems.length > 4) {
            notification.notify('error', 'Максимальное кол-во номеров - 5');
            return false;
        }

        return true;
    }

    canAddMoreEmails(div) {
        let elems = div.getElementsByClassName('email');

        if (elems.length > 4) {
            notification.notify('error', 'Максимальное кол-во почтовых адресов - 5');
            return false;
        }

        return true;
    }

    addPhoneMask() {
        let elements = document.querySelectorAll('.phone_input');
        elements.forEach(element => {
            window.IMask(element, {
                    mask: [
                        {
                            mask: '+{7}(000)000-00-00',
                            startsWith: '7',
                            lazy: true,
                            country: 'Россия'
                        },
                        {
                            mask: '{8}(000)000-00-00',
                            startsWith: '8',
                            lazy: true,
                            country: 'Россия'
                        },
                        {
                            mask: '+{380}(000)000-00-00',
                            startsWith: '3',
                            lazy: true,
                            country: 'Украина'
                        },
                    ],
                    dispatch: function (appended, dynamicMasked) {
                        let number = (dynamicMasked.value + appended).replace(/\D/g, '');

                        return dynamicMasked.compiledMasks.find(function (m) {
                            return number.indexOf(m.startsWith) === 0;
                        });
                    }
                }
            )
        });
    }

    deletePhone(elem) {

        let div = elem.closest('.addable').querySelector('.phones');
        if (this.canRemovePhone(div)) {
            elem.closest('.phone').remove();
        }
    }

    deleteEmail(elem) {

        let div = elem.closest('.addable').querySelector('.emails');
        if (this.canRemoveEmail(div)) {
            elem.closest('.email').remove();
        }
    }

    canRemoveEmail(div) {
        let elems = div.getElementsByClassName('email');

        if (elems.length < 2) {
            notification.notify('error', 'Нельзя удалить единственный почтовый адрес');
            return false;
        }

        return true;
    }

    canRemovePhone(div) {
        let elems = div.getElementsByClassName('phone');

        if (elems.length < 2) {
            notification.notify('error', 'Нельзя удалить единственный номер');
            return false;
        }

        return true;
    }

    checkActive() {

        let className = window.location.pathname.substring(1);
        let link = document.getElementById('shop_link');
        if (className === 'shop') {
            link.classList.add('active');
            this.active = true;
        } else {
            link.classList.remove('active');
            this.active = false;
        }
    }

    saveContacts(element) {

        axform.send(element, response => {
            if (response.status == 200) {
                //
            }
        });
    }

    saveSettings(element) {

        let image_ids = [];
        let image_urls = [];

        let image_elements = document.querySelectorAll('.image:not(.copy):not(.upload)');

        image_elements.forEach(element => {

            let image_id = element.querySelector('button').dataset.id;
            let target_url = element.querySelector('input').value;

            image_ids.push(image_id);
            image_urls.push(target_url);
        });

        let data = {
            image_ids: image_ids,
            image_urls: image_urls
        };

        axform.send(element, response => {
            if (response.status == 200) {
                //
            }
        }, null, data);
    }

    saveAbout(element) {

        let image_ids = [];

        let image_elements = document.querySelectorAll('.image');

        image_elements.forEach((element, index) => {

            if(index > 1) {

                let image_id = element.querySelector('button').dataset.id;

                image_ids.push(image_id);
            }
        });

        let data = {
            image_ids: image_ids,
            about_desc: this.texteditor.getData()
        };

        axform.send(element, response => {
            if (response.status == 200) {
                //
            }
        }, null, data);
    }

    saveDelivery(element) {

        let dataset = {
            delivery_desc: this.texteditor.getData(),
        };

        axform.send(element, response => {
            if (response.status == 200) {
                //
            }
        }, null, dataset);
    }

    saveWarranty(element) {

        let dataset = {
            warranty_desc: this.texteditor.getData(),
        };

        axform.send(element, response => {
            if (response.status == 200) {
                //
            }
        }, null, dataset);
    }

    getCurrentActiveTab() {

        let active_tab = window.helper.findGetParameter('active_tab');

        if (active_tab == null || active_tab == 'null') {
            active_tab = 'contacts';
        }
        return active_tab;
    }

    freshImagesIndexes()
    {
        let image_elements = document.querySelectorAll('.image:not(.copy):not(.upload)');

        image_elements.forEach((element, index) => {

            console.log(element, element.querySelector('img'), element.querySelector('input'));

            element.querySelector('img').dataset.index = index;
            element.querySelector('input').dataset.error = 'image_urls[' + index + ']';
        });
    }
}

export default shopPage;
