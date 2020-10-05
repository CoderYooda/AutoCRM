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
        header.style.background = 'url(' + document.querySelector('[rel=headImage]').getAttribute('href') + ') bottom repeat';
    }
let body = document.querySelector('.body');
    if(document.querySelector('[rel=bodyImage]')){
        body.style.background = 'url(' + document.querySelector('[rel=bodyImage]').getAttribute('href') + ') center repeat';
    }
/* ENDUSER IMAGES*/

/* SLIDERS */
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
/* END SLIDERS */


window.getProductInfo = function(id){

    let data = new FormData();
    data.append('id', id);

    axios({
        method: 'GET',
        url: '/images/shop/test_product_response.json',
        data: data
    }).then(function (response) {

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

        modal_block.appendChild(close_butt);
        modal_holder.appendChild(modal_block);

        body.appendChild(modal_holder);

    }).catch(function (error) {
        console.log(error)
    });
};

window.closeModal = function(elem){
    elem.remove();
};



