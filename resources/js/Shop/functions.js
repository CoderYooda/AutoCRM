import Tab from "./Classes/Tab";

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
