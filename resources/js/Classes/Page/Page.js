class Page {
    constructor(target = null){
        if(target){
            this.target = target;
            this.data = null;
            this.readData(this.target);
        }
    }

    readData(target = null){

        let target_elem = document.getElementById(target);
        if(target_elem){

            let data = target_elem.querySelector('[data-data]');
            if(target_elem.hasAttribute('data-data')){
                console.log(1);
                data = target_elem;
            }

            if(data && data.dataset.data){
                this.data = JSON.parse(data.dataset.data);
                data.removeAttribute('data-data');
            }
            return true;
        }
    }
}
export default Page;
