import ymaps from 'ymaps';

class shopPage {

    constructor() {

        console.log('страница интернет-магазина инициализирована');
        this.init();

        this.map = null;

        let start_coords = document.querySelector('[name=address_coords]').value;

        this.address_coords = start_coords ? start_coords.split(",") : [55.753215, 37.622504];
        this.address_text = document.querySelector('[name=address_name]').value;
        this.address_placemark = null;
    }

    init() {
        this.linked();
    }

    linked() {

        this.checkActive();

        this.addPhoneMask();
        this.loadYandexMapAddress();
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

                if(this.address_coords) {
                    this.createPlacemark(maps, this.address_coords);
                }

            })
            .catch(error => console.log('Failed to load Yandex Maps', error));
    }

    createPlacemark(maps, position) {

        if(this.address_placemark != null) this.map.geoObjects.remove(this.address_placemark);

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

    addPhone(element) {

        let div = element.closest('.addable').querySelector('.phones');
        let count = div.getElementsByClassName('phone').length;
        let node = document.querySelector('.phone').cloneNode(true);

        node.querySelectorAll('input').forEach((input, index) => {
            if(index < 2) {
                input.name = 'phones[num' + (count + 1) + '][' + (index == 0 ? 'number' : 'desc') + ']';
                input.value = '';
            }
            else {
                input.value = 'num' + (count + 1);
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
            if(index < 2) {
                input.name = 'emails[num' + (count + 1) + '][' + (index == 0 ? 'number' : 'desc') + ']';
                input.value = '';
            }
            else {
                input.value = 'num' + (count + 1);
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

    checkActive(){
        let className = window.location.pathname.substring(1);
        let link = document.getElementById('shop_link');
        if(className === 'shop'){
            link.classList.add('active');
            this.active = true;
        } else {
            link.classList.remove('active');
            this.active = false;
        }
    }

    save(element) {
        axform.send(element, response =>{
            if(response.status == 200) {

            }
        });
    }
}

export default shopPage;
