class Page {
    constructor(target){
        this.target = target;
        this.data = null;
        this.readData(this.target);
    }

    readData(target = null){
        let target_elem = document.getElementById(target);

        if(target_elem){
            this.data = JSON.parse(target_elem.dataset.data);
        }
    }
}
export default Page
