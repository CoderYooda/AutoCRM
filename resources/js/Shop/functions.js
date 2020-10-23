window.phoneMask = function phoneMask(element) {
    window.IMask(element, {

            mask: '+{7}(000)000-00-00',
            lazy: true,

            dispatch: function (appended, dynamicMasked) {
                let number = (dynamicMasked.value + appended).replace(/\D/g,'');

                return dynamicMasked.compiledMasks.find(function (m) {
                    return number.indexOf(m.startsWith) === 0;
                });
            }
        }
    );
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
