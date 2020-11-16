import BBSlider from '../../modules/bbslider/bbslider.min';
import IMask from 'imask';

/* Notification settings */
notification.configProfile( 'global', {
    behaviour: {
        autoHide: 3,
        limit: 5
    },
    animations: {
        duration: [ 0.5, 0.5 ]
    },
});


/* Axios settings */
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Accept'] = '*';
let token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.warn('CSRF токен не выдан');
}

/* USER IMAGES*/
let header = document.querySelector('.header');
if(document.querySelector('[rel=headImage]')){
    header.style.background = 'url(' + document.querySelector('[rel=headImage]').getAttribute('href') + ') bottom center repeat';
}
let body = document.querySelector('.body');
if(document.querySelector('[rel=bodyImage]')){
    body.style.background = 'url(' + document.querySelector('[rel=bodyImage]').getAttribute('href') + ') top center repeat';
}

/* SLIDERS */

let head_slider = document.querySelector('.head-slider-container');
if(head_slider){
    window.headSlider = new BBSlider({
        selector: '.head-slider-container',
        duration: 600,
        easing: 'ease-out',
        perPage: 1,
        startIndex: 0,
        draggable: true,
        multipleDrag: true,
        threshold: 20,
        loop: true,
        rtl: false,
        onInit: () => {
        },
        onChange: () => {activatePin()},
    });
    let pinsContainer = document.querySelector('.pins-container');
    if(pinsContainer){
        let slideIndex = 0;
        window.headSlider.innerElements.forEach((elem) => {
            let pin = document.createElement('div');
            pin.classList.add('pin');
            pin.onclick = function(){
                window.headSlider.goTo(this.getAttribute('data-slide-id'));
                activatePin();
            };
            pin.setAttribute('data-slide-id', slideIndex);
            pinsContainer.appendChild(pin);
            slideIndex++;
        });
        activatePin();
    }
}

function activatePin(){
    let activePin = document.querySelector('[data-slide-id="' + window.headSlider.currentSlide + '"]');
    let pins = document.querySelectorAll('.pin');
    pins.forEach((elem) => {
        elem.classList.remove('active');
    });
    if(activePin){
        activePin.classList.add('active');
    }
}

let pop_products = document.querySelector('.popular-products');
if(pop_products){
    if(pop_products.querySelectorAll('.product').length > 4){
        window.popularSlider = new BBSlider({
            selector: '.popular-products',
            duration: 600,
            easing: 'ease-out',
            perPage: 4,
            startIndex: 0,
            draggable: true,
            multipleDrag: true,
            threshold: 20,
            loop: true,
            rtl: false,
            onInit: () => {
            },
            onChange: () => {},
        });
    } else {
        let controls = pop_products.parentElement.querySelector('.controls');
        controls.style.display = 'none';
    }
}

let gallery = document.querySelector('.photos-container');
if(gallery){
    if(gallery.querySelectorAll('.photo').length > 4){
        window.gallerySlider = new BBSlider({
            selector: '.photos-container',
            duration: 600,
            easing: 'ease-out',
            perPage: 4,
            startIndex: 0,
            draggable: true,
            multipleDrag: true,
            threshold: 20,
            loop: true,
            rtl: false,
            onInit: () => {
            },
            onChange: () => {activateGalleryPin();},
        });
        let pinsContainer = document.querySelector('.pins-container');
        if(pinsContainer){
            let slideIndex = 0;
            window.gallerySlider.innerElements.forEach((elem) => {
                let pin = document.createElement('div');
                pin.classList.add('pin');
                pin.onclick = function(){
                    window.gallerySlider.goTo(this.getAttribute('data-slide-id'));
                    activateGalleryPin();
                };
                pin.setAttribute('data-slide-id', slideIndex);
                pinsContainer.appendChild(pin);
                slideIndex++;
            });
            activateGalleryPin();
        }
    } else {
        let controls = gallery.parentElement.querySelector('.controls');
        controls.style.display = 'none';
    }
}
function activateGalleryPin(){
    let activePin = document.querySelector('[data-slide-id="' + window.gallerySlider.currentSlide + '"]');
    let pins = document.querySelectorAll('.pin');
    pins.forEach((elem) => {
        elem.classList.remove('active');
    });
    if(activePin){
        activePin.classList.add('active');
    }
}

//Маска на поля

let phone_elements = document.querySelectorAll('input[class~=phone]');

if(phone_elements) {
    phone_elements.forEach(element => window.phoneMask(element));
}

//Яндекс карта

let map = document.querySelector('.map');
if(map){
    ymaps.ready(function () {
        window.myMap = new ymaps.Map('map', {
            center: window.coordinates,
            zoom: 9
        }, {
            searchControlProvider: 'yandex#search'
        });

        // Создаём макет содержимого.
        //  let MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        //     '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        // );

        let myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Собственный значок метки',
            balloonContent: 'Это красивая метка'
        });
        myMap.geoObjects.add(myPlacemark)
    });
}

