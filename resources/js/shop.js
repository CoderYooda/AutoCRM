import BBSlider from '../modules/bbslider/bbslider.min';

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





