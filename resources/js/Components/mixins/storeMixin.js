let storeMixin = {

    data: ()=> {
        return{
            entity:{
                store_id:null
            }
        }
    },
    computed:{
        store(){
            let stores = this.getFromLocalStorage('stores');
            this.entity.store_id = stores[0].id;
            return stores[0];
        }
    },
    methods: {
    }
};
export default storeMixin;
