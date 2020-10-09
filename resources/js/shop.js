import BBSlider from '../modules/bbslider/bbslider.min';

/* AXIOS */
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Accept'] = '*';
let token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.warn('CSRF токен не выдан');
}
/* END AXIOS */

/* USER IMAGES*/
let header = document.querySelector('.header');
    if(document.querySelector('[rel=headImage]')){
        header.style.background = 'url(' + document.querySelector('[rel=headImage]').getAttribute('href') + ') bottom center repeat';
    }
let body = document.querySelector('.body');
    if(document.querySelector('[rel=bodyImage]')){
        body.style.background = 'url(' + document.querySelector('[rel=bodyImage]').getAttribute('href') + ') top center repeat';
    }
/* ENDUSER IMAGES*/

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


/* END SLIDERS */


window.getProductInfo = function(id){

    let data = new FormData();
    data.append('id', id);

    axios({
        method: 'GET',
        url: '/images/shop/test_product_response.json',
        data: data
    }).then(function (response) {

        createModal();

    }).catch(function (error) {
        console.log(error)
    });
};


window.auth = function(){

    axios({
        method: 'GET',
        url: '/shop/index?page=login'
    }).then(function (response) {
        createModal(response.data.html);
        let auth_tab_container = document.getElementById('auth-tabs');
        window.auth_tab = new Tab(auth_tab_container);

    }).catch(function (error) {
        console.log(error)
    });
};

window.createModal = function(html = null){
    let body = document.querySelector('body');
    let modal_holder = document.createElement('div');
    modal_holder.classList.add('modal-holder');
    modal_holder.addEventListener('click', (e)=>{
        if(e.target.classList.contains('modal-holder')){
            window.closeModal(modal_holder);
        }
    });

    let modal_block = document.createElement('div');
    modal_block.classList.add('modal-block');

    let close_butt = document.createElement('div');
    close_butt.classList.add('modal-close');
    close_butt.addEventListener('click', (e) => {
        window.closeModal(modal_holder);
    });

    let container = document.createElement('div');
    container.classList.add('modal-container');
    container.innerHTML = html;

    modal_block.appendChild(close_butt);
    modal_block.appendChild(container);
    modal_holder.appendChild(modal_block);

    body.appendChild(modal_holder);
}

window.closeModal = function(elem){
    elem.remove();
};

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

class Tab {
    constructor(container){
        this.container = container;
        this.tabs_buttons = container.querySelectorAll('.link-tab');
        this.tabs = container.querySelectorAll('.container-tab');
        console.log(this.tabs_buttons);
        this.tabs_buttons.forEach((item) => {
           item.addEventListener('click', ()=>{
               this.goto(item);
           });
        });

    }
    goto(elem){
        let link = elem.getAttribute('data-link');
        this.tabs_buttons.forEach((item) => {
            item.classList.remove('active');
        });
        this.tabs.forEach((item) => {
            item.classList.remove('active');
        });
        let target = this.container.querySelector('[data-link="'+ link +'"]');
        let target_tab = this.container.querySelector('[data-tag="'+ link +'"]');
        target.classList.add('active');
        target_tab.classList.add('active');
    }
}


