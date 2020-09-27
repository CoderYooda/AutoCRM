class Page {
    constructor(target){
        this.target = target;
        this.data = null;
        this.readData(this.target);
    }

    readData(target = null){
        let target_elem = document.getElementById(target);
        dd("Прочитали дату");
        if(target_elem){
            let data;
            if(target_elem.hasAttribute('data-data')){
                data = target_elem;
            } else {
                data = target_elem.querySelector('[data-data]');
            }
            if(data && data.dataset.data){
                this.data = JSON.parse(data.dataset.data);
                data.removeAttribute('data-data');
            }
        }
    }
}
export default Page
