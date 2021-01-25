window.phoneMask = function phoneMask(element) {
    window.IMask(element, {

        mask: '+7(000)000-00-00',
        startsWith: '7',
        lazy: true,
    });

    element.addEventListener('paste', event => {

        let text = event.clipboardData.getData('Text')

        if(text[0] == '7' || text[0] == '8') text = text.substr(1);

        element.value = text;
    });
};

window.createModal = function(header_name, html = null){
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

    let modal_header = document.createElement('div');
    modal_header.classList.add('modal-header');

    let header_title = document.createElement('t2');
    header_title.innerText = header_name;
    modal_header.append(header_title);

    let close_butt = document.createElement('div');
    close_butt.classList.add('modal-close');
    close_butt.addEventListener('click', (e) => {
        window.closeModal(modal_holder);
    });

    let container = document.createElement('div');
    container.classList.add('modal-container');
    container.innerHTML = html;

    modal_block.appendChild(close_butt);
    modal_block.appendChild(modal_header);
    modal_block.appendChild(container);
    modal_holder.appendChild(modal_block);

    body.appendChild(modal_holder);

    return modal_holder;
}

window.closeModal = function(elem){
    elem.remove();
};
